import type { Component } from 'vue'

export interface SocialLink {
  label: string
  url: string
  size: number
  icon: string | Component
}
