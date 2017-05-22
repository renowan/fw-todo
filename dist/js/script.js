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
      
      // event
      that.event ();
    },
    // event
    event: function () {
      let that = this;

      console.log('event');
      
      // delete
      $('.js-todo').on('click', '.js-btnDel', that.delete);
    },
    delete: function (e) {
      e.preventDefault();
      let that = this;
      
      let index = $('.js-btnDel').index(this);
      
      $(this)
        .closest('li')
        .addClass('is_deleted')
        .on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
          console.log('webkitAnimationEnd');
        });
    }
    
  };


};