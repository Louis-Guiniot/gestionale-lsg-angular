import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createMeasure } from 'src/app/redux/measure/measure.actions';

@Injectable({
  providedIn: 'root'
})
export class MeasureUnitService {
  

  constructor(private store: Store) { }

  create(tipo: string) {
    this.store.dispatch(createMeasure({tipo}))
    
  }
}
