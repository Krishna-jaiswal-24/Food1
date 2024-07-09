import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];
  userEmail: string = 'denji@email.com'; // Replace with the actual user's email

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchOrderHistory();
  }

  fetchOrderHistory() {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('x-access-token', authToken || '');
    const url = `http://127.0.0.1:5000/api/orders/view?user_email=${this.userEmail}`;

    this.http.get(url, { headers }).subscribe((res: any) => {
      if (res.success) {
        this.orders = res.data;
      } else {
        alert('Failed to fetch order history');
      }
    }, (err: any) => {
      console.error('Failed to fetch order history:', err);
      alert('Failed to fetch order history');
    });
  }
}
