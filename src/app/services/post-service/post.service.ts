import { Injectable } from '@angular/core';
// Önemli Importları @angular/fire/firestore' üzerinden çekin çünkü ben yanlışlıkla
// firebase/firestore kısmından // import etmeye çalıştığım için 2 saat nerde hata
// yapıyorum diye uğraşmak zorunda kaldım.
import { Firestore, collection, collectionData, doc, getDocs, limit, orderBy, query, startAfter, updateDoc, where } from '@angular/fire/firestore';
import { map } from 'rxjs';

// Firebase üzerinden canlı olarak verilerimizi çektiğimiz post service.
@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private firestore: Firestore) {}
  getPostByPaginator(page:number,pageSize:number){
    const collectionInstance = collection(this.firestore, 'posts');
    return collectionData(collectionInstance).pipe(
      map((posts) => {
        return  posts.slice((page - 1) * pageSize, page * pageSize);
      })
    );
  }
  getPosts() {
    const collectionInstance = collection(this.firestore, 'posts');
    return collectionData(collectionInstance); // bu fonksiyon observable dönüyor
  }
  getPostById(id: number,type:string) {
    const collectionInstance = collection(this.firestore, 'posts');
    if (type==="post") {
      return collectionData(collectionInstance).pipe(
        map((documents) =>
          documents.filter((doc) => {
            return doc['post_id']===id
          })
        )
      );
    }else if(type==="user"){
      return collectionData(collectionInstance).pipe(
        map((documents) =>
          documents.filter((doc) => {
            return doc['user_id']===id
          })
        )
      );
    }else if(type==="category"){
      return collectionData(collectionInstance).pipe(
        map((documents) =>
          documents.filter((doc) => {
            return doc['category_id']===id
          })
        )
      );
    }
    return
  }

  async updatePost(updatedComment: any) {
    try {
      // Query for the document with the matching comment_id
      const q = query(collection(this.firestore, 'posts'), where('post_id', '==', updatedComment.post_id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Get the first document (assuming there is only one with the same comment_id)
        const docSnapshot = querySnapshot.docs[0];
        const commentDocRef = doc(this.firestore, 'posts', docSnapshot.id);

        // Update the document with the new data
        await updateDoc(commentDocRef, updatedComment);

        return true;
      } else {
        // Handle the case where no document with the matching comment_id is found
        console.error('Post not found with post_id:', updatedComment.user_id);
        return false;
      }
    } catch (error) {
      // Handle any errors that may occur during the update process
      console.error('Error updating post:', error);
      return false;
    }
  }
}
