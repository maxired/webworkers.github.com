// 13377 iterations 0.5 sec 


var content = document.getElementById("content");
content.innerHTML ="This page contains a blocking JS computation";

console.log("looking for hash \"" + CryptoJS.MD5("LJS").toString(CryptoJS.enc.Hex) + "\"");
var finished=false;
var buildString = function(grammar, length, launchMethod){
	var findPwd = function(pw, pos){
		if(finished)return;
		if(pos<0){
			launchMethod(pw.join(''));
			return;
		}
		for(var i =0; i<=grammar.length;i++){
			pw[pos]=grammar[i];
			findPwd(pw, pos-1);
		}
	}
	findPwd([],length);
};
var count=0;
(function(wanted){
	var beginDate, endDate,duration, hash, origin;

	beginDate = new Date();

	//var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	buildString(possible , 2 , function(key){
		count++;
		var hash = CryptoJS.MD5(key);
		if( hash.toString(CryptoJS.enc.Hex) === "87e5064789e25778a3c36f02a99b61c4"){
			endDate = new Date();
			finished=true;
			duration=endDate - beginDate;
			alert("Password '"+key+"' found in "+duration+" msec : "+" with "+count+' iterations' );
		}
	});
})();