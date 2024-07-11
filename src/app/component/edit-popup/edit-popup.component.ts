import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';


@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule,RatingModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  @Input() display:boolean = false;
  @Output() confirm = new EventEmitter<Product>();
  @Input() header: string = '';

  @Input() product:Product = {
    name: '',
    image: '',
    price: '',
    rating: 0
  }

  public onConfirm(){
    this.confirm.emit(this.product)
  }

  public onCancel(){
    this.display = false;
  }
}
