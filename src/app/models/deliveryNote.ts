import { DeliveryItem } from './deliveryItem';
export class DeliveryNote{

    id: any
    deliveryNum: any
    deliveryDate: any
    deliveryDateString: any
    deliveryItemsList: DeliveryItems[]
    id_Contact: any
    supplierDeliveryNum: any
    depot: any
    billNum: any
    bill: any
    observation: any
    totalHT: any
    totalTVA: any
    totalRemise: any
    totalTTC: any
    login: any
    // bill: any
    settlementNum: any
    // address: any

    constructor(deliveryNum?, deliveryDate?, deliveryDateString?, deliveryItemsList?,id_Contact?, supplierDeliveryNum?, depot?, billNum?,bill?, settlementNum?, observation?, totalHT?, totalTVA?, totalRemise?, totalTTC?, login?){
        this.deliveryNum=deliveryNum??''
        this.deliveryDate=deliveryDate?? 0
        this.deliveryDateString=deliveryDateString?? ''
        this.deliveryItemsList=deliveryItemsList??[new DeliveryItems()]
        this.id_Contact=id_Contact?? 0
        this.supplierDeliveryNum=supplierDeliveryNum??''
        this.depot=depot?? 0
        this.billNum=billNum??''
        this.bill=bill??0
        this.observation = observation??''
        this.totalHT=totalHT??0
        this.totalTVA=totalTVA??0
        this.totalRemise=totalRemise??0
        this.totalTTC=totalTTC??0
        this.login=login??''
        this.settlementNum = settlementNum??''
        // this.address = address??''
    }
}



export class DeliveryItems{
  id_order: any
  orderNum: any
  deliveryItems: DeliveryItem[]
  isCollapsed: boolean
  constructor(id_order?, orderNum?, deliveryItems?,isCollapsed?){
    this.id_order=id_order?? 0
    this.orderNum=orderNum??'Libre'
    this.deliveryItems=deliveryItems??[new DeliveryItem()]
    this.isCollapsed = isCollapsed?? false
  }
}
