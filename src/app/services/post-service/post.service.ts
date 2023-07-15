import { Injectable } from '@angular/core';
// Önemli Importları @angular/fire/firestore' üzerinden çekin çünkü ben yanlışlıkla
// firebase/firestore kısmından // import etmeye çalıştığım için 2 saat nerde hata
// yapıyorum diye uğraşmak zorunda kaldım.
import { Firestore, collection, collectionData, limit, orderBy, query, startAfter } from '@angular/fire/firestore';

// Firebase üzerinden canlı olarak verilerimizi çektiğimiz post service.
@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private firestore: Firestore) {}
  getPosts() {
    const collectionInstance = collection(this.firestore, 'posts');
    return collectionData(collectionInstance); // bu fonksiyon observable dönüyor
  }
}
