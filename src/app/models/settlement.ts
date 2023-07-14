import { SettlementItem } from "./settlementItem"

export class Settlement{
  id: any
  settlementNum: any
  settlementDate: any
  settlementDateString: any
  dueDate: any
  dueDateString: any
  billNum: any
  id_Contact: any
  settlementMode: any
  settlementItems: SettlementItem[]
  amountToPay: any
  remainingAmount:any
  status: any
  numPiece: any
  bankId: any
  observation: any

  constructor(settlementNum?, settlementDate?, settlementDateString?, dueDate?, dueDateString?, billNum?, id_Contact?, settlementMode?, settlementItems?, amountToPay?, status?, numPiece?, bankId?, observation?) {
    this.settlementNum = settlementNum?? ''
    this.settlementDate = settlementDate?? 0
    this.settlementDateString = settlementDateString?? ''
    this.dueDate= dueDate?? 0
    this.dueDateString= dueDateString??''
    this.billNum = billNum?? ''
    this.id_Contact = id_Contact?? ''
    this.settlementMode = settlementMode?? ''
    this.settlementItems = settlementItems?? []
    this.amountToPay=amountToPay?? 0.00
    this.status = status?? 'EMIS'
    this.numPiece = numPiece?? 0
    this.bankId = bankId?? 0
    this.observation=observation?? ''
  }
}
