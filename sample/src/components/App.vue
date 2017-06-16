<template>
  <div id="app">

    <div :class="{'main-content-wrapper': true, 'menu-active': isMenuActive}">

      <global-header :is-pro-members="true"></global-header>
      <!-- <page-header
        :notice-info="app.noticeInfo"
        v-on:location-move="locationMove">
      </page-header> -->

      <div class="main-content">
        <div class="inner">

          <div class="container-fluid mb8">
            <div class="row">
              <div class="col-xs-12 fs11">
                <router-link class="btn-router-link" to="/"><i class="fa fa-angle-double-right"></i> HOME</router-link>
                <router-link class="btn-router-link" to="/code"><i class="fa fa-angle-double-right"></i> code</router-link>
                <router-link class="btn-router-link" to="/step1"><i class="fa fa-angle-double-right"></i> Step1</router-link>
                <router-link class="btn-router-link" to="/step2"><i class="fa fa-angle-double-right"></i> Step2</router-link>
              </div>
            </div>
          </div>

          <router-view class=""
            v-on:menu-toggle="menuToggle"
            v-on:router-push="routerPush"
            v-on:go-back="goBack"
            v-on:location-move="locationMove">
          </router-view>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import globalHeader from './layout/GlobalHeader/GlobalHeader.vue'
import pageHeader from './layout/PageHeader/PageHeader.vue'
export default {
  name: 'app',
  components: {
    globalHeader,
    pageHeader
  },
  computed: {
    app () {
      return this.$store.getters.app
    }
  },
  data () {
    return {
      isMenuActive: false
    }
  },
  methods: {
    menuToggle () {

    },
    locationMove (e) {

    },
    routerPush () {

    },
    goBack () {

    }
  }
}
</script>

<style scoped>
.main-content-wrapper {
  width: 100%;
  min-height: 700px;
  color: #666;
  background-color: #f0f0f0;
  position: absolute;
}

.main-content {
  /*height: 100%;*/
  position: relative;
  margin-left: 0;
}

.main-content .inner {
  padding: 64px 0 0;
}

/*menu active時*/
.menu-active .main-content {
  /*margin-left: 200px;*/
}

.global-navi-overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(51,51,51,.6);
  position: fixed;
  z-index: 900;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: none;
  cursor: pointer;
}

.global-navi-overlay.header-area {
  height: 104px;
  z-index: 1100;
  position: absolute;
}

.menu-active .global-navi-overlay {
  display: block;
}

.content-view {
  padding: 16px 14px;
}

.error-message {
  font-size: 12px;
  color: #d9534f;
}

@media (min-width: 1024px) {

  .menu-active .global-navi-overlay {
    display: none;
  }

  .menu-active .main-content {
    margin-left: 200px;
    transition: all 0.2s ease;
  }
}

.m-print {
    width: 750px;
    margin: 0 auto;
    padding: 0 20px 30px;
    text-align: left;
    background: #fff;
}

.btn-router-link {
  margin-right: 8px;
}
</style>
