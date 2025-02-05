import { Component } from '@angular/core';
import { socialMediaIcons } from '../../constants/portfolio.constant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackBarService, SnackType } from 'src/app/shared/services/snack-bar.service';
import { HttpRoutingService } from 'src/app/shared/services/http-routing.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GetErrorMessageModel } from '../../models/portfolio.model';

@Component({
  selector: 'app-contactus-page',
  templateUrl: './contactus-page.component.html',
  styleUrls: ['./contactus-page.component.scss']
})
export class ContactusPageComponent {
  iconDetails = socialMediaIcons;
  registerForm !: FormGroup;
  errorMessage !: any;

  constructor(private SnackBar : SnackBarService,public commonService: CommonService,private HttpService : HttpRoutingService){
  }

  ngOnInit(){
    this.formInitilaize();
    this.getErrorMessages();
  }

  getErrorMessages(){
    this.HttpService.getErrorMessages().pipe(
      catchError((error:HttpErrorResponse)=>{
        this.SnackBar.openSnackBar({message:this.errorMessage?.FAILED_ERROR_MEESAGE,main: SnackType.Error});
        return EMPTY;
      })
    ).subscribe((res:GetErrorMessageModel) => {
      if(res){
        this.errorMessage = res;
      }
    });
  }
  
  formInitilaize(){
    this.registerForm = new FormGroup({
      firstName : new FormControl(null,[Validators.required]),
      lastName : new FormControl(null,Validators.required),
      email : new FormControl(null,[Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      phoneNo : new FormControl(null),
      query: new FormControl(null,[Validators.required,Validators.maxLength(200),Validators.pattern('^([-a-zA-Z])+(\\s+[-a-zA-Z]+)*$')])
    })
  }

  async onSubmit(){
    if(this.registerForm.valid){
      const {data,error} = await this.commonService.contactForm(this.registerForm.value);
      if(!error){
        this.SnackBar.openSnackBar({message:this.errorMessage?.FORM_SUBMIT_SUCCESS,main: SnackType.Success});
        this.registerForm.reset();
        const emailData ={firstname: data[0]?.firstName,lastname: data[0]?.lastName,email: data[0]?.email,subject: data[0]?.query,mobilenumber: data[0]?.phoneNo};
        if(emailData){
          this.HttpService.sendEmail(emailData).then(
          response => {
            console.log('Email sent successfully!', response.status, response.text);
          },
          error => {
            console.error('Failed to send email.', error);
          })
        }
      }
      else{
        this.SnackBar.openSnackBar({message:this.errorMessage?.TRY_AGAIN,main: SnackType.Error});
      }
    }else{
      this.SnackBar.openSnackBar({message:this.errorMessage?.FILL_MANDATORY_FIELDS,main: SnackType.Warning});
    }
  }
  
}
