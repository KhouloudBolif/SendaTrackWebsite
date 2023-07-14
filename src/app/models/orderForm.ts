import {OrderItem} from "./orderItem";

export class OrderForm {
  id: any
  orderNum: any
  accountID: any
  orderDate: any
  orderDateString: any
  deliveryDate: any
  deliveryDateString: any
  depot: any
  deliveryAdress: any
  id_Contact: any
  observation: any
  totalHT: any
  totalTVA:any
  totalRemise: any
  totalTTC: any
  status: any
  login: any
  BCI: any
  created_at: any
  orderItems: OrderItem[]

  constructor(orderNum?, accountID?, orderDate?, orderDateString?, deliveryDate?, deliveryDateString?, depot?, deliveryAdress?, id_Contact?, observation?, totalHT?, totalTVA?, totalRemise?, totalTTC?, status?, login?, BCI?, created_at?, orderItems?) {
    this.orderNum = orderNum?? ''
    this.accountID = accountID?? ''
    this.orderDate = orderDate?? 0
    this.orderDateString = orderDateString?? ''
    this.deliveryDate = deliveryDate?? 0
    this.deliveryDateString = deliveryDateString?? ''
    this.depot = depot?? ''
    this.deliveryAdress = deliveryAdress?? ''
    this.id_Contact = id_Contact?? ''
    this.observation=observation?? ''
    this.totalHT=totalHT?? 0.00
    this.totalTVA=totalTVA?? 0.00
    this.totalRemise=totalRemise?? 0.00
    this.totalTTC=totalTTC?? 0.00
    this.status=status?? 'ENCOURS'
    this.login=login?? ''
    this.BCI=BCI?? ''
    this.created_at=BCI?? ''
    this.orderItems = orderItems??  [new OrderItem()]
  }
}
