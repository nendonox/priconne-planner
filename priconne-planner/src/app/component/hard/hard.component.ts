import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Hard } from '../../model/hard.model'
import { HardSettings } from '../../model/hard-settings.model'
import { HardService } from '../../service/hard.service'
import { EquipmentService } from '../../service/equipment.service'
import { CharacterService } from '../../service/character.service'
@Component({
  selector: 'app-hard',
  templateUrl: './hard.component.html',
  styleUrls: ['./hard.component.css']
})
export class HardComponent implements OnInit {

  @Input() hardSettings: HardSettings
  @Output() save: EventEmitter<any> = new EventEmitter()

  constructor(
    private hardService: HardService,
    private equipmentService: EquipmentService,
    private characterService: CharacterService
  ) { }

  ngOnInit() {
  }

  getEquipment(name) {
    return this.equipmentService.equipmentMap[name]
  }

  getCharacter(name) {
    return this.characterService.characterMap[name]
  }

  add(event) {
    let diff = 1
    if (event.shiftKey) { diff *= 10 }
    if (event.ctrlKey) { diff *= 10 }
    this.hardSettings.amount += diff
    if (this.hardSettings.amount > 500) { this.hardSettings.amount = 500 }
    this.save.emit()
  }

  remove(event) {
    let diff = 1
    if (event.shiftKey) { diff *= 10 }
    if (event.ctrlKey) { diff *= 10 }
    this.hardSettings.amount -= diff
    if (this.hardSettings.amount < 0) { this.hardSettings.amount = 0 }
    this.save.emit()
  }

}
