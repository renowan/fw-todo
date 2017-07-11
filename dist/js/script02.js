{

  Vue.component ('todo', {
    config: {
      storage_key: 'todo'
    },
    template: '#js-template-todo',
    computed: {
      leng () {
        return this.list.length
      }
    },
    data () {
      return {
        list: localStorage.getItem('todo').split(',') || ['　'],
        isEdited: false
      }
    },
    created () {

    },
    methods: {
      add (e) {
        this.list.push(e)
      },
      remove (item, list) {
        let idx = list.indexOf(item);
        let arr = localStorage.getItem('todo').split(',');
        arr.splice(idx, 1);
        localStorage.setItem('todo', arr);
        this.list = arr;
      },
      input (item, list) {
        let idx = list.indexOf(item);
        let elms = document.getElementById('js-item-todo').getElementsByTagName('li');
        let elm = elms[idx];
        
        elm.classList.remove('is_edited');
        elm.classList.add('is_edited');
      },
      set (item, list) {
        console.log(item);
      }
    }
  });

  new Vue({
    el: '.js-todo'
  });



};