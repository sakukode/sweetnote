trimInput = function(value) {
	return value.replace(/^\s*|\s*$/g,'');
};

isNotEmpty = function(value) {
	if(value && value !== '') {
		return true;
	}

	Session.set('alert','Please fill in all required fields');
	return false;
};