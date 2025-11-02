<template>
  <div ref="horizontalRef" class="project-container">
    <div
      class="project horizontal-slide"
      v-for="(
        { title, picture, stack, context, recap, githubLink }, index
      ) in projectData"
      :key="title"
    >
      <div class="project-background">
        <img :src="resolveImg('img', picture)" :alt="title" />
        <div class="gradient-overlay"></div>
      </div>

      <div class="content-wrapper">
        <div class="project-bottom-left">
          <Tag class="project-stack" :stack="stack" />
        </div>

        <div class="project-right">
          <div class="project-header">
            <span class="context-tag">{{ context }}</span>
            <h1 class="project-title">
              <span class="highlight">{{
                title.toUpperCase().split(' ')[0]
              }}</span>
              {{ title.toUpperCase().split(' ').slice(1).join(' ') }}
            </h1>
            <p class="project-description">{{ recap }}</p>
          </div>

          <div class="cta-section">
            <a :href="githubLink" target="_blank" class="cta-button">
              <PhGithubLogo :size="32" weight="bold" />
            </a>

            <div class="slide-indicators">
              <span
                v-for="i in projectData.length"
                :key="i"
                :class="['dot', { active: i === index + 1 }]"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhGithubLogo } from '@phosphor-icons/vue'

import { useResolveImg } from '../composables/useResolveImg'
const { resolveImg } = useResolveImg()

import projectData from '../assets/data/projectInfos.json'
import Tag from './ProjectTag.vue'
</script>

<style scoped>
.project-container {
  display: flex;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  overflow-x: hidden;
}

.horizontal-slide {
  min-width: 100vw;
  max-width: 100vw;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  flex-grow: 0;
  position: relative;
}

.project {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.project-background {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.project-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
  transition: transform 0.3s ease;
}

.project:hover .project-background img {
  transform: scale(1.02);
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
}

.project-bottom-left {
  position: absolute;
  bottom: 3rem;
  left: 3rem;
}

.project-stack {
  align-self: flex-start;
}

.project-right {
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.project-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.context-tag {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
}

.project-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -1px;
}

.highlight {
  color: #a78bfa;
  display: inline-block;
}

.project-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.cta-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.cta-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--main-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(167, 139, 250, 0.4);
}

.cta-button:hover {
  transform: scale(1.1);
  box-shadow: 0 15px 40px rgba(167, 139, 250, 0.6);
}

.slide-indicators {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.dot.active {
  background: #a78bfa;
  width: 24px;
  border-radius: 4px;
}

@media (max-width: 1024px) {
  .content-wrapper {
    padding: 2rem;
  }

  .project-right {
    position: relative;
    right: 0;
    top: 0;
    transform: none;
    margin-top: auto;
    max-width: 100%;
  }

  .project-bottom-left {
    bottom: 2rem;
    left: 2rem;
  }
}

@media (max-width: 768px) {
  .project-title {
    font-size: 1.75rem;
  }

  .cta-button {
    width: 60px;
    height: 60px;
  }
}
</style>
