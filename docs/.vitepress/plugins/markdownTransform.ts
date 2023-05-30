interface PageInfo {
  readTime: number | string
  words: number | string
}

export function getWords(content: string): RegExpMatchArray | null {
  return content.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu)
}

export function getChinese(content: string): RegExpMatchArray | null {
  return content.match(/[\u4E00-\u9FD5]/gu)
}

export function getEnWordCount(content: string): number {
  return getWords(content)?.reduce<number>(
    (accumulator, word) =>
      accumulator + (word.trim() === '' ? 0 : word.trim().split(/\s+/u).length),
    0,
  ) || 0
}

export function getCnWordCount(content: string): number {
  return getChinese(content)?.length || 0
}

export function getWordNumber(content: string): number {
  return getEnWordCount(content) + getCnWordCount(content)
}

export function getReadingTime(content: string,
  cnWordPerMinute = 350,
  enwordPerMinute = 160): PageInfo {
  const count = getWordNumber(content || '')
  const words = count >= 1000 ? `${Math.round(count / 100) / 10}k` : count

  const enWord = getEnWordCount(content)
  const cnWord = getCnWordCount(content)

  const readingTime = cnWord / cnWordPerMinute + enWord / enwordPerMinute
  const readTime = readingTime < 1 ? '1' : parseInt(`${readingTime}`, 10)

  return {
    readTime,
    words,
  }
}
export function replacer(code: string, value: string, key: string, insert: 'head' | 'tail' | 'none' = 'none') {
  const START = `<!--${key}_STARTS-->`
  const END = `<!--${key}_ENDS-->`
  const regex = new RegExp(`${START}[\\s\\S]*?${END}`, 'im')

  const target = value ? `${START}\n${value}\n${END}` : `${START}${END}`

  if (!code.match(regex)) {
    if (insert === 'none')
      return code
    else if (insert === 'head')
      return `${target}\n\n${code}`
    else
      return `${code}\n\n${target}`
  }

  return code.replace(regex, target)
}

export function MarkdownTransform(): any {
  return {
    name: 'chodocs-md-transform',
    enforce: 'pre',
    async transform(code: any, id: any) {
      if (!id.match(/\.md\b/))
        return null
      // convert links to relative
      code = code.replace(/https?:\/\/awesome-15docs.netlify\.app\//g, '/')
      const [_name, i] = id.split('/').slice(-2)

      // cut index.md
      if (_name === 'docs' && i === 'index.md')
        return code

      //   const { footer } = await getDocsMarkdown()
      //   code = replacer(code, footer, 'FOOTER', 'tail')
      const { readTime, words } = getReadingTime(code)
      code = code
        .replace(/(#\s.+?\n)/, `$1\n\n<PageInfo readTime="${readTime}" words="${words}"/>\n`)
      return code
    },
  }
}
