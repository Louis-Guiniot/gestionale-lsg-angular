import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MeasureUnit } from 'src/app/core/model/MeasureUnit.interface';
import { selectMeasures } from 'src/app/redux/measure';
import { ProductsService } from '../../products/service/products.service';
import { MeasureUnitService } from '../services/measure-unit.service';

@Component({
  selector: 'app-measure-unit',
  templateUrl: './measure-unit.component.html',
  styleUrls: ['./measure-unit.component.scss']
})
export class MeasureUnitComponent implements OnInit {

  createMeasureUnitForm: FormGroup;
  updateMeasureUnitForm: FormGroup;
  deleteMeasureUnitForm: FormGroup;
  cercaForm: FormGroup;

  idMnumber:number
  idMstring:string;
  typeM:string;
  closeResult = '';

  page = 1;
  pageSize = 2;
  collectionSize:number;

  term = 'null'


  open(content,idMeasure?:string,typeMeasure?:string) {
    this.idMnumber=Number.parseInt(idMeasure)
    this.idMstring=idMeasure;
    this.typeM=typeMeasure;


    console.log("idN: "+this.idMnumber+" tipo misura: "+this.typeM)
    this.modalService.open(content, { size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.createMeasureUnitForm.reset()
      this.updateMeasureUnitForm.reset()
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  constructor(private measureUnitService: MeasureUnitService, private store: Store, private router: Router, private fb:FormBuilder, private modalService: NgbModal) {
    this.measureUnitService.retrieveAllMeasures();
   }

  ngOnInit(): void {


    this.store.pipe(select(selectMeasures)).subscribe((measures) => {
      this.collectionSize=measures.length;
    })

    this.cercaForm=this.fb.group({
      termine: ['', Validators.required]
    })

    this.updateMeasureUnitForm=this.fb.group({
      vecchio: ['', Validators.required],
      nuovo: ['', Validators.required]
    })

    this.createMeasureUnitForm=this.fb.group({
      tipo: ['', Validators.required]
    })
    
    this.deleteMeasureUnitForm=this.fb.group({
      id: ['', Validators.required]
    })
  }

  get measures(): Observable<MeasureUnit[]> {
    return this.store.pipe(select(selectMeasures));
  }

  create(){
    console.log("add function ")
    this.measureUnitService.create(this.createMeasureUnitForm.value.tipo)
  }

  updateM(){
    console.log("update function")
    console.log("vecchia unita: ",this.updateMeasureUnitForm.value.vecchio)
    console.log("nuova unita: ",this.updateMeasureUnitForm.value.nuovo)
    this.measureUnitService.update(this.updateMeasureUnitForm.value.nuovo, this.updateMeasureUnitForm.value.vecchio)
  }

  deleteM(){

    console.log("delete")
    this.measureUnitService.delete(this.idMstring.toString())

  }

  searchTerm(){
    this.term = this.cercaForm.value.termine
    console.log("cerco con termine: ",this.term)

    //per evitare errore paginazione
    this.pageSize = 1000;
  }

  resetSearchBar(){
    this.term = 'null';
    this.pageSize = 2
  }


}
