

export interface DocTypeState { 
    documents: DocumentType[]
}




// export const initialState: DocTypeState = {
//     documents: []
// };

// export const invoiceReducer = createReducer(
//     initialState,
//     on(initInvoices, (state, { response }) => ({ ...state, documents: response.result })),
//     on(initInvoiceFounds, (state, { response }) => ({ ...state, documents: response.result })),
    
// );
// //----//
// export function reducer(state: InvoiceState, action: Action) {
//     return invoiceReducer(state, action);
// }