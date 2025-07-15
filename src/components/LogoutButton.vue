<template>
  <div>
    <button @click="logout" class="logout-button">
      ログアウト
    </button>
  </div>
</template>

<script setup>
import { getAuth, signOut } from 'firebase/auth'
import { useAuth } from "@/composables/useAuth.js"

const { user } = useAuth()

const logout = async () => {
  if (!user.value) return
  try {
    const auth = getAuth()
    await signOut(auth)
    alert('ログアウトしました')
  } catch (error) {
    console.error('ログアウトに失敗しました:', error)
    alert('ログアウトに失敗しました')
  }
}
</script>
