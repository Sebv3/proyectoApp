import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { User } from '../models/user.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, query, where, collection, getDocs, updateDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private authStateChanged = new Subject<void>();  // Evento de cambio de sesión
  authStateChanged$ = this.authStateChanged.asObservable();

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
  utilsSvc = inject(UtilsService);
  db = inject(AngularFirestore);





  // AUNTENTICACIÓN

  getAuth() {
    return getAuth();
  }

  signIn(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
  }

  signUp(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
  }


  updateUser(user: any) {
    const auth = getAuth();
    return updateProfile(auth.currentUser, user)
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }


  signOut() {
    getAuth().signOut().then(() => {
        localStorage.removeItem('user'); // Borra el usuario
        this.utilsSvc.routerLink('/auth'); // Redirige a la página de autenticación
    });
}

  getAuthState() {
    return this.auth.authState
  }



  //BASE DE DATOS

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();

  }

  
  async checkEmailExists(email: string): Promise<boolean> {
    const usersRef = collection(getFirestore(), 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
  
    return !querySnapshot.empty;
  }



  async uploadImage(path: string, data_url:string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    }) 
  }

  //== CRUD DE TAREAS ==// 

  getSubcollection(path: string, subcollectionName: string) {
    return this.db.doc(path).collection(subcollectionName).valueChanges( {idField: 'id'} )
  }

  AddToSubcollection(path: string, subcollectionName: string, object: any) {
    return this.db.doc(path).collection(subcollectionName).add(object)
  } 

  updateDocument2(path: string, object: any) {
    return this.db.doc(path).update(object);
  }
  
  deleteDocument(path: string) {
    return this.db.doc(path).delete();
  }

  async getUserTasks(): Promise<Task[]> {
    const user = getAuth().currentUser;
    if (!user) throw new Error('No user authenticated');

    const tasksRef = collection(getFirestore(), 'tasks');
    const q = query(tasksRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => doc.data() as Task);
  }


}
