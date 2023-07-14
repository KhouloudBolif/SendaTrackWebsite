export class Article {

    Reference: any
    Designation: any
    Vendable: any 
    Prix_achat: any
    prix_vente: any
    id_FamillesArticle: any
    id_SousFamillesArticle: any
    IDTypeArticle: any
    Type: any
    Observation: any
    Tva: any
    QteAlerte: any
    NumSerie: any
    codebarre1: any
    codebarre2: any
    Marque: any
    QteStock: any
    CarburantON: any
    created_at: any

    
  
    constructor(Reference?, Designation?, Vendable?, Prix_achat?, prix_vente?, id_FamillesArticle?, id_SousFamillesArticle?, IDTypeArticle?, Type?, Fax?, Email?, WebSite?, CodePostal?,
         Observation?, Tva?, QteAlerte?, NumSerie?, codebarre1?, codebarre2?, Marque?, QteStock?, CarburantON?, created_at?,)
    {
        this.Reference= Reference ?? ''
        this.Designation= Designation ?? ''
        this.Vendable= Vendable ?? 0
        this.Prix_achat= Prix_achat ?? 0.00
        this.prix_vente= prix_vente ?? 0.00
        this.id_FamillesArticle= id_FamillesArticle ?? 0
        this.id_SousFamillesArticle= id_SousFamillesArticle ?? 0
        this.IDTypeArticle= IDTypeArticle ?? 0
        this.Type= Type ?? ''
        this.Observation= Observation ?? ''
        this.Tva= Tva ?? 0
        this.QteAlerte= QteAlerte ?? 0
        this.NumSerie= NumSerie ?? 0
        this.codebarre1= codebarre1 ?? ''
        this.codebarre2= codebarre2 ?? ''
        this.Marque= Marque ?? ''
        this.QteStock= QteStock ?? 0
        this.CarburantON= CarburantON ?? 0
        this.created_at= created_at ?? 0
    }
}