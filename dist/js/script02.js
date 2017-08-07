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
        todo_isShow: true,
        todo_isHide: false,
        add_isShow: false,
        add_isHide: true
      }
    },
    created () {

    },
    methods: {
      add (e) {
        const targetAdd = document.getElementById('js-item-add');
        targetAdd.getElementsByTagName('input')[0].focus();
        this.add_isShow = !this.add_isShow;
        this.add_isHide = !this.add_isHide;
      },
      addSet () {
        console.log('addSet');

        const targetAdd = document.getElementById('js-item-add');
        let valAdd = targetAdd.getElementsByTagName('input')[0].value;
        
        if (valAdd === '') {return}

        let listArr = [];
        let data = {
          title: valAdd
        };
        listArr.push(data);
        
        const target = document.getElementById('js-item-todo');
        let elms = target.getElementsByTagName('li');
        for (let i = 0, leng = elms.length; i < leng; i++) {
          elms[i].classList.remove('is_edited');
          let val = elms[i].getElementsByTagName('input')[0].value;
          elms[i].getElementsByClassName('item-text').innerHTML = val;
          if (val === '') {return}
          data = {
            title: val
          };
          listArr.push(data);
        }
        localStorage.setItem('todo', JSON.stringify(listArr));

        this.add_isShow = !this.add_isShow;
        this.add_isHide = !this.add_isHide;
      },
      remove (item, list) {
        if (!confirm('削除しますか？')) {return}
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
        elm.getElementsByTagName('input')[0].focus();
      },
      set (item, list) {
        console.log('set');
        let elms = document.getElementById('js-item-todo').getElementsByTagName('li');
        let listArr = [];
        for (let i = 0, leng = elms.length; i < leng; i++) {
          elms[i].classList.remove('is_edited');
          let val = elms[i].getElementsByTagName('input')[0].value;
          elms[i].getElementsByClassName('item-text').innerHTML = val;
          if (val === '') {return}
          let data = {
            title: val
          };
          listArr.push(data);
        }
        localStorage.setItem('todo', JSON.stringify(listArr));
      }
    }
  });

  new Vue({
    el: '.js-todo'
  });



};