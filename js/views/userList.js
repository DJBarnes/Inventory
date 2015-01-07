window.count = 1;
window.UserListView = Backbone.View.extend({
  tagName : 'table',
  className : 'userTable',
  initialize : function() {
    this.model.bind('change', this.render, this);
    this.model.bind('reset', this.render, this);

    var self = this;
    this.model.bind('add', function(user) {
      $(self.el).append(new UserListUserView({
        model : user
      }).render(count));
      count++;
    });
  },
  render : function() {
    window.count = 0;

    $('.contentBody').empty();
    $(this.el).empty();

    _.each(this.model.models, function(user) {
      $(this.el).append(new UserListUserView({
        model : user
      }).render(count));
      window.count++;
    }, this);

    $('.contentBody').html(this.el);
  }
});

window.UserListUserView = Backbone.View.extend({

  tagName : 'tr',

  initialize : function() {
    this.template = _.template(tpl.get('user-list-user'));

    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.close, this);

    //added a id to each tr element that corrosoponds to the id of the model being displayed
    $(this.el).attr('id', this.model.id);
  },

  render : function(count) {
    if (window.count % 2 === 0) {
      //alert(count);
      $(this.el).addClass('even');
    }
    $(this.el).html(this.template(this.model.toJSON()));

    return this.el;
  },

  events : {//may be doing this wrong. Might need to update the quantity in the model, then only push the changes once the submit button is pressed.
    'click' : 'showDetails'
  },

  showDetails : function() {
    app.navigate('users/' + this.model.id, true);
  }
});

window.UserListFooterView = Backbone.View.extend({
  className : 'contentFooter',
  initialize : function() {
    this.template = _.template(tpl.get('userListFooter'));
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

window.UserListHeaderView = Backbone.View.extend({
  className : 'contentHeader',
  initialize : function() {
    this.template = _.template(tpl.get('userListHeader'));
    this.nameSortFlag = 0;
    this.quantitySortFlag = 0;
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
      case 'name':

        if (this.nameSortFlag === 0) {
          app.userCollection.comparator = function(user) {
            return (user.get(columnToSort));
          }
          app.userCollection.sort();
          this.nameSortFlag = 1;
          this.quantitySortFlag = 0;
          $('thead img.quantityImg').attr('hidden', 'hidden');
          $('thead img.nameImg').removeAttr('hidden');
          $('thead img.nameImg').attr('src', 'images/DecendingTiny.jpg');
        } else {
          app.userCollection.comparator = function(user) {
            return String.fromCharCode.apply(String, _.map(user.get(columnToSort).split(""), function(c) {
              return 0xffff - c.charCodeAt();
            }));
          }
          app.userCollection.sort();
          this.nameSortFlag = 0;
          $('thead img.nameImg').attr('src', 'images/AcendingTiny.jpg');
        }
        break;

      case 'quantity':

        if (this.quantitySortFlag === 0) {
          app.userCollection.comparator = function(user) {
            return Number(user.get(columnToSort).valueOf());
          }
          app.userCollection.sort();
          this.quantitySortFlag = 1;
          this.nameSortFlag = 0;
          $('thead img.nameImg').attr('hidden', 'hidden');
          $('thead img.quantityImg').removeAttr('hidden');
          $('thead img.quantityImg').attr('src', 'images/DecendingTiny.jpg');
        } else {
          app.userCollection.comparator = function(user) {
            return -Number(user.get(columnToSort).valueOf());
          }
          app.userCollection.sort();
          this.quantitySortFlag = 0;
          $('thead img.quantityImg').attr('src', 'images/AcendingTiny.jpg');
        }
        break;
    }

  }
});

