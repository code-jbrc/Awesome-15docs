<script setup lang="ts">
import axios from 'axios'
import { NButton, NInput, NScrollbar, NSpace, NTag } from 'naive-ui'
import { computed, onMounted, ref, watch } from 'vue'

const inputLocalKey = ref<string>('')
const localKey = ref<string>('')
function getApiKey() {
  const apiKey = localStorage.getItem('weatherApiKey')
  if (apiKey)
    localKey.value = apiKey
}
onMounted(() => {
  getApiKey()
})

const isLocalKey = computed(() => !!localKey.value)
function initApiKey() {
  if (inputLocalKey.value) {
    localStorage.setItem('weatherApiKey', inputLocalKey.value)
    getApiKey()
  }
}
const cityId = ref('')
const cityData = ref<any>()
async function initCityOpts(val: string) {
  const { data } = await axios.get(`https://api.seniverse.com/v3/location/search.json?key=${localKey.value}&q=${val}`)
  const { results } = data
  cityData.value = results
}
watch(cityId, async (val) => {
  await initCityOpts(val)
})
const cityName = ref<string>('')
function initCityName(val: string) {
  cityName.value = val
  createTag(val)
}
interface TagArr {
  name: string
  url: string
  key: number
}
const tagArr = ref<TagArr[]>([])
function createTag(cityName: string) {
  tagArr.value = [{
    name: `查询${cityName}天气实况`,
    url: `https://api.seniverse.com/v3/weather/now.json?key=${localKey.value}&location=${cityName}&language=zh-Hans&unit=c`,
    key: 1,
  }, {
    name: `查询${cityName}整点实况`,
    url: `https://api.seniverse.com/v3/weather/station/now.json?key=${localKey.value}&location=${cityName}&language=zh-Hans&unit=c`,
    key: 2,
  }, {
    name: `查询${cityName}未来五天天气实况`,
    url: `https://api.seniverse.com/v3/weather/daily.json?key=${localKey.value}&location=${cityName}&language=zh-Hans&unit=c&start=0&days=5`,
    key: 3,
  }]
  // 查询天气实况
  // 查询整点实况
  // 查询未来几天天气实况
}
const logData = ref<any>()
const currentTag = ref<number>()
async function injectUrl(tag: TagArr) {
  const { url, key } = tag
  try {
    const { data } = await axios.get(url)
    if (key === 1) {
      const { results } = data
      const { now } = results[0]
      const { temperature, text } = now
      logData.value = `现在${cityName.value}的温度为${temperature}℃,天气${text}`
    }
    else if (key === 3) {
      const { results } = data
      const { daily } = results[0]
      logData.value = daily.reduce((pre: any, cur: any) => {
        const { date, high, low, text_day, text_night, wind_direction } = cur
        pre += `<p>${date},最高气温${high},最低气温${low},日间天气${text_day},夜间天气${text_night},风向${wind_direction}</p><br>`
        return pre
      }, '')
    }
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-2">
      <span v-if="!isLocalKey" class="whitespace-nowrap">请前往<a href="https://www.seniverse.com/dashboard">心知天气获取私钥</a>（本网页不会上传你的私钥）</span>
      <div v-if="!isLocalKey" class="flex items-center gap-2">
        <span class="whitespace-nowrap">Api私钥：</span>
        <NInput
          v-model:value="inputLocalKey"
          type="password"
          show-password-on="mousedown"
          placeholder="请输入私钥"
          width="120"
        />
        <NButton @click="initApiKey">
          初始化
        </NButton>
      </div>
      <div class="relative flex items-center flex-col gap-1">
        <NInput
          v-model:value="cityId"
          placeholder="请输入城市"
          :maxlength="8"
          width="120"
        />
        <NScrollbar style="max-height: 200px;">
          <div class="w-full flex flex-col">
            <div v-for="(d, idx) in cityData" :key="idx" class="p-2 hover:bg-[#f3f3f5] d-transistion w-full h-[36px] cursor-pointer" @click="initCityName(d.name)">
              {{ d.name }}
            </div>
          </div>
        </NScrollbar>
      </div>
      <NSpace v-if="tagArr.length > 0">
        <NTag v-for="(tag, idx) in tagArr" :key="idx" size="large" class="cursor-pointer" :type="currentTag === idx ? 'success' : 'default'" @click="currentTag = idx, injectUrl(tag)">
          {{ tag.name }}
        </NTag>
      </NSpace>
      <div v-if="logData" v-html="logData" />
    </div>
  </div>
</template>
