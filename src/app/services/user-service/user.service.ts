import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
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

  async updateUser(updatedComment: any) {
    try {
      // Query for the document with the matching comment_id
      const q = query(collection(this.firestore, 'users'), where('user_id', '==', updatedComment.user_id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Get the first document (assuming there is only one with the same comment_id)
        const docSnapshot = querySnapshot.docs[0];
        const commentDocRef = doc(this.firestore, 'users', docSnapshot.id);

        // Update the document with the new data
        await updateDoc(commentDocRef, updatedComment);

        return true;
      } else {
        // Handle the case where no document with the matching comment_id is found
        console.error('Comment not found with user_id:', updatedComment.user_id);
        return false;
      }
    } catch (error) {
      // Handle any errors that may occur during the update process
      console.error('Error updating user:', error);
      return false;
    }
  }
}
