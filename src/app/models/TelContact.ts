export class TelContact {

  id: any
  id_contact: any
  Last_Name: any
  First_Name: any
  Civility: any
  Role: any
  Tel1: any
  GSM: any
  Fax: any
  Email: any
  created_at: any


  constructor(id?, id_contact?, Last_Name?, First_Name?, Civility?, Role?, Tel1?, GSM?, Fax?, Email?, created_at?,)
  {
      this.id= id ?? 0
      this.id_contact= id_contact ?? ''
      this.Last_Name= Last_Name ?? ''
      this.First_Name= First_Name ?? ''
      this.Civility= Civility ?? ''
      this.Role= Role ?? ""
      this.Tel1= Tel1 ?? ''
      this.GSM= GSM ?? ''
      this.Fax= Fax ?? ''
      this.Email= Email ?? ''
      this.created_at= created_at ?? ''
  }
}
