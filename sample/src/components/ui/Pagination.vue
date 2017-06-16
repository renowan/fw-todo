<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li :class="{'disabled': index === 1}">
        <a href="javascript:void(0)" aria-label="Previous" @click="goPrev">
          <span aria-hidden="true">‹</span>
        </a>
      </li>
      <li class="ellipsis" v-if="ellipsis && value > 5">
        <a href="javascript:void(0)" @click="goPrevList"><span aria-label="More">…</span></a>
      </li>
      <li v-for="item in renderList" :class="{'active': item === index}">
        <a href="javascript:void(0)" @click="select(item)" :v-disabled="item === index">{{item}}</a>
      </li>
      <li class="ellipsis" v-if="ellipsis && index < maxValue - limit / 2 + 1">
        <a href="javascript:void(0)" @click="goNextList"><span aria-label="More">…</span></a>
      </li>
      <li :class="{'disabled': index === maxValue}">
        <a href="javascript:void(0)" aria-label="Next" @click="goNext">
          <span aria-hidden="true">›</span>
        </a>
      </li>
    </ul>
    <br>
  </nav>
</template>

<script>
export default {
  props: {
    value: {type: Number, default: 1},
    // currentPage: {type: Number, default: 1},
    maxValue: {type: Number, default: 1},
    ellipsis: {type: Boolean, default: false},
    // onChange: {type: Function, default () {}}
  },
  data () {
    var index = this.value || 1
    return {
      limit: 10,
      index
    }
  },
  computed: {
    renderList () {
      return this.ellipsis && this.maxValue >= this.limit ? this.trimming() : this.getArr()
    },
    isEllipsis () {
      return this.ellipsis && this.maxValue > this.limit
    }
  },
  watch: {
    value (val) {
      this.index = val
    },
    index (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    select (page) {
      if (page === this.index) return
      if (page < 1) {
        this.index = 1
        return
      }
      if(page >= (this.maxValue + 1)) {
        this.index = this.maxValue
        return
      }
      // this.onChange(page)
      this.index = page
    },
    goPrev () {
      this.select((this.index - 1))
    },
    goPrevList () {
      this.select((this.index - this.limit))
    },
    goNext () {
      this.select((this.index + 1))
    },
    goNextList () {
      this.select((this.index + this.limit))
    },
    getArr () {
      let arr = []
      for (var i = 1; i <= this.maxValue ; i++) {
        arr.push(i)
      }
      return arr
    },
    // 省略オプションがtrueの場合、選択を10個以下にトリミングする
    trimming () {
      const halfDisplayed = Math.ceil(this.limit / 2)
      let startP = this.maxValue - this.limit
      let endP = this.maxValue
      const value = this.value

      let arr = this.getArr()

      while (arr.slice(startP, endP)[0] > (value - halfDisplayed) && arr[startP] && startP > 0) {
      	startP --
      	endP --
      }

      return arr.slice(startP, endP)
    }
  }
}
</script>

<style>

</style>
