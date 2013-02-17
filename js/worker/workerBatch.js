 
importScripts('http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js'); 

var stopped=false;
self.onmessage = function(event) {
	var success = null;
	self.onmessage = function(event){
		stopped=true;
		self.close();
	};
	event.data.some(function(key){
		if(stopped) { return true;}
		var hash = CryptoJS.MD5(key);
		if( hash.toString(CryptoJS.enc.Hex) === "87e5064789e25778a3c36f02a99b61c4"){
			success = key;
			return true;
		}
	});
	self.postMessage(success);

	};
	