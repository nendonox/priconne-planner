import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Equipment } from '../../model/equipment.model'
import { HardService } from '../../service/hard.service'
import { NormalService } from '../../service/normal.service'
import { EquipmentService } from '../../service/equipment.service'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  isShow = false
  equipment = {} as Equipment

  constructor(
    private hardService: HardService,
    private normalService: NormalService,
    private equipmentService: EquipmentService
  ) { }

  ngOnInit() {
  }

  show(equipment) {
    this.equipment = equipment
    this.isShow = true
  }

  close(event) {
    if (event.toElement.className === 'wrapper') {
      this.isShow = false
    }
  }

  getDropNormals() {
    return this.normalService.normals.filter(normal => {
      return normal.drops.indexOf(this.equipment.name) >= 0
    })
  }

  getDropHards() {
    return this.hardService.hards.filter(hard => {
      return hard.drops.indexOf(this.equipment.name) >= 0
    })
  }

  getEquipment(name) {
    return this.equipmentService.equipmentMap[name]
  }

}
