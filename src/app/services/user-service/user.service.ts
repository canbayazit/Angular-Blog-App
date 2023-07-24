import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {  map } from 'rxjs';
import { CommentService } from '../comment-service/comment.service';
import { PostService } from '../post-service/post.service';
import { ToastService } from '../toast-service/toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: Firestore,
    private commentService: CommentService,
    private postService: PostService,
    private toastService: ToastService
  ) {}
  getUserByPaginator(page: number, pageSize: number) {
    const collectionInstance = collection(this.firestore, 'users');
    return collectionData(collectionInstance).pipe(
      map((users) => {
        return {data:users.slice((page - 1) * pageSize, page * pageSize),length:users.length}
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
      map((documents) => documents.filter((doc) => doc['user_id'] === id))
    );
  }

  async updateUser(updatedComment: any) {
    try {
      // Query for the document with the matching comment_id
      const q = query(
        collection(this.firestore, 'users'),
        where('user_id', '==', updatedComment.user_id)
      );
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
        console.error(
          'Comment not found with user_id:',
          updatedComment.user_id
        );
        return false;
      }
    } catch (error) {
      // Handle any errors that may occur during the update process
      console.error('Error updating user:', error);
      return false;
    }
  }

  async deleteUser(userId: number) {
    this.getUsers().subscribe((users) => {

      // user sayısı 1 den az olamaz check
      if (users.length > 1) {
        this.commentService.getComments().subscribe(async (comment) => {

          // yorumu bulunan silinemez check
          if (comment.findIndex((data) => data['user_id'] === userId) > -1) {
            this.toastService.showError('Yorumu bulunan kullanıcı silinemez !');
            return;
          } else {
            this.postService.getPosts().subscribe(async (post) => {

              // gönderisi bulunan kullanıcı silinemez check
              if (post.findIndex((data) => data['user_id'] === userId) > -1) {
                this.toastService.showError(
                  'Gönderisi bulunan kullanıcı silinemez !'
                );
                return;
              } else {
                try {
                  // Query for the document with the matching user_id
                  const q = query(
                    collection(this.firestore, 'users'),
                    where('user_id', '==', userId)
                  );
                  const querySnapshot = await getDocs(q);

                  if (!querySnapshot.empty) {
                    // Get the first document (assuming there is only one with the same user_id)
                    const docSnapshot = querySnapshot.docs[0];
                    const userDocRef = doc(this.firestore,'users', docSnapshot.id);

                    // Delete the document
                    await deleteDoc(userDocRef);
                    this.toastService.showSuccess(
                      'Kullanıcı başarıyla silindi !'
                    );
                    return true;
                  } else {
                    // Handle the case where no document with the matching user_id is found
                    console.error('User not found with user_id:', userId);
                    return false;
                  }
                } catch (error) {
                  // Handle any errors that may occur during the delete process
                  console.error('Error deleting user:', error);
                  return false;
                }
              }
            });
          }
        });
      } else {
        this.toastService.showError('Kullanıcı sayısı 1 den az olamaz !');
      }
    });
  }
}
