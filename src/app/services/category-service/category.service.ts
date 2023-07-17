import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private firestore: Firestore) {}
  getCategories() {
    const collectionInstance = collection(this.firestore, 'categories');
    return collectionData(collectionInstance); // bu fonksiyon observable dönüyor
  }
  getCategoryById(id: number) {
    const collectionInstance = collection(this.firestore, 'categories');
    return collectionData(collectionInstance).pipe(
      map((documents) =>
        documents.filter((doc) => (doc['category_id']===id))
      )
    );
  }
}
