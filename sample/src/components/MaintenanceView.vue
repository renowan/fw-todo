<template>
  <div>

    <page-title
      :page-title="app.pageTitle"
      v-on:menu-toggle="menuToggle">
    </page-title>

    <div class="g-attention">
      メンテナンス中のため、Web予約システムの一部サービスがご利用いただけません。<br>
  申し訳ありませんが、しばらくしてから再度ご利用ください。
    </div>





  </div>
</template>

<script>
import pageTitle      from './layout/PageTitle/PageTitle.vue'

export default {
  name: 'maintenance-view',
  components: {
    pageTitle
  },
  computed: {
    app () {
      return this.$store.getters.app
    }
  },
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
.g-attention {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 24px;
  padding: 82px 0;
  text-align: center;
  color: #333;
}
</style>
