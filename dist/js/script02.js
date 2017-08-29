{

  Vue.component ('todo', {
    template: '#js-template-todo',
    computed: {
      leng () {
        const leng = (this.list.length)? this.list.length: 0
        return leng
      }
    },
    data () {
      return {
        list: JSON.parse(localStorage.getItem('todo')) || {},
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
      add () {
        this.add_isShow = !this.add_isShow
        this.add_isHide = !this.add_isHide

        const elm = document.getElementById('js-item-add')
        elm.getElementsByTagName('input')[0].focus()
      },
      addSet () {
        const targetAdd = document.getElementById('js-item-add')
        const valAdd = targetAdd.getElementsByTagName('input')[0].value
        
        if (valAdd === '') {return}

        let listArr = []
        let data = {
          title: valAdd
        }
        listArr.push(data)
        
        const target = document.getElementById('js-item-todo')
        const elms = target.getElementsByTagName('li')
        for (let i = 0, leng = elms.length; i < leng; i++) {
          elms[i].classList.remove('is_edited')
          let val = elms[i].getElementsByTagName('input')[0].value
          elms[i].getElementsByClassName('item-text').innerHTML = val
          if (val === '') {return}
          data = {
            title: val
          }
          listArr.push(data)
        }

        this.add_isShow = !this.add_isShow
        this.add_isHide = !this.add_isHide

        localStorage.setItem('todo', JSON.stringify(listArr))
        this.list = listArr
        targetAdd.getElementsByTagName('input')[0].value = ''
      },
      remove (item, list) {
        if (!confirm('削除しますか？')) {return}
        let idx = list.indexOf(item)
        let arr = JSON.parse(localStorage.getItem('todo'))
        arr.splice(idx, 1)
        localStorage.setItem('todo', JSON.stringify(arr))
        this.list = arr
      },
      input (item, list) {
        let idx = list.indexOf(item)
        const elms = document.getElementById('js-item-todo').getElementsByTagName('li')
        let elm = elms[idx]
        
        for (let i = 0, leng = elms.length; i < leng; i++) {
          elms[i].classList.remove('is_edited')
        }
        
        elm.classList.add('is_edited')
        elm.getElementsByTagName('input')[0].focus()
      },
      set (item, list) {
        const elms = document.getElementById('js-item-todo').getElementsByTagName('li')
        let listArr = []
        for (let i = 0, leng = elms.length; i < leng; i++) {
          elms[i].classList.remove('is_edited')
          let val = elms[i].getElementsByTagName('input')[0].value
          elms[i].getElementsByClassName('item-text').innerHTML = val
          if (val === '') {return}
          let data = {
            title: val
          };
          listArr.push(data)
        }
        localStorage.setItem('todo', JSON.stringify(listArr))
      }
    }
  })
  
  new Vue({
    el: '.js-todo'
  })



};