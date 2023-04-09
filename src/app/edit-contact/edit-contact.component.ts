import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { myContact } from 'src/assets/myContact';
import { Mygroup } from 'src/assets/mygroup';
import { HttpserviceService } from '../service/httpservice.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit{

  loading:boolean = false;
  contactid:string | null = null;
 contact : myContact = {} as myContact
errorMessage:string | null = null;
group:Mygroup[] = [] as Mygroup[];


  constructor(private route:ActivatedRoute,private contservice:HttpserviceService,private router:Router){

  }

  ngOnInit(): void {
   
    this.route.paramMap.subscribe((param)=>{
      this.contactid = param.get('contactid')
     });
     if(this.contactid){
      this.contservice.getcontacts(this.contactid).subscribe((data:myContact)=>{
        this.contact = data;
        this.loading = false;
        this.contservice.getAllgroups().subscribe((data:any)=>{
          this.group = data;
        })
      },
      (error)=>{
        this.errorMessage = error;
        this.loading = false;
      })
     }
  }

  submitupdate(){
    if(this.contactid){
    this.contservice.updatecontacts(this.contact,this.contactid).subscribe((data:myContact)=>{
      this.router.navigate(['/']).then();
    },
    (error)=>{
      this.errorMessage = error;
      this.router.navigate([`/contacts/edit/${this.contact.id}`]).then();
    })
      }
    }


   

}
