import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private firestore: Firestore) {}
  getCategories() {
    const collectionInstance = collection(this.firestore, 'categories');
    return collectionData(collectionInstance); // bu fonksiyon observable dönüyor
  }
}
