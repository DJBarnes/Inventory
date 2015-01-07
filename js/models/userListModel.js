window.Users = Backbone.Model.extend({
  defaults : {
    'id' : null,
    'username' : '',
    'password' : '',
    'email' : '',
    'roleId' : ''
  },

  urlRoot : 'api/users/',

  strValidate : function(str) {
    //var flag = /^[a-zA-Z0-9]*$/.test(str);
    var flag = !/^[^<>:;`~\!\?\\\[\]\{\}]+$/.test(str);
    return flag;
  },

  passwordValidate : function(str) {
    //var flag = /^[a-zA-Z0-9]*$/.test(str);
    var flag = !/^[^<>:;`\\\[\]\{\}]+$/.test(str);
    return flag;
  },

  validate : function(attrs) {
    if (this.strValidate(attrs.username) === true) {
      return "Invalid Username";
    }
    if (this.passwordValidate(attrs.password) === true) {
      return "Invalid Password";
    }
  },

  passwordChangeValidateSave : function() {
    var newPassword = $('#newPassword').val();
    var newPasswordAgain = $('#newPasswordAgain').val();
    var currentPassword = $.md5($('#currentPassword').val())
    if (currentPassword !== this.get('password')) {
      return 'Current password is incorrect.';
    }
    if (newPassword !== newPasswordAgain) {
      return 'New passwords do not match.';
    }
    if ($.md5(newPassword) === currentPassword) {
      return 'New password can not be the same as current password.';
    }

    if (this.passwordValidate(newPassword) === true) {
      return 'Invalid characters in new password fields.';
    } else {
      newPassword = $.md5(newPassword);
    }

    this.save({
      'password' : newPassword
    });

  },

  saveUser : function() {
    var self = this;
    this.set({
      username : $('#name').val(),
      password : $.md5($('#password').val()),
      email : $('#email').val(),
    });
    if (this.isValid()) {
      app.userCollection.create(this, {
        success : function() {
          app.navigate('users/' + self.id, true);
        },
        error : function() {
          alert('user creation error');
        }
      });
    }
  }
});

window.UsersCollection = Backbone.Collection.extend({
  model : Users,
  url : 'api/users/',

});
