onmessage = function(event){
	console.log('|| m.httpWorker ||', event);
  
	var http = new XMLHttpRequest();
	var type = event.data.type ? "POST": "GET";
  
	http.open(type, event.data.url, true);
  
	//Send the proper header information along with the request
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	http.setRequestHeader("Content-type", "application/json");
	//http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
	var params = event.data.message ? JSON.stringify(event.data.message) : null;
	// console.log('params::', params);
	http.send(params);
  
	http.onreadystatechange = function() {
  
		if(http.readyState == 4) {
		  if(http.status == 200){
			//서버의 json 값은 모든 값이 "":"" 형태여야 한다.
			var response = JSON.parse(http.responseText);
			// console.log('get return value:', response);
			postMessage(response);
		  }
		  else{
			console.log('fail status', http);
			postMessage(null);
		  }
		}
	}
  }
  