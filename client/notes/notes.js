//notes/notes.js

limit = 10;
var handle;
Deps.autorun(function(){
   handle = Meteor.subscribeWithPagination("groups",limit);
});

 

Session.setDefault('show_form', null);
Session.setDefault('alert', null);

Template.notes.events({
	'click .addGroupNote': function (evt,tmpl) {
		evt.preventDefault();
		Session.set('show_form', true);
		Session.set('label_form', 'Add');
	},
	'click .closeForm': function (evt,tmpl) {
		evt.preventDefault();
		Session.set('show_form', null);
		Session.set('label_form', null);
		Session.set('alert', null);
		Session.set('edit_id', null);
	},
	'click .saveGroupNote': function (evt,tmpl) {
		evt.preventDefault();
		var id   = trimInput(tmpl.find('#id').value);
		var name = trimInput(tmpl.find('#name').value);
		var desc = trimInput(tmpl.find('#desc').value);
		var date = new Date();
		
		if(!isNotEmpty(id)) {
			if(isNotEmpty(name)) {
				Meteor.call('insertGroup', name, desc, date);
				Session.set('show_form', null);
				Session.set('label_form', null);
				Session.set('alert', null);
			}
		}else {
			if(isNotEmpty(name)) {
				Meteor.call('updateGroup', id, name, desc);
				Session.set('show_form', null);
				Session.set('label_form', null);
				Session.set('alert', null);
			}
		}
		
		Session.set('edit_id', null);

	},
	'click .editGroup': function (evt,tmpl) {
		evt.preventDefault();
		Session.set('show_form', true);
		Session.set('label_form', 'Edit');
		Session.set('edit_id', this._id);
		var group = Groups.findOne({_id:this._id});
		
	},
	'click .deleteGroup': function (evt, tmpl) {
		evt.preventDefault();
		if(confirm("Are you sure delete this??")) {
			var id = this._id;
			Meteor.call('removeGroup', id);
		}
	},
	'click .loadmore': function () {
		handle.loadNextPage();
	}
});

Template.notes.helpers({
	show_form: function () {
		return Session.get('show_form');
	},
	groups: function() {
		return Groups.find({},{sort:{createdAt: -1, name: 1}});
	},
});

Template.addform.helpers({
	label_form:function() {
		return Session.get('label_form');
	},
	alert: function() {
		return Session.get('alert');
	},
	editid: function() {
		return Session.get('edit_id');
	}
});

Template.addform.rendered = function () {
	var edit = Session.get('edit_id');
	if(edit) {
		var data = Groups.findOne({_id: edit});

		$("#id").val(data['_id']);
		$("#name").val(data['name']);
		$("#desc").val(data['desc']);
	}
};