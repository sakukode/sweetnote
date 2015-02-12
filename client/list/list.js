// client/list/list.js

Template.list.events({
	'click .edit-list': function (evt,tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		Session.set('editing_field', this._id);
	},
	'keyup .elist': function (evt,tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		var fieldname = tmpl.find('.elist').value;
		if(fieldname && evt.which == 13) {
			var data = {
				id: this._id,
				name: fieldname
			};
			Meteor.call('updateList', data);
			Session.set('editing_field', null);
		}
	},
	'click .remove-list': function (evt,tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		Meteor.call('removeList', this._id);
	},
	'click .done-list': function (evt, tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		var data = {
			id: this._id,
			done: true
		};
		Meteor.call('updateStatusList', data);
	},
	'click .not-done-list': function (evt,tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		var data = {
			id: this._id,
			done: false
		}
		Meteor.call('updateStatusList', data);
	}
});

Template.list.helpers({
	editing_field: function() {
		return Session.equals('editing_field', this._id);
	}
});

Template.list.rendered = function() {
	
	$('.list').hover(function() {
		
		$(this).addClass('highlight');
		$(this).find('.btn-action').show();
		
	}, function() {
		$(this).removeClass('highlight');
		$(this).find('.btn-action').hide();
	});
	
}