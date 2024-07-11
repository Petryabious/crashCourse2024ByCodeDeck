import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../types';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RatingModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  @Input() product!:Product;
  @Output() productOutput = new EventEmitter<Product >()

  ngOnInit(): void {
    this.productOutput.emit(this.product);
  }
}
