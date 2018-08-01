import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Character } from '../model/character.model'

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  characterMap: { string: Character }

  constructor(private http: HttpClient) {}

  load(finished: () => void) {
    this.http.get('assets/characters.json').subscribe(characters => {
      this.characterMap = {} as { string: Character }
      for (const name of Object.keys(characters)) {
        this.characterMap[name] = new Character(name, characters[name])
      }
      finished()
    })
  }

}
