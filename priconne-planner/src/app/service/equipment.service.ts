import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Equipment } from '../model/equipment.model'

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  equipmentMap: { string: Equipment }

  constructor(private http: HttpClient) {}

  load(finished: () => void) {
    this.http.get('assets/equipments.json').subscribe(equipments => {
      this.equipmentMap = {} as { string: Equipment }
      for (const name of Object.keys(equipments)) {
        this.equipmentMap[name] = new Equipment(
          name,
          equipments[name].status,
          new Map(Object.keys(equipments[name].ingredients).map(key => {
              return [key, equipments[name].ingredients[key]] as [string, number]
          }))
        )
      }
      finished()
    })
  }

  getEmpty() {
    return new Equipment('装備なし', new Map(), new Map())
  }
}
