export interface BodyInvoice{
    id?: number;
    idInvoice: string;
    codiceArticolo:string;
    descrizione:string;
    unitaMisura:string; 
    quantita:string;
    importoUnitario:string;
    scontoFormula:string;
    prezzoNetto:string;
    importoSconto:string;
    imponibile:string;
    iva:string;
    imposta:string;
    totaleRighe:string;
    totaleMerce:string;
    totaleServizi:string;
}