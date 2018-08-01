import { Equipment } from './equipment.model'

export class Character {
  name: string
  equipmentNames: Array<string>

  constructor(name, equipmentNames) {
    this.name = name
    this.equipmentNames = equipmentNames
  }

  getImageUrl() {
    return 'assets/character-images/' + this.name + '.jpg'
  }
}
