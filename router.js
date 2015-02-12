//client/router.js

Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function() {
	this.render('home');
});

Router.route('/notes');
Router.route('/note');

Router.route('/note/:_id', function () {
  this.render('note');
  var id = this.params._id;
  Session.set('group_id', id);
}, {
  name: 'noteShow'
});