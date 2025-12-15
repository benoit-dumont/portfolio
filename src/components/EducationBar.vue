<template>
  <div class="timeline-container">
    <h2 class="section-title">FORMATION</h2>
    <div class="timeline">
      <div class="timeline-line"></div>
      <div
        class="timeline-item"
        v-for="(education, index) in educations"
        :key="index"
      >
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-date">{{ education.year }}</div>
          <h3 class="timeline-title">{{ education.degree }}</h3>
          <p class="timeline-school">{{ education.school }}</p>
          <p class="timeline-description" v-if="education.description">
            {{ education.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Education } from '../types'

const educations = ref<Education[]>([
  {
    year: 'Août 2022 -> Juillet 2024',
    degree: 'Bac+4',
    school: 'OpenClassrooms',
  },
  {
    year: 'Août 2021 -> Avril 2022',
    degree: 'Bac+2',
    school: 'OpenClassrooms',
  },
  {
    year: 'Octobre 2020 -> Février 2021',
    degree: 'Certification',
    school: 'OpenClassrooms',
  },
])
</script>

<style scoped>
.timeline-container {
  background: var(--main-background-color);
  padding: 3rem 4rem;
  position: relative;
  flex-grow: 1;
  flex-basis: 0;
  width: 100%;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--main-color);
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.1em;
  text-shadow: 0 0 20px rgba(167, 139, 250, 0.5);
  padding-bottom: 2vh;
}

.timeline {
  display: flex;
  gap: 2rem;
  position: relative;
  padding: 2rem 0;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  align-items: stretch;
}

.timeline-line {
  position: absolute;
  top: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1000px;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #a78bfa 10%,
    #a78bfa 90%,
    transparent 100%
  );
}

.timeline-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  flex-shrink: 0;
  height: 100%;
  flex: 1;
}

.timeline-dot {
  position: relative;
  width: 20px;
  height: 20px;
  background: #a78bfa;
  border-radius: 50%;
  border: 4px solid var(--main-background-color);
  box-shadow: 0 0 20px rgba(167, 139, 250, 0.5);
  z-index: 2;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.3);
  box-shadow: 0 0 30px rgba(167, 139, 250, 0.8);
}

.timeline-content {
  backdrop-filter: blur(20px);
  background: var(--main-container-background-color);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}

.timeline-content:hover {
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(167, 139, 250, 0.2);
}

.timeline-date {
  font-size: 0.875rem;
  font-weight: 700;
  color: #a78bfa;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.timeline-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.timeline-school {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 0.75rem 0;
}

.timeline-description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .timeline-container {
    padding: 2rem 1rem;
  }

  .section-title {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .timeline {
    gap: 2rem;
  }

  .timeline-item {
    min-width: 240px;
    max-width: 280px;
  }

  .timeline-content {
    padding: 1rem;
  }
}
</style>
