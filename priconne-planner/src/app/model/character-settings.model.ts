import { Character } from './character.model'

export class CharacterSettings {

  rank = 0
  enabled = true
  enabledEquipments = [false, false, false, false, false, false]
  MAX_RANK = 11
  character: Character

  constructor(character: Character) {
    this.character = character
  }

}
