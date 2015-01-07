window.UserView = Backbone.View.extend({

  tagName : "div",

  initialize : function() {
    if (this.options.user.isNew()) {
      this.template = _.template(tpl.get('newUser-details'));
    } else {
      if (this.options.user.get('username') !== window.user.get('username')) {
        this.template = _.template(tpl.get('user-details'));
      } else {
        this.template = _.template(tpl.get('current-user-details'));
      }
    }
  },

  render : function() {
    $('#details').empty();
    $(this.el).html(this.template(this.options.user.toJSON()));
    $('#details').html(this.el);
    if (this.options.user.isNew()) {
      console.log('new');
    }
  },

  events : {
    'click .save' : 'saveUser',
    'click .delete' : 'deleteUser',
    'click .changePassword' : 'changePassword'
  },

  saveUser : function() {
    this.options.user.saveUser();
  },

  deleteUser : function() {
    if (confirm('Are you sure you want to delete this user?')) {
      var user = this.options.user;
      this.options.user.destroy({
        success : function() {
          alert('User was deleted successfully');
          app.navigate('users', true);
        }
      });
    }
    return false;
  },

  changePassword : function() {
    this.changePasswordView = new ChangePasswordView({
      user : this.options.user
    }).render();
  }
});
