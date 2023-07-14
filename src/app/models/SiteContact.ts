export class SiteContact {

  id: any
  id_contact: any
  NameSite: any
  Address: any
  coordGPS: any
  Description: any
  Responsable: any
  Id_City: any
  created_at: any

  constructor(id?, id_contact?, NameSite?, Address?,coordGPS?, Description?, Responsable?, Id_City?, created_at?,)
  {
      this.id= id ?? 0
      this.id_contact= id_contact ?? ''
      this.NameSite= NameSite ?? ''
      this.Address= Address ?? ''
      this.coordGPS= coordGPS ?? ''
      this.Description= Description ?? ''
      this.Responsable= Responsable ?? ''
      this.Id_City= Id_City ?? 0
      this.created_at= created_at ?? ''
  }
}
