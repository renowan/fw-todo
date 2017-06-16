<template>
  <div>
    <span v-if="basePriceTaxExData" :class="basePriceTaxExData.class" v-text="basePriceTaxExData.value"></span>
    <span v-if="basePriceTaxInData" :class="basePriceTaxInData.class" v-text="basePriceTaxInData.value"></span>
    <span v-text="basePriceLabel"></span>
    <span v-if="arrow">→</span>
    <span v-if="discountPriceTaxExData" :class="discountPriceTaxExData.class" v-text="discountPriceTaxExData.value"></span>
    <span v-if="discountPriceTaxInData" :class="discountPriceTaxInData.class" v-text="discountPriceTaxInData.value"></span>
    <span v-text="discountPriceLabel"></span>
    <span>{{isNull ? 'お食事等を、当日ご注文いただきご精算ください。' : '/ 1名様'}}</span>
  </div>
</template>

<script>
export default {
  props: {
    priceTaxFlg       : {type: Number, default: null},
    basePriceTaxEx    : {type: String, default: null},
    basePriceTaxIn    : {type: String, default: null},
    discountPriceTaxEx: {type: String, default: null},
    discountPriceTaxIn: {type: String, default: null}
  },
  computed: {
    //値引き前税抜き
    basePriceTaxExData () {
      let data = {
        class: '',
        value: ''
      }
      switch (this.priceTaxFlg) {
        case 2:
          if (this.discountPriceTaxEx === null) {
            data.class = "bold"
            data.value = this.separate(this.basePriceTaxEx) + "円"
          } else {
            data.class = "line-through"
            data.value = this.separate(this.basePriceTaxEx) + '円'
          }
          break

        case 3:
          data.value = this.separate(this.basePriceTaxEx) + '円'
          break

        default:
          break
      }

      if (data.class === '' && data.value === '') {
        return null
      }
      return data
    },

    basePriceTaxInData () {
      let data = {
        class: '',
        value: ''
      }
      switch (this.priceTaxFlg) {
        case 0:
          if (this.discountPriceTaxIn === null) {
            data.class = "bold"
            data.value = this.separate(this.basePriceTaxIn) + "円"
          } else {
            data.value = this.separate(this.basePriceTaxIn) + "円"
          }
          break
        case 1:
          if (this.discountPriceTaxEx === null){
            data.class = "bold"
            data.value = this.separate(this.basePriceTaxIn) + "円"
          } else {
            data.class = "line-through"
            data.value = this.separate(this.basePriceTaxIn) + "円"
          }
          break
        case 3:
          data.value = "（税込 " + this.separate(this.basePriceTaxIn) + "円）"
          break
        default:
          break
      }

      if (data.class === '' && data.value === '') {
        return null
      }
      return data
    },
    discountPriceTaxExData () {
      let data = {
        class: '',
        value: ''
      }
      switch (this.priceTaxFlg) {
        case 2:
          if (this.discountPriceTaxIn !== null) {
            data.class = "bold"
            data.value = this.separate(this.discountPriceTaxEx) + '円'
          }
        case 3:
          if (this.discountPriceTaxIn !== null) {
            data.value = this.separate(this.discountPriceTaxEx) + '円'
          }
          break
        default:
          break
      }

      if (data.class === '' && data.value === '') {
        return null
      }
      return data
    },
    discountPriceTaxInData () {
      let data = {
        class: '',
        value: ''
      }
      switch (this.priceTaxFlg) {
        case 0:
        case 1:
          if (this.discountPriceTaxIn !== null) {
            data.class = "bold"
            data.value = this.separate(this.discountPriceTaxIn) + "円"
          }
          break
        case 3:
          if (this.discountPriceTaxIn !== null) {
            data.value = "（税込 " + this.separate(this.discountPriceTaxIn) + "円）"
          }
          break
        default:
          break
      }

      if (data.class === '' && data.value === '') {
        return null
      }
      return data
    },
    basePriceLabel () {
      switch (this.priceTaxFlg) {
        case 1:
          return '（税込）'
          break
        case 2:
          return '（税抜）'
          break
        default:
          break
      }
      return ''
    },
    discountPriceLabel () {
      switch (this.priceTaxFlg) {
        case 1:
          if (this.discountPriceTaxIn !== null) {
            return '（税込）'
          }
          break
        case 2:
          if (this.discountPriceTaxIn !== null) {
            return '（税抜）'
          }
          break
        default:
          break
      }
      return ''
    },
    arrow () {
      switch (this.priceTaxFlg) {
        case 0:
          if (this.discountPriceTaxIn !== null) {
            return true
          }
          break
        case 1:
        case 2:
        case 3:
          if (this.discountPriceTaxEx !== null || this.discountPriceTaxIn !== null) {
            return true
          }
          break
        default:
          break
      }
      return false
    },
    isNull () {
      let ret = true
      if (this.priceTaxFlg        !== null) ret = false
      if (this.basePriceTaxEx     !== null) ret = false
      if (this.basePriceTaxIn     !== null) ret = false
      if (this.discountPriceTaxEx !== null) ret = false
      if (this.discountPriceTaxIn !== null) ret = false
      return ret
    },
  },
  methods: {
    separate (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,')
    }
  }
}
</script>

<style scoped>
.line-through{
  text-decoration: line-through;
}
.bold{
  font-weight: bold;
}
</style>
