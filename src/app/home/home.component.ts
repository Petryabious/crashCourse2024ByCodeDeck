import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../types';
import { ProductComponent } from "../component/product/product.component";
import { PaginatorModule } from 'primeng/paginator';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ProductComponent, PaginatorModule]
})
export class HomeComponent implements OnInit {

  public products:Product[] = [];
  public totalRecords:number = 0;
  public rows:number = 5;

  constructor(
    private productService: ProductsService
  ){}
  ngOnInit(): void {
    this.fetchProducts(0, this.rows);
  }

  public onProductOutput(product:Product){
    console.log(product)
  } 

  public fetchProducts(page:number, perPage:number) {
    this.productService
    .getProducts('http://localhost:3000/clothes', {page:page, perPage: perPage})
    .subscribe({
      next: (products: Products) =>{
        console.log(products)
        this.products = products.items;
        this.totalRecords = products.total
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }

  public onPageChange(event: any){
    this.fetchProducts(event.page, event.rows)
  }

  public editProduct(product:Product, id:number) {
    this.productService.editProduct(`http://localhost:3000/clothes/${id}`, product)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  public deleteProduct(id:number) {
    this.productService.deleteProduct(`http://localhost:3000/clothes/${id}`)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  public addProduct(product:Product) {
    this.productService.addProduct(`http://localhost:3000/clothes/`, product)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
