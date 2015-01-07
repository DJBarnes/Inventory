window.LoginView = Backbone.View.extend({

  tagName : "div",

  initialize : function() {

    this.template = _.template(tpl.get('login'));
  },

  render : function() {
    $('.contentHeader').empty();
    $('.contentBody').empty();
    $('.contentFooter').empty();
    $(this.el).html(this.template());
    $('.contentBody').html(this.el);
  },

  events : {
    'click .login' : 'userLogin',
  },

  userLogin : function(e) {
    var username = $('input#username').val();
    var password = $.md5($('input#password').val());

    this.model.set({
      'username' : username,
      'password' : password
    });

    this.model.load();
    e.preventDefault();
  }
});
