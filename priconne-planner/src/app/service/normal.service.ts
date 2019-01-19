import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Normal } from '../model/normal.model'

@Injectable({
  providedIn: 'root'
})
export class NormalService {

  normals: Normal[] = []

  constructor(private http: HttpClient) {}

  load(finished: () => void) {
    this.http.get('assets/normals.json').subscribe(normals => {
      for (const normal of Object.values(normals)) {
        for (let i = 0 ; i < normal.drops.length ; i++) {
          this.normals.push(new Normal(
            normal.name,
            normal.prefix + '-' + (i + 1),
            normal.drops[i].map(x => x.replace('(', '（').replace(')', '）'))
          ))
        }
      }
      finished()
    })
  }

}
