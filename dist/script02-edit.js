{
  // 子コンポーネント、Todo item
  Vue.component ('todoItem', {
    template: '#todo-item',
    props: {
      title: {type: String, default: ''},
      id: {type: Number}
    },
    created () {
      // 初回マウントされたときは編集モードに
      if (this.isFirst && this.title === '') {
        this.isEdit = true
      }
    },
    data () {
      return {
        isFirst: true,
        isEdit: false
      }
    },
    methods: {
      onChange (e) {
        if (this.isFirst) this.isFirst = false
        const val = e.target.value
        this.$emit('on-change', val, this.id)
      },
      remove () {
        this.$emit('remove', this.id)
      }
    }
  })

  // 本体
  new Vue({
    el: '#app',
    data () {
      const list = JSON.parse(localStorage.getItem('todo')) || []
      const count = localStorage.getItem('count') || 0
      return {
        count,
        list
      }
    },
    watch: {
      list () {
        // 変更があったら保存
        this.save()
      }
    },
    methods: {
      add () {
        this.list.push({
          title: '',
          id: this.count
        })
        this.count ++
      },
      onChange (val, id) {
        this.list.map(elm => {if (elm.id === id) elm.title = val})
        this.save()
      },
      remove (id) {
        if (!confirm('削除しますか？')) {return}
        const list = []
        this.list.forEach( elm => {
          if (elm.id !== id) {
            list.push(elm)
          }
        })
        this.list = list
      },
      save () {
        localStorage.setItem('todo', JSON.stringify(this.list))
        localStorage.setItem('count', this.count)
      }
    }
  })



};
