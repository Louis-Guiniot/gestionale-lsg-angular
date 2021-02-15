import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  updateMeasureUnitForm: FormGroup
  deleteMeasureUnitForm: FormGroup

  constructor(private measureUnitService: MeasureUnitService, private store: Store, private route: Router, private fb:FormBuilder, private modalService: NgbModal) {
    this.measureUnitService.retrieveAllMeasures();
   }

  ngOnInit(): void {
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
    console.log("add function ",)
    this.measureUnitService.create(this.createMeasureUnitForm.value.tipo)
  }

  update(){
    console.log("update function")
    console.log("vecchia unita: ",this.updateMeasureUnitForm.value.vecchio)
    console.log("nuova unita: ",this.updateMeasureUnitForm.value.nuovo)
    this.measureUnitService.update(this.updateMeasureUnitForm.value.nuovo, this.updateMeasureUnitForm.value.vecchio)
  }

  delete(){

    console.log("delete")

    this.measureUnitService.delete(this.deleteMeasureUnitForm.value.id)

  }
  

}
