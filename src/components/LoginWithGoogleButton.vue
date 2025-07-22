<script setup>
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useAuth } from "@/composables/useAuth.js"
import { auth } from "@/firebaseConfig.js"

const { user } = useAuth()

const login = async () => {
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
    alert("ログインしました")
  } catch(error) {
    console.error("ログインに失敗しました: ", error)
    alert("ログインに失敗しました")
  }
}
</script>

<template>
  <div>
    <button @click="login">Google でログイン</button>
    <div v-if="user">ログイン中: {{ user.displayName }}</div>
  </div>
</template>
