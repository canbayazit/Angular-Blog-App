import { Injectable } from '@angular/core';
// Önemli Importları @angular/fire/firestore' üzerinden çekin çünkü ben yanlışlıkla
// firebase/firestore kısmından // import etmeye çalıştığım için 2 saat nerde hata
// yapıyorum diye uğraşmak zorunda kaldım.
import { Firestore, collection, collectionData, limit, orderBy, query, startAfter } from '@angular/fire/firestore';
import { map } from 'rxjs';

// Firebase üzerinden canlı olarak verilerimizi çektiğimiz post service.
@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private firestore: Firestore) {}
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
            console.log((doc['post_id'],id,"IDLER"))
            return doc['post_id']===id
          })
        )
      );
    }else if(type==="user"){
      return collectionData(collectionInstance).pipe(
        map((documents) =>
          documents.filter((doc) => {
            console.log((doc['user_id'],id,"IDLER"))
            return doc['user_id']===id
          })
        )
      );
    }else if(type==="category"){
      return collectionData(collectionInstance).pipe(
        map((documents) =>
          documents.filter((doc) => {
            console.log((doc['category_id'],id,"IDLER"))
            return doc['category_id']===id
          })
        )
      );
    }
    return
  }
}
