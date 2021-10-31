export class Attribute<T> {
  constructor(private data: T) {}

  get(propName: string): number | string | void {
    return this.data[propName]
  }

  set(update: T): void {
    Object.assign(this.data, update)
  }
}