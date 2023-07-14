export class DeliveryItem {
  id: any
  id_delivery: any
  id_Order: any
  id_OrderItem: any
  sort: any
  Reference: any
  designation: any
  Qte: any
  QteLivre: any
  quantity: any
  price: any
  TVA: any
  Remise: any
  totalHT: any
  totalTTC: any
  // id_Client: any
  // ,id_Client?, IdVehicule?
  // IdVehicule: any
  Facturable: any
  alert: boolean

  constructor(id?,id_delivery?, id_Order?, id_OrderItem?, sort?, Reference?, designation?, Qte?, QteLivre?, quantity?, price?, Facturable?,  TVA?, Remise?, totalHT?, totalTTC?, alert?) {
    this.id = id ?? 0
    this.id_delivery = id_delivery ?? ''
    this.id_Order = id_Order ?? 0
    this.id_OrderItem = id_OrderItem ?? 0
    this.sort = sort ?? ''
    this.Reference = Reference ?? ''
    this.designation = designation ?? ''
    this.Qte = Qte ?? null
    this.QteLivre = QteLivre ?? 0
    this.quantity = quantity
    this.price = price ?? 0
    this.TVA = TVA ?? 0
    this.Remise = Remise ?? 0
    this.totalHT = totalHT ?? 0
    this.totalTTC = totalTTC ?? 0
    // this.id_Client = id_Client?? 0
    // this.IdVehicule=IdVehicule??0
    this.Facturable=Facturable??0
    this.alert=alert?? false
  }

}
