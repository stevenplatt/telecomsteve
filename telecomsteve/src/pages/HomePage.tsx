import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { TextScramble, phrases } from './textScramble'

export function HomePage() {
  const scrambleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // The ref is attached before effects run, so it is never null here.
    const el = scrambleRef.current!

    const fx = new TextScramble(el)
    let counter = 0
    let timeoutId: ReturnType<typeof setTimeout>
    let cancelled = false
    let running = false

    // `next` only runs while the effect is live: it is invoked by `start`
    // below or by a timeout that cleanup clears. Only the promise callback
    // can fire after unmount, so that is where the `cancelled` guard lives.
    const next = () => {
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
      if (running || document.visibilityState !== 'visible') return
      running = true
      next()
    }

    start()
    document.addEventListener('visibilitychange', start)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      cancelAnimationFrame(fx.frameRequest)
      document.removeEventListener('visibilitychange', start)
    }
  }, [])

  return (
    <Box
      ref={scrambleRef}
      className="text-scramble"
      color="brand.blue"
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
