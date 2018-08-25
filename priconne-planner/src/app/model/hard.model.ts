export class Hard {
  name: string
  prefix: string
  piece: string
  drops: [string]

  constructor(name, prefix, piece, drops) {
    this.name = name
    this.prefix = prefix
    this.piece = piece
    this.drops = drops
  }
}
