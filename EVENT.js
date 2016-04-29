document.addEventListener('click', function(ev) {
	EVENT.check(ev.target, 'click');
}, true);
document.addEventListener('scroll', function(ev) {
	EVENT.check(ev.target, 'scroll');
}, true);

EVENT = {
	list: {},
	set: function(node, type, callback, ID) {
		if (!ID) ID = EVENT.uniqueID();
		// console.log('EVENT.js SET:', ID);
		EVENT.list[ID] = {
			node: node,
			type: type,
			callback: callback
		};
		return ID;
	},
	del: function(ID) {
		// console.log('EVENT.js DEL:', ID);
		delete EVENT.list[ID];
	},
	check: function(node, type) {
		// console.log('EVENT.js:', type, element);
		for (var ID in EVENT.list) {
			var event = EVENT.list[ID];
			// if (ID.indexOf('2016') != -1)
			// console.log('EVENT.js:', ID, event.type, event.node);
			if (event.node != node) continue;
			if (event.type != type) continue;
			if (event.callback) event.callback();
		}
	},
	uniqueID: function() { // 62^6 = 50 Billion
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
		var ID = '';
		for (var i = 0; i < 10; i++)
			ID += chars[Math.floor((Math.random() * 62))];
		return ID;
	}
}