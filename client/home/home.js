// client/home/home.js

Template.home.events({
	'dblclick .schema': function(evt, tmpl) {
		evt.preventDefault();
		evt.stopPropagation();
		if(evt.target.className == 'container schema') {
			var id = Positions.insert({name:'New Note',color:'yellow',date:new Date(),left:(evt.pageX + 280) + 'px',top:(evt.pageY) + 'px'});
			Session.set('editing_table',id);
		}
	}
});

Template.home.helpers({
	positions: function() {
		return Positions.find();
	}
});