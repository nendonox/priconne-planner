import { Component, OnInit } from '@angular/core'
import { CharacterSettingsService } from '../service/character-settings.service'
import { CharacterSettings } from '../model/character-settings.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] })
export class AppComponent implements OnInit {

  characterSettingsList: CharacterSettings[]

  constructor(
    private characterSettingsService: CharacterSettingsService) {
  }

  ngOnInit() {
    this.characterSettingsList = this.characterSettingsService.load()
  }

  save() {
    this.characterSettingsService.save(this.characterSettingsList)
  }

  sortByRank() {
   this.characterSettingsList.sort((a, b) => {
      let score = 0
      if (!a.enabled) { score += 100 }
      if (!b.enabled) { score -= 100 }
      score -= a.rank * 10
      score += b.rank * 10
      score -= a.enabledEquipments.reduce((ac, v) => v ? ac + 1 : ac, 0)
      score += b.enabledEquipments.reduce((ac, v) => v ? ac + 1 : ac, 0)
      return score
    })
    this.save()
  }

  splashLive() {
    const audio = document.getElementById('splash-live') as HTMLVideoElement
    audio.play()
  }

}
