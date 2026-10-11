<script setup lang="ts">
// Тёмная форма из макета «Анкета» (Карьера). Используется и для резюме, и для обратной связи.
// Отправка — POST multipart/form-data на адрес из NUXT_PUBLIC_FORM_ENDPOINT
// (свой обработчик, Formspree, amoCRM-вебхук и т. п.). Пока адрес не задан, форма
// честно сообщает, что отправка не настроена, и предлагает позвонить.
import { company, offices, telHref } from '~/data/site'

type Field = 'name' | 'lastName' | 'phone' | 'email' | 'message' | 'file'

const props = withDefaults(defineProps<{
  title: string
  fields?: Field[]
  /** тема обращения — уходит скрытым полем */
  topic?: string
  messageLabel?: string
  submitLabel?: string
}>(), {
  fields: () => ['name', 'phone', 'email', 'message'],
  messageLabel: 'Дополнительная информация',
  submitLabel: 'Отправить',
})
const emit = defineEmits<{ sent: [] }>()

const { formEndpoint } = useRuntimeConfig().public
const has = (f: Field) => props.fields.includes(f)
const uid = useId()
const id = (f: string) => `${uid}-${f}`

const fileName = ref('')
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const error = ref('')
const phone = offices[0]!.phones[0]!

function onFile(e: Event) {
  fileName.value = (e.target as HTMLInputElement).files?.[0]?.name || ''
}

async function submit(e: Event) {
  const form = e.target as HTMLFormElement
  if (!formEndpoint) {
    status.value = 'error'
    error.value = `Онлайн-отправка пока не подключена. Позвоните нам: ${phone} или напишите на ${company.email}`
    return
  }
  status.value = 'sending'
  try {
    await $fetch(formEndpoint as string, { method: 'POST', body: new FormData(form) })
    status.value = 'sent'
    form.reset()
    fileName.value = ''
    emit('sent')
  }
  catch {
    status.value = 'error'
    error.value = `Не удалось отправить. Попробуйте ещё раз или позвоните: ${phone}`
  }
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <h2 class="form__title">{{ title }}</h2>

    <p v-if="status === 'sent'" class="form__done" role="status">
      Спасибо! Заявка отправлена, мы свяжемся с вами в ближайшее время.
    </p>

    <template v-else>
      <input v-if="topic" type="hidden" name="topic" :value="topic">

      <div v-if="has('name')" class="form__field">
        <label :for="id('name')">Ваше имя <span class="req">*</span></label>
        <input :id="id('name')" name="name" type="text" autocomplete="given-name" required>
      </div>
      <div v-if="has('lastName')" class="form__field">
        <label :for="id('lastName')">Ваша фамилия <span class="req">*</span></label>
        <input :id="id('lastName')" name="lastName" type="text" autocomplete="family-name" required>
      </div>
      <div v-if="has('phone')" class="form__field">
        <label :for="id('phone')">Телефон <span class="req">*</span></label>
        <input :id="id('phone')" name="phone" type="tel" autocomplete="tel" inputmode="tel" pattern="[0-9+()\- ]{6,}" required>
      </div>
      <div v-if="has('email')" class="form__field">
        <label :for="id('email')">E-mail</label>
        <input :id="id('email')" name="email" type="email" autocomplete="email">
      </div>
      <div v-if="has('message')" class="form__field">
        <label :for="id('message')">{{ messageLabel }}</label>
        <textarea :id="id('message')" name="message" rows="4" />
      </div>
      <div v-if="has('file')" class="form__field">
        <span class="form__label">Файл с резюме</span>
        <label class="form__file">
          <input type="file" name="file" accept=".pdf,.doc,.docx,.rtf,.odt" class="visually-hidden" @change="onFile">
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M17.5 10.3 9.7 18a5 5 0 0 1-7-7L10.4 3.3a3.3 3.3 0 0 1 4.7 4.7L7.4 15.7a1.7 1.7 0 0 1-2.4-2.4l7-7" />
          </svg>
          <span>{{ fileName || 'Прикрепить файл' }}</span>
        </label>
      </div>

      <label class="form__consent">
        <input type="checkbox" name="consent" required>
        <span>
          Согласен на обработку персональных данных в соответствии с
          <NuxtLink to="/politika-konfidencialnosti" target="_blank">политикой конфиденциальности</NuxtLink>
        </span>
      </label>

      <p v-if="status === 'error'" class="form__error" role="alert">
        {{ error }}
        <a :href="telHref(phone)">Позвонить</a>
      </p>

      <AppButton type="submit" :arrow="false" class="form__submit">
        {{ status === 'sending' ? 'Отправляем…' : submitLabel }}
      </AppButton>
    </template>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--white);
}
.form__title {
  margin-bottom: 8px;
  font-size: clamp(24px, 1.76vw, 30px);
  font-weight: 700;
  line-height: 1.3;
}
.form__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form__field label,
.form__label {
  font-size: var(--fs-caption);
  line-height: 20px;
  color: rgba(255, 255, 255, 0.7);
}
.req {
  color: #e0343f;
}
.form input:not([type='checkbox'], [type='file']),
.form textarea,
.form__file {
  width: 100%;
  min-height: 60px;
  padding: 16px 20px;
  font: inherit;
  font-size: 16px;
  color: var(--white);
  background: var(--black);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}
.form textarea {
  min-height: 120px;
  resize: vertical;
}
.form input:not([type='checkbox'], [type='file']):focus,
.form textarea:focus {
  background: #2a2a2a;
  border-color: var(--green);
}
.form__file {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
}
.form__file:hover,
.form__file:focus-within {
  border-color: var(--green);
}
.form__file span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form__consent {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: var(--fs-caption);
  line-height: 20px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}
.form__consent input {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  margin: 1px 0 0;
  accent-color: var(--green);
}
.form__consent a {
  color: var(--white);
}
.form__error {
  padding: 12px 16px;
  font-size: var(--fs-caption);
  line-height: 20px;
  background: rgba(224, 52, 63, 0.15);
  border-left: 3px solid #e0343f;
}
.form__error a {
  color: var(--green);
}
.form__done {
  font-size: var(--fs-text3);
  line-height: 1.67;
}
.form__submit {
  align-self: flex-start;
  margin-top: 8px;
}
</style>
