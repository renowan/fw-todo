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
        delete: '.js-btnDel',
        add: '.js-btnAdd'
      };
      
      // event
      that.event (config);
    },
    // event
    event: function (config) {
      let that = this;

      console.log('event');
      
      // delete
      $(config.component).on('click', config.delete, that.delete);

      // add
      $(config.component).on('click', config.add, that.add);
    },
    delete: function (e) {
      e.preventDefault();
      let that = this;
      
      let index = $('.js-btnDel').index(this);
      
      $(this)
        .closest('li')
        .removeClass('is_show')
        .addClass('is_deleted')
        .on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd', function(){
          console.log($(this));
          $(this).addClass('is_hide');
        });
    },
    add: function (e) {
      e.preventDefault();
      let that = this;
      
      let html = '<li class="is_show"><p>ふがふがふ</p><p class="button-delete js-btnDel"></p></li>';
      $('.js-todo ul').prepend(html);
    }
    
  };


};