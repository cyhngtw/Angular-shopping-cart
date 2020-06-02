import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { Product } from 'src/app/models/product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  
  coursesShopping = [ ];

  nbrShoppingCourse:number=0;

  displayedColumns: string[] = ['title','price','qty','actions'];
  constructor(private msg: MessengerService ) { }

  ngOnInit() {
     this.msg.getListItemsShoppingCart()
     
      .subscribe( (coursesShopping) =>{

        this.nbrShoppingCourse=coursesShopping.length
    //this.loadCartItems();

    })
  
    this.msg.getListItemsShoppingCartMapCourses()
    .subscribe(courses=>this.coursesShopping=courses);

}

// loadCartItems()
// {
//    this.msg.getListItemsShoppingCart().subscribe((courses) => {
//     this.coursesShopping  = courses;
//     this.getTotal();
//   })

// }

getTotal()
{
  let total:number=0;
  this.coursesShopping.forEach(course=>{
    total += course.price 
  })
  return total;
}
Delete(row)
{
  this.msg.deleteCourseShoppingCart(row.key);
}
}
