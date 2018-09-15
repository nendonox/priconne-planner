import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { CharacterSettings } from '../../model/character-settings.model'
import { HardSettings } from '../../model/hard-settings.model'
import { EquipmentService } from '../../service/equipment.service'
import { Equipment } from '../../model/equipment.model'
import { ItemComponent } from '../item/item.component'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() characterSettingsList: CharacterSettings[]
  @Input() hardSettingsList: HardSettings[]
  @ViewChild(ItemComponent)
  itemComponent
  equipmentMap: { string: Equipment }

  constructor(private equipmentService: EquipmentService) { }

  ngOnInit() {
    this.equipmentMap = this.equipmentService.equipmentMap
  }

  calcEquipmentCounts(): { string: number } {
    const equipmentCounts = {}
    for (const settings of this.characterSettingsList) {
      if (!settings.enabled) { continue }
      let requiredEquipmentNames = settings.character.equipmentNames
      requiredEquipmentNames = requiredEquipmentNames.slice(settings.rank * 6)
      requiredEquipmentNames.forEach((name, index) => {
        if (!name) { return }
        if (index < 6 && settings.enabledEquipments[index]) { return }
        if (equipmentCounts.hasOwnProperty(name)) {
          equipmentCounts[name] += 1
        } else {
          equipmentCounts[name] = 1
        }
      })
    }
    return equipmentCounts as { string: number }
  }

  calcIngredientCounts(): { string: number } {
    const equipmentCounts = this.calcEquipmentCounts()
    const ingredientCounts = {}
    for (const name of Object.keys(equipmentCounts)) {
      const ingredients = this.equipmentMap[name].ingredients
      ingredients.forEach((ingredientCount, ingredientName) => {
        if (ingredientCounts.hasOwnProperty(ingredientName)) {
          ingredientCounts[ingredientName] += equipmentCounts[name] * ingredientCount
        } else {
          ingredientCounts[ingredientName] = equipmentCounts[name] * ingredientCount
        }
      })
    }
    return ingredientCounts as { string: number }
  }

  calcHardDropCounts(): { string: number } {
    const counts = {}
    for (const settings of this.hardSettingsList) {
      const dropCounts = settings.getDropCounts()
      for (const drop of Object.keys(dropCounts)) {
        if (counts.hasOwnProperty(drop)) {
          counts[drop] += dropCounts[drop]
        } else {
          counts[drop] = dropCounts[drop]
        }
      }
    }
    return counts as { string: number }
  }

  subtractCounts(countsA, countsB) {
    for (const key of Object.keys(countsA)) {
      if (countsB.hasOwnProperty(key)) {
        countsA[key] -= countsB[key]
      }
    }
    return countsA
  }

  calcSortedIngredients(): object[] {
    const ingredients = []
    const ingredientCounts = this.calcIngredientCounts()
    this.subtractCounts(ingredientCounts, this.calcHardDropCounts())
    for (const name of Object.keys(ingredientCounts)) {
      if (ingredientCounts[name] > 0) {
        ingredients.push({
          'equipment': this.equipmentMap[name],
          'count': ingredientCounts[name]
        })
      }
    }
    ingredients.sort((a, b) => b.count - a.count)
    return ingredients
  }

  showItem(equipment) {
    this.itemComponent.show(equipment)
  }

}
