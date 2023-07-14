import { BillItem } from './billItem';
export class Bill{
  id: any
  billNum: any
  billDate: any
  billDateString: any
  echeanceDate: any
  echeanceDateString: any
  supplierBillNum: any
  id_Contact: any
  paiementMode: any
  billItemsList: BillItemList[]
  totalHT: any
  totalTVA:any
  totalRemise: any
  totalTTC: any
  status: any
  valideON: any
  ComptabiliseON: any
  observation: any


  constructor(billNum?, billDate?, billDateString?, echeanceDate?, echeanceDateString?, supplierBillNum?, id_Contact?, paiementMode?, billItemsList?, totalHT?, totalTVA?, totalTTC?, totalRemise?, status?, valideON?, ComptabiliseON?, observation?) {
    this.billNum = billNum?? ''
    this.billDate = billDate?? 0
    this.billDateString = billDateString?? ''
    this.echeanceDate= echeanceDate?? 0
    this.echeanceDateString= echeanceDateString??''
    this.supplierBillNum = supplierBillNum?? ''
    this.id_Contact = id_Contact?? ''
    this.paiementMode = paiementMode?? 123
    this.billItemsList = billItemsList?? [new BillItemList()]
    this.totalHT=totalHT?? 0.00
    this.totalTVA=totalTVA?? 0.00
    this.totalRemise=totalRemise?? 0.00
    this.totalTTC=totalTTC?? 0.00
    this.status = status?? 'NONREGLE'
    this.valideON = valideON?? 0
    this.ComptabiliseON = ComptabiliseON??  0
    this.observation=observation?? ''
  }
}
export class BillItemList{
  id: any
  billId: any
  idDelivery: any
  deliveryNum: any
  billItems: BillItem[]
  isCollapsed: boolean =false
  constructor(billId?, idDelivery?, deliveryNum?, billItems?,isCollapsed?){
    this.billId=billId?? ''
    this.idDelivery=idDelivery?? 0
    this.deliveryNum=deliveryNum??''
    this.billItems=billItems??[new BillItem()]
    this.isCollapsed = isCollapsed?? false
  }
}
