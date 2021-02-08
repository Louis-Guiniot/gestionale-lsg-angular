export interface Invoice{
    id?: number;
    codeInvoice: string;
    totalPrice:string;
    idCustomer:string;
    productFields:string; //codice, nome, unità misura, prezzo ecc
    dateTime:string;
    sconto:string;
    iva:string;
    ivaPrice:string;
    totalToPay:string;
    totaleServizi:string;
    imponibile:string;
    tipoDocumento:string;
    condizionePagamento:string;
    //dopo update
    quantita:string;
    importoSconto:string;
    totaleMerci:string;
}