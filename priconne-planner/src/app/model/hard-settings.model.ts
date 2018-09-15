import { Hard } from './hard.model'

export class HardSettings {

  index = 0
  amount = 0
  hard: Hard

  constructor(hard: Hard) {
    this.hard = hard
  }

  getDropAmount(index) {
    if (index < 3) {
      return Math.floor(this.amount * 1.4)
    } else {
      return Math.floor(this.amount * 0.4)
    }
  }

  getDropCounts() {
    const counts = {}
    for (let i = 0 ; i < 8 ; i++) {
      counts[this.hard.drops[i]] = this.getDropAmount(i)
    }
    return counts
  }

}
