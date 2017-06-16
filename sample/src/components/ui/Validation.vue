<template>
  <div v-if="validationStart" class="text-danger" :class="rootClass">
    <div v-if="validateMsg.required.is" class="mt5">
      <slot name="before-required"></slot>
      <span>{{ validateMsg.required.content }}</span>
    </div>
    <div v-if="validateMsg.min.is" class="mt5">
      <slot name="before-min"></slot>
      <span>{{ validateMsg.min.content }}</span>
    </div>
    <div v-if="validateMsg.max.is" class="mt5">
      <slot name="before-max"></slot>
      <span>{{ validateMsg.max.content }}</span>
    </div>
    <div v-if="validateMsg.machineDependentString.is" class="mt5">
      <slot name="before-machineDependentString"></slot>
      <span>{{ validateMsg.machineDependentString.content }}</span>
    </div>
    <div v-if="validateMsg.phone.is" class="mt5">
      <slot name="before-phone"></slot>
      <span>{{ validateMsg.phone.content }}</span>
    </div>
  </div>
</template>

<script>
import { filter }    from 'lodash'
import isMachineDependentString from '../../common/utils/isMachineDependentString'
export default {
  name: "validation",
  props: {
    dataType   : { type: String,  default: 'string', required: true }, //型監視するモデルの型 (string | boolean | number)
    field      : { type: String,  default: '', required: true }, //validationするモデル名
    rule       : { type: Object,  default: {}, required: true }, //validationのルール
    immediate  : { type: Boolean, default: false }, //実行タイミング trueなら即実行、falseでフォーム入力があってから実行
    value      : { required: true}, //監視するモデル
    rootClass: { type: String, default: 'block' }//親のclass名
  },
  data () {
    return {
      validationStart: false, //バリデーション実行フラグ
      validateMsg: {
          required: { is:false, content: '必須です'},
          min     : { is:false, content: '' },
          max     : { is:false, content: '' },
          phone   : { is:false, content: '半角数字で入力してください' },
          machineDependentString: { is:false, content: '機種依存文字（環境依存文字・特殊文字）は、文字化けを防ぐため、登録できません' },
        }
    }
  },
  created() {
    //即時バリデーション実行
    if (this.immediate) {
      this.validationStart = true
      this.validateRequired()
      this.validateMin()
      this.validateMax()
      this.validateMachineDependentString()
      this.validatePhone()
    }
  },
  watch: {
    value () {
      //即時バリデーションじゃない場合はコンポーネント読み込み時に検証しない
      if (!this.validationStart) {
        this.validationStart = true
      }

      //検証
      this.validateRequired()
      this.validateMin()
      this.validateMax()
      this.validateMachineDependentString()
      this.validatePhone()

      const hash = {}
      hash[this.field] = false
      const invalid = filter(this.validateMsg, el => el.is === true)
      if(invalid.length < 1) {
        hash[this.field] = true
      }
      //検証結果を親に返す hash = { model名: true or false }
      this.$emit('valid-status', hash)
    }
  },
  methods: {
    //true: 検証OK, false　検証失敗
    validateRequired () {
      if (this.rule.required === undefined || !this.rule.required) {
        this.validateMsg.required.is = false
        return
      }
      switch (this.dataType) {
        case 'boolean':
          this.validateMsg.required.is = this.value === true ? false : true
          return
          break
        case 'string':
        case 'number':
          const value = String(this.value)
          if (value.length >= 1) {
            this.validateMsg.required.is = false
            return
          }
          break
      }
      this.validateMsg.required.is = true
    },
    validateMin () {
      const min = this.rule.min
      if (min === undefined){
        this.validateMsg.min.is = false
        return
      }

      switch (this.dataType) {
        case 'boolean':
        console.log('%cERROR:', 'color: #B40404', '[' + this.field + ']booleanに最小値バリデーションは指定できません')
          return
          break
        case 'string':
          if(this.value.length === 0 || this.value.length >= min){
            this.validateMsg.min.is = false
            return
          }
          this.validateMsg.min.content = min + '文字以上で入力してください'
          break
        case 'number':
          if (parseInt(this.value) >= min) {
            this.validateMsg.min.is = false
            return
          }
          this.validateMsg.min.content = min + '以上で入力してください'
          break
      }
      this.validateMsg.min.is = true
    },
    validateMax () {
      const max = this.rule.max
      if (max === undefined) {
        this.validateMsg.max.is = false
        return
      }
      switch (this.dataType) {
        case 'boolean':
          console.log('%cERROR:', 'color: #B40404', '[' + this.field + ']booleanに最大値バリデーションは指定できません')
          return
          break
        case 'string':
          if ( this.value.length <= max ) {
            this.validateMsg.max.is = false
            return
          }
          this.validateMsg.max.content = max + '文字以内で入力してください'
          break
        case 'number':
          const value = parseInt(this.value)
          if (value <= max) {
            this.validateMsg.max.is = false
            return
          }
          this.validateMsg.max.content = max + '以内で入力してください'
          break
      }
      this.validateMsg.max.is = true
    },
    validateMachineDependentString () {
      this.validateMsg.machineDependentString.is = isMachineDependentString(this.value)
    },
    validatePhone () {
      if (this.rule.phone === undefined || !this.rule.phone) {
        this.validateMsg.phone.is == false
        return
      }
      switch (this.dataType) {
        case 'boolean':
          console.log('%cERROR:', 'color: #B40404', '[' + this.field + ']booleanに最大値バリデーションは指定できません')
          break
        case 'string':
        case 'number':
          const match = this.value.match(/([^0-9\-])/g)
          if(match === null) {
            this.validateMsg.phone.is = false
            return
          }
          break
      }
      this.validateMsg.phone.is = true
    }
  }
}
</script>

<style scoped>
.block{
  display: block
}
.inline{
  display: inline;
}
</style>
