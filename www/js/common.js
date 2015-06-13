var common = {
	QueryString : function () {
		// This function is anonymous, is executed immediately and 
		// the return value is assigned to QueryString!
		console.log("QueryString Exec," + window.location.search.substring(1) + "," + window.location.pathname + "," );
		var query_string = {};
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			// If first entry with this name
			if (typeof query_string[pair[0]] === "undefined") {
				query_string[pair[0]] = pair[1];
				// If second entry with this name
			} else if (typeof query_string[pair[0]] === "string") {
				var arr = [ query_string[pair[0]], pair[1] ];
				query_string[pair[0]] = arr;
				// If third or later entry with this name
			} else {
				query_string[pair[0]].push(pair[1]);
			}
		} 
		return query_string;
	} (),
	
	nullCheck: function(obj){
    	return (typeof obj == "undefined")?"":obj;
    },
    
    telFormat: function(tel){
    	if(tel == null) return '&nbsp;';
    	if(tel.length < 10) return tel;
    	if(tel.indexOf("-") > 0) return tel;
    	return tel.replace(/(\d\d\d)(\d\d\d\d)(\d\d\d\d)/, '$1-$2-$3');
    },
    
    telLinkFormat: function(tel){
    	if(tel == null) return '&nbsp;';
    	if(tel.length < 10) return tel;
    	var link = "<a data-rel=\"external\" href=\"tel:";
    	if(tel.indexOf("-") > 0) return link + tel + "\">"+tel+"</a>";
    	tel = tel.replace(/(\d\d\d)(\d\d\d\d)(\d\d\d\d)/, '$1-$2-$3');
    	return link + tel + "\">"+tel+"</a>";
    },
    
	checkJob: function(job){
    	var txt;
    	var iJob;
    	iJob = (this.nullCheck(job)==null)?0:parseInt(job);
    	switch(iJob){
    		case 1: txt ="성도님"; break;
    		case 2: txt ="집사님"; break;
    		case 3: txt ="권사님"; break;
    		case 4: txt ="장로님"; break;
    		case 5: txt ="전도사님"; break;
    		case 6: txt ="사모님"; break;
    		case 7: txt ="목사님"; break;
    		default: txt="님";	
    	}
    	return " " + txt;
    },
    
    checkWorship: function(worship){
    	var txt;
    	var iWorship;
    	iWorship = (this.nullCheck(worship)==null)?0:parseInt(worship);
    	switch(iWorship){
    		case 1: txt ="1부(7시)"; break;
    		case 2: txt ="2부(8시)"; break;
    		case 3: txt ="3부(10시)"; break;
    		case 4: txt ="4부(12시)"; break;
    		case 5: txt ="5부(14시30분)"; break;
    		default: txt="&nbsp;";	
    	}
    	return txt;
    },
    
    bltappid : function(){
    	return "blt1267548d4044d1d1";
    },
    
    masterid : function(){
    	return "bltefae8e3268bc0f50";
    }
};