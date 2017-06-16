<template>
  <div class="main-title clearfix">
    <div class="pull-left">
      <a class="btn-menu" href="javascript:void(0);" v-on:click="menuToggle"></a>
      <h3>{{pageTitle}}</h3>
    </div>
    <div class="pull-right">
      <slot name="page-title-right">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-title',
  props: ['pageTitle'],
  data () {
    return {
    }
  },
  methods: {
    menuToggle () {
      this.$emit('menu-toggle')
    }
  }
}
</script>

<style scoped>
.main-title {
  background-color: #fff;
  padding-right: 16px;
  vertical-align: middle;
  /*margin-bottom: 16px;*/
}

.main-title .btn {
  margin-top: 10px;
}
.main-title h3 {
  float: left;
  line-height: 55px;
  font-size: 24px;
  margin: 0;
  color: #333;
}
.btn-menu {
  float: left;
  width: 24px;
  height: 22px;
  margin: 16px 16px 17px 16px;
  background-image: url(../img/sprite-common.png);
  background-position: -307px -231px;
}

</style>
