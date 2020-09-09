import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDaBQbzhDCqcVVBxEhPHQ051MF-bxeqjyw',
  authDomain: 'diarysessions-blog.firebaseapp.com',
  databaseURL: 'https://diarysessions-blog.firebaseio.com',
  projectId: 'diarysessions-blog',
  storageBucket: 'diarysessions-blog.appspot.com',
  messagingSenderId: '516010216568',
  appId: '1:516010216568:web:06aa6ca0e4783febbff18d',
  measurementId: 'G-LTGWMCN4YH',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
