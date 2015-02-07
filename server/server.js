Meteor.startup(function() {

    return Meteor.methods({

      removeAllDBfields: function(tableId) {

        return DBfields.remove({tableid:tableId});

      }

    });

  });