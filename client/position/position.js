// client/position/position.js
Meteor.subscribe('theLists');

Template.position.events({
	'click .edit-note': function (evt, tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		Session.set('editing_tablename',this._id);
	},
	'keyup .tablename': function (evt, tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		var name = trimInput(tmpl.find('.tablename').value);
		if(name && evt.which === 13) {
			var data = {
				id: this._id,
				name: name,
			};

			Meteor.call('updateNoteName', data);
			Session.set('editing_tablename', null);
		}
	},
	'click .addlist': function (evt,tmpl) {
		evt.preventDefault();
		evt.stopPropagation();
		var data = {
			tableid: this._id
		};
		Meteor.call('insertList', data);
		//DBfields.insert({name:'New List',done:false,tableid:this._id});
	},
	'click .close': function (evt,tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		Meteor.call('removeNote', this._id);
		Meteor.call('removeAllLists',this._id);
	},
	'click .btn-color': function (evt,tmpl) {
		//evt.stopPropagation();
		//evt.preventDefault();
		var data = {
			id: this._id,
			color: $(evt.currentTarget).data('color'),
		};
		
		Meteor.call('updateNoteColor', data);
	}
});
Template.position.rendered = function() {
	$('.modal').draggable({
		handler:'.modal-header',
		stop:function(evt,ui){
			var left = ui.position.left;
			var top = ui.position.top;

			var data = {
				id: $(this).attr('id'),
				left: ui.position.left + 'px',
				top: ui.position.top + 'px'
			}
			Meteor.call('updateNotePosition', data);
			//Positions.update($(this).attr('id'),{$set:{left:left + 'px',top:top + 'px'}});
		}
	});
}

Template.position.helpers({
	editing_tablename: function() {
		return Session.equals('editing_tablename', this._id);
	},
	lists: function() {
		return Lists.find({noteid:this._id});
	}
});