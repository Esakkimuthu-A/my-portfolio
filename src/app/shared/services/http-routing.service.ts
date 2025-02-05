import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Observable } from 'rxjs';
import { GetErrorMessageModel } from 'src/app/auth/models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class HttpRoutingService {

  constructor(private http: HttpClient) { }
  private serviceId = 'service_wk8p5gl';
  private templateId = 'template_6h3123g';
  private publicKey = 'P6zPs8StksrlbptyK';

  getErrorMessages(){
    return this.http.get('./assets/errorMessages.json') as Observable<GetErrorMessageModel>;
  }

  sendEmail(emailData: {firstname: string,lastname: string, email: string; subject: string;mobilenumber: string}){
    return emailjs.send(this.serviceId, this.templateId, emailData, this.publicKey);
  }
}
