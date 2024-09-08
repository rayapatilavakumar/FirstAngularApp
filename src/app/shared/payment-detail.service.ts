import { Injectable, importProvidersFrom } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment}  from '../../environments/environment';
import {PaymentDetail} from './payment-detail.model'
import { NgForm } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor( private http: HttpClient) { }
  url: string= environment.apiBaseUrl+"/Users";
  list: PaymentDetail[] =[];
  formData: PaymentDetail = new PaymentDetail();
  formSubmitted: boolean = false;
  refreshList()
  {
   
    this.http.get(this.url).subscribe(
      {
        next: res =>{

          this.list = res as PaymentDetail[];
        },
        error: err =>{ console.log(err);}
      })
  }
  postPaymentDetail() {
    return this.http.post(this.url, this.formData)
  }

  putPaymentDetail() {
    return this.http.put(this.url + '/' + this.formData.id, this.formData)
  }


  deletePaymentDetail(id: number) {
    return this.http.delete(this.url + '/' + id)
  }


  resetForm(form: NgForm) {
    form.form.reset()
    this.formData = new PaymentDetail()
    this.formSubmitted = false
  }

}
