import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { map } from 'rxjs';
import ICategory from 'src/app/model/category/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private firestore: Firestore) {}
  addCategory(category:ICategory){
    const collectionInstance = collection(this.firestore, 'categories');
    addDoc(collectionInstance,category);
  }
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

  async updateCategory(updatedCategory: any) {
    try {
      // Query for the document with the matching comment_id
      const q = query(collection(this.firestore, 'categories'), where('category_id', '==', updatedCategory.category_id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Get the first document (assuming there is only one with the same category_id)
        const docSnapshot = querySnapshot.docs[0];
        const categoryDocRef = doc(this.firestore, 'categories', docSnapshot.id);

        // Update the document with the new data
        await updateDoc(categoryDocRef, updatedCategory);

        return true;
      } else {
        // Handle the case where no document with the matching category_id is found
        console.error('category not found with category_id:', updatedCategory.category_id);
        return false;
      }
    } catch (error) {
      // Handle any errors that may occur during the update process
      console.error('Error updating category:', error);
      return false;
    }
  }
}
