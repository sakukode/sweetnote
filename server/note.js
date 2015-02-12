	Meteor.publish('theNotes', function(){
		
		return Notes.find({});
	});

	Meteor.methods({
		'insertNote': function(data){
			var currentUserId = this.userId;
			
			Notes.insert({
				name: "New Note",
				color: "yellow",
				createdBy: currentUserId,
				date: data['date'],
				left: data['left'],
				top: data['top'],
				group_id: data['group_id']
			});
		},
		'removeNote': function(id){
			Notes.remove(id);
		},
		'updateNoteName': function(data){
			Notes.update(data['id'],{$set:{name:data['name']}});
		},
		'updateNoteColor': function(data) {
			Notes.update(data['id'], {$set:{color:data['color']}});
		},
		'updateNotePosition': function(data) {
			Notes.update(data['id'],{$set:{left:data['left'],top: data['top']}});
		},
		'getGroupname': function(group_id) {
			var currentUserId = this.userId;
			
		}
	});