<template>
  <div :class="extCls">
    <input type="checkbox" v-model="index">
    <label @click="onUpdate">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: 'custom-checkbox',
  props: {
    value: {type: Boolean, default: true},
    inline: {type: Boolean, default: false},
    label: {type: String, default: ''},
    cls: {type: String, default: ''},
    name: {type: String, default: ''}
  },
  computed: {
    extCls () {
      // checkbox-custom inline fill mt5
      let base = 'checkbox-custom'
      if (this.inline) base += ' inline'
      base += ' fill'
      if (this.cls) base += ' ' + this.cls
      return base
    }
  },
  data () {
    var index = this.value || false
    return {
      index
    }
  },
  watch: {
    value (val) {
      this.index = val
    },
    index (val) {
      if (this.name) {
        this.$emit('input', {name: this.name, value: val})
      } else {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onUpdate () {
      this.index = !this.index

    }
  }
}
</script>

<style scoped>

</style>
