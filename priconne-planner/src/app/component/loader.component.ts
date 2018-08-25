import { Component } from '@angular/core'
import { CharacterService } from '../service/character.service'
import { EquipmentService } from '../service/equipment.service'
import { HardService } from '../service/hard.service'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent {

  loadedCount = 0

  constructor(
    private characterService: CharacterService,
    private hardService: HardService,
    private equipmentService: EquipmentService) {
    characterService.load(() => {
      this.loadedCount += 1
    })
    equipmentService.load(() => {
      this.loadedCount += 1
    })
    hardService.load(() => {
      this.loadedCount += 1
    })
  }

  loaded() {
    return this.loadedCount === 3
  }

}
