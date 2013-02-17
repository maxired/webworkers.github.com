_importScript("lib/async.js");

setTimeout(function(){

var content = document.getElementById("content");
content.innerHTML ="This page contains an asynchronous JS computation";

console.log("looking for hash \"" + CryptoJS.MD5("LJS").toString(CryptoJS.enc.Hex) + "\"");
	var finished=false;
var buildString = function(grammar, length, launchMethod){

	var toPush = [];
	var q = async.queue(launchMethod, 5);
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

	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	 var toLaunch = function toLaunch(key, cb){
	 	var begin,end;
	 	begin = +new Date();
	 	
		count++;
		if(finished) return;

		var hash = CryptoJS.MD5(key);
		if( hash.toString(CryptoJS.enc.Hex) === "87e5064789e25778a3c36f02a99b61c4"){
			endDate = new Date();
			finished=true;
			duration=endDate - beginDate;
			alert("Password found in "+duration+" sec : 	"+ key+ 'and '+ count+ ' iterations ;  total computation : '+ total);
		}
		end = +new Date();
		total += (end-begin);
		if(cb) cb();

	};

	buildString(possible , 2 ,toLaunch );
})();

} , 100)