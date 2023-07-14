export class intervention {
    /* operation: any
     decKmValue: any
     decDateValueString: string | number | Date
     decDateValue: number
     dateFill(dateFill: any) {
       throw new Error('Method not implemented.')
     }*/
     id: any
     matricule: any
     statut: any
     date: any
     demandeur: any
     description: any
     //type_maintenance: any
     typepanne: any
     /*Km: any
     Diagn:any
     login : any
     DateCreation: any
     idVehicule: any
     deviceID: any
     kmEncours: any
     operation: any
     decDateValue: any
     decDateValueString:any
     decKmValue: any*/
     typeintervention: any
   
     operation: any
     constructor(id?,matricule?,statut?,date?,demandeur?,description?,typeintervention?,typepanne?,Km?,Diagn?,login?,DateCreation?,idVehicule?) {
         this.id = id ?? 0
         this.date = date ??0
         this.statut = statut?? 'Encours'
         this.matricule=matricule?? ''
         this.demandeur= demandeur ?? ''
         this.description = description?? ''
         this.typeintervention = typeintervention?? ''
         this.typepanne= typepanne ?? ''
          /*this.Km = Km?? 0
         this.Diagn = Diagn ?? ''
         this.login = login ?? ''
         this.DateCreation = DateCreation ?? 0
         this.idVehicule = idVehicule ?? ''*/
     }
   }