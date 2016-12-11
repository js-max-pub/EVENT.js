EVENT = {
	types: [],
	count: 0,
	list: {},

	register: function(type) {
		if (EVENT.types.indexOf(type) > -1) return;
		document.addEventListener(type, EVENT.check, true);
		EVENT.types.push(type);
	},
	add: function(type, callback, node, ID) {
		if (!ID) ID = 'event_' + (++EVENT.count);
		if (!node) node = document;
		EVENT.list[ID] = {
			type: type,
			callback: callback,
			node: node
		};
		EVENT.register(type);
		return ID;
	},
	del: function(ID) {
		delete EVENT.list[ID];
	},
	check: function(ev) {
		var node = ev.target;
		var type = ev.type;
		for (var ID in EVENT.list) {
			var event = EVENT.list[ID];
			if (ev.type != event.type) continue;
			if (ev.path.indexOf(event.node) < 0) continue;
			console.log('EVENT.js:', ID, event.type, event.node);
			if (event.callback) event.callback(ev);
		}
	},
	fire: function(type, data, node) {
		if (!node) node = document;
		var event = new CustomEvent(
			type, {
				detail: data,
				bubbles: true,
				cancelable: true
			}
		);
		node.dispatchEvent(event);
	}
};
EVENT.on = EVENT.add;
EVENT.kill = EVENT.del;


// evv = ev;
// console.log('check', event);


// types: ['scroll', 'click', 'mousedown', 'mouseup', 'keydown', 'keyup', 'keypress'],


// detail: {
// 	message: message,
// 	time: new Date(),
// },


// var nodes = [node];
// while (node = node.parentNode)
// 	nodes.push(node);
// node = nodes[0];


// console.log('add listener', EVENT.types[i]);
// for (var i in EVENT.types)
// 	document.addEventListener(EVENT.types[i], function(ev) {
// 		console.log('add listener', this.event, ev.detail);
// 		EVENT.check(this.event, ev.target);
// 	}.bind({
// 		event: EVENT.types[i]
// 	}), true);


// document.addEventListener('click', function(ev) {
// 	EVENT.check(ev.target, 'click');
// }, true);
// document.addEventListener('scroll', function(ev) {
// 	EVENT.check(ev.target, 'scroll');
// }, true);

// console.log('EVENT.js DEL:', ID);
// console.log('EVENT.js:', type, element);
// console.log('EVENT.js:', ID, event.type, event.node);
// if (event.node != node) continue;


// if (!ID) ID = 'event_' + Object.keys(EVENT.list).length;
// if (!ID) ID = EVENT.uniqueID();
// console.log('EVENT.js SET:', ID);
// uniqueID: function() { // 62^6 = 50 Billion
// 	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
// 	var ID = '';
// 	for (var i = 0; i < 10; i++)
// 		ID += chars[Math.floor((Math.random() * 62))];
// 	return ID;
// }