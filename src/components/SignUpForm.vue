<template>
  <div>
    <form @submit.prevent="signUp">
      <div><input v-model="email" placeholder="メールアドレス" required /></div>
      <div><input v-model="password" type="password" placeholder="パスワード" required /></div>
      <div>パスワードは6文字以上で設定してください</div>
      <div><button type="submit">登録</button></div>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { auth } from "@/firebaseConfig"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { ref } from "vue"

const email = ref("")
const password = ref("")
const message = ref("")

const signUp = async () => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email.value, password.value)
    await sendEmailVerification(result.user)
    message.value = "登録確認メールを送信しました。"
  } catch (err) {
    message.value = `登録に失敗しました: ${err.message}`
  }
}
</script>
