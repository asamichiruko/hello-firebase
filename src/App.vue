<script setup>
import AddNote from "@/components/AddNote.vue"
import LoginWithGoogleButton from "@/components/LoginWithGoogleButton.vue"
import LogoutButton from "@/components/LogoutButton.vue"
import NoteList from "@/components/NoteList.vue"
import LoginWithEmailForm from "./components/LoginWithEmailForm.vue"
import SignUpForm from "./components/SignUpForm.vue"
</script>

<template>
  <h2>サインアップ</h2>
  <SignUpForm />
  <h2>ログイン</h2>
  <h3>メールアドレスでログイン</h3>
  <LoginWithEmailForm />
  <h3>Googleでログイン</h3>
  <LoginWithGoogleButton />
  <h3>ログアウト</h3>
  <LogoutButton />
  <h2>ノート</h2>
  <AddNote />
  <NoteList />
</template>

<style scoped></style>
