import { gsap } from 'gsap'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $gsap: typeof gsap
  }
}
