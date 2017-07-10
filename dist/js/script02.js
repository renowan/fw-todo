{

  Vue.component ('todo', {
    template: '#js-template-todo'
  });

  new Vue({
    el: '.js-todo',
    components: {

    },
    computed: {
      leng () {
        return 3
      }
    }
  });



};