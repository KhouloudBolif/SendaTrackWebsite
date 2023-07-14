export class Demandeinterventions{
    id:any
      deviceID: any
      statut: any
      DateIntervention: any
      dateString: any
      id_employe: any
      description: any
      typepanne: any
    
      typeintervention: any
    
      operation: any
      constructor(id?, deviceID?,statut?,DateIntervention?, dateString?, id_employe?,description?,typeintervention?,typepanne?,Km?,Diagn?,login?,DateCreation?,idVehicule?) {
          this.id = id ??0
          this.DateIntervention = DateIntervention ??0
          this.dateString = dateString ??''
          this.statut = statut?? 'Encours'
          this. deviceID= deviceID?? ''
          this.id_employe=id_employe?? ''
          this.description = description?? ''
          this.typeintervention = typeintervention?? ''
          this.typepanne= typepanne ?? ''
    
      }
    }
    