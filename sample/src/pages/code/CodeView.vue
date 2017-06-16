<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <h3 class="mtn">Bootstrap UI code</h3>

        <!-- dropdown -->
        <div class="bs-example">
          <h4>Dropdown</h4>
          <div class="mv8">
            <p>foo: {{foo}}</p>
          </div>
          <div class="mv8">
            <v-select v-model="foo" :options="['a','b', 'c']"></v-select>
          </div>
          <pre>&lt;v-select v-model="foo" :options="['a','b', 'c']">&lt;/v-select></pre>
        </div>

        <!-- modal -->
        <div class="bs-example">
          <h4>Modal</h4>
          <div class="mv8">
            <p>isModalOpen: {{isModalOpen}}</p>
          </div>
          <div class="mv8">

            <modal v-model="isModalOpen" type="alert" title="あいうえお" effect="fade">
              modal
              <div slot="modal-footer" class="modal-footer">
                <div class="row-10">
                  <div class="col-sm-offset-3 col-sm-3 col-xs-12 mb10">
                    <button type="button" class="btn btn-default btn-block" @click="isModalOpen = false">キャンセル</button>
                  </div>
                  <div class="col-sm-3 col-xs-12">
                    <button type="button" class="btn btn-primary btn-block" @click="doSomthing">実行</button>
                  </div>
                </div>
              </div>
            </modal>


            <button type="button" class="btn btn-border btn-sm" @click="isModalOpen = true">
              Open
            </button>
          </div>
          <pre>&lt;modal v-model="isModalOpen" type="alert" title="あいうえお" effect="fade">...&lt;/modal></pre>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import vSelect from '@/components/ui/Select.vue'
import modal from '@/components/ui/Modal.vue'

export default {
  name: 'code-view',
  components: {
    vSelect,
    modal
  },
  data () {
    return {
      foo: 'a',
      isModalOpen: false
    }
  },
  created () {
  },
  methods: {
    doSomthing () {
      console.log('doSomthing')
    }
  }
}
</script>

<style lang="scss" scoped>
.bs-example {
  position: relative;
  padding: 5px 15px 15px;
  margin: 0 -15px 15px;
  border-color: #e5e5e5 #eee #eee;
  border-style: solid;
  border-width: 1px 0;
  -webkit-box-shadow: inset 0 3px 6px rgba(0,0,0,.05);
  box-shadow: inset 0 3px 6px rgba(0,0,0,.05);
  margin-right: 0;
  margin-left: 0;
  background-color: #fff;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 4px 4px 0 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}

</style>
