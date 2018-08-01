import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Character } from '../model/character.model'
import { CharacterSettings } from '../model/character-settings.model'
import { CharacterService } from '../service/character.service'

@Injectable({
  providedIn: 'root'
})
export class CharacterSettingsService {

  STORAGE_KEY = 'character_settings'

  constructor(private characterService: CharacterService) {}

  load(): CharacterSettings[] {
    const result: CharacterSettings[] = []
    const rawArray = JSON.parse(localStorage.getItem(this.STORAGE_KEY))
    const characterMap = this.characterService.characterMap
    let unloadedCharacterNames = Object.keys(characterMap)

    if (rawArray) {
      for (const rawValue of rawArray) {
        const name = rawValue.character.name
        const settings = new CharacterSettings(characterMap[name])
        settings.rank = rawValue.rank
        settings.enabled = rawValue.enabled
        settings.enabledEquipments = rawValue.enabledEquipments
        result.push(settings)
        unloadedCharacterNames = unloadedCharacterNames.filter(n => n !== name)
      }
    }

    for (const name of unloadedCharacterNames) {
      result.push(new CharacterSettings(characterMap[name]))
    }

    return result
  }

  save(items: CharacterSettings[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

}
