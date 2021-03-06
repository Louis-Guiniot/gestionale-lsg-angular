import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Iva } from 'src/app/core/model/Iva.interface';
import { MeasureUnit } from 'src/app/core/model/MeasureUnit.interface';
import { selectIva } from 'src/app/redux/iva';
import { selectMeasures } from 'src/app/redux/measure';
import { IvaService } from '../service/iva.service';

@Component({
  selector: 'app-iva',
  templateUrl: './iva.component.html',
  styleUrls: ['./iva.component.scss']
})
export class IvaComponent implements OnInit {
  insertIvaForm: FormGroup;


  createIva: FormGroup;
  updateIva: FormGroup;
  deleteIva: FormGroup;
  cercaForm: FormGroup;

  idIvaNumber:number
  idIvaString:string;
  typeM:string;
  closeResult = '';

  page = 1;
  pageSize = 2;
  collectionSize:number;

  term = 'null'


  open(content,idIvaPassed?:string) {
    this.idIvaNumber=Number.parseInt(idIvaPassed)
    this.idIvaString=idIvaPassed;

    console.log("id iva: "+this.idIvaNumber)
    this.modalService.open(content, { size: 'l'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.createIva.reset()
      this.deleteIva.reset()
      this.updateIva.reset()

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
    }      return `with: ${reason}`;

  }

  constructor(private ivaService: IvaService, private store: Store, private router: Router, private fb:FormBuilder, private modalService: NgbModal) {
    this.ivaService.retrieveAllIva();
   }

  ngOnInit(): void {

    this.store.pipe(select(selectIva)).subscribe((ivas) => {
      this.collectionSize=ivas.length;
    })

    this.cercaForm=this.fb.group({
      termine: ['', Validators.required]
    })

    this.createIva=this.fb.group({
      percentualeIva: ['', Validators.required],
      info: ['', Validators.required]
    })

    this.updateIva=this.fb.group({
      percentualeIvaNuovo: ['', Validators.required],
      infoNuovo: ['', Validators.required]
    })
    
    this.deleteIva=this.fb.group({
      id: ['', Validators.required]
    })
  }

  get ivaList(): Observable<Iva[]> {
    return this.store.pipe(select(selectIva));
  }

  create(){
    console.log("add function ")
    console.log("percentuale iva:",this.createIva.value.percentualeIva)
    console.log("percentuale iva:",this.createIva.value.info)
    this.ivaService.createIva(this.createIva.value.percentualeIva,this.createIva.value.info)
  }

  deleteIvaById(){
    console.log("delete")
    console.log(this.idIvaString)
    this.ivaService.deleteIva(this.idIvaString.toString())

  }

  updateIvaById(){
    console.log("update function")
    console.log("nuovi campi: ",this.updateIva.value.percentualeIvaNuovo,"  -  ",this.updateIva.value.infoNuovo)
    this.ivaService.updateIva(this.idIvaString.toString(), this.updateIva.value.percentualeIvaNuovo.toString(),this.updateIva.value.infoNuovo)
  }

  searchTerm(){
    this.term = this.cercaForm.value.termine
    this.term = this.term.toLowerCase();
    console.log("cerco con termine: ",this.term)

    //per evitare errore paginazione
    this.pageSize = 1000;
  }

  resetSearchBar(){
    this.term = 'null';
    this.pageSize = 2
    console.warn("reset")
  }

}
