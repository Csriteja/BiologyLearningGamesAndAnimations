$(document).ready(function () {
	
	for (var i = 0; i < questions.length; i++) {
		document.getElementById("a" + (i+1)).innerHTML = questions[i]["answer"];
	}
	
    var move_to = function( $obj, $target){
        $parent = $obj.parent();
        $parent.detach($obj);
        $target.append($obj);
        update($parent);
        update($target);
    }
	
    var update = function($con){
        if($con.hasClass("question")){
            $children = $con.children();
            if($children.hasClass("answer")){
                $con.addClass("has-answer");
                $con.contents().each(function(){
                    if(!$(this).hasClass("answer")){
                        $(this).remove();
                    }
                });
            }else{
                $con.removeClass("has-answer");
            }
        }else if($con.hasClass("word-bank")){
        }
    }
	
    $(".answer").draggable({
        revert: "invalid",
        revertDuration: 0,
        stop:function(ev, ui){
            $q = $(this);
            $q.css("top", "");
            $q.css("left", "");
        },
        zIndex: 1
    });
	
    $(".question").droppable({
        accept: ".answer",
        tolerance: "pointer",
        addClasses: false,
        classes: {
            "ui-droppable-hover": "answer-hover"
        },
        drop: function(event, ui) {
            var $q = $(this);
            $ans = ui.draggable;
            if($q.hasClass("has-answer")){
                move_to($q.children(), $(".word-bank"));
            }
            move_to($ans, $q);
        }
    });
	
    $(".question").dblclick(function(){
        $q = $(this)
        if($q.hasClass("has-answer")){
            move_to($q.children(), $(".word-bank"));
        }
    });
	
    $( "#submit" ).click(function() {
        var num_wrong =0;
        $('.question').each(function() {
            $q = $(this);
            
            if ((($q.attr("id") == "#1") && (($q.children().attr("id") == "a1")||($q.children().attr("id") == "a2") || ($q.children().attr("id") == "a3") || ($q.children().attr("id") == "a4"))) ||
             (($q.attr("id") == "#2") && (($q.children().attr("id") == "a1")||($q.children().attr("id") == "a2") || ($q.children().attr("id") == "a3") || ($q.children().attr("id") == "a4"))) ||
            (($q.attr("id") == "#3") && (($q.children().attr("id") == "a1")||($q.children().attr("id") == "a2") || ($q.children().attr("id") == "a3") || ($q.children().attr("id") == "a4"))) ||
            (($q.attr("id") == "#4") && (($q.children().attr("id") == "a1")||($q.children().attr("id") == "a2") || ($q.children().attr("id") == "a3") || ($q.children().attr("id") == "a4"))) ||
            (($q.attr("id") == "#5") && (($q.children().attr("id") == "a9")||($q.children().attr("id") == "a10") || ($q.children().attr("id") == "a11") || ($q.children().attr("id") == "a12"))) ||
			(($q.attr("id") == "#6") && (($q.children().attr("id") == "a5")||($q.children().attr("id") == "a6") || ($q.children().attr("id") == "a7") || ($q.children().attr("id") == "a8")))
){
                $q.css('background', 'green');
                $q.children().draggable('disable');
                $q.droppable('disable');
                $q.off('dblclick');
            }else{
				$q.css('background-color', 'crimson');
                num_wrong += 1;
            }
        });

        var $hint_content = $('.hint-content');
        if(num_wrong == 0){
            $hint_content.text('' );
            $hint_content.append('<p>You got them all right!</p>' );
        }else{
            $hint_content.text('' );
            $hint_content.append('<p>You got ' + num_wrong +' answers wrong.</p>' );
			$hint_content.append(slides_info.hint);
        }
        $('.hint').css('visibility', 'visible');
    });

    $('.question').each(function(){
        update($(this));
    });

    $('.hint').click(function(){
        $(this).css("visibility", "hidden");
    });
	
});
