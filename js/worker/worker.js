 
importScripts('http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js'); 

	self.onmessage = function(event) {
		var hash = CryptoJS.MD5(event.data);
		var success = null;
		if( hash.toString(CryptoJS.enc.Hex) === "87e5064789e25778a3c36f02a99b61c4"){
			success = event.data;
		}
		self.postMessage(success);
		self.terminate();
	};