{
  $(function () {
    // todo
    if ($('.js-todo').length) {
      todo.init ();
    }
  });
  
  
  let todo = {
    init: function () {
      let that = this;
      
      let config = {
        component: '.js-todo',
        text: '.js-text',
        input: '.js-input',
        delete: '.js-btnDel',
        add: '.js-btnAdd'
      };
      
      // event
      that.event (config);
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
    delete: function (e) {
      e.preventDefault();
      
      if (!confirm('削除しますか？')) {return}
      
      let index = $('.js-btnDel').index(this);
      
      $(this)
        .closest('li')
        .removeClass('is_show')
        .addClass('is_deleted')
        .on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd', function(){
          $(this).addClass('is_hide');
        });
    },
    add: function (e) {
      e.preventDefault();

      let html = [
        '<li>',
          '<p class="item-text js-text is_hide"></p>',
          '<p class="item-input js-input is_show">',
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
    input: function (e) {
      e.preventDefault();

      $('.js-text').removeClass('is_hide');
      $('.js-input').removeClass('is_show');
      $(this).addClass('is_hide');
      $(this)
        .siblings('.js-input')
        .addClass('is_show')
        .find('input')
        .focus();
    },
    set: function (e) {
      e.preventDefault();

      let value = $(this).find('input').val();
      $(this).removeClass('is_show');
      $(this)
        .siblings('.js-text')
        .removeClass('is_hide');

      if (value === '') {return}
      $(this)
        .siblings('.js-text')
        .html(value);
      
      todo.save();
    },
    save: function () {
      let that = this;

      let list = [];
      $('.js-text').each(function () {
        if ($(this).text() === '') {return}
        list.push($(this).text());
      });
      
      if (list.length === 0) {return}
      localStorage.setItem('todo', list);

      todo.load();
    },
    load: function () {
      let that = this;

      let list = localStorage.getItem('todo');

      if (!list) {return}
      
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
    }
    
  };


};