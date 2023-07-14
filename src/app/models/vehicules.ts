export class Vehicules {
id:any
deviceID :any 
immatriculation :any
marque:any
modele:any
etat:any
type_motorisation:any
capacite_tonnage:any
client:any

categories:any
Carburant:any
mode_acquisition:any
nb_place:any
Puissance:any
date_acquisition:any
carte_grise:any
recervoir1:any
recervoir2:any
adblue:any
statut: any
KM:any
trajet:any
sortie:any
date_sortie:any
motif:any
couleur:any
trabsmission:any
date_circulation:any
nb_chaises:any
conso_max:any
KM_acquistion:any

vehicule_international:any
date_releve:any
kilometrage_releve:any
code_GPS:any
equipage_gps:any
on_off_GPS:any
constructor( id?, deviceID?,
immatriculation?,
marque?,
modele?,
etat?,
type_motorisation?,
capacite_tonnage?,
client?,
catégories?,
Carburant?,
mode_acquisition?,
nb_place?,
Puissance?,
date_acquisition?,
carte_grise?,
recervoir1?,
recervoir2?,
adblue?,
statut?,
KM?,
trajet?,
sortie?,
date_sortie?,
motif?,
couleur?,
trabsmission?,
date_circulation?,
nb_chaises?,
conso_max?,
KM_acquistion?,
vehicule_international?,
date_releve?,
kilometrage_releve?,
code_GPS?,
equipage_gps?,
on_off_GPS?){
    this.id= id ?? '4'
    this.deviceID = deviceID ?? ''
    this.immatriculation = immatriculation ?? ''
    this.marque= marque?? ''
    this.modele=modele?? '' 
    this.etat = etat ?? ''
    this.type_motorisation = type_motorisation ?? ''
    this.capacite_tonnage =capacite_tonnage ?? ''
    this.client =client?? ''
    this.categories=catégories?? ''
    this.Carburant=Carburant?? ''
    this.mode_acquisition =mode_acquisition?? ''
    this.nb_place =nb_place?? ''
    this.Puissance =Puissance?? ''
    this.date_acquisition=date_acquisition?? ''
    this.carte_grise =carte_grise?? ''
    this.recervoir1= recervoir1?? ''
    this.recervoir2= recervoir2?? ''
    this.adblue= adblue?? ''
    this.statut= statut?? ''
    this.KM= KM?? ''
    this.trajet= trajet?? ''
    this.sortie= sortie?? ''
    this.date_sortie= date_sortie?? ''
    this.motif= motif?? ''
    this.couleur= couleur?? ''
    this.trabsmission=trabsmission?? ''
    this.date_circulation= date_circulation?? ''
    this.nb_chaises= nb_chaises?? ''
    this.conso_max= conso_max?? ''
    this.KM_acquistion= KM_acquistion?? ''
    this.vehicule_international= vehicule_international?? ''
    this.date_releve= date_releve?? ''
    this.kilometrage_releve= kilometrage_releve?? ''
    this.code_GPS=code_GPS?? ''
    this.equipage_gps= equipage_gps?? ''
    this.on_off_GPS= on_off_GPS?? ''
}
    


}