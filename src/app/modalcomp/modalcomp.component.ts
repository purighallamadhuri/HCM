import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AssignPhysician } from '../Models/Users';

@Component({
  selector: 'app-modalcomp',
  templateUrl: './modalcomp.component.html',
  styleUrls: ['./modalcomp.component.css']
})
export class ModalcompComponent implements OnInit {
  submitted = false;
  constructor(private modalService: BsModalService) { }
  modalRef?: BsModalRef;
  ngOnInit(): void {
  }
  assignphysician: AssignPhysician={
    MemberId : '',
    PhysicianId: 0
  }
  openModal(book:any) {
    this.modalRef = this.modalService.show(book);
  }
  AssignPhysician(assignphysician: any){

  }

}
