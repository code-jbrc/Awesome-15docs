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
}

export const posts: Post[] = [
  {
    title: 'Test',
    date: '2021-09-01',
  },
  {
    title: 'Test23',
    date: '2021-09-01',
  },
  {
    title: 'Test222',
    date: '2022-09-01',
  },
]
