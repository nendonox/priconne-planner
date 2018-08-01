export class Equipment {
  name: string
  status: Map<string, number>
  ingredients: Map<string, number>

  constructor(name, status, ingredients) {
    this.name = name
    this.status = status
    this.ingredients = ingredients
  }

  getImageUrl() {
    return 'assets/equipment-images/' + this.name + '.jpg'
  }
}
