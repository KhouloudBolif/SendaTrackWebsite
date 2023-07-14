import { BankPerson } from "./bankPerson"

export class Bank {
  id: any
  cp: any
  fax: any
  name: any
  accountNum: any
  accountable: any
  tel1: any
  tel2: any
  city: any
  editionType: any
  swift: any
  iban: any
  amount: any
  rib: any
  // debit: any
  // credit: any
  address: any
  // observation: any
  // bankPersons: BankPerson[]

  constructor(cp?, fax?, name?, accountNum?, accountable?, tel1?, tel2?, city?, editionType?, swift?, iban?, amount?, rib?, address?) {
    this.cp = cp ?? ''
    this.fax = fax ?? ''
    this.name = name ?? ''
    this.accountNum = accountNum ?? ''
    this.accountable = accountable ?? ''
    this.tel1 = tel1 ?? ''
    this.tel2 = tel2 ?? ''
    this.city = city ?? 0
    this.editionType = editionType ?? ''
    this.swift = swift ?? ''
    this.iban = iban ?? ''
    this.amount = amount ?? 0.00
    this.rib = rib ?? ''
    this.address = address ?? ''
    // this.bankPersons = bankPersons ?? [new BankPerson()]
  }
}
