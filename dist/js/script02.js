{

  Vue.component ('todo_list', {
    props: ['data'],
    template: '#js-template-todo'
  });

  new Vue({
    el: '.js-todo',
    data: {
      data: []
    }
  });



};