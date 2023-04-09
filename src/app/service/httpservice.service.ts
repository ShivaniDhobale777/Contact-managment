import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { myContact } from 'src/assets/myContact';
import { Mygroup } from 'src/assets/mygroup';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

baseurl:string="http://localhost:3000";

  constructor(private http:HttpClient) { }

  getAllcontacts():Observable<myContact>{
    let dataurl = `${this.baseurl}/contacts`;
    return this.http.get<myContact>(dataurl).pipe(catchError(this.handleError));
  }

  // get single contacts
  getcontacts(contactid:string):Observable<myContact>{
    let dataurl:string = `${this.baseurl}/contacts/${contactid}`;
    return this.http.get<myContact>(dataurl).pipe(catchError(this.handleError));
  }

  //create contacts
  createcontacts(contact:myContact):Observable<myContact>{
    let dataurl:string = `${this.baseurl}/contacts`;
    return this.http.post<myContact>(dataurl,contact).pipe(catchError(this.handleError));
  }

  // update contacts
  updatecontacts(contact:myContact,contactid:string):Observable<myContact>{
    let dataurl:string = `${this.baseurl}/contacts/${contactid}`;
    return this.http.put<myContact>(dataurl,contact).pipe(catchError(this.handleError));
  }

  //delete contacts
 deletecontacts(contactid:string):Observable<myContact>{
    let dataurl:string = `${this.baseurl}/contacts/${contactid}`;
    return this.http.delete<myContact>(dataurl).pipe(catchError(this.handleError));
  }

  //  get all groups
  getAllgroups():Observable<Mygroup>{
    let dataurl = `${this.baseurl}/groups`;
    return this.http.get<Mygroup>(dataurl).pipe(catchError(this.handleError));
  }

  getgroups(contact:myContact):Observable<Mygroup>{
    let dataurl:string = `${this.baseurl}/groups/${contact.groupId}`;
    return this.http.get<Mygroup>(dataurl).pipe(catchError(this.handleError));
  }

  // error solve

  handleError(error:HttpErrorResponse){
    let errormessage:string = ''
    if(error.error instanceof ErrorEvent){
      // client error
      errormessage = `Error :${error.error.message}`
    }else{
      // server side error
      errormessage = `status: ${error.status} \n Message: ${error.message}`
    }
    return throwError(errormessage);
  }
}
