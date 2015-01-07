window.Vendor = Backbone.Model.extend({
  defaults : {
    'id' : null,
    'vendorName' : '',
    'url' : ''
  },
  urlRoot : 'api/vendor/'
});

window.VendorCollection = Backbone.Collection.extend({
  model : Vendor,
  url : 'api/vendor/'
}); 