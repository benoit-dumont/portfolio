<template>
  <div class="tag-container">
    <div class="tags">
      <div
        class="tag"
        v-for="(item, index) in visibleStack"
        :key="item + '-' + index"
        :style="{
          marginLeft:
            showAll || hiddenCount === 0 || stack.length <= 3
              ? '0'
              : index !== 0
                ? '-5px'
                : '0',
        }"
      >
        <img :src="resolveImg('stack', item.name)" :alt="item.name" />
      </div>

      <div
        v-if="hiddenCount > 0 && !showAll"
        class="tag more"
        :style="{
          marginLeft: visibleStack.length && stack.length > 3 ? '-5px' : '0',
        }"
      >
        +{{ hiddenCount }}
      </div>

      <transition name="fade">
        <div v-if="showAll" class="extra-tags">
          <div class="tag" v-for="item in hiddenStack" :key="'extra-' + item">
            <img :src="resolveImg('stack', item.name)" :alt="item.name" />
          </div>
        </div>
      </transition>
    </div>

    <div
      v-if="hiddenCount > 0 && !showAll"
      class="label"
      @click="toggleShowAll"
    >
      Voir plus
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { useResolveImg } from '../composables/useResolveImg'
const { resolveImg } = useResolveImg()

interface Props {
  stack: Array<{ name: string; type: string }>
}

const props = defineProps<Props>()

const showAll = ref(false)

const visibleStack = computed(() => props.stack.slice(0, 2))
const hiddenStack = computed(() => props.stack.slice(2))
const hiddenCount = computed(() => hiddenStack.value.length)

const toggleShowAll = () => {
  showAll.value = true
}
</script>

<style scoped>
.tag-container {
  justify-content: center;
  position: absolute;
  z-index: 100;
  bottom: 2dvh;
  left: 2dvh;
  padding: 0.6rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f1f1f1;
  border-radius: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.tags,
.tag-container,
.extra-tags {
  display: flex;
  align-items: center;
  gap: 5px;
}

.tag {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.tag.more {
  background-color: rgba(47, 47, 49, 0.8);
  color: #f1f1f1;
  font-size: 0.9rem;
  font-weight: 600;
}

.label {
  font-size: 0.85rem;
  color: rgba(207, 207, 207, 0.9);
  white-space: nowrap;
  margin-left: 0.6rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.label:hover {
  color: #a78bfa;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
