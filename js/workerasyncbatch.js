

_importScript("lib/async.js");

setTimeout(function(){

var content = document.getElementById("content");
content.innerHTML ="This page contains an asynchronous JS computation";

console.log("looking for hash \"" + CryptoJS.MD5("LJS").toString(CryptoJS.enc.Hex) + "\"");
	var finished=false;


var webWorkersNumber = 4;
var jobs = [];

for(var i =0; i<webWorkersNumber ;i++){
		jobs.push([]);
	}

var nbJobs=0;
var buildString = function(grammar, length, launchMethod){

	var toPush = [];
	var q = async.queue(launchMethod, webWorkersNumber);
	q.drain = function() {
    	console.log('all items have been processed');
	};
	var findPwd = function(pw, pos){
		if(finished)return;
		if(pos<0){
			jobs[nbJobs++%webWorkersNumber].push(pw.join(''))
			return;
		}
		for(var i =0; i<=grammar.length;i++){
			pw[pos]=grammar[i];
			findPwd(pw, pos-1);
		}
	}
	findPwd([],length);
	q.push(jobs);

};

var count=0;
var total=0;
var workers=[];
(function(wanted){
	var beginDate, endDate,duration, hash, origin;

	beginDate = new Date();

	//var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	 var toLaunch = function toLaunch(keys, cb){

		var worker = new Worker('./js/worker/workerBatch.js');
		workers.push(worker);

	 	worker.onmessage = function(event) {
			if(event.data){
				endDate = new Date();
				duration=endDate - beginDate;
				alert("Password '"+event.data+"' found in "+duration+" msec : ");	
			};

			workers.forEach(function(w){
				w.postMessage('stop');
				delete w;
			})

			if(cb)  cb();
		};
		worker.postMessage(keys);
};

	buildString(possible , 2 ,toLaunch );
})();

} , 100)