import { ref, readonly } from "vue"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebaseConfig"

const user = ref(null)
const isReady = ref(false)

let initialized = false

export function useAuth() {
  if (!initialized) {
    onAuthStateChanged(auth, currentUser => {
      user.value = currentUser
      isReady.value = true
    })
    initialized = true
  }

  return {
    user: readonly(user),
    isReady: readonly(isReady),
  }
}
