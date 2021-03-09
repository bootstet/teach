class UrlItemStore {
  id = Math.random()
  name = ''
  url = ''
  constructor(obj) {
    this.name = obj.name
    this.url = obj.url
  }
}

export default UrlItemStore