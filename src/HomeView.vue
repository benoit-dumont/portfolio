<template>
  <div ref="containerRef" class="container">
    <SocialBar />
    <section class="section-1">
      <h1>Section 1</h1>
      <p>Début du portfolio</p>
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span class="arrow">&#x2193;</span>
      </div>
    </section>

    <section class="section-2">
      <StackList />
    </section>

    <section ref="section3Ref" class="section-3">
      <ProjectList />
    </section>

    <section class="section-4">
      <ContactForm />
    </section>

    <button
      v-show="showScrollTop"
      @click="scrollToTop"
      class="scroll-to-top"
      aria-label="Retour en haut"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useGSAP } from './plugins/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectList from './components/ProjectList.vue'
import StackList from './components/StackList.vue'
import SocialBar from './components/SocialBar.vue'
import ContactForm from './components/ContactForm.vue'

// ==================== Configuration ====================
const SCROLL_DURATION = 600
const SCROLL_TOP_THRESHOLD = 300
const SCROLL_TOLERANCE = 100
const GSAP_INIT_DELAY = 100
const MIN_SLIDES_FOR_HORIZONTAL = 3

// ==================== GSAP Setup ====================
const gsap = useGSAP()
gsap.registerPlugin(ScrollTrigger)

// ==================== Refs ====================
const containerRef = ref<HTMLElement | null>(null)
const section3Ref = ref<HTMLElement | null>(null)
const showScrollTop = ref(false)

// ==================== State ====================
let isScrolling = false
let horizontalScrollTrigger: ScrollTrigger

// ==================== Utilitaires ====================
const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

const getSlides = (): HTMLElement[] => {
  return gsap.utils.toArray('.horizontal-slide') as HTMLElement[]
}

const calculateSectionPositions = () => {
  const section1Height = window.innerHeight
  const section2Height = window.innerHeight
  const section2Start = section1Height
  const section2End = section2Start + section2Height
  const section3Start = section2End
  const slides = getSlides()

  const hasHorizontalScroll = slides.length >= MIN_SLIDES_FOR_HORIZONTAL
  const horizontalScrollLength = hasHorizontalScroll
    ? (slides.length - 1) * window.innerWidth
    : 0

  const section3Height = horizontalScrollLength
  const section3End = section3Start + section3Height
  const section4Start = section3End + window.innerHeight

  return {
    section1Height,
    section2Start,
    section2End,
    section2Height,
    section3Start,
    section3End,
    section3Height,
    section4Start,
    horizontalScrollLength,
    hasHorizontalScroll,
  }
}

// ==================== Smooth Scroll ====================
const smoothScrollTo = (
  targetPosition: number,
  duration: number = SCROLL_DURATION,
) => {
  const startPosition = window.scrollY
  const distance = targetPosition - startPosition
  const startTime = performance.now()

  const scroll = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = easeInOutQuad(progress)

    window.scrollTo(0, startPosition + distance * ease)

    if (progress < 1) {
      requestAnimationFrame(scroll)
    } else {
      isScrolling = false
    }
  }

  requestAnimationFrame(scroll)
}

const scrollToTop = () => {
  isScrolling = true
  smoothScrollTo(0, SCROLL_DURATION)
}

// ==================== Gestion du Scroll ====================
const handleScroll = () => {
  showScrollTop.value = window.scrollY > SCROLL_TOP_THRESHOLD
}

const handleWheelNavigation = (
  scrollPosition: number,
  delta: number,
  positions: ReturnType<typeof calculateSectionPositions>,
) => {
  const {
    section2Start,
    section2End,
    section3Start,
    section3End,
    section4Start,
  } = positions

  // Section 1 -> Section 2
  if (scrollPosition < section2Start && delta > 0) {
    smoothScrollTo(section2Start, SCROLL_DURATION)
    return true
  }

  // Section 2 -> Section 1
  if (
    scrollPosition >= section2Start &&
    scrollPosition < section2Start + SCROLL_TOLERANCE &&
    delta < 0
  ) {
    smoothScrollTo(0, SCROLL_DURATION)
    return true
  }

  // Section 2 -> Section 3
  if (
    scrollPosition >= section2Start &&
    scrollPosition < section2End &&
    delta > 0
  ) {
    smoothScrollTo(section3Start, SCROLL_DURATION)
    return true
  }

  // Section 3 -> Section 2
  if (
    scrollPosition >= section3Start &&
    scrollPosition < section3Start + 200 &&
    delta < 0
  ) {
    const progress = horizontalScrollTrigger
      ? horizontalScrollTrigger.progress
      : 0
    if (progress < 0.1) {
      smoothScrollTo(section2Start, SCROLL_DURATION)
      return true
    }
  }

  // Section 3 -> Section 4
  if (scrollPosition >= section3End - 200 && delta > 0) {
    const progress = horizontalScrollTrigger
      ? horizontalScrollTrigger.progress
      : 0
    if (progress > 0.9) {
      smoothScrollTo(section4Start, SCROLL_DURATION)
      return true
    }
  }

  // Section 4 -> Section 3
  if (
    scrollPosition >= section4Start &&
    scrollPosition < section4Start + SCROLL_TOLERANCE &&
    delta < 0
  ) {
    smoothScrollTo(section3End - SCROLL_TOLERANCE, SCROLL_DURATION)
    return true
  }

  return false
}

const handleWheel = (e: WheelEvent) => {
  if (isScrolling) {
    e.preventDefault()
    return
  }

  const scrollPosition = window.scrollY
  const positions = calculateSectionPositions()
  const delta = e.deltaY

  const shouldPreventDefault = handleWheelNavigation(
    scrollPosition,
    delta,
    positions,
  )

  if (shouldPreventDefault) {
    e.preventDefault()
    isScrolling = true
  }
}

// ==================== GSAP Horizontal Scroll ====================
const initHorizontalScroll = () => {
  const horizontalContainer = document.querySelector(
    '.project-container',
  ) as HTMLElement

  if (!horizontalContainer || !section3Ref.value) {
    console.error('Elements requis non trouvés pour le scroll horizontal')
    return
  }

  ScrollTrigger.killAll()

  const slides = getSlides()

  if (slides.length === 0) {
    console.error('Aucun slide trouvé')
    return
  }

  const positions = calculateSectionPositions()
  const { horizontalScrollLength } = positions

  gsap.set(horizontalContainer, { x: 0 })

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section3Ref.value,
      pin: true,
      scrub: 0.5,
      start: 'top top',
      end: () => `+=${horizontalScrollLength}`,
      markers: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      snap: {
        snapTo: 1 / (slides.length - 1),
        duration: { min: 0.2, max: 0.5 },
        ease: 'power2.inOut',
      },
      onUpdate: (self) => {
        horizontalScrollTrigger = self
      },
    },
  })

  timeline.to(horizontalContainer, {
    x: -horizontalScrollLength,
    ease: 'none',
  })

  ScrollTrigger.refresh()
}

// ==================== Lifecycle Hooks ====================
onMounted(async () => {
  await nextTick()

  setTimeout(initHorizontalScroll, GSAP_INIT_DELAY)

  window.addEventListener('scroll', handleScroll)
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh()
    initHorizontalScroll()
  })
})

onBeforeUnmount(() => {
  ScrollTrigger.killAll()
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('resize', () => ScrollTrigger.refresh())
})
</script>

<style scoped>
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 0;
  cursor: default;
  animation: fadeInUp 3s ease-in-out;
}

.mouse {
  width: 28px;
  height: 45px;
  border: 2px solid #a78bfa;
  border-radius: 20px;
  position: relative;
}

.wheel {
  width: 6px;
  height: 6px;
  background: #a78bfa;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: wheelMove 1.6s linear infinite;
}

.arrow {
  margin-top: 10px;
  font-size: 1.4rem;
  color: #a78bfa;
  animation: bounce 1.6s infinite;
}

@keyframes wheelMove {
  0% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 12px);
  }
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: auto;
}

.container {
  width: 100%;
  overflow-x: hidden;
}

section {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.section-1 {
  background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
  color: white;
}

.section-2 {
  background: linear-gradient(135deg, #c084fc 0%, #a78bfa 100%);
  color: white;
}

.section-3 {
  background: #1a1a2e;
  overflow: hidden;
  padding: 0;
  height: 100vh;
  position: relative;
}

.section-4 {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

h1 {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

p {
  font-size: 1.5rem;
  opacity: 0.9;
}

.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(167, 139, 250, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.scroll-to-top:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(167, 139, 250, 0.6);
  background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
}

.scroll-to-top:active {
  transform: translateY(-2px);
}

.scroll-to-top svg {
  animation: bounce 2s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
