// Ported from the original Flask site's text_scramble.js
// credit: https://codepen.io/khalilliu/pen/RKvZKX
export class TextScramble {
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

export const phrases = [
  'CI pipelines that pass, the first time',
  'Automate model training with Kubeflow',
  'Hyperscale with Kubernetes',
  'Repeatable testnets with Terraform',
  'Operate peer-to-peer without infrastructure',
]
