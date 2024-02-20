import { PageProduct, Product } from './../model/product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  products!: Array<Product>;
  currentPage : number = 0;
  pageZise: number = 5;
  totalPages : number = 0;
  errorMessage! : string ;
  searchFormGroup!: FormGroup;
  currentAction : String="All";



  constructor(private productService: ProductService, private fb : FormBuilder,) {

  }

  ngOnInit(): void {

    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control(null)
    });
    this.handleGetPageProducts();

   
   

  }
  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe( {
      next: (data : any) => { this.products = data; },
      error : (err)=>{
        this.errorMessage = err ;
      },

    });
  }




  gotoPage(i: number) {
     this.currentPage=i;
     if(this.currentAction==="All")
     {this.handleGetPageProducts()}
     else
      {
        this.handleSearchProducts();
      }
    }



  handleGetPageProducts(){
    this.productService.getPageProducts(this.currentPage, this.pageZise).subscribe( {
      next: (data : PageProduct) => { 
        this.products = data.products;
        this.totalPages= data.totalPages;
        console.log(this.totalPages)
      },
      error : (err)=>{
        this.errorMessage = err ;
      },

    });
  }





  handleDeleteProduct(p: Product){
    let conf = confirm("are you sure ?");
    if (conf==false) return;
    this.productService.deleteProduct(p.id).subscribe({
      next : () => {
       let index = this.products.indexOf(p);
       this.products.splice(index,1);
          
      } 
     
    })
   
  }



 
  handleSetPromotion(p: Product) {
    let promo = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
        next: () => {
            p.promotion = !promo;
        },
        error: err => {
            console.error("Service call error:", err);
        },
   
    });


  
}
handleSearchProducts() {

   this.currentAction="search";
    
  let keyword =this.searchFormGroup.value.keyword;
  this.productService.searchProducts(keyword,this.currentPage,this.pageZise).subscribe({
    next :(data)=>{
      this.products=data.products;
      this.totalPages=data.totalPages;
    }
  })

 }


}


