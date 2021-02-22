export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // Уведомляем слушателей, если они есть
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // on,listen
  // Подписываемся на уведомление
  // Добавлям нового слушателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}


// ------------------------------------------------
// Example
// const emitter = new Emitter()
//
// const unsub = emitter.subscribe('tolya', data => console.log('Sub: ', data))
//
// emitter.emit('tolya', 42)
//
// setTimeout(() => {
//   emitter.emit('tolya', 2)
// }, 2000)
//
// setTimeout(() => {
//   unsub()
// }, 3000)
//
//
// setTimeout(() => {
//   emitter.emit('tolya', 2)
// }, 4000)
