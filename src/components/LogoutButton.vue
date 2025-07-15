<template>
  <div>
    <button @click="logout" class="logout-button">
      ログアウト
    </button>
  </div>
</template>

<script setup>
import { getAuth, signOut } from 'firebase/auth'

const logout = async () => {
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
