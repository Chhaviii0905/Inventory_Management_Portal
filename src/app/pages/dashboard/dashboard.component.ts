import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels
} from 'ngx-apexcharts';
import { ProductService } from '../../services/products.service';// adjust path if needed

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public chartSeries: ApexAxisChartSeries = [];
  public chartDetails: ApexChart = {
    type: 'bar',
    height: 350
  };
  public chartTitle: ApexTitleSubtitle = {
    text: 'Product Stock Overview'
  };
  public chartXAxis: ApexXAxis = {
    categories: []
  };
  public dataLabels: ApexDataLabels = {
    enabled: true
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((products: any) => {
      const productNames = products.data.map((p: { name: any; }) => p.name);      // Assuming `name` field exists
      const stockValues = products.data.map((p: { quantity: any; }) => p.quantity); // Assuming `stockCount` field exists

      this.chartXAxis.categories = productNames;
      this.chartSeries = [
        {
          name: 'Stock',
          data: stockValues
        }
      ];
    });
  }
}
