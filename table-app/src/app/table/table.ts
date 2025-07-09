import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface TableItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
}

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table implements OnInit {
  routeParams: any = {};
  queryParams: any = {};
  tableData: TableItem[] = [];
  tableTitle = '';
  
  // Expose Object.keys and window to template
  Object = Object;
  window = window;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get route parameters
    this.route.params.subscribe(params => {
      this.routeParams = params;
      this.generateTableData();
    });

    // Get query parameters
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
      if (Object.keys(this.queryParams).length > 0 && Object.keys(this.routeParams).length === 0) {
        this.generateTableData();
      }
    });
  }

  generateTableData() {
    const category = this.routeParams.category || this.queryParams.category || 'General';
    const name = this.routeParams.name || this.queryParams.name || 'Items';
    const id = this.routeParams.id || this.queryParams.id || '1';

    this.tableTitle = `${name} Table (ID: ${id})`;

    // Generate sample data based on category
    this.tableData = this.getSampleData(category);
  }

  getSampleData(category: string): TableItem[] {
    const baseItems: { [key: string]: TableItem[] } = {
      'Electronics': [
        { id: 1, name: 'Smartphone', description: 'Latest model smartphone', price: 699, category: 'Electronics', status: 'In Stock' },
        { id: 2, name: 'Laptop', description: 'High-performance laptop', price: 1299, category: 'Electronics', status: 'In Stock' },
        { id: 3, name: 'Tablet', description: '10-inch tablet', price: 399, category: 'Electronics', status: 'Low Stock' },
        { id: 4, name: 'Headphones', description: 'Wireless noise-cancelling', price: 199, category: 'Electronics', status: 'In Stock' },
        { id: 5, name: 'Smart Watch', description: 'Fitness tracking watch', price: 299, category: 'Electronics', status: 'Out of Stock' }
      ],
      'Books': [
        { id: 1, name: 'JavaScript Guide', description: 'Complete JavaScript reference', price: 45, category: 'Books', status: 'In Stock' },
        { id: 2, name: 'Angular Handbook', description: 'Learn Angular framework', price: 55, category: 'Books', status: 'In Stock' },
        { id: 3, name: 'TypeScript Manual', description: 'TypeScript programming guide', price: 40, category: 'Books', status: 'In Stock' },
        { id: 4, name: 'Web Development', description: 'Full-stack development book', price: 65, category: 'Books', status: 'Low Stock' },
        { id: 5, name: 'CSS Techniques', description: 'Advanced CSS styling', price: 35, category: 'Books', status: 'In Stock' }
      ],
      'Clothing': [
        { id: 1, name: 'Cotton T-Shirt', description: 'Comfortable cotton t-shirt', price: 25, category: 'Clothing', status: 'In Stock' },
        { id: 2, name: 'Jeans', description: 'Classic blue jeans', price: 75, category: 'Clothing', status: 'In Stock' },
        { id: 3, name: 'Jacket', description: 'Waterproof jacket', price: 120, category: 'Clothing', status: 'Low Stock' },
        { id: 4, name: 'Sneakers', description: 'Running sneakers', price: 95, category: 'Clothing', status: 'In Stock' },
        { id: 5, name: 'Hat', description: 'Baseball cap', price: 20, category: 'Clothing', status: 'In Stock' }
      ]
    };

    return baseItems[category] || baseItems['Electronics'];
  }
}
