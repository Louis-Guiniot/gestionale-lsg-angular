import { Component, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SelectEventArgs, SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('sidebarInstance')
    public sidebarInstance: SidebarComponent;
    public width: string = '100%';
    public type: string = 'Over';
    title = 'gestionaleLSG'

    pages = [
        { path:'/home',icon: 'bi bi-house'},
        { path:'/tabbed/invoices',icon: 'bi bi-cash'},
        { path:'/customers',icon: 'bi bi-people'},
        { path:'/products',icon: 'bi bi-box-seam'},
        { path:'/measureunit',icon: 'bi bi-tools'},
        { path:'/iva',icon: 'bi bi-percent'},
    ]

    constructor(private router: Router) { }

    closed = true
    openClick() {
        this.sidebarInstance.show();
    }
    closeClick() {
        this.sidebarInstance.hide();
    }

    redirectToHome() {
        this.router.navigateByUrl("/home")
        this.sidebarInstance.hide();
    }

    redirectToCust() {
        this.router.navigateByUrl("/customers")
        this.sidebarInstance.hide();
    }

    redirectToProd() {
        this.router.navigateByUrl("/products")
        this.sidebarInstance.hide();
    }

    redirectToInvo() {
        this.router.navigateByUrl("/tabbed/invoices")
        this.sidebarInstance.hide();
    }

    redirectToMeas() {
        this.router.navigateByUrl("/measureunit")
        this.sidebarInstance.hide();
    }

    redirectToIva() {
        this.router.navigateByUrl("/iva")
        this.sidebarInstance.hide();
    }

}