function readText(filename){
	var raw = new XMLHttpRequest();
	var all;
	raw.open("GET","https://midnev.github.io/Future-The-Origin-FINAL/"+filename,false);
	raw.onreadystatechange = function(){
		if(raw.readyState === 4){
			if(raw.status === 200 || raw.status ==0){
				all = raw .responseText;
			}
		}
	
	}
	raw.send(null)
	return all;
}