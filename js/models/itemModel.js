window.Item = Backbone.Model.extend({
  defaults : {
    'id' : null,
    'name' : '',
    'quantity' : '0',
    'description' : '',
    'categoryId' : '0',
    'vendorId' : '0',
    'emailThreshold' : '0',
    'itemUrl' : '',
  },

  //One more comment for the branch issues
  urlRoot : 'api/items/',

  initialize : function() {
    this.on("error", function(model, error) {
      alert(error);
    })
  },

  adjustQty : function(adjustment) {
    var qty = Number(this.get('quantity'));
    qty = qty + adjustment;
    this.set({
      'quantity' : qty
    });
    this.save();
    if (this.isValid()) {
      app.logCollection.logTransaction("Quantity Adjusted by " + adjustment, this);
    }
  },

  addOrderQty : function(amount) {
    var qty = Number(this.get('quantity'));
    qty = qty + amount;
    this.set({
      'quantity' : qty
    });
    if (this.save() != false) {
      app.logCollection.logTransaction("Order of " + amount + " received", this);
    }
  },

  strValidate : function(str) {
    //var flag = /^[a-zA-Z0-9]*$/.test(str);
    var flag = !/^[^<>:;`~\!\?\\\[\]\{\}]+$/.test(str);
    return flag;
  },

  urlValidate : function(str) {
    //var flag = /^[a-zA-Z0-9]*$/.test(str);
    var flag = !/^[^<>;`\!\\\[\]\{\}]+$/.test(str);
    return flag;
  },

  numValidate : function(str) {
    //var flag = /^[0-9]*$/.test(str);
    var flag = !/^\d+$/.test(str);
    return flag
  },

  validate : function(attrs) {
    if (this.strValidate(attrs.name) === true) {
      return "Invalid Name";
    }
    if (this.numValidate(attrs.quantity) === true) {
      return "Invalid Quantity";
    }
    if (attrs.categoryId === '0') {
      return "Please Select a Category";
    }
    if (attrs.vendorId === '0') {
      return "Please Select a Vendor";
    }
    if (this.numValidate(attrs.emailThreshold) === true) {
      return "Invalid Email Threshold";
    }
    if (this.strValidate(attrs.description) === true) {
      return "Invalid Description";
    }
    if (this.urlValidate(attrs.itemUrl) === true) {
      return "Invalid Url";
    }
  },

  saveItem : function() {
    if (this.isNew()) {
      var self = this;
      this.set({
        name : $('#name').val(),
        quantity : $('#quantity').val(),
        description : $('#description').val(),
        categoryId : $('#categorySelect').val(),
        vendorId : $('#vendorSelect').val(),
        emailThreshold : $('#emailThreshold').val(),
        itemUrl : $('#itemUrl').val()
      });
      if (this.isValid()) {
        app.itemCollection.create(this, {
          success : function() {
            app.logCollection.logTransaction("New Item Created", self);
            alert('Item successfully Added');
            app.navigate('items/' + self.id, true);
          },
          error : function() {
            alert('create error');
          }
        });
      }
    } else {
      if (this.save({
        name : $('#name').val(),
        quantity : $('#quantity').val(),
        description : $('#description').val(),
        categoryId : $('#categorySelect').val(),
        vendorId : $('#vendorSelect').val(),
        emailThreshold : $('#emailThreshold').val(),
        itemUrl : $('#itemUrl').val()
      }) != false) {
        app.logCollection.logTransaction("Item Saved", this);
        alert("Item successfully Saved");
      }
    }
  }
});

window.ItemCollection = Backbone.Collection.extend({
  model : Item,
  url : 'api/items/',

});
