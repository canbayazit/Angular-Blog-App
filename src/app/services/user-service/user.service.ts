import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { from, map, mergeMap, skip, take, toArray } from 'rxjs';
import IUser from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}
  getUserByPaginator(page:number,pageSize:number){
    const collectionInstance = collection(this.firestore, 'users');
    return collectionData(collectionInstance).pipe(
      map((users) => {
        return  users.slice((page - 1) * pageSize, page * pageSize);
      })
    );
  }
  getUsers() {
    const collectionInstance = collection(this.firestore, 'users');
    return collectionData(collectionInstance); // bu fonksiyon observable dönüyor
  }
  getUserById(id: number) {
    const collectionInstance = collection(this.firestore, 'users');
    return collectionData(collectionInstance).pipe(
      map((documents) =>
        documents.filter((doc) => (doc['user_id']===id))
      )
    );
  }
}
