import { Component, OnInit } from '@angular/core';
import { myContact } from 'src/assets/myContact';
import { HttpserviceService } from '../service/httpservice.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit{

  loading:boolean=false;
 public contacts:myContact[]=[];
  errorMessage:string|null = null;

  constructor(private cantservice:HttpserviceService){

  }

  ngOnInit() {
    this.getallcontactdata();
  
  }  
 

  
  getallcontactdata(){
    this.loading = true;
    this.cantservice.getAllcontacts().subscribe((data:any)=>{
        this.contacts = data;
        this.loading = false;
    },
    (error)=>{
      this.errorMessage = error;
      this.loading = false;
    })
  }


  deletecontact(contactId:string | undefined){
    if(contactId){
     this.cantservice.deletecontacts(contactId).subscribe((data:any)=>{
       this.getallcontactdata();
     },
     (error)=>{
       this.errorMessage = error;
       this.loading = false;
     })
    }
   }

}
