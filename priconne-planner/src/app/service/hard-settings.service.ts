import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Hard } from '../model/hard.model'
import { HardSettings } from '../model/hard-settings.model'
import { HardService } from '../service/hard.service'


@Injectable({
  providedIn: 'root'
})
export class HardSettingsService {

  STORAGE_KEY = 'hard_settings'

  constructor(private hardService: HardService) {}

  load(): HardSettings[] {
    const result: HardSettings[] = []
    const rawArray = JSON.parse(localStorage.getItem(this.STORAGE_KEY))
    const hards = this.hardService.hards

    for (let i = 0 ; i < hards.length ; i++) {
      if (rawArray && i < rawArray.length) {
        const rawValue = rawArray[i]
        const settings = new HardSettings(hards[rawValue.index])
        settings.amount = Math.floor(rawValue.amount)
        settings.index = i
        result.push(settings)
      } else {
        const settings = new HardSettings(hards[i])
        settings.index = i
        result.push(settings)
      }
    }

    return result
  }

  save(items: HardSettings[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

}
