window.User = Backbone.Model.extend({
  defaults : {
    'id' : 0,
    'username' : '',
    'password' : '',
    'roleId' : '',
    'access_token' : null
  },

  urlRoot : 'api/login/validate/',

  initialize : function() {

    if ($.cookie('PHPSESSID') != null) {
      if (!isNaN($.cookie('PHPSESSID'))) {
        this.id = $.cookie('PHPSESSID');
        this.set({
          'access_token' : $.cookie('PHPSESSID')
        });
        this.fetch({
          type : 'POST',
        });
      } else {
        this.id = 0;
      }
    }
  },

  authenticated : function() {
    return Boolean(this.get("access_token") != null);
  },

  unauthenticate : function() {
    //$.cookie('PHPSESSID', 0,{expires:-3600});0
    this.unset();
    this.set({
      'id' : 0,
      'access_token' : null
    })

    $.ajax({
      url : 'api/logout/'
    });

  },

  //Saves session information to cookie
  save : function() {
  },

  //Loads session information from cookie
  load : function() {
    self = this;
    this.fetch({
      data : {
        'Username' : this.get('username'),
        'Password' : this.get('password')
      },
      type : 'POST',
      success : function() {
        self.set({
          'access_token' : $.cookie('PHPSESSID')
        });
        if (self.authenticated() == true) {
          $('.contentBody').empty();
          $('#header').empty();
          $('#details').empty();
          app.navigate('', true);
        } else {
          alert('There was a problem logging you in.');
        }
      },
      error : function() {
        alert('Sorry. Your username and/or password is invalid. Please try again.');
      }
    });
  }
});
