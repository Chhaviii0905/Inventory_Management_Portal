import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels } from 'ngx-apexcharts';
import { ProductService } from '../../services/products.service';
import { LogsService } from '../../services/logs.service';
import { ActivityLog } from '../../model';

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
  logs: ActivityLog[] = [];
  filter: string = 'all';

  constructor(private productService: ProductService, private logsService: LogsService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe((products: any) => {
      const productNames = products.data.map((p: { name: any; }) => p.name); 
      const stockValues = products.data.map((p: { quantity: any; }) => p.quantity);

      this.chartXAxis.categories = productNames;
      this.chartSeries = [
        {
          name: 'Stock',
          data: stockValues
        }
      ];
    });

    this.logsService.getLogs().subscribe(data => {
      this.logs = data;
    });
  }

  get filteredLogs() {
    if (this.filter === 'all') return this.logs;
    return this.logs.filter(log => log.action.toLowerCase() === this.filter);
  }

  setFilter(type: string) {
    this.filter = type;
  }
}
