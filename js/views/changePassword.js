window.ChangePasswordView = Backbone.View.extend({
  tagName : 'table',
  initialize : function() {
    this.template = _.template(tpl.get('changePassword'));
  },
  render : function() {
    var html = $(this.el).html(this.template());
    $('div#passwordChange').slideUp('fast', function() {
      $('div#passwordChange').html(html).slideDown();
    });
  },
  events : {
    'click #submitPassword' : 'submitPassword',
    'click #cancelPasswordChange' : 'cancelPasswordChange'
  },
  submitPassword : function() {
    var result = this.options.user.passwordChangeValidateSave();
    if (result) {
      $('div#passwordStatus').html(result).addClass('errorStatus');
    } else {
      $('div#passwordStatus').empty().removeClass('errorStatus');
      $('div#passwordChange').slideUp(function() {
        $('div#passwordChange').html('<button id="changePassword" class="changePassword">Change Password</button>').slideDown('fast');
        $('div#passwordStatus').html('Password Successfully Changed!');
      });
    }
  },
  cancelPasswordChange : function() {
    $('div#passwordChange').slideUp(function() {
      $('div#passwordChange').html('<button id="changePassword" class="changePassword">Change Password</button>').slideDown('fast');
    });
  }
});
