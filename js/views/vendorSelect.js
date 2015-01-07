window.VendorSelectView = Backbone.View.extend({
  tagName : 'select',
  initialize : function() {
    var self = this;
    $(this.el).attr('id', 'vendorSelect');
    this.model.bind('reset', this.render, this);
    $(this.el).html('<option value="0">Select a Vendor</option>');
  },

  render : function() {
    _.each(this.model.models, function(vendor) {
      $(this.el).append(new VendorOptionView({
        model : vendor
      }).render());
    }, this);
    $(this.el).children('#' + this.options.item.get('vendorId')).attr('selected', 'selected');
    return this.el;
  }
});

window.VendorOptionView = Backbone.View.extend({
  tagName : 'option',
  initialize : function() {
    $(this.el).val(this.model.id);
    $(this.el).html(this.model.get('vendorName'));
    this.model.bind('change', this.render, this);
    $(this.el).attr('id', this.model.id);
  },

  render : function() {
    return this.el;
  }
}); 