window.ItemView = Backbone.View.extend({

  tagName : "div",

  initialize : function() {

    this.template = _.template(tpl.get('item-details'));
  },

  render : function() {
    $('#details').empty();

    $(this.el).html(this.template(this.options.item.toJSON()));

    if (this.options.item.isNew()) {
      $(this.el).children().children().children().children().children('.delete').hide();
    }

    $(this.el).children().children().children().children('#category').append(new CategorySelectView({
      model : this.options.category,
      item : this.options.item
    }).render());

    $(this.el).children().children().children().children('#vendor').append(new VendorSelectView({
      model : this.options.vendor,
      item : this.options.item
    }).render());

    $('#details').html(this.el);
  },

  events : {
    'click .save' : 'saveItem',
    'click .delete' : 'deleteItem'
  },

  saveItem : function() {
    this.options.item.saveItem();
  },

  deleteItem : function() {
    if (confirm('Are you sure you want to delete this item?')) {
      var item = this.options.item;
      this.options.item.destroy({
        success : function() {
          alert('Item was deleted successfully');
          app.logCollection.logTransaction("Item Deleted", item);
          //window.history.back();
          app.navigate('', true);
        }
      });
    }
    return false;
  }
});
