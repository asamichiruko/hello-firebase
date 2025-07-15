<script setup>
import AddNote from "@/components/AddNote.vue"
import LoginButton from "@/components/LoginButton.vue"
import LogoutButton from "@/components/LogoutButton.vue"
import NoteList from "@/components/NoteList.vue"
</script>

<template>
  <LoginButton />
  <LogoutButton />
  <AddNote />
  <NoteList />
</template>

<style scoped></style>
