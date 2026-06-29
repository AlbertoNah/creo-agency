'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    let mouseX = -100
    let mouseY = -100
    let outerX = -100
    let outerY = -100

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(inner, {
        x: mouseX - 3,
        y: mouseY - 3,
        duration: 0,
      })
    }

    const animate = () => {
      outerX += (mouseX - outerX) * 0.1
      outerY += (mouseY - outerY) * 0.1
      gsap.set(outer, { x: outerX - 21, y: outerY - 21 })
      requestAnimationFrame(animate)
    }

    const raf = requestAnimationFrame(animate)
    window.addEventListener('mousemove', onMouseMove)

    const onMouseEnterHover = () => {
      outer.classList.add('is-hovering')
    }
    const onMouseLeaveHover = () => {
      outer.classList.remove('is-hovering')
      outer.classList.remove('is-text')
    }
    const onMouseEnterText = () => {
      outer.classList.add('is-text')
    }

    const addListeners = () => {
      const links = document.querySelectorAll('a, button, [data-cursor="hover"]')
      const texts = document.querySelectorAll('[data-cursor="text"]')

      links.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterHover)
        el.addEventListener('mouseleave', onMouseLeaveHover)
      })
      texts.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterText)
        el.addEventListener('mouseleave', onMouseLeaveHover)
      })
    }

    const timer = setTimeout(addListeners, 500)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <div ref={outerRef} className="cursor-outer" aria-hidden="true" />
      <div ref={innerRef} className="cursor-inner" aria-hidden="true" />
    </>
  )
}
