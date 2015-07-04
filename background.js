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

	var VeryCD={Members:{Messages:{'unRead':-1,'sinat':false,'qqt':false}}};
	chrome.browserAction.onClicked.addListener(function() {
		chrome.tabs.create({url: 'http://home.verycd.com/space.php?do=pm&filter=newpm'})});
	chrome.browserAction.setBadgeText({text:'...'});
	chrome.browserAction.setIcon({path:'icons/icon.png'});

	function attachnum(element, index, array) {
		if (element.selected==true)
			chrome.browserAction.setBadgeText({text:VeryCD.Members.Messages.unRead.toString(),tabId:element.id});
		console.log(element);
	}
	function updatedata(/*num*/) {
		var datajs=document.createElement('script');
		datajs.setAttribute("id","datajs");
		datajs.setAttribute("type","text/javascript");
		datajs.setAttribute("src", 'http://www.verycd.com/ajax/member?m=messages&format=js&rnd='+
			new Date().getTime());
		document.getElementById("datajs").parentNode.replaceChild(datajs,document.getElementById("datajs"));
		console.log(new Date().getTime() + ' ' + VeryCD.Members.Messages.unRead.toString());
	}
	function updatebadge(/*num*/) {
		chrome.windows.getLastFocused(function (activewindow) {
			if (activewindow.focused) {
		console.log(new Date().getTime() + ' ' + VeryCD.Members.Messages.unRead.toString() + ' (cached)');
		//chrome.browserAction.setBadgeText({text:VeryCD.Members.Messages.unRead.toString()});
			chrome.tabs.getAllInWindow(activewindow.id,function(tabs){
				tabs.forEach(attachnum);
				});
			chrome.browserAction.setBadgeText({text:VeryCD.Members.Messages.unRead.toString()});
			}
		});
	}
	setInterval("updatedata();", 1000*60);
	//chrome.windows.onFocusChanged.addListener(function(integer windowId) {updatebadge()});
