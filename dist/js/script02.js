{

  Vue.component ('todo_list', {
    props: [],
    template: '#js-template-todo'
  });

  new Vue({
    el: '.js-todo',
    data: {
      data: ['hoge', 'huga', 'piyo', 'punyo']
    }
  });



};