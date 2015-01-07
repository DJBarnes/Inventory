window.Log = Backbone.Model.extend({
  defaults : {
    'id' : null,
    'action' : '',
    'userName' : '',
    'itemName' : '',
    'logDate' : new Date
  },
  urlRoot : 'api/log/'
});

window.LogCollection = Backbone.Collection.extend({
  model : Log,
  url : 'api/log/',
  logTransaction : function(action, item) {
    var logItem = new Log();
    logItem.set({
      action : action,
      userName : user.get('username'),
      itemName : item.get('name'),
      logDate : new Date()
    });
    logItem.save();
    this.add(logItem);
  },
  comparator : function(logItem) {
    return -Number(new Date(logItem.get('logDate')).getTime());
  }
});
