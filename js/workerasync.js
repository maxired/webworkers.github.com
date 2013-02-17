

_importScript("lib/async.js");

setTimeout(function(){

var content = document.getElementById("content");
content.innerHTML ="This page contains an asynchronous JS computation";

console.log("looking for hash \"" + CryptoJS.MD5("LJS").toString(CryptoJS.enc.Hex) + "\"");
	var finished=false;


var webWorkersNumber = 11;
var workers = [];
var w;
for(var i =0; i<webWorkersNumber ;i++){
	workers.push(new Worker('./js/worker/worker.js')	);
}

var buildString = function(grammar, length, launchMethod){

	var toPush = [];
	var q = async.queue(launchMethod, webWorkersNumber);
	q.drain = function() {
    	console.log('all items have been processed');
	};
	var findPwd = function(pw, pos){
		if(finished)return;
		if(pos<0){
			toPush.push(pw.join(''))
			return;
		}
		for(var i =0; i<=grammar.length;i++){
			pw[pos]=grammar[i];
			findPwd(pw, pos-1);
		}
	}
	findPwd([],length);
	q.push(toPush);

};

var count=0;
var total=0;
(function(wanted){
	var beginDate, endDate,duration, hash, origin;

	beginDate = new Date();

	//var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	 var toLaunch = function toLaunch(key, cb){
		var w = workers.splice(0,1)[0];
		count++;
	 	//creating a new web workers
	 	
		w.onmessage = function(event) {
			if(event.data){
				endDate = new Date();
				duration=endDate - beginDate;
				alert("Password found in "+duration+" sec : 	"+ event.data);
		
				
			};
			//delete worker;
			workers.push(w);
			if(cb)  cb();
		};
		w.postMessage(key);
};

	buildString(possible , 2 ,toLaunch );
})();

} , 100)