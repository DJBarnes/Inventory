Backbone.View.prototype.close = function() {
  if (this.beforeClose) {
    this.beforeClose();
  }

  this.remove();
  this.unbind();
}
var AppRouter = Backbone.Router.extend({
  initialize : function() {
    new OptionsMenuView();
  },
  routes : {
    "" : "list",
    "items/new" : "newItem",
    "items/adjust" : "redirectAdjust",
    "items/placeOrder" : "placeOrder",
    "items/viewOrder" : "viewOrder",

    "log/view" : "logView",

    "users" : "users",
    "users/new" : "newUser",
    "users/:id" : "userDetails",

    "items/viewOrder/:id" : "orderDetails",
    "items/:id" : "itemDetails",
    "login" : "login",

    ":unknown" : "unknown"
  },
  list : function() {
    this.userAuthentication(function() {
      this.startView = new StartView().render();
      this.showItemTable();
    });
  },

  itemDetails : function(id) {
    this.userAuthentication(function() {
      var item = this.itemCollection.get(id);
      var category = this.categoryCollection;
      var vendor = this.vendorCollection;
      if (item) {
        this.itemView = new ItemView({
          item : item,
          category : category,
          vendor : vendor
        }).render();
        if (!app.itemListView) {
          this.showItemTable();
        }
      } else {
        this.view404 = new Item404View({
          item404 : 'yes'
        }).render();
        this.startView = new StartView().render();
        this.headerView = new HeaderView().render();
      }
    });
  },

  newItem : function() {
    this.userAuthentication(function() {
      var category = this.categoryCollection;
      var vendor = this.vendorCollection;
      this.itemView = new ItemView({
        item : new Item(),
        category : category,
        vendor : vendor
      }).render();
      this.showItemTable();
    });
  },

  redirectAdjust : function() {
    this.userAuthentication(function() {
      this.startView = new StartView().render();
      this.showItemTable();
    });
  },

  login : function() {
    this.userAuthentication();
    this.headerView = new HeaderView({
      showManage : 'no'
    }).render();
    this.startView = new StartView().render();
    this.loginView = new LoginView({
      model : user
    }).render();

  },

  placeOrder : function() {
    this.userAuthentication(function() {
      this.headerView = new HeaderView({}).render();
      this.startView = new StartView().render();
      this.orderFormHeaderView = new OrderFormHeaderView().render();
      this.orderFormView = new OrderFormView({
        model : app.itemCollection,
        category : app.categoryCollection,
        vendor : app.vendorCollection
      }).render();
      this.orderFormFooterView = new OrderFormFooterView().render();
    });
  },

  viewOrder : function() {
    this.userAuthentication(function() {
      this.headerView = new HeaderView({}).render();
      this.startView = new StartView().render();
      this.orderListHeaderView = new OrderListHeaderView().render();
      this.orderListView = new OrderListView({
        model : app.orderCollection,
        vendor : app.vendorCollection
      }).render();
      this.orderListFooterView = new OrderListFooterView().render();
    });
  },

  orderDetails : function(id) {
    this.userAuthentication(function() {
      var order = this.orderCollection.get(id);
      var vendor = this.vendorCollection;
      if (order) {
        this.orderView = new OrderView({
          order : order,
          vendor : vendor
        }).render();
        if (!app.orderListView) {
          this.showOrderTable();
        }
      } else {
        this.view404 = new Item404View({
          item404 : 'yes'
        }).render();
        this.startView = new StartView().render();
        this.headerView = new HeaderView().render();
      }
    });
  },

  logView : function() {
    this.userAuthentication(function() {
      this.startView = new StartView().render();
      this.showLogTable();
    });
  },

  showItemTable : function() {
    this.headerView = new HeaderView({}).render();
    this.itemListHeaderView = new ItemListHeaderView({}).render();

    this.itemListView = new ItemListView({
      model : app.itemCollection,
      category : app.categoryCollection,
      vendor : app.vendorCollection
    });

    this.itemListView.render();

    this.itemListFooterView = new ItemListFooterView({}).render();
  },

  showLogTable : function() {

    this.headerView = new HeaderView({}).render();
    this.loglistHeaderView = new LogListHeaderView({}).render();

    this.loglistView = new LogListView({
      model : app.logCollection
    }).render();

    this.loglistFooterView = new LogListFooterView({}).render();
  },
  
  showOrderTable : function() {
      this.headerView = new HeaderView({}).render();
      this.orderListHeaderView = new OrderListHeaderView().render();
      this.orderListView = new OrderListView({
        model : app.orderCollection,
        vendor : app.vendorCollection
      }).render();
      this.orderListFooterView = new OrderListFooterView().render();
  },

  users : function() {
    this.userAuthentication(function() {
      this.startView = new StartView().render();
      this.showUserTable();
    });
  },

  newUser : function() {
    this.userAuthentication(function() {
      this.userView = new UserView({
        user : new Users(),
      }).render();
      this.showUserTable();
    });
  },

  userDetails : function(id) {
    this.userAuthentication(function() {
      var user = this.userCollection.get(id);
      if (user) {
        this.userView = new UserView({
          user : user,
        }).render();
        if (!app.userListView) {
          this.showUserTable();
        }
      } else {
        this.view404 = new Item404View({
          item404 : 'yes'
        }).render();
        this.startView = new StartView().render();
        this.headerView = new HeaderView().render();
      }
    });
  },

  showUserTable : function() {
    this.headerView = new HeaderView({}).render();
    this.userListHeaderView = new UserListHeaderView({}).render();

    this.userListView = new UserListView({
      model : app.userCollection
    }).render();

    this.userListFooterView = new UserListFooterView({}).render();
  },

  userAuthentication : function(callback) {
    if (!window.user) {
      window.user = new User();
    }
    if (user.authenticated()) {
      this.getData(callback);
    } else {
      app.navigate('login', true);
    }
  },

  unknown : function() {
    this.userAuthentication(function() {
      this.item404View = new Item404View().render();
      this.startView = new StartView().render();
      this.headerView = new HeaderView().render();
    });
  },

  getData : function(callback) {
    if (this.vendorCollection) {//the itemList table
      if (callback)
        callback.call(this);
    } else {
      this.itemCollection = new ItemCollection();
      this.categoryCollection = new CategoryCollection();
      //Line I added to this crap!!!!!!!!
      this.vendorCollection = new VendorCollection();
      this.logCollection = new LogCollection();
      this.userCollection = new UsersCollection();
      this.orderCollection = new OrderCollection();

      var itemSelf = this;

      this.itemCollection.fetch({
        success : function() {
          itemSelf.categoryCollection.fetch({//fetching the data for the category collection
            success : function() {
              itemSelf.vendorCollection.fetch({//fetching the data for the category collection
                success : function() {
                  itemSelf.logCollection.fetch({
                    success : function() {
                      itemSelf.userCollection.fetch({
                        success : function() {
                          itemSelf.orderCollection.fetch({
                            success : function() {
                              if (callback)
                                callback.call(itemSelf);
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }
});

tpl.loadTemplates(['orderFormHeader', 'order-form-item', 'OrderFormFooter', 'changePassword', 'header', 'item-details', 'item-list-item', 'start', 'login', 'ItemListHeader', 'ItemListFooter', 'log-list-item', 'LogListHeader', 'LogListFooter', 'optionsMenu', 'item404', 'site404', 'user-details', 'userListFooter', 'userListHeader', 'user-list-user', 'newUser-details', 'current-user-details', 'OrderListFooter', 'orderListHeader', 'orderListItem', 'order-details'], function() {
  window.app = new AppRouter();
  Backbone.history.start();
});
