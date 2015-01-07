window.Item404View = Backbone.View.extend({
  className : '404Page',
  initialize : function() {
    if (this.options.item404) {
      this.template = _.template(tpl.get('item404'));
    } else {
      this.template = _.template(tpl.get('site404'));
    }
  },

  render : function() {
    $(this.el).html(this.template());
    console.log(this.el);
    $('.contentBody').empty();
    $('.contentHeader').empty();
    $('.contentFooter').empty();
    $('.contentBody').html(this.el);
  },
  events : {
    'click #home' : 'navigateToMain',
  },
  navigateToMain : function() {
    app.navigate('', true);
  }
})
