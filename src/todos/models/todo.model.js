import { v4 as uuid } from 'uuid'

/**
 * Modelo de todo con sus componentes id descripcion done o hecho y fecha
 */
export class Todo {
  constructor(description) {
    this.id = uuid()
    this.description = description
    this.done = false
    this.createdAt = new Date()
  }
}
