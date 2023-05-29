<script setup lang="ts">
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { ref, watch } from 'vue'
import { NCode, NInput } from 'naive-ui'
import jwtDecode from 'jwt-decode'

hljs.registerLanguage('javascript', javascript)
const JWTcode = ref<string>('')
const decoded = ref<any>()
function decodeJwt(val: string) {
  const d = jwtDecode(val)
  decoded.value = JSON.stringify(d)
}
watch(JWTcode, val => decodeJwt(val))
function createTestToken() {
  const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiYWRtaW4iOnRydWV9.R1PwZOwJPN5kORj2au83ggFm0sEGyfQ1w_s8ArXAm94'
  JWTcode.value = testToken
}
</script>

<template>
  <n-config-provider :hljs="hljs">
    <div class="flex flex-col gap-2">
      <NButton @click="createTestToken">
        生成测试Token
      </NButton>
      <NInput
        v-model:value="JWTcode"
        placeholder="请输入JWT TOKEN"
        width="120"
      />
      <template v-if="decoded">
        <span>解析结果：</span>
        <div style="overflow: auto">
          <n-space vertical :size="16">
            <NCode
              :code="decoded"
              language="javascript"
            />
          </n-space>
        </div>
      </template>
    </div>
  </n-config-provider>
</template>
