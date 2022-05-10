import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseServiceService {

  constructor(private auth: AngularFireAuth){ }

  async login(email: string, password: string) {
    try {
      return await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert('This operation could not be performed');
      console.log('This operation could not be performed. Error: ' + error);
      return null;
    }
  }
  async loginGoogle() {
    try {
      return await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      alert('This operation could not be performed with Google. Error: ' + error);
      console.log('This operation could not be performed with Google. Error: ' + error);
      return null;
    }
  }
  /*async registro(email: string, password: string) {
    try {
      return await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert('No se ha podido realizar el registro de usuario.');
      console.log('No se ha podido realizar el registro de usuario. Error: ' + error);
      return null;
    }
  }*/
  async logOut(){
    this.auth.signOut();
  }
  getInfoUsuarioLoggeado(){
    return this.auth.authState;
  }
  async updateUsuario(nombre: string){
    var user = firebase.auth().onAuthStateChanged(function(user){
      if(user){
        console.log(user);
        user.updateProfile({
          displayName: nombre
        })
      }else{
        console.log('User is not logued');
      }
    })
  }

}
