import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { myContact } from 'src/assets/myContact';
import { Mygroup } from 'src/assets/mygroup';
import { HttpserviceService } from '../service/httpservice.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
loading:boolean = false;
contact:myContact = {} as myContact
errorMessage:string | null = null;
groups:Mygroup[]=[];


  constructor(private contservice:HttpserviceService, private router:Router){

  }

  ngOnInit(): void {
    this.contservice.getAllgroups().subscribe((data:any)=>{
this.groups = data;
    },
    (error)=>{
      this.errorMessage = error;
    })
  }

  addsubmit(){
this.contservice.createcontacts(this.contact).subscribe((data:myContact)=>{
  this.router.navigate(['/']).then();
},
(error)=>{
  this.errorMessage = error;
  this.router.navigate(['/contacts/add']).then();
})
  }
}
