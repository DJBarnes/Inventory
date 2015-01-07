window.count = 1;
window.OrderFormView = Backbone.View.extend({
  tagName : 'table',
  className : 'orderTable',
  initialize : function() {
//    this.model.bind('change', this.render, this);
    var self = this;
    this.model.bind('reset', this.render, this);
    this.model.bind('add', function(item) {
      $(self.el).append(new OrderFormItemView({
        model : item,
        category : self.options.category,
        vendor : self.options.vendor
      }).render(count));
      count++;
    });
  },

  render : function() {
    window.count = 0;

    $('.contentBody').empty();
    $(this.el).empty();

    _.each(this.model.models, function(item) {
      $(this.el).append(new OrderFormItemView({
        model : item,
        category : this.options.category,
        vendor : this.options.vendor
      }).render(count));
      count++;
    }, this);

    $('.contentBody').html(this.el);
  }
});

window.OrderFormItemView = Backbone.View.extend({

  tagName : 'tr',

  initialize : function() {
    this.template = _.template(tpl.get('order-form-item'));

    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.close, this);

    //added a id to each tr element that corrosoponds to the id of the model being displayed
    $(this.el).attr('id', this.model.id);
  },

  render : function(count) {
    if (count % 2 === 0) {
      //alert(count);
      $(this.el).addClass('even');
    }
    $(this.el).html(this.template($.extend({}, this.model.toJSON(), this.options.category.get(this.model.get('categoryId')).toJSON(), this.options.vendor.get(this.model.get('vendorId')).toJSON())));

    return this.el;
  }
});

window.OrderFormFooterView = Backbone.View.extend({
  className : 'contentFooter',
  initialize : function() {
    this.template = _.template(tpl.get('OrderFormFooter'));
  },

  render : function() {
    $(this.el).html(this.template);
    $('.contentFooter').html(this.el);
  },

  events : {
    'click .submitOrder' : 'sumbitOrder',
  },

  sumbitOrder : function() {
    var tmpOrderArray = [];
    var tmpOrderCollection = new OrderCollection();

    $('.contentBody tr').each(function() {
      var quantity = Number($(this).children().children('input').val());
      if (quantity > 0) {
        var itemId = $(this).attr('id');
        var model = app.itemCollection.get(itemId);
        var vendorId = model.get('vendorId');

        var orderItem = new OrderItem({
          'itemId' : itemId,
          'orderQty' : quantity
        });

        if ($.inArray(vendorId, tmpOrderArray) != -1) {
          var getModel = tmpOrderCollection.where({
            'vendorId' : vendorId
          });

          getModel[0].get('items').push(orderItem);
        } else {
          tmpOrderArray.push(vendorId);
          var itemsArray = [];
          var orderModel = new Order({
            'vendorId' : vendorId,
            'items' : itemsArray
          });

          orderModel.get('items').push(orderItem);
          tmpOrderCollection.add(orderModel);
        }
      }
    });

    _.each(tmpOrderCollection.models, function(order) {
      app.orderCollection.create(order, {
        success : function() {
          _.each(order.get('items'), function(item) {
            app.logCollection.logTransaction('Order of ' + item.orderQty + ' added', app.itemCollection.where({'id' : item.itemId})[0]);
          });
          app.navigate('items/viewOrder', true);
        },
        error : function() {
          console.log('there was an error');
        }
      })

    });
  }
});

window.OrderFormHeaderView = Backbone.View.extend({
  className : 'contentHeader',
  initialize : function() {
    this.template = _.template(tpl.get('orderFormHeader'));
    this.nameSortFlag = 0;
    this.quantitySortFlag = 0;
  },

  render : function() {
    $(this.el).html(this.template);
    $('.contentHeader').html(this.el);
  },

  events : {
    'click td' : 'sortTable',
  },

  sortTable : function(ev) {
    var columnToSort = $(ev.currentTarget).attr('class');

    switch($(ev.currentTarget).attr('class')) {
      case 'name':

        if (this.nameSortFlag === 0) {
          app.itemCollection.comparator = function(item) {
            return (item.get(columnToSort));
          }
          app.itemCollection.sort();
          this.nameSortFlag = 1;
          this.quantitySortFlag = 0;
          $('thead img.quantityImg').attr('hidden', 'hidden');
          $('thead img.nameImg').removeAttr('hidden');
          $('thead img.nameImg').attr('src', 'images/DecendingTiny2.jpg');
        } else {
          app.itemCollection.comparator = function(item) {
            return String.fromCharCode.apply(String, _.map(item.get(columnToSort).split(""), function(c) {
              return 0xffff - c.charCodeAt();
            }));
          }
          app.itemCollection.sort();
          this.nameSortFlag = 0;
          $('thead img.nameImg').attr('src', 'images/AcendingTiny2.jpg');
        }
        break;

      case 'quantity':

        if (this.quantitySortFlag === 0) {
          app.itemCollection.comparator = function(item) {
            return Number(item.get(columnToSort).valueOf());
          }
          app.itemCollection.sort();
          this.quantitySortFlag = 1;
          this.nameSortFlag = 0;
          $('thead img.nameImg').attr('hidden', 'hidden');
          $('thead img.quantityImg').removeAttr('hidden');
          $('thead img.quantityImg').attr('src', 'images/DecendingTiny2.jpg');
        } else {
          app.itemCollection.comparator = function(item) {
            return -Number(item.get(columnToSort).valueOf());
          }
          app.itemCollection.sort();
          this.quantitySortFlag = 0;
          $('thead img.quantityImg').attr('src', 'images/AcendingTiny2.jpg');
        }
        break;
    }

  }
});

