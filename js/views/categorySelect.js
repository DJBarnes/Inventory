window.CategorySelectView = Backbone.View.extend({
  tagName : 'select',
  initialize : function() {
    var self = this;
    $(this.el).attr('id', 'categorySelect');
    this.model.bind('reset', this.render, this);
    $(this.el).html('<option value="0">Select a Category</option>');
  },

  render : function() {
    _.each(this.model.models, function(category) {
      $(this.el).append(new CategoryOptionView({
        model : category
      }).render());
    }, this);
    $(this.el).children('#' + this.options.item.get('categoryId')).attr('selected', 'selected');
    return this.el;
  }
});

window.CategoryOptionView = Backbone.View.extend({
  tagName : 'option',
  initialize : function() {
    $(this.el).val(this.model.id);
    $(this.el).html(this.model.get('categoryName'));
    this.model.bind('change', this.render, this);
    $(this.el).attr('id', this.model.id);
  },

  render : function() {
    return this.el;
  }
});

