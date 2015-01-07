window.HeaderView = Backbone.View.extend({

  initialize : function() {
    this.template = _.template(tpl.get('header'));
  },

  render : function() {
    $('#header').empty();
    $(this.el).html(this.template());
    if (this.options.showManage) {
      $(this.el).children().children('img.manage').hide();
    }
    $('#header').html(this.el);
  },

  events : {
    'click .manage' : 'manage',
    'click .mainImage' : 'navigateToMain'
  },
  manage : function() {
    var position = $('.manage').offset();
    var width = $('.manage').outerWidth();
    var height = $('.manage').outerHeight();
    var docWidth = $(document).width();
    $('div#optionsMenu').css({
      'right' : (docWidth - (position.left + width)) + 'px',
      'top' : (position.top + (height)) + 'px'
    })
    $('div#optionsMenu').toggle('fast');
  },
  navigateToMain : function() {
    app.navigate('', true);
  }
})
