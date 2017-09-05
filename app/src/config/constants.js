import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCkwTGdXREhGA2Wi_OghbUEF4d-nlSXVYI",
  authDomain: "budget-eb32d.firebaseapp.com",
  databaseURL: "https://budget-eb32d.firebaseio.com/",
  storageBucket: "budget-eb32d.appspot.com",
  messagingSenderId: "975485670646"
}

firebase.initializeApp(config)

export const database = firebase.database()
export const firebaseAuth = firebase.auth
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const constants = {
  LAST_YEAR: 2016,
}
