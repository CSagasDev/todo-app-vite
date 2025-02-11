import { Todo } from '../todos/models/todo.model'

/**
 * Creacion de filtros
 */
export const Filters = {
  All: 'All',
  Completed: 'Completed',
  Pending: 'Pending',
}

/**
 * inicia el estado de los todo y el filtro
 */
const state = {
  todos: [],
  filter: Filters.All,
}

/**
 * Carga el store
 */
const initStore = () => {
  loadStore()
}
/**
 * Funcion para leer el local storage
 */
const loadStore = () => {
  if (!localStorage.getItem('state')) return
  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem('state')
  )
  state.todos = todos
  state.filter = filter
}

/**
 * Funcion para guardar en el local storage
 * el JSON.stringify agarraa el state y lo convierte a JSON para guardarlo
 */
const saveStateToLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state))
}

/**
 * Para obtener los todos, filtro todos por defecto
 * @param {String} filter
 */
const getTodo = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos]
    case Filters.Completed:
      return state.todos.filter((todo) => todo.done)
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done)
    default:
      throw new Error(`Filtro: ${filter} Inválido`)
  }
}
/**
 * Agregar todo
 * @param {String} description
 */
const addTodo = (description) => {
  if (!description) throw new Error('Descripción es requerida')
  state.todos.push(new Todo(description))
  saveStateToLocalStorage()
}
/**
 * Funcion para recorrer todos los todo y encontrar el id que coincide para marcarlo como completo 'done'
 * @param {String} todoId identificador del todo
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done
    }
    return todo
  })
  saveStateToLocalStorage()
}
/**
 * Funcion para recorrer todos los todo y asignarles que ya estan completos 'done'
 */
const toggleAllTodos = () => {
  const allDone = state.todos.every((todo) => todo.done) // Verifica si todos están completos
  state.todos.forEach((todo) => {
    todo.done = !allDone // Invierte el estado
  })
  saveStateToLocalStorage()
}
/**
 * Elimina el todo con el Id
 * @param {String} todoId
 * tomamos un todo regresamos todos los todo q no coincidan con el id,
 */
const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId)
  saveStateToLocalStorage()
}
/**
 * Elimina todos los todos
 * es lo mismo que el anterior solo que la condicion sera que done este en true
 */
const deleteAllTodo = () => {
  state.todos = state.todos.filter((todo) => !todo.done)
  saveStateToLocalStorage()
}
/**
 * setea el filtro seleccionado, por defecto all
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.All) => {
  if (Object.keys(Filters).includes(newFilter)) {
    state.filter = newFilter
  } else {
    throw new Error('No existe el filtro')
  }
  saveStateToLocalStorage()
}
/**
 * Para ver que filtro esta seleccionado
 */
const getCurrentFilter = () => {
  return state.filter
}

export default {
  addTodo,
  deleteAllTodo,
  deleteTodo,
  getCurrentFilter,
  getTodo,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
  toggleAllTodos,
}
