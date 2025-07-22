<template>
  <div>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="メールアドレス" />
      <input v-model="password" type="password" placeholder="パスワード" />
      <button type="submit">ログイン</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { auth } from "@/firebaseConfig.js"
import { signInWithEmailAndPassword } from "firebase/auth"
import { ref } from "vue"

const email = ref("")
const password = ref("")
const message = ref("")

const login = async () => {
  try {
    const result = await signInWithEmailAndPassword(auth, email.value, password.value)
    if (!result.user.emailVerified) {
      message.value = "メール確認が済んでいません"
    } else {
      message.value = "ログインしました"
    }
  } catch (err) {
    message.value = `ログインに失敗しました: ${err.message}`
  }
}
</script>
