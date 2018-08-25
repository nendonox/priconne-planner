import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Hard } from '../model/hard.model'

@Injectable({
  providedIn: 'root'
})
export class HardService {

  hards: Hard[]

  constructor(private http: HttpClient) {}

  load(finished: () => void) {
    this.http.get('assets/hards.json').subscribe(hards => {
      this.hards = Object.values(hards).map(hard => {
        return new Hard(
          hard.name,
          hard.prefix,
          hard.piece,
          hard.drops
        )
      })
      finished()
    })
  }

}
