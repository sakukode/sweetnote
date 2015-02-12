	Meteor.publish('theLists', function(){
		return Lists.find({});
	});

	Meteor.methods({
		'insertList': function(data){
			
			Lists.insert({
				name: "New List",
				done: false,
				noteid: data['tableid']
			});
		},
		'updateList': function(data) {
			Lists.update(data['id'], {$set:{name: data['name']}});
		},
		'removeList': function(id) {
			Lists.remove({_id: id});
		},
		'updateStatusList': function(data) {
			Lists.update(data['id'], {$set:{done: data['done']}});
		},
		'removeAllLists': function(noteId) {

        	Lists.remove({noteid: noteId});
      	}
	});