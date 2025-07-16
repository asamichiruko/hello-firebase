import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing"
import { setDoc, doc } from "firebase/firestore"
import fs from "fs"
import path from "path"

/* eslint-disable vitest/expect-expect */

const PROJECT_ID = "my-firebase-emulator"
const rulesPath = path.resolve("firestore.rules")

let testEnv

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: fs.readFileSync(rulesPath, "utf8"),
      host: "localhost",
      port: 8080
    }
  })
})

afterAll(async () => {
  await testEnv.cleanup()
})

test("未認証ユーザは書き込みできない", async () => {
  const context = testEnv.unauthenticatedContext()
  const db = context.firestore()
  const ref = doc(db, "users/anonUser/notes/note1")

  await assertFails(setDoc(ref, { content: "テスト" }))
})

test("認証ユーザは自分のノートに書き込める", async () => {
  const context = testEnv.authenticatedContext("user123")
  const db = context.firestore()
  const ref = doc(db, "users/user123/notes/note1")

  await assertSucceeds(setDoc(ref, { content: "OK" }))
})
