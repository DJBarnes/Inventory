window.OptionsMenuView = Backbone.View.extend({
  tagName : 'table',

  className : 'optionsTable',

  initialize : function() {
    this.template = _.template(tpl.get('optionsMenu'));
    this.render();
    $('div#optionsMenu').hide();
    $('div#optionsMenu').removeAttr('hidden');
  },

  render : function() {
    this.$el.html(this.template());
    $('#optionsMenu').html(this.el);
  },
  events : {
    'click tr#logout' : 'logout',
    'click tr#addItem' : 'newItem',
    'click tr#viewLog' : 'viewLog',
    'click tr#manageUsers' : 'manageUsers',
    'click tr#newUser' : 'newUser',
    'click tr#placeOrder' : 'placeOrder',
    'click tr#viewOrder' : 'viewOrder',
    'mouseleave' : 'leave'
  },
  logout : function() {
    user.unauthenticate();
    $('div#optionsMenu').hide('fast');
    app.navigate('login', true);
  },
  newItem : function() {
    app.navigate('items/new', true);
    return false;
  },
  viewLog : function() {
    app.navigate('log/view', true);
    return true;
  },
  manageUsers : function() {
    app.navigate('users', true);
    return true;
  },
  newUser : function() {
    app.navigate('users/new', true);
    return true;
  },
  placeOrder : function() {
    app.navigate('items/placeOrder', true);
    return true;
  },
  viewOrder : function() {
    app.navigate('items/viewOrder', true);
    return true;
  },
  leave : function() {
    $('div#optionsMenu').hide('fast');
  }
});
