<script setup lang="ts">
import dayjs from 'dayjs'
import type { Post } from './constants'

const {
  posts,
} = defineProps<{ posts: Post[] }>()

function formatDate(d: string | Date, onlyDate = true) {
  const date = dayjs(d)
  if (onlyDate || date.year() === dayjs().year())
    return date.format('MMM D')
  return date.format('MMM D, YYYY')
}

function formatTime(d: string | Date) {
  return dayjs(d).format('h:mm A')
}

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isFuture = (a?: Date | string | number) => a && new Date(a) > new Date()
const isSameYear = (a?: Date | string | number, b?: Date | string | number) => a && b && getYear(a) === getYear(b)
function isSameGroup(a: Post, b?: Post) {
  return (isFuture(a.date) === isFuture(b?.date)) && isSameYear(a.date, b?.date)
}

function getGroupName(p: Post) {
  if (isFuture(p.date))
    return 'Upcoming'
  return getYear(p.date)
}
</script>

<template>
  <ul>
    <template v-if="!posts.length">
      <div py2 op50>
        { nothing here yet }
      </div>
    </template>

    <template v-for="route, idx in posts" :key="route.path">
      <div
        v-if="!isSameGroup(route, posts[idx - 1])"
        select-none relative h20 pointer-events-none slide-enter
        :style="{
          '--enter-stage': idx - 2,
          '--enter-step': '60ms',
        }"
      >
        <span text-8em color-transparent absolute left--3rem top-4rem font-bold text-stroke-2 text-stroke-hex-aaa op10>{{ getGroupName(route) }}</span>
      </div>
      <div
        class="slide-enter"
        :style="{
          '--enter-stage': idx,
          '--enter-step': '60ms',
        }"
      >
        <Component
          :is="route.subCommit?.length ? 'div' : 'a'"
          :href="route.path || undefined"
          class="item block font-normal mb-6 mt-2 no-underline link VPLink" :class="{
            // ['op90']: !route.subCommit.length,
          }"
        >
          <li class="no-underline" flex="~ col md:row gap-2 md:items-center">
            <div class="title leading-1.2em" flex="~ gap-2 wrap">
              <span
                v-if="route.lang === 'zh'"
                align-middle flex-none
                class="text-xs bg-zinc:15 text-zinc5 rounded px-1 py-0.5 ml--12 mr2 my-auto hidden md:block"
              >中文</span>
              <span align-middle>{{ route.title }}</span>
              <span
                v-if="route.redirect"
                align-middle op50 flex-none text-xs ml--1.5
                i-carbon-arrow-up-right
                title="External"
              />
            </div>

            <div flex="~ gap-2 items-center">
              <span
                v-if="route.inperson"
                align-middle op50 flex-none
                i-ri:group-2-line
                title="In person"
              />
              <span
                v-if="route.recording || route.video"
                align-middle op50 flex-none
                i-ri:film-line
                title="Provided in video"
              />
              <span
                v-if="route.radio"
                align-middle op50 flex-none
                i-ri:radio-line
                title="Provided in radio"
              />

              <span text-sm op50 ws-nowrap>
                {{ formatDate(route.date, true) }}
              </span>
              <span v-if="route.duration" text-sm op40 ws-nowrap>· {{ route.duration }}</span>
              <span v-if="route.platform" text-sm op40 ws-nowrap>· {{ route.platform }}</span>
              <span v-if="route.place" text-sm op40 ws-nowrap md:hidden>· {{ route.place }}</span>
              <span
                v-if="route.lang === 'zh'"
                align-middle flex-none
                class="text-xs bg-zinc:15 text-zinc5 rounded px-1 py-0.5 my-auto md:hidden"
              >中文</span>
            </div>
          </li>
          <div v-if="route.place" op50 text-sm hidden mt--1 md:block>
            {{ route.place }}
          </div>
          <a v-for="commit, i in route.subCommit" :key="i" :href="commit.path" op50 text-sm mt-0 md:block>
            {{ `${commit.title} - ${formatTime(commit.date)}` }}
          </a>
        </Component>
      </div>
    </template>
  </ul>
</template>
