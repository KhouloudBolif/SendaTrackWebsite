export class BankPerson{
  id: any
  // accountID: any
  bankId: any
  lastName: any
  firstName: any
  civility: any
  role: any
  tel: any
  GSM: any
  fax:any
  email: any

  constructor(bankId?, lastName?, firstName?, civility?, role?, tel?, GSM?, fax?, email?) {
    this.bankId = bankId?? 0
    this.lastName=lastName?? ''
    this.firstName=firstName?? ''
    this.civility = civility?? []
    this.role=role?? 0.00
    this.tel=tel?? ''
    this.GSM = GSM?? ''
    this.fax=fax?? ''
    this.email=email?? ''
  }
}
