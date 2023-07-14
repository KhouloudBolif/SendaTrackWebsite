export class Employee{
  id: any
  lastName: any
  firstName: any
  address: any
  id_City: any
  tel: any
  email: any
  CIN: any
  CNSS: any
  GsmUrgence: any
  NumMatricule: any
  DateNaissance: any
  DateNaissanceString: any
  DateEmbauche: any
  DateEmbaucheString: any
  DateSortie: any
  DateSortieString: any
  Sortie: any
  Departement: any
  fonction: any
  login: any
  password: any
  isActive: any

  constructor(id?,lastName?, firstName?, address?, id_City?, tel?, email?,   CIN?, CNSS?, GsmUrgence?, NumMatricule?, DateNaissance?, DateNaissanceString?, DateEmbauche?, DateEmbaucheString?, DateSortie?,DateSortieString?,  Sortie?, Departement?, fonction?, login?,password?,isActive?) {
    this.id=id?? ''
    this.lastName=lastName?? ''
    this.firstName=firstName?? ''
    this.address=address?? ''
    this.id_City =id_City?? 0
    this.tel=tel?? ''
    this.email=email?? ''
    this.CIN=CIN?? ''
    this.CNSS=CNSS?? ''
    this.GsmUrgence=GsmUrgence?? ''
    this.NumMatricule=NumMatricule?? ''
    this.DateNaissance=DateNaissance?? 0
    this.DateNaissanceString=DateNaissanceString?? ''
    this.DateEmbauche=DateEmbauche?? 0
    this.DateEmbaucheString=DateEmbaucheString?? ''
    this.DateSortie=DateSortie?? 0
    this.DateSortieString=DateSortieString?? ''
    this.Sortie=Sortie?? 0
    this.Departement=Departement?? 0
    this.fonction=fonction?? ''
    this.login=login?? ''
    this.password=password?? ''
    this.isActive=isActive?? 1
  }
}
