window.StartView = Backbone.View.extend({
  
  initialize: function() {
    this.template = _.template( tpl.get('start') );
  },
  
  render: function() {
    $('#details').empty();
    this.$el.html( this.template() );
    $('#details').html(this.el); 
  }
});
