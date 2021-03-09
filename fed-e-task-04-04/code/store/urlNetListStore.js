import UrlItemPageStore from './urlNetItemStore'
import { action, makeObservable, observable } from 'mobx'

class UrlListStore {
  urls = []
  constructor(todos) {
    if (todos) this.urls = todos
    makeObservable(this, {
      urls: observable,
      createUrlStore: action.bound
    })
  }

  createUrlStore(obj) {
    this.urls.push(new UrlItemPageStore(obj))
  }
}

export default UrlListStore