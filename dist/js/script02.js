{

  Vue.component ('todo', {
    template: '#js-template-todo',
    computed: {
      leng () {
        let leng = (this.list == '　')? 0: this.list.length
        return leng
      }
    },
    data () {
      return {
        list: JSON.parse(localStorage.getItem('todo')) || ['　'],
        isEdited: false,
        item: '',
        isShow: true,
        isHide: false
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
        let arr = JSON.parse(localStorage.getItem('todo'));
        arr.splice(idx, 1);
        localStorage.setItem('todo', JSON.stringify(arr));
        this.list = arr;
      },
      input (item, list) {
        let idx = list.indexOf(item);
        let elms = document.getElementById('js-item-todo').getElementsByTagName('li');
        let elm = elms[idx];
        
        for (let i = 0, leng = elms.length; i < leng; i++) {
          elms[i].classList.remove('is_edited');
        }
        
        elm.classList.add('is_edited');
      },
      set (item, list) {
        console.log('set');

        for (let i = 0, leng = elms.length; i < leng; i++) {
          elms[i].classList.remove('is_edited');
        }
      }
    }
  });

  new Vue({
    el: '.js-todo'
  });



};