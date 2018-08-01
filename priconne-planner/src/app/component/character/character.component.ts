import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Character } from '../../model/character.model'
import { CharacterSettings } from '../../model/character-settings.model'
import { EquipmentService } from '../../service/equipment.service'

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  @Input() characterSettings: CharacterSettings
  @Output() save: EventEmitter<any> = new EventEmitter()

  constructor(private equipmentService: EquipmentService) { }

  ngOnInit() {
  }

  rankUpFull() {
    this.characterSettings.rank = this.characterSettings.MAX_RANK
    this.save.emit()
  }

  rankUp() {
    this.characterSettings.rank += 1
    if (this.characterSettings.rank > this.characterSettings.MAX_RANK) {
      this.characterSettings.rank = this.characterSettings.MAX_RANK
    }
    this.save.emit()
  }

  rankDown() {
    this.characterSettings.rank -= 1
    if (this.characterSettings.rank < 0) {
      this.characterSettings.rank = 0
    }
    this.save.emit()
  }

  toggleEnabled() {
    this.characterSettings.enabled = !this.characterSettings.enabled
    this.save.emit()
  }

  toggleEnabledEquipment(index) {
    this.characterSettings.enabledEquipments[index] = !this.characterSettings.enabledEquipments[index]
    this.save.emit()
  }

  getEquipmentByIndex(index) {
    const name = this.characterSettings.character.equipmentNames[this.characterSettings.rank * 6 + index]
    if (name) {
      return this.equipmentService.equipmentMap[name]
    } else {
      return this.equipmentService.getEmpty()
    }
  }

}
