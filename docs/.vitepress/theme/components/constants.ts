import postsJson from './myself-work.json'
import workJson from './work.json'

export interface Post {
  path?: string
  title: string
  place?: string
  date: string
  lang?: string
  desc?: string
  platform?: string
  duration?: string
  recording?: string
  radio?: boolean
  video?: boolean
  inperson?: boolean
  redirect?: string
  author?: string
  repoName?: string
  subCommit?: Post[]
}

export const posts = postsJson as Post[]

export const workPost = workJson as Post[]
