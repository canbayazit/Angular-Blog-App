import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private firestore: Firestore) {}
  getComments() {
    const collectionInstance = collection(this.firestore, 'comments');
    return collectionData(collectionInstance); // bu fonksiyon observable dönüyor
  }
  getAllCommentByPostId(id:number){
    const collectionInstance = collection(this.firestore, 'comments');
    return collectionData(collectionInstance).pipe(
      map((documents) =>
        documents.filter((doc) => (doc['post_id']===id))
      )
    );
  }
}
