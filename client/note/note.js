// client/home/home.js
Meteor.subscribe('theNotes');

Template.note.events({
	'dblclick .schema': function(evt, tmpl) {
		evt.preventDefault();
		evt.stopPropagation();
		if(evt.target.className == 'container schema') {
			//var id = Notes.insert({name:'New Note',color:'yellow',date:new Date(),left:(evt.pageX + 280) + 'px',top:(evt.pageY) + 'px'});
			var data = {
				date : new Date(),
				left: (evt.pageX + 280) + 'px',
				top: (evt.pageY) + 'px',
				group_id: Session.get('group_id')
			};

			var id = Meteor.call('insertNote', data);
			
			Session.set('editing_table',id);
		}
	},
});

Template.note.helpers({
	notes: function() {
		var id = Session.get('group_id');
		return Notes.find({group_id: id});
	},
	groupname: function() {
		var group_id = Session.get('group_id');
		var group = Groups.findOne({_id: group_id},{"name":1});
		return group['name'];
	}
});