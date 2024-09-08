import { Component , ViewChild,ElementRef } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: ``
})
export class PaymentDetailFormComponent {
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;
  constructor (public service: PaymentDetailService, private toastr: ToastrService){

  }
  onSubmit(form: NgForm) {
    this.service.formSubmitted = true
    console.log('working');
    if (form.valid) {
      if (this.service.formData.id == 0)
        this.insertRecord(form)
      else
        this.updateRecord(form)
    }

  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail()
      .subscribe({
        next: res => {
          this.service.list = res as PaymentDetail[]
         this.service.resetForm(form)
          this.confirmPasswordInput.nativeElement.value = ''
          this.toastr.success('Inserted successfully', 'Register Users')
        },
        error: err => { console.log(err) }
      })
  }
  updateRecord(form: NgForm) {
    this.service.putPaymentDetail()
      .subscribe({
        next: res => {
          this.service.list = res as PaymentDetail[]
          this.service.resetForm(form)
          this.confirmPasswordInput.nativeElement.value = '';
          this.toastr.info('Updated successfully', 'Payment Detail Register')
        },
        error: err => { console.log(err) }
      })
   }
  
}
