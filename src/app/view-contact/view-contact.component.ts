import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { myContact } from 'src/assets/myContact';
import { HttpserviceService } from '../service/httpservice.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit{

  contactid:string | null = null;
  loading:boolean = false;
  contact:myContact = {} as myContact;
  errorMessage:string | null = null;

  constructor(private route:ActivatedRoute,private contservice:HttpserviceService){

  }
  ngOnInit(): void {
   this.route.paramMap.subscribe((param)=>{
    this.contactid = param.get('contactid')
   });
   if(this.contactid){
    this.loading = true;
  this.contservice.getcontacts(this.contactid).subscribe((data:myContact)=>{
    this.contact = data;
    this.loading = false;
  },
  error=>{
    this.errorMessage = error;
    this.loading = false;
  })
}  


}
isNotEmpty(){
  return Object.keys(this.contact).length >0;
}

}
