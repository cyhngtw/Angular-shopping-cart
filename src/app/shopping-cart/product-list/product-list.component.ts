import { Component, OnInit } from '@angular/core';
import { ProductService} from 'src/app/services/product.service'

import { mergeMap, map } from 'rxjs/operators';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  courses: any[];
  
  categories:any[];
  coursesShoppingCart: any;
  
  constructor( private productService: ProductService, private msg: MessengerService) { }

  ngOnInit() {
    this.productService.getCategories()
                       .pipe(
                         mergeMap(categories=> this.productService.getCourses().pipe(
                          mergeMap(courses=>this.msg.getListItemsShoppingCart().pipe(
                            map(coursesShopping=>[categories,courses,coursesShopping])))

                         ))).subscribe(([categories, courses,coursesShopping]) => {
                          this.categories = categories;
                          this.courses = courses;
                          this.coursesShoppingCart=coursesShopping;
                          
                          console.log('courseShopping : '+coursesShopping);
                         });
    
    
    
               }
         getCoursesByCategorie(key)
              {
              return this.courses.filter(course=>course.categorie == key);
              }


              AddToCart(course)
              {
                console.log(course);
               this.msg.AddToCart(course);
              }
            
             

              DeleteToCart(course)
              {
                this.msg.deleteCourseShoppingCart(course.key);
              }
}
