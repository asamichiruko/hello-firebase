<script setup>
import { ref, onMounted } from "vue"
import { auth } from "@/firebaseConfig"
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"

const user = ref(null)

const login = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      user.value = result.user
    })
    .catch((error) => {
      console.error("ログイン失敗: ", error)
    })
}

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u
  })
})
</script>

<template>
  <div>
    <button @click="login">Google でログイン</button>
    <div v-if="user">ログイン中: {{ user.displayName }}</div>
  </div>
</template>
