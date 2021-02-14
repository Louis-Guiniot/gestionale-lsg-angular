import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ProductsService } from '../../products/service/products.service';
import { MeasureUnitService } from '../services/measure-unit.service';

@Component({
  selector: 'app-measure-unit',
  templateUrl: './measure-unit.component.html',
  styleUrls: ['./measure-unit.component.scss']
})
export class MeasureUnitComponent implements OnInit {

  createMeasureUnitForm: FormGroup;

  constructor(private measureUnitService: MeasureUnitService, private store: Store, private route: Router, private fb:FormBuilder, private modalService: NgbModal) {

   }

  ngOnInit(): void {
    this.createMeasureUnitForm=this.fb.group({
      tipo: ['', Validators.required]
    })
  }

  create(){
    console.log("add function")
    this.measureUnitService.create(this.createMeasureUnitForm.value.tipo)
  }

}
