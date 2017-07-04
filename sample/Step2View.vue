<template>
  <div class="container-fluid">

    <div class="row">
      <div class="col-xs-12">
        <h3 class="mtn">Step2. 応用 - ショッピングカート</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-6">
        <h3 class="foo">商品リスト</h3>
        <ul>
          <li v-for="item in list">
            {{item.name}}, 値段: {{item.price}}円
            <button type="button" class="btn btn-default btn-sm" @click="add(item)">
              購入
            </button>
          </li>
        </ul>
      </div>
      <div class="col-xs-6">
        <h3>カート</h3>
        <ul>
          <li v-for="item in cart">{{item.name}}</li>
        </ul>
        <p>合計: {{total}}</p>
        <p>税込み: {{tax}}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'step2-view',
  components: {

  },
  computed: {
    total () {
      let result = 0
      this.cart.forEach((elm) => {
        result += elm.price
      })
      return result
    },
    tax () {
      return Math.floor(this.total * 1.1)
    }
  },
  data () {
    return {
      list: [
        {'name': 'orangeジュース', price: 130},
        {'name': 'コーラ', price: 200},
        {'name': '水', price: 2000}
      ],
      cart: []
    }
  },
  created () {

  },
  methods: {
    add (e) {
      this.cart.push(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.foo {
  color: red;
}
</style>
