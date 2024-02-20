import { PageProduct, Product } from './../model/product.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product>;
  constructor() {
    this.products =[
      {id:uuidv4(), name : "Cumputer", price : 6500,  promotion: true},
    {id:uuidv4(), name : "Printer", price : 1200 ,  promotion: false},
    {id:uuidv4(), name : "Cumputer", price : 1400 , promotion: true}
    ];
    for (let i=0; i<10 ; i++){
      this.products.push( {id:uuidv4(), name : "Cumputer", price : 6500,  promotion: true});
      this.products.push( {id:uuidv4(), name : "Printer", price : 1200 ,  promotion: false});
      this.products.push( {id:uuidv4(), name : "Cumputer", price : 1400 , promotion: true});
    
    }
   } 
   public getAllProducts() : Observable<Product[]>{
    let rnd = Math.random();
    if (rnd <0.1) return throwError(()=>new Error("internet connect"));
    return of(this.products);
   }

   public getPageProducts(page : number, size :number) : Observable<PageProduct>{
    let index = page*size;
    let totalPages = ~~(this.products.length/size);
    if(this.products.length% size != 0)
    totalPages++; 
    let pageProducts = this.products.slice(index, index+size)
    return of({page:page, size:size, totalPages:totalPages, products: pageProducts});
  }

   public deleteProduct(id: string) : Observable<boolean>{
    let products = this.products.filter(p=>p.id!=id);
    return of(true)
    console.log("test");

  }
  public setPromotion(id : string): Observable<boolean> {
   let product = this.products.find(p=>p.id==id);
   if (product!= undefined)
   {
       product.promotion = !product.promotion;
       return of( true);
   }else 
  return throwError(()=>new Error('Product not found'))
  }


  public searchProducts(keyword: string, page : number, size: number): Observable<PageProduct> {
   let result = this.products.filter(p => p.name.includes(keyword));
   let index = page*size;
    let totalPages = ~~(result.length/size);
    if(this.products.length% size != 0)
    totalPages++; 
    let pageProducts = result.slice(index, index+size)
    return of({page:page, size:size, totalPages:totalPages, products: pageProducts});
 }
 
}
