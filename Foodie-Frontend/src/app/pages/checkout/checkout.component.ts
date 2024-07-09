import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items: any[] = [];
  totalPrice: number = 0;
  userEmail: string = '';
  cardDetails: any = {
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  };
  cardNumberValid: boolean = false;
  cardExpiryValid: boolean = false;
  cardCVCValid: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cartService.items$.subscribe(items => this.items = items);
    this.cartService.totalPrice$.subscribe(totalPrice => this.totalPrice = totalPrice);
  }

  validateCardNumber() {
    const cardNumberRegex = /^\d{16}$/;
    this.cardNumberValid = cardNumberRegex.test(this.cardDetails.cardNumber);
  }

  validateCardExpiry() {
    const [month, year] = this.cardDetails.cardExpiry.split('/').map((s: string) => parseInt(s, 10));
    const expiryDate = new Date(`20${year}-${month}-01`);
    const currentDate = new Date();
    this.cardExpiryValid = expiryDate > currentDate && month >= 1 && month <= 12;
  }

  validateCardCVC() {
    const cardCVCRegex = /^\d{3}$/;
    this.cardCVCValid = cardCVCRegex.test(this.cardDetails.cardCVC);
  }

  isFormValid() {
    return this.cardNumberValid && this.cardExpiryValid && this.cardCVCValid;
  }

  checkout() {
    if (!this.isFormValid()) {
      alert('Please ensure all payment details are correct.');
      return;
    }

    const order = {
      user_email: this.userEmail,
      food_item_ids: this.items.map(item => item.id)
    };

    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('x-access-token', authToken || '');

    this.http.post('http://127.0.0.1:5000/api/orders/create', order, { headers })
      .subscribe(
        response => {
          console.log('Order submitted:', response);
          this.cartService.clearCart();
          this.router.navigate(['home']);
        },
        error => {
          console.error('Order submission failed:', error);
          alert('Order submission failed');
        }
      );
  }
}
