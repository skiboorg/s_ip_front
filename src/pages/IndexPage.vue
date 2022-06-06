<template>
  <q-page class="flex column items-center justify-center">
    <q-card style="width: 400px; max-width: 100vw;">
      <q-card-section >
        <p class="text-grey text-body1 text-weight-bold text-center">Вход</p>
        <q-form v-if="!vars.recovery_email_mode" @submit="loginAction" class="auth-form">
          <q-input
            autofocus
            v-model="loginData.email"
            label="Ваш E-mail*"
            color="primary"
            outlined
            dense
            @update:model-value="emailToLowercase('email')"
            lazy-rules
            :rules="[
              val => val && val.length > 0 || 'Это обязательное поле',
              val => vars.email_re.test(String(val)) || 'Введен не корректный адрес E-Mail'
              ]"/><!--    email      -->
          <q-input
            class="col-12 col-md-8"
            :type="vars.isPwd ? 'password' : 'text'"
            v-model="loginData.password"
            label="Пароль*"
            outlined
            dense
            color="primary"
            lazy-rules
            :rules="[val => val !== null && val !== '' || 'Это обязательное поле' ]"
          >
            <template v-slot:append>
              <q-icon
                :name="vars.isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="vars.isPwd = !vars.isPwd"
              />
            </template>
          </q-input>
          <div class="text-center q-mb-lg">
            <q-btn no-caps  color="primary" class="max-width" unelevated
                   :loading="vars.is_loading" type="submit" label="Вход" />
          </div>

        </q-form>
        <div v-if="!vars.recovery_email_mode" class="flex q-gutter-md  justify-center">
          <p class="text-center cursor-pointer text-caption q-mb-none text-weight-thin text-grey"
             @click="vars.recovery_email=loginData.email, vars.recovery_email_mode=!vars.recovery_email_mode">Забыли пароль?</p>
          <!--          <p class="text-center cursor-pointer q-mb-none text-caption text-weight-thin text-grey"-->
          <!--             @click="components_store.toggle_login_modal(),components_store.toggle_register_modal()">Нет аккаунта?</p>-->
        </div>

        <div v-if="vars.recovery_email_mode" class="recovery-password q-mt-lg">
          <p class="text-caption text-weight-thin text-grey">Для сброса пароля введите email, указанный при регистрации. Новый пароль будет выслан на эту же почту</p>
          <q-form @submit="recoveryAction">
            <q-input

              label="Ваш E-mail*"
              color="primary"
              outlined

              dense
              v-model="vars.recovery_email"
              @update:model-value="emailToLowercase('recovery_email')"
              lazy-rules
              :rules="[
              val => val && val.length > 0 || 'Это обязательное поле',
              val => vars.email_re.test(String(val)) || 'Введен не корректный адрес E-Mail'
              ]"/><!--    email      -->
            <div class="text-center">
              <q-btn no-caps  color="primary" class="max-width q-mb-lg" unelevated
                     :loading="vars.is_loading" type="submit" label="Сбросить пароль" />
              <div class="flex q-gutter-md  justify-center">
                <p class="text-center cursor-pointer text-caption q-mb-none text-weight-thin text-grey"
                   @click="vars.recovery_email_mode=!vars.recovery_email_mode">Назад</p>

              </div>
            </div>
          </q-form>

        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>

import { ref } from 'vue'

import {useAuthStore} from "stores/auth"
import {api} from "boot/axios";
import {useNotify} from "src/helpers/notify";
import {useRouter} from "vue-router"


const auth_store = useAuthStore()
const notify = useNotify
const router = useRouter()

let vars = ref({
  email_re:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  is_loading:false,
  isPwd: true,
  recovery_email_mode:false,
  recovery_email:null,
})

let loginData = ref({
  email: null,
  password: null,
})

const emailToLowercase = (type) => {
  type === 'email' ? loginData.value.email = loginData.value.email.toLowerCase() : null
  type === 'recovery_email' ? vars.value.recovery_email = vars.value.recovery_email.toLowerCase() : null
}

const loginAction = async () => {
  await auth_store.loginUser(loginData.value)
}

const recoveryAction = async () => {
  vars.value.is_loading = !vars.value.is_loading
  await api.post('/api/user/recover_password',{email:vars.value.recovery_email})
  notify('positive','Новый пароль выслан на указанную почту')
  vars.value.is_loading = !vars.value.is_loading
}
</script>
