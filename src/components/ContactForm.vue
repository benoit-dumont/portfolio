<template>
  <div class="contact-container">
    <div class="contact-card">
      <div class="card-header">
        <h2 class="title">CONTACT</h2>
        <p class="subtitle">Prenons contact pour discuter de votre projet</p>
      </div>

      <form @submit.prevent="handleSubmit" class="contact-form" novalidate>
        <div class="form-row">
          <div
            class="form-group"
            :class="{ 'has-error': errors.prenom && touched.prenom }"
          >
            <label for="prenom">Prénom</label>
            <div class="input-wrapper">
              <input
                id="prenom"
                v-model="formData.prenom"
                type="text"
                placeholder="Votre prénom"
                @blur="touchField('prenom')"
                @input="validateField('prenom')"
                :class="{ error: errors.prenom && touched.prenom }"
              />
              <span class="icon">👤</span>
            </div>
            <span
              v-if="errors.prenom && touched.prenom"
              class="error-message"
              >{{ errors.prenom }}</span
            >
          </div>

          <div
            class="form-group"
            :class="{ 'has-error': errors.nom && touched.nom }"
          >
            <label for="nom">Nom</label>
            <div class="input-wrapper">
              <input
                id="nom"
                v-model="formData.nom"
                type="text"
                placeholder="Votre nom"
                @blur="touchField('nom')"
                @input="validateField('nom')"
                :class="{ error: errors.nom && touched.nom }"
              />
              <span class="icon">👤</span>
            </div>
            <span v-if="errors.nom && touched.nom" class="error-message">{{
              errors.nom
            }}</span>
          </div>
        </div>

        <div
          class="form-group"
          :class="{ 'has-error': errors.email && touched.email }"
        >
          <label for="email">Email</label>
          <div class="input-wrapper">
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="votre.email@exemple.com"
              @blur="touchField('email')"
              @input="validateField('email')"
              :class="{ error: errors.email && touched.email }"
            />
            <span class="icon">✉️</span>
          </div>
          <span v-if="errors.email && touched.email" class="error-message">{{
            errors.email
          }}</span>
        </div>

        <div
          class="form-group"
          :class="{ 'has-error': errors.raison && touched.raison }"
        >
          <label for="raison">Raison du contact</label>
          <div class="input-wrapper">
            <select
              id="raison"
              v-model="formData.raison"
              @blur="touchField('raison')"
              @change="validateField('raison')"
              :class="{ error: errors.raison && touched.raison }"
            >
              <option value="">Sélectionnez une raison</option>
              <option value="recrutement">Opportunité de recrutement</option>
              <option value="collaboration">
                Proposition de collaboration
              </option>
              <option value="freelance">Mission freelance</option>
              <option value="information">Demande d'information</option>
              <option value="autre">Autre</option>
            </select>
            <span class="icon">📋</span>
          </div>
          <span v-if="errors.raison && touched.raison" class="error-message">{{
            errors.raison
          }}</span>
        </div>

        <div
          class="form-group"
          :class="{ 'has-error': errors.message && touched.message }"
        >
          <label for="message">Message</label>
          <div class="input-wrapper">
            <textarea
              id="message"
              v-model="formData.message"
              placeholder="Décrivez votre projet ou votre demande..."
              rows="6"
              @blur="touchField('message')"
              @input="validateField('message')"
              :class="{ error: errors.message && touched.message }"
            ></textarea>
            <span class="icon icon-textarea">💬</span>
          </div>
          <span
            v-if="errors.message && touched.message"
            class="error-message"
            >{{ errors.message }}</span
          >
        </div>

        <button
          type="submit"
          class="submit-btn"
          :disabled="!isFormValid || isSubmitting"
        >
          <span v-if="!isSubmitting && !isSubmitted">Envoyer le message</span>
          <span v-else-if="isSubmitting">Envoi en cours...</span>
          <span v-else>✓ Message envoyé</span>
        </button>

        <div v-if="isSubmitted" class="success-message">
          <span class="success-icon">✓</span>
          Merci pour votre message ! Je vous répondrai dans les plus brefs
          délais.
        </div>

        <div v-if="sendError" class="error-message-box">
          <span class="error-icon">⚠️</span>
          {{ sendError }}
        </div>

        <!-- hCaptcha -->
        <div class="captcha-wrapper">
          <VueHcaptcha
            ref="hcaptchaRef"
            :sitekey="HCAPTCHA_CONFIG.siteKey"
            @verify="onCaptchaVerify"
            @expire="onCaptchaExpire"
            @error="onCaptchaError"
            theme="dark"
          />
          <span v-if="captchaError" class="error-message captcha-error">
            {{ captchaError }}
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import type {
  Web3FormsConfig,
  FormData,
  FormErrors,
  FormTouched,
  FormFieldName,
  Web3FormsResponse,
  Web3FormsPayload,
  HCaptchaConfig,
} from '../types/Contact'

const WEB3FORMS_CONFIG: Web3FormsConfig = {
  accessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string,
  apiUrl: 'https://api.web3forms.com/submit',
}

const HCAPTCHA_CONFIG: HCaptchaConfig = {
  siteKey: import.meta.env.VITE_HCAPTCHA_SITE_KEY as string,
}

const formData = reactive<FormData>({
  prenom: '',
  nom: '',
  email: '',
  raison: '',
  message: '',
})

const errors = reactive<FormErrors>({
  prenom: '',
  nom: '',
  email: '',
  raison: '',
  message: '',
})

const touched = reactive<FormTouched>({
  prenom: false,
  nom: false,
  email: false,
  raison: false,
  message: false,
})

const isSubmitting = ref<boolean>(false)
const isSubmitted = ref<boolean>(false)
const sendError = ref<string>('')
const captchaToken = ref<string>('')
const captchaError = ref<string>('')
const hcaptchaRef = ref<InstanceType<typeof VueHcaptcha> | null>(null)

const patterns: Record<string, RegExp> = {
  nom: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
  prenom: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: /^(?=.*\S).{10,1000}$/,
}

const validateField = (fieldName: FormFieldName): void => {
  const value = formData[fieldName]

  switch (fieldName) {
    case 'prenom':
      if (!value) {
        errors.prenom = 'Le prénom est requis'
      } else if (!patterns.prenom.test(value)) {
        errors.prenom = 'Prénom invalide (2-50 caractères, lettres uniquement)'
      } else {
        errors.prenom = ''
      }
      break

    case 'nom':
      if (!value) {
        errors.nom = 'Le nom est requis'
      } else if (!patterns.nom.test(value)) {
        errors.nom = 'Nom invalide (2-50 caractères, lettres uniquement)'
      } else {
        errors.nom = ''
      }
      break

    case 'email':
      if (!value) {
        errors.email = "L'email est requis"
      } else if (!patterns.email.test(value)) {
        errors.email = "Format d'email invalide"
      } else {
        errors.email = ''
      }
      break

    case 'raison':
      if (!value) {
        errors.raison = 'Veuillez sélectionner une raison'
      } else {
        errors.raison = ''
      }
      break

    case 'message':
      if (!value) {
        errors.message = 'Le message est requis'
      } else if (!patterns.message.test(value)) {
        errors.message = 'Le message doit contenir entre 10 et 1000 caractères'
      } else {
        errors.message = ''
      }
      break
  }
}

const touchField = (fieldName: FormFieldName): void => {
  touched[fieldName] = true
  validateField(fieldName)
}

const isFormValid = computed((): boolean => {
  return (formData.prenom &&
    formData.nom &&
    formData.email &&
    formData.raison &&
    formData.message &&
    !errors.prenom &&
    !errors.nom &&
    !errors.email &&
    !errors.raison &&
    !errors.message) as boolean
})

const onCaptchaVerify = (token: string) => {
  captchaToken.value = token
  captchaError.value = ''
}

const onCaptchaExpire = () => {
  captchaToken.value = ''
  captchaError.value = 'Le captcha a expiré, veuillez le valider à nouveau'
}

const onCaptchaError = () => {
  captchaToken.value = ''
  captchaError.value = 'Erreur lors de la validation du captcha'
}

const handleSubmit = async (): Promise<void> => {
  ;(Object.keys(touched) as FormFieldName[]).forEach((key) => {
    touched[key] = true
    validateField(key)
  })

  if (!isFormValid.value) {
    return
  }

  if (!captchaToken.value) {
    captchaError.value = 'Veuillez valider le captcha'
    return
  }

  isSubmitting.value = true
  sendError.value = ''
  captchaError.value = ''

  try {
    if (!WEB3FORMS_CONFIG.accessKey) {
      throw new Error(
        "Veuillez configurer la variable d'environnement VITE_WEB3FORMS_ACCESS_KEY",
      )
    }

    const payload: Web3FormsPayload = {
      access_key: WEB3FORMS_CONFIG.accessKey,
      name: `${formData.prenom} ${formData.nom}`,
      email: formData.email,
      subject: `Nouveau contact : ${formData.raison}`,
      message: formData.message,
      raison: formData.raison,
      from_name: `${formData.prenom} ${formData.nom}`,
      'h-captcha-response': captchaToken.value,
    }

    const response = await fetch(WEB3FORMS_CONFIG.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result: Web3FormsResponse = await response.json()

    if (result.success) {
      console.log('Message envoyé avec succès')
      isSubmitted.value = true
      isSubmitting.value = false

      setTimeout(() => {
        ;(Object.keys(formData) as FormFieldName[]).forEach(
          (key) => (formData[key] = ''),
        )
        ;(Object.keys(touched) as FormFieldName[]).forEach(
          (key) => (touched[key] = false),
        )
        ;(Object.keys(errors) as FormFieldName[]).forEach(
          (key) => (errors[key] = ''),
        )
        isSubmitted.value = false
        captchaToken.value = ''
        hcaptchaRef.value?.reset()
      }, 5000)
    } else {
      throw new Error(result.message || "Erreur lors de l'envoi")
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error)
    isSubmitting.value = false

    if (error instanceof Error) {
      if (error.message.includes('configurer')) {
        sendError.value = error.message
      } else {
        sendError.value =
          "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
      }
    } else {
      sendError.value =
        "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
    }

    captchaToken.value = ''
    hcaptchaRef.value?.reset()

    setTimeout(() => {
      sendError.value = ''
    }, 5000)
  }
}
</script>

<style scoped>
.contact-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1d3f 0%, #212450 50%, #2a2d5f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  width: 100%;
}

.contact-card {
  background: var(--main-container-background-color);
  border-radius: 20px;
  padding: 3rem;
  max-width: 700px;
  width: 100%;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(167, 139, 250, 0.1);
  border: 1px solid rgba(167, 139, 250, 0.2);
  position: relative;
  overflow: hidden;
}

.contact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--main-color),
    transparent
  );
  animation: glow 3s ease-in-out infinite;
}

@keyframes glow {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.card-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--main-color);
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.1em;
  text-shadow: 0 0 20px rgba(167, 139, 250, 0.5);
}

.subtitle {
  color: #94a3b8;
  font-size: 1rem;
  margin: 0;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: #cbd5e1;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  opacity: 0.5;
  pointer-events: none;
}

.icon-textarea {
  top: 1rem;
  transform: none;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.875rem 3rem 0.875rem 1rem;
  background: rgba(33, 36, 80, 0.5);
  border: 1px solid rgba(167, 139, 250, 0.2);
  border-radius: 10px;
  color: #e2e8f0;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--main-color);
  background: rgba(33, 36, 80, 0.7);
  box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.1);
}

input::placeholder,
textarea::placeholder {
  color: #64748b;
}

select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23a78bfa' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 3rem;
}

textarea {
  resize: vertical;
  min-height: 120px;
  padding-right: 3rem;
}

.error {
  border-color: #ef4444 !important;
  background: rgba(239, 68, 68, 0.1) !important;
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: -0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.submit-btn {
  margin-top: 1rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--main-color) 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 20px rgba(167, 139, 250, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(167, 139, 250, 0.5);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 10px;
  padding: 1rem;
  color: #22c55e;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  animation: slideIn 0.3s ease;
}

.success-icon {
  font-size: 1.5rem;
}

.error-message-box {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 10px;
  padding: 1rem;
  color: #ef4444;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  animation: slideIn 0.3s ease;
}

.error-icon {
  font-size: 1.5rem;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.captcha-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.captcha-error {
  text-align: center;
}

@media (max-width: 640px) {
  .contact-card {
    padding: 2rem 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 2rem;
  }
}
</style>
