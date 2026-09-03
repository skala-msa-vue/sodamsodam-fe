import { onMounted, onUnmounted, ref } from 'vue'

export const AUTOPLAY_INTERVAL_MS = 5500

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function nextCardInTrack(track) {
  if (!track) return
  const card = track.querySelector(':scope > *')
  if (!card) return

  const styles = getComputedStyle(track)
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
  const step = card.getBoundingClientRect().width + gap
  const maxScroll = track.scrollWidth - track.clientWidth
  const atEnd = track.scrollLeft >= maxScroll - 12

  track.scrollTo({
    left: atEnd ? 0 : track.scrollLeft + step,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
  })
}

export function useAutoplay(tick, { interval = AUTOPLAY_INTERVAL_MS } = {}) {
  const paused = ref(false)
  let hoverPaused = false
  let timer = 0
  let visible = true
  let observer

  function stop() {
    if (timer) {
      window.clearInterval(timer)
      timer = 0
    }
  }

  function play() {
    stop()
    if (prefersReducedMotion() || paused.value || hoverPaused || !visible) return
    timer = window.setInterval(tick, interval)
  }

  function pause() {
    paused.value = true
    stop()
  }

  function resume() {
    paused.value = false
    play()
  }

  function pauseHover() {
    hoverPaused = true
    stop()
  }

  function resumeHover() {
    hoverPaused = false
    play()
  }

  function toggle() {
    if (paused.value) resume()
    else pause()
  }

  function observe(el) {
    observer?.disconnect()
    if (!el) return
    observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) play()
        else stop()
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
  }

  function onVisibility() {
    if (document.hidden) stop()
    else play()
  }

  onMounted(() => {
    play()
    document.addEventListener('visibilitychange', onVisibility)
  })

  onUnmounted(() => {
    stop()
    observer?.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
  })

  return { paused, pause, resume, pauseHover, resumeHover, toggle, observe, restart: play }
}
