import {
  initializeApp
} from 'firebase/app'

import {
  getAuth
} from 'firebase/auth'

import {
  getFirestore
} from 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyDlwsD9UIPxZP9Y6CnqlDp3Qw2ZJAbn-fk",

  authDomain: "vivero-estanislaoo.firebaseapp.com",

  projectId: "vivero-estanislaoo",

  storageBucket: "vivero-estanislaoo.firebasestorage.app",

  messagingSenderId: "955290266370",

  appId: "1:955290266370:web:171b76c2ded98be94fb01b",

  measurementId: "G-TK3CWNTCH1"

}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)