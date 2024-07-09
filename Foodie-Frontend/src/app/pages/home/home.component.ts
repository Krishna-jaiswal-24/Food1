import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodCardComponent } from '../food-card/food-card.component';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FoodCardComponent, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foodItems: any[] = [];
  filteredFoodItems: any[] = [];
  searchQuery: string = '';
  selectedType: string = '';
  masterSrv = inject(MasterService);

  ngOnInit() {
    this.masterSrv.getAllFood().subscribe((res: any) => {
      if (res.success) {
        this.foodItems = res.data;
        this.filteredFoodItems = res.data;
      } else {
        alert('Failed to fetch food items');
      }
    }, (err: any) => {
      alert('Failed to fetch food items');
    });
  }

  filterFoodItems() {
    this.filteredFoodItems = this.foodItems.filter(item => {
      return (this.searchQuery === '' || item.name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
             (this.selectedType === '' || item.type.toLowerCase() === this.selectedType.toLowerCase());
    });
  }
}
