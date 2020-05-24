var api = { // https://github.com/Sneezry/music.163.com/commit/1c71666efb49799958879f71b9ce64a316cafc97
	httpRequest: function(method, action, query, urlencoded, callback, timeout){
		var url = "GET" == method ? (query ? action+"?"+query : action) : action;
		var timecounter;

		if(this.debug){
			this.outputDebug("httpRequest: method("+method+") action("+action+") query("+query+") urlencoded("+(urlencoded?1:0)+")");
		}

		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);
		if("POST" == method && urlencoded){
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if(timecounter){
					clearTimeout(timecounter);
				}
				if(this.debug){
					this.outputDebug(xhr.responseText);
				}
				if(callback){
					callback(xhr.responseText);
				}
			}
		}
		xhr.addEventListener('error', function(){callback(-1)}, false);
		xhr.addEventListener('abort', function(){callback(-2)}, false);
		if("POST" == method && query){
			xhr.send(query);
		}
		else{
			xhr.send();
		}
		if(timeout){
			timecounter = setTimeout(function(){
				if(xhr.readyState != 4){
					xhr.abort();
				}
			}, timeout);
		}
	}
};

	var VeryCD={"fans":0,"comment":0,"playlink":0,"message":0,"friend_comment":0,"thread":0,"all":0,"feed_tabs":{"all":0,"playlink":0,"friend_comment":0,"thread":0},"is_banned_change_exp":0};
	var keys = ['message', 'comment', 'friend_comment', 'thread', 'fans', 'playlink'];
	chrome.browserAction.onClicked.addListener(function() {
		window.open('http://www.verycd.com/');
});
	chrome.browserAction.setBadgeText({text:'...'});
	chrome.browserAction.setIcon({path:'icons/icon.png'});

	function updatedata(/*num*/) {
		api.httpRequest('POST', 'http://www.verycd.com/ajax/i/notice', '', true, function(t){
			//console.log(t);
			if(t == -1 || t == -2) return;
			var r = JSON.parse(t);
			if(!r || r.code != 0) { // 网站异常
				console.log(new Date().toLocaleString() + '\t' + t);
				if(r.code){
					chrome.browserAction.setBadgeText({text: '!'});
					chrome.browserAction.setTitle({title: r.code + ' ' + r.msg});
				}
				return;
			}
			var j = r.msg ? JSON.parse(r.msg) : false;
			if(j && j.all != undefined) {
				VeryCD = j;
				updatebadge();
			}
			console.log(new Date().toLocaleString(), j);
		});
	}
	function updatebadge(/*num*/) {
			chrome.browserAction.setBadgeText({text:VeryCD.all.toString()});
			var 鼠标提示 = '';
			keys.forEach(function(k){
				//console.log(k, VeryCD[k]);
				鼠标提示 += k + ': ' + VeryCD[k] + '\n';
			});
			chrome.browserAction.setTitle({title: 鼠标提示});
	}

updatedata();
setInterval(updatedata, 1000*60);
