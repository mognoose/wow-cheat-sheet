import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { config } from './firebase.config';

import {ref, onUnmounted } from 'vue';

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

const cheatsheets = db.collection('cheatsheets');


export const useLoadCheatsheets = () => {
    const cs = ref([])
    const close = cheatsheets.onSnapshot(snapshot => {
        cs.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}))
    })
    onUnmounted(close);
    return cs;
}

export const getCheatSheetByCode = async code => {
    const cs = await cheatsheets.doc(code).get();
    return cs.exists ? cs.data() : null;
}