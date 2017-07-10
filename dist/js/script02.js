{

  Vue.component ('todo', {
    template: '#js-template-todo',
    computed: {
      leng () {
        return this.list.length
      }
    },
    data () {
      return {
        list: [
          {'name': 'hoge'},
          {'name': 'huga'},
          {'name': 'piyo'},
          {'name': 'ponyo'}
        ]
      }
    },
    created () {

    },
    methods: {
      add (e) {
        this.list.push(e)
      },
      remove (e) {
        this.list.push(e)
      }
    }
  });

  new Vue({
    el: '.js-todo'
  });



};