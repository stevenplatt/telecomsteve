import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'

// Ported from the original Flask site's text_scramble.js
// credit: https://codepen.io/khalilliu/pen/RKvZKX
class TextScramble {
  el: HTMLElement
  chars = '!<>-_\\/[]{}—=+*^?#________'
  queue: { from: string; to: string; start: number; end: number; char?: string }[] = []
  frame = 0
  frameRequest = 0
  resolve: () => void = () => {}

  constructor(el: HTMLElement) {
    this.el = el
    this.update = this.update.bind(this)
  }

  setText(newText: string) {
    // `innerText` is undefined in non-rendering DOMs (e.g. jsdom); fall back safely.
    const oldText = this.el.innerText || ''
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise<void>((resolve) => (this.resolve = resolve))

    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = Math.floor(Math.random() * 40) + start
      this.queue.push({ from, to, start, end })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      const item = this.queue[i]
      const { from, to, start, end } = item
      let char = item.char

      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          item.char = char
        }
        output += `<span class='dud'>${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

const phrases = [
  'CI pipelines that pass, the first time',
  'Automate model training with Kubeflow',
  'Hyperscale with Kubernetes',
  'Repeatable testnets with Terraform',
  'Operate peer-to-peer without infrastructure',
]

export function HomePage() {
  const scrambleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrambleRef.current
    if (!el) return

    const fx = new TextScramble(el)
    let counter = 0
    let timeoutId: ReturnType<typeof setTimeout>
    let cancelled = false
    let running = false

    const next = () => {
      if (cancelled) return
      fx.setText(phrases[counter]).then(() => {
        if (cancelled) return
        timeoutId = setTimeout(next, 3500)
      })
      counter = (counter + 1) % phrases.length
    }

    // Kick off the loop exactly once, as soon as the tab is visible.
    // (requestAnimationFrame is paused while a tab is hidden, so if the page
    // loads in a background tab we start the moment it becomes visible.)
    const start = () => {
      if (cancelled || running || document.visibilityState !== "visible") return
      running = true
      next()
    }

    start()
    document.addEventListener("visibilitychange", start)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      cancelAnimationFrame(fx.frameRequest)
      document.removeEventListener("visibilitychange", start)
    }
  }, [])

  return (
    <Box
      ref={scrambleRef}
      className="text-scramble"
      color="#3498db"
      fontWeight="100"
      fontSize={{ base: '24px', lg: '48px' }}
      lineHeight={{ base: '45px', lg: '60px' }}
      textAlign="center"
      // Only take 90% of the width on mobile, and wrap even mid-scramble (when
      // spaces are replaced by random chars) so the line never overflows the page.
      w={{ base: '90%', lg: 'auto' }}
      maxW="100%"
      overflowWrap="anywhere"
    />
  )
}
