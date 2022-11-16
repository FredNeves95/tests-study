import { find, remove } from "lodash";

export default class Cart {
  items = []

  add(item) {
    if (find(this.items, { product: item.product })) {
      remove(this.items, { product: item.product })
    }
    this.items.push(item)
  }

  remove(product) {
    remove(this.items, { product })
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price
    }, 0)
  }


  summary() {
    const total = this.getTotal()
    const items = this.items

    return {
      total,
      items
    }
  }

  checkout() {
    const { total, items } = this.summary()

    this.items = []

    return {
      total,
      items
    }
  }
}