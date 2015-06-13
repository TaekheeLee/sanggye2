var curPage		= 1,
	itemPerPage	= 20,
	qry			= '';
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        alert('kk');
        console.log("FFF");
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
	        document.addEventListener("deviceready", this.onDeviceReady, false);
	    } else {
	        this.onDeviceReady();
	    }
	    
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    	console.log("typeof QueryString.page:" + typeof QueryString.page);
        // curPage = ((typeof QueryString.page) == "undefined")?1:QueryString.page;
        // itemPerPage = ((typeof QueryString.pcount) == "undefined")?20:QueryString.pcount;
        
        curPage = (getParameterByName("page")=="")?1:getParameterByName("page");
        itemPerPage = (getParameterByName("pcount")=="")?20:getParameterByName("pcount");
        console.log("ParameterByName Page:" + curPage);
        
        app.getList();
    },
    
	// jscroller : function(){
	 // $('.infinite-scroll').jscroll({
	 	// //autoTrigger: false
	     // loadingHtml: '<img src="loading.gif" alt="Loading" /> Loading...',
	     // padding: 20,
	     // nextSelector: 'a.jscroll-next:last',
	     // contentSelector: 'li'
	 // });
	// },
	
	getList: function(){
		console.log("page:" + curPage);
		console.log("url:" + location.search);
		
    	var listColumn      = ['uid','thumbnail','number','regno','owner','job','worship','type'];
      	var lstQuery    = new Built.Query('Park');
        lstQuery        = lstQuery.skip((curPage-1)*itemPerPage);
        lstQuery        = lstQuery.limit(itemPerPage);
        lstQuery        = lstQuery.descending('updated_at');
        lstQuery        = lstQuery.only(listColumn);
        lstQuery.exec().
            onSuccess(function(parks) {
            	console.log("count:" + parks.length);
                var output = '';
                $.each(parks, function(index, value){
			        output += "<li><a href='#'>";
			        output += "<img src='data:image/jpeg;base64," + value.get('thumbnail') + "'>";
			        output += "<h2>" + value.get('number') + "</h2>";
			        output += "<p>" + value.get('owner') + value.get('job') + "/" + value.get('worship') + "<br>" + value.get('type') + "&nbsp;</p>";
			        output += "</a></li>";
			    });
			    
			    if(parks.length > 0){
			    	curPage ++;
			    	output += "<li><a href='paging.html?page=" + curPage + "&pcount=" + itemPerPage + "' class='jscroll-next'>NEXT</a></li>";
			    }
			    
			    $('#car-data').append(output).listview('refresh');
			    
			    
        });
  }
};

app.initialize();

