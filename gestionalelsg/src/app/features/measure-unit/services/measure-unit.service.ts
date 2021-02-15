import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createMeasure, deleteMeasure, retrieveAllMeasures, updateMeasure } from 'src/app/redux/measure/measure.actions';

@Injectable({
  providedIn: 'root'
})
export class MeasureUnitService {
  

  constructor(private store: Store) { }

  create(tipo: string) {
    this.store.dispatch(createMeasure({tipo}))
    
  }
  retrieveAllMeasures(){
    this.store.dispatch(retrieveAllMeasures());
  }

  update(tipo: string, measureUnit:string) {
    this.store.dispatch(updateMeasure({tipo,measureUnit}))
  }
  delete(id:string){
    this.store.dispatch(deleteMeasure({id}));
  }
}
