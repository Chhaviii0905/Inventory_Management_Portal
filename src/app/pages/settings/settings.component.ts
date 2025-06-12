import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  activeTab: string = 'general';

  settings = {
    companyName: 'BizInventory',
    supportEmail: 'support@bizinventory.com',
    defaultCurrency: 'USD'
  };

  setTab(tabName: string) {
    this.activeTab = tabName;
  }

  saveChanges() {
    console.log('Settings saved:', this.settings);
    // You can integrate this with a service call here
  }
}
