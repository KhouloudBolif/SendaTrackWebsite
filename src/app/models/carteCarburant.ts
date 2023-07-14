export class CarteCarburant{
    id?:any;
    NumCarte:any;
    TypeCarte:any;
    Plafond:any;
    id_Contact:any;
    driverID:any;
    constructor(id?,NumCarte?,TypeCarte?,Plafond?,id_Contact?,driverID?){
        this.id=id ?? ''
        this.NumCarte=NumCarte ?? ''
        this.TypeCarte=TypeCarte ?? ''
        this.Plafond=Plafond ?? ''
        this.id_Contact=id_Contact?? ''
        this.driverID=driverID?? ''
    }    
    }