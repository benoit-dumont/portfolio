<template>
  <div class="social-burger-container">
    <button
      @click="toggleMenu"
      class="burger-button"
      :class="{ active: isOpen }"
    >
      <svg
        v-if="!isOpen"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <div class="social-menu">
      <a
        v-for="(social, index) in socialLinks"
        :key="social.label"
        :href="social.url"
        :target="isExternalLink(social.url) ? '_blank' : '_self'"
        :rel="isExternalLink(social.url) ? 'noopener noreferrer' : undefined"
        class="social-icon"
        :class="{ visible: isOpen }"
        :style="{
          transitionDelay: isOpen
            ? `${index * 0.05}s`
            : `${(socialLinks.length - index - 1) * 0.05}s`,
          transform: isOpen
            ? 'translateX(0) scale(1)'
            : 'translateX(80px) scale(0)',
        }"
        :title="social.label"
        @click="handleLinkClick($event, social.url)"
      >
        <component :is="social.icon" :size="social.size" />
      </a>
    </div>

    <transition name="fade">
      <div v-if="isOpen" class="overlay" @click="toggleMenu"></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { PhLinkedinLogo, PhGithubLogo, PhEnvelope } from '@phosphor-icons/vue'
import { ref } from 'vue'

import type { SocialLink } from '../types/'

const isOpen = ref<boolean>(false)

const toggleMenu = (): void => {
  isOpen.value = !isOpen.value
}

const isExternalLink = (url: string): boolean => {
  return (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('mailto:')
  )
}

const handleLinkClick = (event: Event, url: string): void => {
  if (url.startsWith('#')) {
    event.preventDefault()
    const targetId = url.substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      isOpen.value = false
    }
  }
}

const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/benoit-dumont',
    size: 24,
    icon: PhLinkedinLogo,
  },
  {
    label: 'GitHub',
    url: 'https://github.com/benoit-dumont',
    size: 24,
    icon: PhGithubLogo,
  },
  {
    label: 'Contact',
    url: '#contact',
    size: 24,
    icon: PhEnvelope,
  },
]
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.social-burger-container {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.burger-button {
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
  animation: fadeIn 0.3s ease;
  position: relative;
  z-index: 2;
}

.burger-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(167, 139, 250, 0.6);
  background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
}

.burger-button.active {
  background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
}

.social-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  right: 4.5rem;
  top: 50%;
  transform: translateY(-50%);
}

.social-icon {
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
  text-decoration: none;
  opacity: 0;
}

.social-icon.visible {
  opacity: 1;
}

.social-icon:hover {
  transform: translateY(-5px) scale(1.05) !important;
  box-shadow: 0 6px 20px rgba(167, 139, 250, 0.6);
  background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
