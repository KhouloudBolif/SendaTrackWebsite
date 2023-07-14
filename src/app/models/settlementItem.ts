export class SettlementItem{
  id: any
  settlementId: any
  billId: any
  billNum: any
  totalTTC: any
  paiedAmount: any
  remainingAmount:any
  amountToPay: any
  remainingAfter: any
  alert:any

  constructor(settlementId?, billId?, billNum?, totalTTC?, paiedAmount?, remainingAmount?, amountToPay?, remainingAfter?, alert?) {
    this.settlementId = settlementId?? ''
    this.billId = billId?? 0
    this.billNum = billNum?? ''
    this.totalTTC= totalTTC?? 0.00
    this.paiedAmount= paiedAmount?? 0.00
    this.remainingAmount = remainingAmount?? 0.00
    this.amountToPay = amountToPay?? 0
    this.remainingAfter = remainingAfter?? 0.00
    this.alert = alert?? false
  }
}
