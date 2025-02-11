import { Todo } from '../models/todo.model'
import { createTodoHTML } from './create-todo-html'

let element

/**
 * Funcion para renderizar todo
 * @param {String} elementId
 * @param {Todo} todos
 */
export const rederTodos = (elementId, todos = []) => {
  if (!element) element = document.querySelector(elementId)

  if (!element) throw new Error(`Element ${elementId} no encontrado`)

  element.innerHTML = ''

  todos.forEach((todo) => {
    element.append(createTodoHTML(todo))
  })
}
