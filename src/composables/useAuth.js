import { ref, readonly } from "vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const user = ref(null)
const isReady = ref(false)

let initialized = false

export function useAuth() {
  if (!initialized) {
    const auth = getAuth()
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
