<template>
  <div class="stack-container">
    <div class="stack-grid">
      <div class="stack-category">
        <div class="category-header">
          <div class="header-line"></div>
          <h2 class="category-title">Front-end</h2>
        </div>
        <div class="stack-items">
          <div
            class="stack-item"
            v-for="(item, index) in frontStacks"
            :key="index"
          >
            <div class="stack-icon-wrapper">
              <img :src="resolveImg('stack', item)" :alt="item" />
            </div>
            <p class="stack-name">{{ item }}</p>
          </div>
        </div>
      </div>

      <div class="stack-category">
        <div class="category-header">
          <div class="header-line"></div>
          <h2 class="category-title">Back-end</h2>
        </div>
        <div class="stack-items">
          <div
            class="stack-item"
            v-for="(item, index) in backStacks"
            :key="index"
          >
            <div class="stack-icon-wrapper">
              <img :src="resolveImg('stack', item)" :alt="item" />
            </div>
            <p class="stack-name">{{ item }}</p>
          </div>
        </div>
      </div>

      <div class="stack-category">
        <div class="category-header">
          <div class="header-line"></div>
          <h2 class="category-title">Docs & Tools</h2>
        </div>
        <div class="stack-items">
          <div
            class="stack-item"
            v-for="(item, index) in toolsStacks"
            :key="index"
          >
            <div class="stack-icon-wrapper">
              <img :src="resolveImg('stack', item)" :alt="item" />
            </div>
            <p class="stack-name">{{ item }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import projectData from '../assets/data/projectInfos.json'
import type { Stack, StacksByType, StackTypes } from '../types'

import { useResolveImg } from '../composables/useResolveImg'
const { resolveImg } = useResolveImg()

const allStacks: Stack[] = projectData.flatMap((project) =>
  project.stack.map((tech) => ({
    name: tech.name,
    type: tech.type as StackTypes,
  })),
)

const uniqueStacksMap = new Map<string, Stack>()
allStacks.forEach((tech) => {
  const key = `${tech.name}-${tech.type}`
  if (!uniqueStacksMap.has(key)) uniqueStacksMap.set(key, tech)
})

const uniqueStacks = [...uniqueStacksMap.values()].map((tech) => ({
  name: tech.name.charAt(0).toUpperCase() + tech.name.slice(1),
  type: tech.type,
}))

const stacksByType: StacksByType = {
  Front: [],
  Back: [],
  Tools: [],
}

uniqueStacks.forEach((tech) => {
  stacksByType[tech.type].push(tech.name)
})

const frontStacks = ref(stacksByType.Front)
const backStacks = ref(stacksByType.Back)
const toolsStacks = ref(stacksByType.Tools)
</script>

<style scoped>
.stack-container {
  min-height: 100vh;
  background: var(--main-background-color);
  padding: 4rem;
  position: relative;
  overflow: hidden;
}

.stack-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 100%;
  margin: 0 auto;
}

.stack-category {
  backdrop-filter: blur(20px);
  background: var(--main-container-background-color);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.stack-category:hover {
  background: rgba(255, 255, 255, 0.04);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.header-line {
  width: 3px;
  height: 30px;
  background: linear-gradient(180deg, #a78bfa 0%, transparent 100%);
  border-radius: 2px;
}

.category-title {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.stack-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-start;
}

.stack-item {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0.75rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  flex: 0 0 auto;
  width: 95px;
}

.stack-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(167, 139, 250, 0.1) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.stack-item:hover::before {
  opacity: 1;
}

.stack-item:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(167, 139, 250, 0.2);
}

.stack-icon-wrapper {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.stack-item:hover .stack-icon-wrapper {
  background: rgba(167, 139, 250, 0.1);
  transform: scale(1.1);
}

.stack-icon-wrapper img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: brightness(0.9) saturate(0.8);
  transition: filter 0.3s ease;
}

.stack-item:hover .stack-icon-wrapper img {
  filter: brightness(1.2) saturate(1.1);
}

.stack-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.02em;
  text-align: center;
  margin: 0;
  transition: color 0.3s ease;
  word-break: break-word;
  line-height: 1.2;
}

.stack-item:hover .stack-name {
  color: rgba(167, 139, 250, 1);
}

@media (max-width: 768px) {
  .stack-container {
    padding: 2rem;
  }

  .stack-grid {
    gap: 1.5rem;
  }

  .stack-category {
    padding: 1rem;
  }

  .category-header {
    margin-bottom: 1rem;
  }

  .stack-items {
    gap: 0.5rem;
  }
}
</style>
