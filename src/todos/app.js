import todoStore, { Filters } from '../store/todo.store'
import html from './app.html?raw'
import { rederTodos, renderPending } from './use-cases'

//Elementos html que usaremos
const ElementIDs = {
  ClearCompleted: '.clear-completed',
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
  TodoFilters: '.filter',
  PendingCount: '#pending-count',
  MarkAllCompleted: '.toggle-all',
}

/**
 * Funcion principal para iniciar en html
 * @param {String} elementId
 * @returns
 */

export const App = (elementId) => {
  //Funcion para dibujar todo
  const displayTodos = () => {
    const todos = todoStore.getTodo(todoStore.getCurrentFilter())
    rederTodos(ElementIDs.TodoList, todos)
    updatePendings()
  }
  //funcion para visualizar count de pendientes
  const updatePendings = () => {
    renderPending(ElementIDs.PendingCount)
  }
  //cuando la funcion App() se llama
  ;(() => {
    //creamos un div
    const app = document.createElement('div')
    //ingresamos el elemento div al app.html
    app.innerHTML = html
    document.querySelector(elementId).append(app)
    displayTodos()
  })()

  //Ref HTML
  const newTodo = document.querySelector(ElementIDs.NewTodoInput)
  const functionsTodo = document.querySelector(ElementIDs.TodoList)
  const completedAllTodo = document.querySelector(ElementIDs.MarkAllCompleted)
  const clearCompletedB = document.querySelector(ElementIDs.ClearCompleted)
  const filtersSelected = document.querySelectorAll(ElementIDs.TodoFilters)

  //Listeners y eventos
  //agregar nuevo todo
  newTodo.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return
    if (event.target.value.trim().length === 0) return
    todoStore.addTodo(event.target.value)
    displayTodos()
    event.target.value = ''
  })
  //marcar como completado
  functionsTodo.addEventListener('click', (event) => {
    //evento para llegar al padre o elemento padre data-id
    const element = event.target.closest('[data-id]')
    todoStore.toggleTodo(element.getAttribute('data-id'))
    displayTodos()
  })
  //marcar todos los todo como completado
  completedAllTodo.addEventListener('click', () => {
    todoStore.toggleAllTodos()
    displayTodos()
  })
  //eliminar todo
  functionsTodo.addEventListener('click', (event) => {
    const deleteTodo = event.target.className === 'destroy'
    const element = event.target.closest('[data-id]')
    if (!element || !deleteTodo) return
    todoStore.deleteTodo(element.getAttribute('data-id'))
    displayTodos()
  })
  //eliminar los todo completados
  clearCompletedB.addEventListener('click', () => {
    todoStore.deleteAllTodo()
    displayTodos()
  })
  //filtrar todos
  filtersSelected.forEach((element) => {
    element.addEventListener('click', (element) => {
      filtersSelected.forEach((el) => el.classList.remove('selected'))
      element.target.classList.add('selected')
      switch (element.target.text) {
        case 'Todos':
          todoStore.setFilter(Filters.All)
          break
        case 'Pendientes':
          todoStore.setFilter(Filters.Pending)
          break
        case 'Completados':
          todoStore.setFilter(Filters.Completed)
          break
      }
      displayTodos()
    })
  })
}
