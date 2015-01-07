window.Category = Backbone.Model.extend({
  defaults : {
    'id' : null,
    'categoryName' : '',
    'consumable' : ''
  },
  urlRoot : 'api/category/'
});

window.CategoryCollection = Backbone.Collection.extend({
  model : Category,
  url : 'api/category/'
}); 