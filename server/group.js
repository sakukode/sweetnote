	Meteor.publish("groups", function(limit){
	    var currentUserId = this.userId;
		return Groups.find({createdBy:currentUserId},{limit:limit})
	});
	
	Meteor.methods({
		'insertGroup': function(name,desc,date){
			var currentUserId = this.userId;
			
			var id = Groups.insert({
				name: name,
				desc: desc,
				createdBy: currentUserId,
				createdAt: date
			});

			if(id) {
				return id;
			}
		},
		'updateGroup': function(id,name,desc) {
			Groups.update(id, {$set:{name: name, desc: desc}});
		},
		'removeGroup': function(id){
			Groups.remove(id);
		},
		'modifyPlayerScore': function(selectedPlayer, scoreValue){
			PlayersList.update(selectedPlayer, {$inc: {score: scoreValue}});
		},
	});