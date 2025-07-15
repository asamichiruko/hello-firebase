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
import { ref, watch, onUnmounted } from "vue"
import { db } from "@/firebaseConfig"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { useAuth } from "@/composables/useAuth.js"

const { user, isReady } = useAuth()
const notes = ref([])
let unsubscribe = null

watch(
  () => isReady.value && user.value?.uid,
  (shouldWatch, _, onCleanup) => {
    // 前の監視を解除
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }

    // 認証状態が有効なときのみ監視開始
    if (shouldWatch) {
      const q = query(
        collection(db, 'users', user.value.uid, 'notes'),
        orderBy('createdAt', 'desc')
      )

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        notes.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      })

      // Vue の watch 終了時に監視解除
      onCleanup(() => {
        if (unsubscribe) {
          unsubscribe()
          unsubscribe = null
        }
      })
    } else {
      notes.value = []
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe() // メモリリークを防ぐ
    unsubscribe = null
  }
})
</script>
