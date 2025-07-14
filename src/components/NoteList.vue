<template>
  <div>
    <h2>保存されたメモ一覧</h2>
    <ul>
      <li v-for="note in notes" :key="note.id">
        {{ note.content }} <br />
        <small>{{ note.createdAt }}</small>
      </li>
    </ul>
    <p v-if="notes.length === 0">まだメモがありません。</p>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue"
import { db, auth } from "@/firebaseConfig"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

const notes = ref([])
let unsubscribe = null

onAuthStateChanged(auth, (user) => {
  if (user) {
    const notesRef = collection(db, "users", user.uid, "notes")
    const q = query(notesRef, orderBy("createdAt", "desc"))

    unsubscribe = onSnapshot(q, (querySnapshot) => {
      notes.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    })
  } else {
    notes.value = []
    if (unsubscribe) {
      unsubscribe() // ユーザー切り替え時に解除
    }
  }
})

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe() // メモリリークを防ぐ
  }
})
</script>
