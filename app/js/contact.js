$(document).ready(function(){
	$("#form-send button").click(function(event){
		event.preventDefault();
		var valid = true;
		$(".error-message span").hide();

		if( $.trim($("#form-name").val()) == "") {
			$("#form-name").parent().find(".error-message span").show();
			valid = false;
		}

		if( $.trim($("#form-mail").val()) == "") {
			$("#form-mail").parent().find(".error-empty").show();
			valid = false;
		}
		else{
			var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
			if( !pattern.test($("#form-mail").val())){
				$("#form-mail").parent().find(".error-content").show();
				valid = false;
			}
		}

		if( $.trim($("#form-message").val()) == "") {
			$("#form-message").parent().find(".error-message span").show();
			valid = false;
		}

		if(valid){
			$("#form-confirm").height("100%");
		}

	});

	$("#form-confirm button").click(function(){
		
		$("#form input").val("");
		$("#form textarea").val("");
		$("#form-confirm").height("0%");
	});
});