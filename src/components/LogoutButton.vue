<template>
  <div>
    <button @click="logout" class="logout-button">ログアウト</button>
  </div>
</template>

<script setup>
import { signOut } from "firebase/auth"
import { useAuth } from "@/composables/useAuth.js"
import { auth } from "@/firebaseConfig.js"

const { user } = useAuth()

const logout = async () => {
  if (!user.value) return
  try {
    await signOut(auth)
    alert("ログアウトしました")
  } catch (error) {
    console.error("ログアウトに失敗しました:", error)
    alert("ログアウトに失敗しました")
  }
}
</script>
