import { nextTick } from 'vue'

export async function useSidebar(isShow: any, updatedHeaders: any) {
  async function useSidebar() {
    await nextTick()
    if (!isShow.value)
      return

    const group = document.querySelector('.nav .group')
    group?.setAttribute('style', 'display: none')
  }
  async function setSidebar() {
    await nextTick()
    const group = document.querySelector('.nav .group')
    group?.removeAttribute('style')
  }

  function useTitle() {
    document.querySelectorAll<HTMLHeadingElement>('h1, h2, h3').forEach((el) => {
      if (el.textContent && el.id) {
        const title = el.textContent

        updatedHeaders.value.push({
          level: Number(el.tagName[1]),
          title: title.replace(/\s+#\s*$/, ''),
          link: `#${el.id}`,
          active: false,
        })
      }
    })
    updatedHeaders.value = updatedHeaders.value.filter((item: any, index: any, arr: any) => {
      return arr.findIndex((i: any) => i.title === item.title) === index
    })
  }

  function removeTitle() {
    updatedHeaders.value.length = 0
  }

  if (isShow.value) {
    await useSidebar()
    useTitle()
    await initActiveAnchor()
  }
  else {
    await setSidebar()
    removeTitle()
  }

  function changeActive(url: string) {
    updatedHeaders.value = updatedHeaders.value.map((i: any) => {
      if (decodeURI(url).includes(i.link)) {
        return {
          ...i,
          active: true,
        }
      }

      return {
        ...i,
        active: false,
      }
    })
  }

  async function initActiveAnchor() {
    await nextTick()
    if (!updatedHeaders.value.length)
      return

    const top = window.scrollY
    const anchor = document.querySelector('.header-anchor') as HTMLAnchorElement
    const anchorTop = anchor.getBoundingClientRect().top

    if (top < anchorTop)
      updatedHeaders.value[0].active = true
  }

  function handleHash(e: any) {
    const url = e.newURL?.split('#')[1]
    changeActive(url)
  }

  let activeIndex = 0
  let _lastActiveIndex = 0
  const anchor = document.querySelector('.header-anchor') as HTMLAnchorElement

  function handleScroll() {
    const top = window.scrollY
    const anchorTop = anchor.getBoundingClientRect().top

    if (top < anchorTop) {
      updatedHeaders.value[0].active = true

      if (updatedHeaders.value.length >= 2)
        updatedHeaders.value[1].active = false
      return
    }

    const anchors = [].slice.call(document.querySelectorAll('.header-anchor')) as any as [HTMLAnchorElement]

    for (let index = 0; index < anchors.length; index++) {
      const top = anchors[index].getBoundingClientRect().top

      if (top <= 0) {
        activeIndex = index + 1
        updatedHeaders.value[index].active = false
      }
    }

    if (_lastActiveIndex !== activeIndex) {
      if (_lastActiveIndex <= updatedHeaders.value.length - 1) {
        updatedHeaders.value[_lastActiveIndex].active = false
        _lastActiveIndex = activeIndex
      }
    }

    if (activeIndex <= updatedHeaders.value.length - 1) {
      updatedHeaders.value[activeIndex].active = true

      if (activeIndex >= 1)
        updatedHeaders.value[activeIndex - 1].active = false
    }
  }

  window.addEventListener('hashchange', handleHash)
  window.addEventListener('scroll', handleScroll)

  const removeAll = async () => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('hashchange', handleHash)
    await setSidebar()
    removeTitle()
  }

  return {
    removeAll,
  }
}
