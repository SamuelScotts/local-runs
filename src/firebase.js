import firebase from '@firebase/app';
import '@firebase/auth'
import '@firebase/firestore'

// firebase init
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY ,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
}
firebase.default.initializeApp(firebaseConfig)

// utils
const auth = firebase.default.auth()
const db = firebase.default.firestore()

// collection references
const usersCollection = db.collection('users')


// export utils/refs
export {
  db,
  auth,
  usersCollection
}