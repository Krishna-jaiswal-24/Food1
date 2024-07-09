import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = new BehaviorSubject<any[]>([]);
  private totalPrice = new BehaviorSubject<number>(0);

  items$ = this.items.asObservable();
  totalPrice$ = this.totalPrice.asObservable();

  addItem(item: any) {
    const currentItems = this.items.value;
    const existingItem = currentItems.find(i => i.id === item.id);
    if (!existingItem) {
      currentItems.push({ ...item, quantity: 1 });
      this.items.next(currentItems);
      this.updateTotalPrice();
    }
  }

  removeItem(itemId: number) {
    const currentItems = this.items.value.filter(i => i.id !== itemId);
    this.items.next(currentItems);
    this.updateTotalPrice();
  }

  clearCart() {
    this.items.next([]);
    this.totalPrice.next(0);
  }

  private updateTotalPrice() {
    const currentItems = this.items.value;
    const newTotalPrice = currentItems.reduce((total, item) => total + item.price * item.quantity, 0);
    this.totalPrice.next(newTotalPrice);
  }
}
