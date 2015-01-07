window.count = 1;
window.OrderListView = Backbone.View.extend({
  tagName : 'table',
  className : 'orderTable',
  initialize : function() {
    this.model.bind('change', this.render, this);
    var self = this;
    this.model.bind('reset', this.render, this);
    this.model.bind('add', function(order) {
      $(self.el).append(new OrderListItemView({
        model : order,
        vendor : self.options.vendor
      }).render(count));
      count++;
    });
  },

  render : function() {
    window.count = 0;

    $('.contentBody').empty();
    $(this.el).empty();

    _.each(this.model.models, function(order) {
      $(this.el).append(new OrderListItemView({
        model : order,
        vendor : this.options.vendor
      }).render(count));
      count++;
    }, this);

    $('.contentBody').html(this.el);
  }
});

window.OrderListItemView = Backbone.View.extend({

  tagName : 'tr',

  initialize : function() {
    this.template = _.template(tpl.get('orderListItem'));

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
    
    //Do some calculations to send with JSON data to template
    var itemCnt = new Object();
    itemCnt.itemCount = this.model.get('items').length;
    if (this.model.get('status') === '1') {
      itemCnt.open = 'Yes';
    }
    else {    
    itemCnt.open = 'No';
    }

    $(this.el).html(this.template($.extend({}, this.model.toJSON(), this.options.vendor.get(this.model.get('vendorId')).toJSON(), itemCnt)));

    return this.el;
  },
  
  events : {
    'click' : 'showDetails'
  },
  
  showDetails: function() {
    app.navigate('items/viewOrder/' + this.model.id, true);
  }
});

window.OrderListFooterView = Backbone.View.extend({
  className : 'contentFooter',
  initialize : function() {
    this.template = _.template(tpl.get('OrderListFooter'));
  },

  render : function() {
    $(this.el).html(this.template);
    $('.contentFooter').html(this.el);
  },

  events : {
    'click .returnToInventory' : 'returnToInv',
  },

  returnToInv : function() {
    app.navigate('',true);
  }
});

window.OrderListHeaderView = Backbone.View.extend({
  className : 'contentHeader',
  initialize : function() {
    this.template = _.template(tpl.get('orderListHeader'));
    this.nameSortFlag = 0;
    this.quantitySortFlag = 0;
  },

  render : function() {
    $(this.el).html(this.template);
    $('.contentHeader').html(this.el);
  },
  
});

