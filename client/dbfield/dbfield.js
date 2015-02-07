// client/dbfield/dbfield.js

Template.dbfield.events({
	'click .edit-list': function (evt,tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		Session.set('editing_field', this._id);
	},
	'keyup .efield': function (evt,tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		var fieldname = tmpl.find('.efield').value;
		if(fieldname && evt.which == 13) {
			DBfields.update(this._id, {$set:{name:fieldname}});
			Session.set('editing_field', null);
		}
	},
	'click .remove-list': function (evt,tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		DBfields.remove({_id:this._id});
	},
	'click .done-list': function (evt, tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		DBfields.update(this._id, {$set:{done:true}});
	},
	'click .not-done-list': function (evt,tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		DBfields.update(this._id, {$set:{done:false}});
	}
});

Template.dbfield.helpers({
	editing_field: function() {
		return Session.equals('editing_field', this._id);
	}
});

Template.dbfield.rendered = function() {
	
	$('.list').hover(function() {
		$(this).addClass('highlight');
		$(this).find('.btn-action').show();
		var tes = Session.get('editing_field');
	}, function() {
		$(this).removeClass('highlight');
		$(this).find('.btn-action').hide();
	});
	
}