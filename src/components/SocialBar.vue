<template>
  <div class="social-bar">
    <div class="social-bar-container">
      <button
        class="social-button btn-linkedin"
        @click="handleMail"
        aria-label="LinkedIn"
      >
        <PhLinkedinLogo :size="22" />
      </button>

      <div class="divider"></div>

      <button
        class="social-button btn-message"
        @click="handleMessage"
        aria-label="Messages"
      >
        <svg viewBox="0 0 24 24">
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhLinkedinLogo } from '@phosphor-icons/vue'

const handleMail = () => {}

const handleMessage = () => {}
</script>

<style scoped>
.social-bar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 40px;
  border-radius: 40px;

  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px) saturate(180%);
  -webkit-backdrop-filter: blur(15px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);

  transition: all 0.3s ease;
}

.social-bar:hover {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
}

.social-bar-container {
  display: flex;
  align-items: center;
  gap: 24px;
}
.social-button {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.social-button svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.social-button:hover {
  transform: scale(1.1);
  color: #fff;
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

.btn-linkedin {
  color: #0a66c2;
  background: rgba(10, 102, 194, 0.15);
}

.btn-linkedin:hover {
  background: rgba(10, 102, 194, 0.25);
  box-shadow: 0 4px 20px rgba(10, 102, 194, 0.4);
}

.btn-message {
  color: #a78bfa;
  background: rgba(167, 139, 250, 0.15);
}

.btn-message:hover {
  background: rgba(167, 139, 250, 0.25);
  box-shadow: 0 4px 20px rgba(167, 139, 250, 0.5);
}

.divider {
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.25);
}

@media (max-width: 768px) {
  .social-bar {
    padding: 10px 24px;
  }

  .social-button {
    width: 42px;
    height: 42px;
  }

  .divider {
    height: 24px;
  }
}
</style>
