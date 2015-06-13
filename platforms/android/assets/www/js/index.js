/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var curPage = 1,
    itemPerPage = 10;
var app = {
	// Application Constructor
	initialize : function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		this.onDeviceReady();

	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady : function() {
		app.receivedEvent('deviceready');
		app.search('');

		$(document).on('pageinit', function() {
			$("#schtxt").keydown(function(event) {
				if (event.keyCode == 13) {
					app.search($("#schtxt").val());
				}
			});
		});

	},
	// Update DOM on a Received Event
	receivedEvent : function(id) {

	},

	search : function(txt) {
		var listColumn = ['uid', 'thumbnail', 'number', 'regno', 'owner', 'job', 'worship', 'type'];
		var app = Built.App(common.bltappid());
		var ParkClass = app.Class('Park');
		var query1 = ParkClass.Query();
		query1 = query1.matches('number', txt, 'i');
		var query2 = ParkClass.Query();
		query2 = query2.matches('regno', txt, 'i');
		var query = ParkClass.Query();
		query = query.or([query1, query2]);
		query = query.limit(itemPerPage);
		query = query.descending('updated_at');
		query = query.only(listColumn);
		
		$('#loading').show();
		
		query.exec().then(function(parks) {
			console.log("count:" + parks.length);
			$('#car-data').empty();
			if(parks.length > 0){
				$('#no-car').hide();
				var output = '';
				$.each(parks, function(index, value) {
					output += "<li><a href='show.html?id=" + value.get('uid') + "' data-ajax='false'>";
					var img = value.get('thumbnail');
					if(typeof(img) == 'undefined'){
						output += "<img src='img/noimage.png' style='margin-top:20px'>";
					}else{
						output += "<img src='data:image/jpeg;base64," + img + "'>";
					}
					output += "<h2>" + value.get('number') + "</h2>";
					var owner = (typeof(value.get('owner')) == 'undefined')?'':value.get('owner');
					output += "<p>" + owner + common.checkJob(value.get('job')) + "/" + common.checkWorship(value.get('worship')) + "<br>" + value.get('type') + "&nbsp;</p>";
					output += "</a></li>";
				});
	
				$('#car-data').append(output).listview('refresh');
				$('#loading').hide();
				$('#car-data').show();
				
			}else{
				$('#car-data').hide();
				$('#loading').hide();
				$('#no-car').show();
			}
		});

	},
	
	regist: function(uid){
		var App = Built.App(common.bltappid()).setMasterKey(common.masterid());
		var Park = App.Class('Park').Object;
		var park = Park(uid);
		park = park.set('published', true);
		
		park.save()
			.then(function(park){
				console.log("saveAsDrafe->save() Ok");
				$('#frmRegist').submit();
			},function(error){
				console.log("saveAsDrafe->save() Error");
			});
	},
	
	saveDraft: function(){
		try{
			var App = Built.App(common.bltappid()).setMasterKey(common.masterid());
			var Park = App.Class('Park').Object();

			Park  = Park.assign({
				regno : $("#regno").val(),
				number: $("#number").val(),
				owner : $("#owner").val(),
				job	  : $("#select-job").val(),
				worship : $("#select-worship").val(),
				telno : $("#telno").val(),
				telno2: $("#telno2").val(),
				type  : $("#type").val(),
				memo  : $("#memo").val()
			});
			
			Park.saveAsDraft()
				.then(function(draft){
					console.log("Insert:" + draft.getUid());
					app.regist(draft.getUid());
				}, function(error){
					console.log("Error");
					alert(error);
				});
			
		}catch(e){
			console.log(e);
		}
		
	}
};

app.initialize();

