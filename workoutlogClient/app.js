$(document).ready(function(){
	//onClick event to test the API. Will print text in console
	$("#testAPI").on("click", function(){
		console.log("It is working");
	});
	
	//AJAX call to get data from url. Will print data or error message in console
	var test= $.ajax({
		type: "GET",
		url: "http://localhost:3000/api/test"
	})
	.done(function(data){
		console.log(data);
	})
	.fail(function(){
		console.log("Oh no!");
	});
});