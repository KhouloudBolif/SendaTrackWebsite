export class OrderItem{
  id: any
  id_order: any
  accountID: any
  sort: any
  Reference: any
  designation: any
  supplierRef: any
  Qte: any
  QteLivre: any
  price: any
  TVA: any
  Remise: any
  id_Client: any
  IdVehicule: any
  Facturable: any
  totalHT: any
  totalTTC: any


  constructor(id_order?, accountID?, sort?, Reference?, designation?, supplierRef?, Qte?, QteLivre?, price?, TVA?, Remise?,id_Client?, IdVehicule?, Facturable?, totalHT?, totalTTC?) {
    this.id_order = id_order?? ''
    this.accountID = accountID?? ''
    this.sort = sort?? 0
    this.Reference = Reference?? ''
    this.designation = designation?? ''
    this.supplierRef = supplierRef?? ''
    this.Qte = Qte?? 1
    this.QteLivre = QteLivre?? 0
    this.price = price?? 0
    this.TVA=TVA??0
    this.Remise = Remise?? 0
    this.id_Client = id_Client?? 0
    this.IdVehicule=IdVehicule??0
    this.Facturable=Facturable??0
    this.totalHT = totalHT?? 0
    this.totalTTC=totalTTC??0

  }
}
