import { Component, OnInit, Input } from '@angular/core'
import { CharacterSettings } from '../../model/character-settings.model'
import { EquipmentService } from '../../service/equipment.service'
import { Equipment } from '../../model/equipment.model'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() characterSettingsList: CharacterSettings[]
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

  calcSortedIngredients(): object[] {
    const ingredients = []
    const ingredientCounts = this.calcIngredientCounts()
    for (const name of Object.keys(ingredientCounts)) {
      ingredients.push({
        'equipment': this.equipmentMap[name],
        'count': ingredientCounts[name]
      })
    }
    ingredients.sort((a, b) => b.count - a.count)
    return ingredients
  }

}
