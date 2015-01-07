window.OrderView = Backbone.View.extend({

  tagName : "div",

  initialize : function() {
    this.options.order.bind('change', this.render, this);
    this.template = _.template(tpl.get('order-details'));
  },

  render : function() {
    $('#details').empty();

    var statusJSON = new Object();
    if (this.options.order.get('status') === '1') {
      statusJSON.openStatus = 'Yes';
    } else {
      statusJSON.openStatus = 'No';
    }

    $(this.el).html(this.template($.extend({}, statusJSON, this.options.order.toJSON(), this.options.vendor.get(this.options.order.get('vendorId')).toJSON())));

    $(this.el).children().children().children().children().children('#items').html(new OrderItemsView({
      model : this.options.order,
      items : app.itemCollection
    }).render());

    //Remove the button from the page, order already closed.
    if (this.options.order.get('status') === '0') {
      $(this.el).children().children().children().children().children('.close').hide();
    }

    $('#details').html(this.el);
  },

  events : {
    'click .close' : 'closeOrder',
  },

  closeOrder : function() {
    if (confirm('Are you sure you want to close this order out?')) {
      this.options.order.closeOrder();
    }
  }
});

window.OrderItemsView = Backbone.View.extend({
  tagName : "table",

  className : "orderItems",

  initialize : function() {

    this.template = _.template('<tr><td><%= name %></td><td class="rightJustify"><%= orderQty %></td></tr>');
  },

  render : function() {

    $(this.el).append('<tr><td>Item Name</td><td class="rightJustify">Quantity</td></tr>')

    _.each(this.model.get('items'), function(item) {
      $(this.el).append(this.template($.extend({}, item, this.options.items.get(item.itemId).toJSON())));
    }, this);
    return this.el;
  }
});
