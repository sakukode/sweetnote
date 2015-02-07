// client/position/position.js

Template.position.events({
	'click .edit-note': function (evt, tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		Session.set('editing_tablename',this._id);
	},
	'keyup .tablename': function (evt, tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		if(evt.which === 13) {
			Positions.update(this._id,{$set:{name:tmpl.find('.tablename').value}});
			Session.set('editing_tablename', null);
		}
	},
	'click .addfield': function (evt,tmpl) {
		evt.preventDefault();
		evt.stopPropagation();
		DBfields.insert({name:'New List',done:false,tableid:this._id});
	},
	'click .close': function (evt,tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		Positions.remove({_id:this._id});
		Meteor.call('removeAllDBfields',this._id);
	},
	'click .btn-color': function (evt,tmpl) {
		//evt.stopPropagation();
		//evt.preventDefault();
		var color = $(evt.currentTarget).data('color');
		Positions.update(this._id, {$set:{color:color}});
	}
});
Template.position.rendered = function() {
	$('.modal').draggable({
		handler:'.modal-header',
		stop:function(evt,ui){
			var left = ui.position.left;
			var top = ui.position.top;
			Positions.update($(this).attr('id'),{$set:{left:left + 'px',top:top + 'px'}});
		}
	});
}

Template.position.helpers({
	editing_tablename: function() {
		return Session.equals('editing_tablename', this._id);
	},
	dbfields: function() {
		return DBfields.find({tableid:this._id});
	},
	dateFormatter: function(date) {
		return moment(date).format('DD MMM YYYY HH:mm');
	}
});