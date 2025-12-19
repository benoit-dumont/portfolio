<template>
  <section class="greeting">
    <div class="content">
      <div class="avatar-container">
        <div class="avatar">
          <span class="avatar-text">👨‍💻</span>
        </div>
        <div class="status-indicator">
          <span class="status-dot"></span>
          <span class="status-text">Disponible</span>
        </div>
      </div>

      <h1 class="title">Bonjour, c'est moi Benoit</h1>

      <div class="message-container">
        <p class="subtitle">
          Développeur Web Fullstack passionné par la création d'expériences
          digitales exceptionnelles
        </p>
      </div>

      <div class="animated-text-container">
        <span class="prefix">🚀</span>
        <span class="animated-text" :key="currentText">
          {{ currentText }}
        </span>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ projectCount }}+</div>
          <div class="stat-label">Projets réalisés</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ experience }}+</div>
          <div class="stat-label">Années d'expérience</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ techCount }}+</div>
          <div class="stat-label">Technologies maîtrisées</div>
        </div>
      </div>

      <div class="cta-buttons">
        <button
          @click="scrollToSection(projectsSectionId)"
          class="btn btn-primary"
        >
          Voir mes projets
        </button>
        <button
          @click="scrollToSection(contactSectionId)"
          class="btn btn-secondary"
        >
          Me contacter
        </button>
      </div>
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span class="arrow">&#x2193;</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  projectsSectionId?: string
  contactSectionId?: string
}

withDefaults(defineProps<Props>(), {
  projectsSectionId: 'projects',
  contactSectionId: 'contact',
})

const texts = [
  'Créer des applications performantes',
  'Transformer vos idées en réalité',
  'Développer des solutions sur mesure',
  'Optimiser votre présence web',
]
const currentIndex = ref(0)
const currentText = ref(texts[0])
let intervalId: number

const projectCount = ref(20)
const experience = ref(3)
const techCount = ref(15)

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  intervalId = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % texts.length
    currentText.value = texts[currentIndex.value]
  }, 3000)
})

onUnmounted(() => clearInterval(intervalId))
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

.greeting {
  position: relative;
  background: #212450;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  color: white;
  padding: 4rem 2rem;
}

.greeting::before,
.greeting::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}

.greeting::before {
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(167, 139, 250, 0.2),
    transparent 70%
  );
  top: -150px;
  right: -150px;
  animation: float 10s ease-in-out infinite;
}

.greeting::after {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(51, 49, 103, 0.3), transparent 70%);
  bottom: -100px;
  left: -100px;
  animation: float 8s ease-in-out infinite reverse;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, -20px);
  }
}

.content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  animation: fadeIn 0.8s ease-in-out;
}

.avatar {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #333167, #212450);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #a78bfa;
  box-shadow: 0 0 30px rgba(167, 139, 250, 0.4);
  animation: pulse 2s ease-in-out infinite;
}

.avatar-text {
  font-size: 3.5rem;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 30px rgba(167, 139, 250, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 40px rgba(167, 139, 250, 0.6);
  }
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(51, 49, 103, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.status-dot {
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.status-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
}

.title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  animation: fadeIn 1s ease-in-out;
  letter-spacing: -0.5px;
}

.message-container {
  margin-bottom: 2rem;
  animation: fadeIn 1.2s ease-in-out;
}

.subtitle {
  font-size: 1.2rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.animated-text-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  min-height: 80px;
  position: relative;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.prefix {
  font-size: 1.8rem;
  animation: fadeIn 1.5s ease-in-out;
}

.animated-text {
  font-size: 1.6rem;
  font-weight: 600;
  background: linear-gradient(135deg, #a78bfa, #c4b5fd);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(167, 139, 250, 0.6));
  animation: slideDown 3s ease-in-out;
}

@keyframes slideDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  10%,
  85% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  animation: fadeIn 1.8s ease-in-out;
}

.stat-card {
  background: rgba(51, 49, 103, 0.3);
  padding: 1.5rem 1rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(167, 139, 250, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(167, 139, 250, 0.5);
  box-shadow: 0 10px 30px rgba(167, 139, 250, 0.2);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #a78bfa, #c4b5fd);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeIn 2s ease-in-out;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, #a78bfa, #8b5cf6);
  color: white;
  box-shadow: 0 4px 20px rgba(167, 139, 250, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(167, 139, 250, 0.5);
}

.btn-secondary {
  background: rgba(51, 49, 103, 0.5);
  color: white;
  border: 2px solid #a78bfa;
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(51, 49, 103, 0.8);
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .greeting {
    min-height: auto;
    padding: 3rem 1.5rem;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .avatar-text {
    font-size: 3rem;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .animated-text {
    font-size: 1.2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
  }
}
</style>
