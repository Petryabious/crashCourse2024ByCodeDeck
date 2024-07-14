import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../types';
import { ProductComponent } from '../component/product/product.component';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../component/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    ProductComponent,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
})
export class HomeComponent implements OnInit {
  public products: Product[] = [];
  public totalRecords: number = 0;
  public rows: number = 5;

  public displayEditPopup: boolean = false;
  public displayAddPopup: boolean = false;

  public selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  constructor(private productService: ProductsService) {}
  ngOnInit(): void {
    this.fetchProducts(0, this.rows);
  }

  public toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = !this.displayEditPopup;
  }

  public toggleDeletePopup(product: Product) {}

  public onProductOutput(product: Product) {
    console.log(product);
  }

  public toggleAddPopup() {
    this.displayAddPopup = true;
  }

  public fetchProducts(page: number, perPage: number) {
    this.productService
      .getProducts('http://localhost:3000/clothes', {
        page: page,
        perPage: perPage,
      })
      .subscribe({
        next: (products: Products) => {
          console.log(products);
          this.products = products.items;
          this.totalRecords = products.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }

    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  public editProduct(product: Product, id: number) {
    this.productService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public deleteProduct(id: number) {
    this.productService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  public addProduct(product: Product) {
    this.productService
      .addProduct(`http://localhost:3000/clothes/`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
