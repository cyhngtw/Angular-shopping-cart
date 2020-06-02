export class Product {
    id: number;
    title:string;
    price:number;
    urlImage:string;

    constructor(id, title, price = 0, urlImage=''){
      this.id = id
      this.title = title
      this.price = price
      this.urlImage = urlImage
    }
}
