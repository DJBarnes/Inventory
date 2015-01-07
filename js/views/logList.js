window.LogListView = Backbone.View.extend({
  tagName : 'table',
  className : 'logTable',
  initialize : function() {
    this.model.bind('reset', this.render, this);
    this.count = 1;
  },
  render : function() {

    $('.contentBody').empty();
    $(this.el).empty();

    this.count = 0;
    _.each(this.model.models, function(log) {
      $(this.el).append(new LogListItemView({
        model : log
      }).render(this.count));
      this.count++;
    }, this);

    $('.contentBody').html(this.el);
  }
});

window.LogListItemView = Backbone.View.extend({

  tagName : 'tr',

  initialize : function() {
    this.template = _.template(tpl.get('log-list-item'));

    this.model.bind('change', this.render, this);

    //added a id to each tr element that corrosoponds to the id of the model being displayed
    $(this.el).attr('id', this.model.id);
  },

  render : function(count) {
    if (count % 2 === 0) {
      $(this.el).addClass('even');
    }
    $(this.el).html(this.template(this.model.toJSON()));

    return this.el;
  }
});

window.LogListFooterView = Backbone.View.extend({
  className : 'contentFooter',
  initialize : function() {
    this.template = _.template(tpl.get('LogListFooter'));
  },

  render : function() {
    $('.contentFooter').empty();
    $(this.el).html(this.template);
    $('.contentFooter').html(this.el);
  },

  events : {
    'click #returnToInventory' : 'returnToInventory'
  },

  returnToInventory : function() {
    app.navigate('', true);
    return true;
  }
});

window.LogListHeaderView = Backbone.View.extend({
  className : 'contentHeader',
  initialize : function() {
    this.template = _.template(tpl.get('LogListHeader'));
    this.actionSortFlag = 0;
    this.usernameSortFlag = 0;
  },

  render : function() {
    $('.contentHeader').empty();
    $(this.el).html(this.template);
    $('.contentHeader').html(this.el);
  },

  events : {
    'click td' : 'sortTable',
  },

  sortTable : function(ev) {
    var columnToSort = $(ev.currentTarget).attr('class');
    switch(columnToSort) {
      case 'action':

        if (this.actionSortFlag === 0) {
          app.logCollection.comparator = function(log) {
            return (log.get(columnToSort));
          }
          app.logCollection.sort();
          this.actionSortFlag = 1;
          this.usernameSortFlag = 0;
          $('thead img.usernameImg').attr('hidden', 'hidden');
          $('thead img.actionImg').removeAttr('hidden');
          $('thead img.actionImg').attr('src', 'images/DecendingTiny.jpg');
        } else {
          app.logCollection.comparator = function(log) {
            return String.fromCharCode.apply(String, _.map(log.get(columnToSort).split(""), function(c) {
              return 0xffff - c.charCodeAt();
            }));
          }
          app.logCollection.sort();
          this.actionSortFlag = 0;
          $('thead img.actionImg').attr('src', 'images/AcendingTiny.jpg');
        }
        break;

      case 'userName':

        if (this.usernameSortFlag === 0) {
          app.logCollection.comparator = function(log) {
            return (log.get(columnToSort));
          }
          app.logCollection.sort();
          this.usernameSortFlag = 1;
          this.actionSortFlag = 0;
          $('thead img.actionImg').attr('hidden', 'hidden');
          $('thead img.userNameImg').removeAttr('hidden');
          $('thead img.userNameImg').attr('src', 'images/DecendingTiny.jpg');
        } else {
          app.logCollection.comparator = function(log) {
            return String.fromCharCode.apply(String, _.map(log.get(columnToSort).split(""), function(c) {
              return 0xffff - c.charCodeAt();
            }));
          }
          app.logCollection.sort();
          this.usernameSortFlag = 0;
          $('thead img.usernameImg').attr('src', 'images/AcendingTiny.jpg');
        }
        break;
    }
  }
});

