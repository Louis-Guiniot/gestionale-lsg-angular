export interface Invoice{
    id?: number;
    codeInvoice: string;
    totalPrice:string;
    idCustomer:string;
    productfields?:[]; //codice, nome, unità misura, prezzo ecc
}