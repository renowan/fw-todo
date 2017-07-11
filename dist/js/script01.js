{
  $(function () {
    // todo
    if ($('.js-todo').length) {
      todo.init ();
    }
  });
  
  
  let todo = {

    // config
    config: {
      component: '.js-todo',
      text: '.js-text',
      input: '.js-input',
      delete: '.js-btnDel',
      add: '.js-btnAdd',
      storage_key: 'todo'
    },
    
    // init
    init: function () {
      let that = this;
      
      // event
      that.event (that.config);
    },
    
    // event
    event: function (config) {
      let that = this;
      
      // load
      todo.load();
      
      // delete
      $(config.component).on('click', config.delete, that.delete);

      // add
      $(config.component).on('click', config.add, that.add);

      // text to input
      $(config.component).on('click', config.text, that.input);

      // input text to text
      $(config.component).on('blur', config.input, that.set);
    },
    
    // 削除
    delete: function (e) {
      e.preventDefault();

      if (!confirm('削除しますか？')) {return}

      let index = $('.js-btnDel').index(this);

      todo.deleteCore(this);
    },
    deleteCore: function (elm) {
      let that = this;

      $(elm)
        .closest('li')
        .removeClass('is_show')
        .addClass('is_deleted')
        .on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd', function(){
          $(this).remove();

          that.save();
        });
    },
    
    // 追加
    add: function (e) {
      e.preventDefault();

      let html = [
        '<li class="is_edited">',
          '<p class="item-text js-text"></p>',
          '<p class="item-input js-input">',
            '<input type="text">',
          '</p>',
          '<p class="button-delete js-btnDel"></p>',
        '</li>'
      ];
      html = html.join('');
      $('.js-todo ul').prepend(html);
      $('.js-input')
        .eq(0)
        .find('input')
        .focus();
    },
    
    // 入力
    input: function (e) {
      e.preventDefault();

      $('.js-todo li').removeClass('is_edited');
      $(this).addClass('is_hide');
      let text = $(this).text();
      $(this)
        .closest('li')
        .addClass('is_edited')
        .find('input')
        .val(text)
        .focus();
    },
    
    // 入力値テキスト反映
    set: function (e) {
      e.preventDefault();

      let value = $(this).find('input').val();

      if (value === '') {
        todo.deleteCore (this);
        return
      }

      $(this).closest('li').removeClass('is_edited');

      $(this)
        .siblings('.js-text')
        .html(value);
      
      todo.save();
    },
    
    // 保存
    save: function () {
      let that = this;

      let list = [];
      $('.js-text').each(function () {
        if ($(this).text() === '') {return}
        list.push($(this).text());
      });
      
      if (list.length === 0) {
        todo.countZero();
      }
      localStorage.setItem(that.config.storage_key, list);

      todo.load();
    },
    
    // 総数
    count: function () {
      let that = this;

      let count = $('.js-todo ul li').length;
      $('.js-count').html(count);
    },
    countZero: function () {
      let that = this;

      $('.js-count').html('0');
    },
    
    // 初期表示
    load: function () {
      let that = this;

      let list = localStorage.getItem(that.config.storage_key);

      if (!list) {
        todo.countZero();
        return
      }
      
      list = list.split(',');

      let html = '';
      for (let i = 0, leng = list.length; i < leng; i++) {
        let src = [
            '<li>',
              '<p class="item-text js-text">' + list[i] + '</p>',
              '<p class="item-input js-input">',
                '<input type="text">',
              '</p>',
              '<p class="button-delete js-btnDel"></p>',
            '</li>'
          ];
        html += src.join('');
      }
      $('.js-todo ul').html(html);

      todo.count();
    }
    
  };


};