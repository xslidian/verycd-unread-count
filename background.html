<!doctype html>
<meta content=text/html;charset=utf-8 http-equiv=Content-Type />
<title i18n-content=extension_name>VeryCD Notifications</title>
<script>
	var VeryCD={Members:{Messages:{'unRead':-1,'sinat':false,'qqt':false}}};
	chrome.browserAction.onClicked.addListener(function() {
		chrome.tabs.create({url: 'http://home.verycd.com/space.php?do=pm&filter=newpm'})});
	chrome.browserAction.setBadgeText({text:'...'});
	chrome.browserAction.setIcon({path:'icons/icon.png'});
</script>
<script id="datajs" src="http://www.verycd.com/ajax/member?m=messages&format=js"></script>
<script>
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(fun) {
			var len = this.length;
			if (typeof fun != 'function')
				throw new TypeError();

			var thisp = arguments[1];
			for (var i = 0; i < len; i++)
			{
				if (i in this)
					fun.call(thisp, this[i], i, this);
			}
		};
	}
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
	setInterval("updatedata();", 10000);
	setInterval("updatebadge();", 1000);
	//chrome.windows.onFocusChanged.addListener(function(integer windowId) {updatebadge()});
	</script>
<!--body onload="updatebadge();"-->
