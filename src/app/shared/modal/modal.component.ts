import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() fields: { name: string, type: string, label: string, value?: any, options?: any }[] = [];
  @Input() submitLabel: string = 'Submit';
  @Output() submit = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Input() readonly: boolean = false;

  formData: { [key: string]: any } = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields']) {
      this.formData = {};
      this.fields.forEach(field => {
        this.formData[field.name] = field.value || '';
      });
    }
  }

  handleSubmit() {
    this.submit.emit(this.formData);
  }

  handleClose() {
    this.close.emit();
  }
}
