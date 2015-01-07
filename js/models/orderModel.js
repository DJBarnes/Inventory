window.Order = Backbone.Model.extend({
  defaults : {
    'id' : null,
    'vendorId' : '0',
    'orderDate' : new Date,
    'status' : '1'
  },

  urlRoot : 'api/orders/',

  closeOrder : function() {
    _.each(this.get('items'), function(item) {
      var itemToProcess = app.itemCollection.where({'id' : item.itemId});
      itemToProcess[0].addOrderQty(Number(item.orderQty));
    });
    this.save({'status':'0'});
  }

});

window.OrderCollection = Backbone.Collection.extend({
  model : Order,
  url : 'api/orders/',
  comparator : function(order) {
    return -Number(new Date(order.get('orderDate')).getTime());
  }
});

window.OrderItem = Backbone.Model.extend({
  defaults : {
    'id' : null,
    'itemId' : '0',
    'orderQty' : '0'
  }
});
