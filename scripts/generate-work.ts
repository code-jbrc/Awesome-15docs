import { writeFileSync } from 'node:fs'
import fetch from 'node-fetch'
import { resolver } from './path'

/* eslint-disable @typescript-eslint/ban-ts-comment */
const GITHUB_API_URL = 'https://api.github.com'
const token = process.env.GITHUB_TOKEN
console.log('🚀 ~ token:', token)
console.log('🚀 ~ token:', process.env.PAT)
console.log('🚀 ~ token:', process.env)
const orgName = 'MoeGolibrary'
const username = 'wincheshe'

async function fetchRepositories() {
  const result = [
    {
      name: 'Boarding_Desktop',
    },
    {
      name: 'moego-mobile',
    },
    {
      name: 'moego-client-libs',
    },
    {
      name: 'moego-online-booking-client-web',
    },
    {
      name: 'moego-ui',
    },
  ]
  return result
}

async function fetchCommits(orgName: string, repo: string) {
  const response = await fetch(`${GITHUB_API_URL}/repos/${orgName}/${repo}/commits?author=${username}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${token}`,
    },
  })
  const commits = await response.json()
  return commits as any
}

interface CommitInfo {
  author: string
  date: string
  path: string
  desc: string
  repoName: string
  subCommit: CommitInfo[]
  title: string
  past?: boolean
}

function isSameDate(date1: string, date2: string) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

async function generateMyself() {
  const repositories = await fetchRepositories()

  const commitPromises = repositories.map(async (repo: any) => {
    const repoName = repo.name
    const commits = await fetchCommits(orgName, repoName)
    const commitInfo = commits.map((commit: any) => ({
      author: commit.author.login,
      date: commit.date || commit.commit.author.date,
      path: commit.html_url,
      desc: commit.commit.message,
      title: `${repoName} - ${commit.commit.message.split('*')[0].replace(/\n/g, '')}`,
      repoName,
      subCommit: [],
    }))
    return (commits.length > 0 ? commitInfo : undefined)
  }) as unknown as CommitInfo[]

  const commitList = await Promise.all(commitPromises)
  const transformCommitList = commitList.filter(Boolean).flat().filter((c, index, arr) => {
    return arr.findIndex(item => item.desc === c.desc) === index && !/merge|release/g.test(c.desc.toLowerCase())
  })
  const result: CommitInfo[] = []

  transformCommitList.forEach((commit, index, arr) => {
    if (commit.past)
      return
    const date = commit.date
    const slice = arr.slice(index, arr.length)
    let hasSameDate = false

    slice.forEach((c) => {
      if (c === commit)
        return
      if (isSameDate(c.date, date)) {
        commit.subCommit.push({ ...c })
        c.past = true
        hasSameDate = true
      }
    })
    if (hasSameDate) {
      const cloneCommit = { ...commit }
      // @ts-expect-error
      delete cloneCommit.subCommit
      commit.subCommit.unshift(cloneCommit)
      commit.title = commit.repoName
    }
    result.push(commit)
  })

  const sortResult = result.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  writeFileSync(resolver('docs/.vitepress/theme/components/work.json'), JSON.stringify(sortResult, null, 2))

  return sortResult
}

generateMyself()
