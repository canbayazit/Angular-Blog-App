import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
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
  getCommentById(id:number,type:string){
    const collectionInstance = collection(this.firestore, 'comments');
    if (type==="post") {
      return collectionData(collectionInstance).pipe(
        map((documents) =>
          documents.filter((doc) => (doc['post_id']===id))
        )
      );
    }else if(type==="user"){
      return collectionData(collectionInstance).pipe(
        map((documents) =>
          documents.filter((doc) => (doc['user_id']===id))
        )
      );
    }
    return
  }

  async updateComment(updatedComment: any) {
    try {
      // Query for the document with the matching comment_id
      const q = query(collection(this.firestore, 'comments'), where('comment_id', '==', updatedComment.comment_id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Get the first document (assuming there is only one with the same comment_id)
        const docSnapshot = querySnapshot.docs[0];
        const commentDocRef = doc(this.firestore, 'comments', docSnapshot.id);

        // Update the document with the new data
        await updateDoc(commentDocRef, updatedComment);

        return true;
      } else {
        // Handle the case where no document with the matching comment_id is found
        console.error('Comment not found with comment_id:', updatedComment.comment_id);
        return false;
      }
    } catch (error) {
      // Handle any errors that may occur during the update process
      console.error('Error updating comment:', error);
      return false;
    }
  }
}
