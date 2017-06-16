<template>
  <div>
    <div class="g-attention">
    不正なURLです <br>
    <router-link type="button" class="btn btn-default" to="/">Topに戻る</router-link>
    </div>





  </div>
</template>

<script>
export default {
  name: 'no-find-view',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {

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

.g-attention .btn {
  margin-top: 20px;
}
</style>
