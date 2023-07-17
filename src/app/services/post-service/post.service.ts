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
  getPostById(id: number) {
    console.log(id,"geliyor mu")
    const collectionInstance = collection(this.firestore, 'posts');
    return collectionData(collectionInstance).pipe(
      map((documents) =>
        documents.filter((doc) => {
          console.log((doc['post_id'],id,"IDLER"))
          return doc['post_id']===id
        })
      )
    );
  }
}
