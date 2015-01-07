window.count = 1;
window.ItemListView = Backbone.View.extend({
  tagName: 'table',
  className: 'itemTable',
  initialize: function(){
//    this.model.bind('change', this.render, this);
    this.model.bind('reset', this.render, this);
    
    var self = this;
    this.model.bind('add', function(item){
      $(self.el).append(new ItemListItemView({
        model: item,
        category: self.options.category,
        vendor: self.options.vendor
        }).render(count));
      count++;
    });  
  },
  render: function(){
    window.count = 0;
    
    $('.contentBody').empty();
    $(this.el).empty();
          
    _.each(this.model.models, function(item){
      $(this.el).append(new ItemListItemView({
        model: item,
        category: this.options.category,
        vendor: this.options.vendor
        }).render(count));
      window.count++;
    }, this);
    
    $('.contentBody').html(this.el);
  }
});


window.ItemListItemView = Backbone.View.extend({
  
  tagName: 'tr',
  
  initialize: function(){
    this.template = _.template( tpl.get('item-list-item') );
    
    this.model.bind( 'change', this.render, this);
    this.model.bind( 'destroy', this.close, this);
    
    //added a id to each tr element that corrosoponds to the id of the model being displayed
    $(this.el).attr('id',this.model.id);
  },
  
  render: function(count){
    if(window.count % 2 === 0){
     //alert(count);
     $(this.el).addClass('even'); 
    }
    $(this.el).html(this.template( $.extend({},this.model.toJSON(),this.options.category.get(this.model.get('categoryId')).toJSON(),this.options.vendor.get(this.model.get('vendorId')).toJSON())));
    
    return this.el;
  },
  
  events: { //may be doing this wrong. Might need to update the quantity in the model, then only push the changes once the submit button is pressed.
    'click #removeQty' : 'removeQty',
    'click #addQty' : 'addQty',
    'click' : 'showDetails'
  },
  
  removeQty: function() {
    amount = Number($('tr#' + this.model.id + ' input').val());
    amount -= 1;
    $('tr#' + this.model.id + ' input').val(amount);
  },
  
  addQty: function() {
    amount = Number($('tr#' + this.model.id + ' input').val());
    amount += 1;
    $('tr#' + this.model.id + ' input').val(amount);
  },
  
  showDetails: function() {
    app.navigate('items/' + this.model.id, true);
  }
  
});


window.ItemListFooterView = Backbone.View.extend({
  className: 'contentFooter',
  initialize: function() {
    this.template = _.template( tpl.get('ItemListFooter') );      
  },
  
  render: function() {
    $('.contentFooter').empty();
    $(this.el).html(this.template);
    $('.contentFooter').html(this.el);
  },
  
  events: {
    'click .applyAdjustment':'applyAdjustment',
  },
  
  applyAdjustment: function () {
      $('.contentBody tr').each(function(){
        var adjustment = Number($(this).children().children('input').val());
        if(adjustment != 0){                                                   
          var id = $(this).attr('id');
          var model = app.itemCollection.get(id);
          model.adjustQty(adjustment);
        }
      });
      app.navigate('items/adjust', true);
    //return true;
  }
});



window.ItemListHeaderView = Backbone.View.extend({  
  className: 'contentHeader',
  initialize: function() {
    this.template = _.template( tpl.get('ItemListHeader') );
    this.nameSortFlag = 0;
    this.quantitySortFlag = 0;
  },
  
  render: function() {
    $('.contentHeader').empty();
    $(this.el).html(this.template);
    $('.contentHeader').html(this.el);
  },
    
  events: {
    'click td':'sortTable',
  },
  
  sortTable: function (ev) {
    var columnToSort = $(ev.currentTarget).attr('class');
    
    switch(columnToSort) {
      case 'name':
      
        if (this.nameSortFlag === 0) {
          app.itemCollection.comparator = function (item) {
            return (item.get(columnToSort));
          }
          app.itemCollection.sort();
          this.nameSortFlag = 1;
          this.quantitySortFlag = 0;
          $('thead img.quantityImg').attr('hidden','hidden');
          $('thead img.nameImg').removeAttr('hidden');
          $('thead img.nameImg').attr('src','images/DecendingTiny.jpg');          
        } else {
          app.itemCollection.comparator = function(item) {
            return String.fromCharCode.apply(String,
              _.map(item.get(columnToSort).split(""), function (c) {
                return 0xffff - c.charCodeAt();
              })
            );
          }
          app.itemCollection.sort();
          this.nameSortFlag = 0;
          $('thead img.nameImg').attr('src','images/AcendingTiny.jpg');
        }
        break;
      
      case 'quantity':
      
        if (this.quantitySortFlag === 0) {
          app.itemCollection.comparator = function (item) {
            return Number(item.get(columnToSort).valueOf());
          }
          app.itemCollection.sort();
          this.quantitySortFlag = 1;
          this.nameSortFlag = 0;
          $('thead img.nameImg').attr('hidden','hidden');
          $('thead img.quantityImg').removeAttr('hidden');
          $('thead img.quantityImg').attr('src','images/DecendingTiny.jpg');
        } else {
         app.itemCollection.comparator = function (item) {
            return -Number(item.get(columnToSort).valueOf());
          }
          app.itemCollection.sort();
          this.quantitySortFlag = 0;
          $('thead img.quantityImg').attr('src','images/AcendingTiny.jpg');
        }
        break;
    }
    
  }
  
  });





