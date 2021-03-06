import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iva',
  templateUrl: './iva.component.html',
  styleUrls: ['./iva.component.scss']
})
export class IvaComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.route.navigateByUrl("/iva")
  }

}
