export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._initialArray = items;// массив данных для создания карточек
      this._renderer = renderer; // renderer — это функция, отвечающая за отрисовку каждого отдельного элемента 
      this._container = document.querySelector(containerSelector);// селектор контейнера куда добавляем карточки
    }

    // renderItems - публичный метод, который отвечает за отрисовку всех элементов
    renderItems() {
        this._initialArray.forEach(item => this._renderer(item)); // вызываем renderer, передав item
    } 

    //  addItem - публичный метод, который принимает DOM-элемент и добавляет его в контейнер.
    addItem(element, data) {
      // this._container.prepend(element);
        if (Array.isArray(data)) { 
          this._container.append(element); 
        } else { 
          this._container.prepend(element); 
        } 
      } 
    
  }