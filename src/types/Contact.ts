export interface FormData {
  prenom: string
  nom: string
  email: string
  raison: string
  message: string
}

export interface FormErrors {
  prenom: string
  nom: string
  email: string
  raison: string
  message: string
}

export interface FormTouched {
  prenom: boolean
  nom: boolean
  email: boolean
  raison: boolean
  message: boolean
}

export type FormFieldName = keyof FormData

export interface Web3FormsConfig {
  accessKey: string
  apiUrl: string
}

export interface Web3FormsResponse {
  success: boolean
  message?: string
}

export interface Web3FormsPayload {
  access_key: string
  name: string
  email: string
  subject: string
  message: string
  raison: string
  from_name?: string
  'h-captcha-response'?: string
}

export interface HCaptchaConfig {
  siteKey: string
}
