$(document).ready(function(){
	$.getJSON('data/data.json',function(data){
		console.log(data);
		var categories = {};
		//affichage catégories
		$.each(data.categories,function(key,val){
			categories[val.var] = val.value;
			$("#category-list").append("<li><button data-category='"+val.var+"'>"+val.value+"</li>");
		});

		$.each(data.list,function(key,val){
			var thumb = "<a class='thumb' data-type='"+val.type+"' data-"+val.category+">";
			thumb += "<img src='img/thumbs/" + val.file + ".jpg' alt='" + val.title +"'>";
			thumb += "<div class='thumb-resume'>";
			thumb += "<h3>"+val.title+"</h3>";
			thumb += "<span>"+categories[val.category]+"</span>";
			thumb += "</div></a>";


			var expand = $("<div>").addClass("thumb-expand-inner").append(
				$("<i>").addClass("close-button").addClass("icon-close").text("Fermer")
			);

			var desc = $("<div>").addClass("thumb-detail-inner").append(
				$("<h1>").text(val.title)
			).append(
				$("<span class='category'>").text(categories[val.category])
			).append(
				$("<p>").html(val.description)
			);

			if(val.type == 'gallery'){
				var buttons_list = $("<div id='gallery-buttons'>");
				var button;
				for (var i = 1; i <=3; i++) {
					button = $("<button>").text(i);
					if(i==1){
						button.addClass("current");
					}
					button.click(function(){
						$(this).parent().parent().parent().parent().find(".fullimg-content img").attr("src","img/" + val.file+"-"+$(this).text()+".jpg");
						$("#gallery-buttons .current").removeClass("current");
						$(this).addClass("current");
					});
					buttons_list.append(button);
				}
				desc.append(buttons_list);
			}



			expand.append(
				$("<div>").addClass("thumb-detail").append(desc)
			);

			if(val.type == 'video'){
				expand.append(
					$("<div>").addClass("thumb-video").addClass("thumb-file").append(
						$("<div>").addClass("video-content").append(
							$("<iframe>").attr({
								src : val.link,
								frameborder : 0,
								allowfullscreen:"",
								'wmode': 'Opaque'
							})
						)
					)
				);
			}
			else if(val.type == 'image' || val.type == 'gallery'){
				var img;
				if(val.type=='image'){
					img = $("<img>").attr({
						src : "img/" + val.file+".jpg",
						alt : val.title
					});
				}else{
					img = $("<img>").attr({
						src : "img/" + val.file+"-1.jpg",
						alt : val.title
					});
				}
				expand.append(
					$("<div>").addClass("thumb-fullimg").addClass("thumb-file").append(
						$("<div>").addClass("fullimg-content").append(
							$("<a>").attr({
								href : "img/"+val.file+".jpg",
								title : "Voir l'image en plus grand"
							}).append(img)
						)
					)
				);	
			}


			var li = $("<li>").append(thumb).append(
					$("<div>").addClass("thumb-expand").append(expand)
			);

			$("#gallery").append(li);
		});

		$("#category-list button").click(function(){
			$("button.current").removeClass("current");
			$(this).addClass("current");
			var cat = $(this).attr('data-category');
			if(cat == "all"){
				$("#gallery li").show();
			}
			else{
				$("#gallery li").hide();
				$("#gallery li a[data-"+cat+"]").parent().show();
			}
		});



		$("#gallery li > a").click(function(){

			var t = $(this).parent();
			var thumb = t.find(".thumb-expand");
			
			$(".current-thumb").parent().height(250);
			$(".current-thumb").height(0);
			
			var currentOffset = $(".current-thumb").length== 0 ? 0 :$(".current-thumb").parent().offset().top + 250;

				

			if(thumb.height() == 0 ){
				
				var h = thumb.find(".thumb-file").height();

				

				if($(window).width() < 769){
					h += 20+thumb.find(".thumb-detail").height();
				}
				else if(h < $(".thumb-detail").height()){
					h = $(".thumb-detail").height();
				}

				thumb.height(60+h);
				$(this).parent().height(320+h);
				
				var offset = thumb.offset().top;
				if(Math.round(currentOffset+10) < Math.round(offset)){
					offset -= $(".current-thumb").height();	
				} 
				$("body,html").animate(
					{scrollTop:offset},
					'500'
				); 
				$(".current-thumb").removeClass("current-thumb");
				

				thumb.find(".close-button").click(function(){
					thumb.height(0);
					$("#gallery li").height(250);
					$("body,html").animate(
						{scrollTop:thumb.parent().offset().top},
						'500'
					); 
					thumb.find(".close-button").unbind("click");

				});
				thumb.addClass("current-thumb");
				
			}
			else{
				$(".current-thumb").removeClass("current-thumb");
				$("body,html").animate(
					{scrollTop:currentOffset-250},
					'500'
				); 
			}

		});		

		
	});

	
});