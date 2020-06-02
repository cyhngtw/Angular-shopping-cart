import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

   
  constructor(private db: AngularFireDatabase) { }

  getCategories()  {
   return this.db.list('categories')
           .snapshotChanges()
           .pipe(
             map(change=>change.map(c=>({ key:c.payload.key, ...c.payload.exportVal() }))
           ))
  }

  getCourses()  {
    return this.db.list('/courses')
            .snapshotChanges()
            .pipe(
              map(change=>change.map(c=>({ key:c.payload.key, ...c.payload.exportVal() }))
            ))
   }

   async AddToCart(course)
  {
    let cartId=localStorage.getItem('cartId');
    if(!cartId)
    {
     let cart= await this.db.list('/shoppingCart').push({
        dateCreated:new Date().getTime()
      });
      localStorage.setItem('cartId',cart.key)
      this.AddCourseCart(cart.key,course)
    }
    else
    {
      this.AddCourseCart(localStorage.getItem('cartId'),course);
    }
  }

  AddCourseCart(idCart,courseAdd)
  {
    console.log('addCourse',courseAdd);
    this.db.object('/shoppingCart/'+idCart+'/items/'+courseAdd.key)
             .snapshotChanges()
             .pipe(
               take(1)
             ).subscribe(
              courseCart=>{
                console.log(courseCart);
                 if(!courseCart.key)
                 {
                   this.db.list('/shoppingCart/'+idCart+'/items/').set(courseAdd.key,{course:courseAdd})
                 }
               }
             )

  }



}
