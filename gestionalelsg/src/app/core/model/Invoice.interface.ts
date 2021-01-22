export interface Invoice{
    id?: number;
    codeInvoice: string;
    totalPrice:string;
    idCustomer:string;
    productFields:string; //codice, nome, unità misura, prezzo ecc
}