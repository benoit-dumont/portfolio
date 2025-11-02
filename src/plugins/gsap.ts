import type { App } from 'vue'
import { gsap } from 'gsap'

export const gsapPlugin = {
  install(app: App): void {
    app.config.globalProperties.$gsap = gsap
  },
}

export function useGSAP() {
  return gsap
}
