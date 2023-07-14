export class BillItem{
  id: any
  id_DeliveryItem: any
  sort: any
  Reference: any
  designation: any
  quantity: any
  price: any
  TVA: any
  Remise: any
  totalHT: any
  totalTTC: any

  constructor(id_DeliveryItem?, sort?, Reference?, designation?, quantity?, price?, tva?, remise?, totalHT?, totalTTC?) {
    this.id_DeliveryItem = id_DeliveryItem?? 0
    this.sort = sort?? ''
    this.Reference = Reference?? ''
    this.designation = designation?? ''
    this.quantity = quantity?? 1
    this.price = price?? 0.00
    this.TVA=tva??0.00
    this.Remise = remise?? 0.00
    this.totalHT = totalHT?? 0.00
    this.totalTTC=totalTTC??0.00
  }
}
