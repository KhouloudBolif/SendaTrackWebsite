export class Contact {

    id: any
    Company: any
    ICE: any
    TypeContact: any
    Address: any
    Id_City: any
    Tel1: any
    Tel2: any
    GSM: any
    Fax: any
    Email: any
    WebSite: any
    CodePostal: any
    Observation: any
    NameBank: any
    CompteBank: any
    
  
    Id_TypeFournisseur: any
  
    Commercial: any
    CNSS: any
    RC: any
    NumPatente: any
    FormeJuridique: any
    Id_FamilleClient: any
    Id_SecteursActivite: any
    Credit_Cap: any
    Payment_deadline: any
    Token: any
    Id_Fiscale: any
    CompteCtbl: any
    IsActive: any
    created_at: any
  
    constructor(id?, Company?, ICE?, TypeContact?, Address?, Id_City?, Tel1?, Tel2?, GSM?, Fax?, Email?, WebSite?, CodePostal?,
         Observation?, NameBank?, CompteBank?, Id_TypeFournisseur?, Commercial?, CNSS?, RC?, NumPatente?, FormeJuridique?, Id_FamilleClient?, 
         Id_SecteursActivite?, Credit_Cap?, Payment_deadline?, Token?, Id_Fiscale?, CompteCtbl?, IsActive?, created_at?,)
    {
        this.id= id ?? 0
        this.Company= Company ?? ''
        this.ICE= ICE ?? ''
        this.TypeContact= TypeContact ?? ''
        this.Address= Address ?? ''
        this.Id_City= Id_City ?? 0
        this.Tel1= Tel1 ?? ''
        this.Tel2= Tel2 ?? ''
        this.GSM= GSM ?? ''
        this.Fax= Fax ?? ''
        this.Email= Email ?? ''
        this.WebSite= WebSite ?? ''
        this.CodePostal= CodePostal ?? ''
        this.Observation= Observation ?? ''
        this.NameBank= NameBank ?? ''
        this.CompteBank= CompteBank ?? ''
        this.Id_TypeFournisseur= Id_TypeFournisseur ?? 0
        this.Commercial= Commercial ?? ''
        this.CNSS= CNSS ?? ''
        this.RC= RC ?? ''
        this.NumPatente= NumPatente ?? ''
        this.FormeJuridique= FormeJuridique ?? ''
        this.Id_FamilleClient= Id_FamilleClient ?? 0
        this.Id_SecteursActivite= Id_SecteursActivite ?? 0
        this.Credit_Cap= Credit_Cap ?? 0
        this.Payment_deadline= Payment_deadline ?? 0
        this.Token= Token ?? ''
        this.Id_Fiscale= Id_Fiscale ?? 0
        this.CompteCtbl= CompteCtbl ?? ''
        this.IsActive= IsActive ?? 1
        this.created_at= created_at ?? ''
    }
}