import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.css']
})
export class FoodCardComponent {
  @Input() foodItem: any;
  isInCart: boolean = false;

  constructor(private cartService: CartService) {}

  addItemToCart() {
    this.cartService.addItem(this.foodItem);
    this.isInCart = true;
  }

  removeItemFromCart() {
    this.cartService.removeItem(this.foodItem.id);
    this.isInCart = false;
  }
}
