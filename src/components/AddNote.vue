<script setup>
import { ref } from "vue"
import { db, auth } from "@/firebaseConfig"
import { collection, addDoc } from "firebase/firestore"

const note = ref("")

const saveNote = async () => {
  const user = auth.currentUser
  if (!user) {
    alert("ログインしてください")
    return
  }

  await addDoc(collection(db, "users", user.uid, "notes"), {
    content: note.value,
    createdAt: new Date().toISOString(),
  })

  note.value = ""
  alert("保存しました！")
}
</script>

<template>
  <div>
    <input v-model="note" placeholder="メモを書く" />
    <button @click="saveNote">保存</button>
  </div>
</template>
