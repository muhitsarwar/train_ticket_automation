let deptDate = "15-10-2018";
let adultCount = 1;
let payMethod = 'book_brac'; // book_brac book_dbbl
let presedence = [[0, 'AC_B'], [1, 'SNIGDHA'], [1, 'S_CHAIR']];
let stationFrom = "DA";
let stattionTo = "RJHI";


// let stationFrom = "RJHI";
// let stattionTo = "DA";

let reloadTime = 10000;
let songUrl = 'https://www.youtube.com/watch?v=OPf0YbXqDm0';







console.log('=========******************=============');
pageReload();










//=========================================================================================================================
//*************************************intiating selection of station from and to******************************************
//=========================================================================================================================
if($("#station_from").length > 0){
	console.log('intiating selection of station from and to!!!')

	$("#station_from").val(stationFrom);
	eventTrigger("station_from");

	$('body').on('DOMNodeInserted', '#journey_date', function () {
	      $("#journey_date").val(deptDate);
	      eventTrigger("journey_date");
	});

	$('body').on('DOMNodeInserted', '#station_to', function () {
	      $("#station_to").val(stattionTo);
	      eventTrigger("station_to");
	});

	$('body').on('DOMNodeInserted', '#route_class', function () {
	      $("#route_class").val("S_CHAIR");
	      eventTrigger("journey_date");
	      $("#button1").click();
	});

}

























//=========================================================================================================================
//************************************************intiating selection of train*********************************************
//=========================================================================================================================

if($("#train_route_div_b").length > 0 && presedence.length > 0 && $(".train_row").length > 0){
	console.log('intiating selection of train!!!');

	var presedenceIndex = 0;
	searchTicket(presedenceIndex);
	
	$('body').on('DOMNodeInserted', '#info #frm_book', function () {
		console.log('success');
		console.log($('#frm_book').html());


		window.open(songUrl);
		window.open("", "TicketDetails", "width=200,height=100").document.write($('#frm_book').html());
		overrideConfirm();
		$('#'+payMethod).click();
		// keepDisplayAlive();
	});


	$('body').on('DOMNodeInserted', '#info .er_msg', function () {
		console.log('error');
		presedenceIndex++;
    	searchTicket(presedenceIndex);
		
	});
	
}































function overrideConfirm(){
	var s = document.createElement('script');
	s.innerHTML = "window.confirm=function(){return true;};"
	document.body.appendChild(s);
}

function pageReload()
{
    var handle = window.setInterval(function(){
    	console.log('trying reload');

        if($('#frm_book').length == 0){
        	window.location.href="https://www.esheba.cnsbd.com/train/purchaseticket";
        }else{
        	window.clearInterval(handle);
        }

    }, reloadTime);
}



function keepDisplayAlive()
{
    var handle = window.setInterval(function(){

        var element = $("#info");
        if (element.css("display") == "none") {
            console.log('display none');
            $('#info').css('display', 'block');
            window.clearInterval(handle);
        }

    }, 100);
}




function searchTicket(index){
	if(index >= presedence.length) return;

	var trainIndex = $(".train_row").length - 1 - presedence[presedenceIndex][0];
	var routeClass = presedence[presedenceIndex][1];

	if(trainIndex < 0) return;

	console.log('Trying for train-index: ' + trainIndex + ' route-class: ' + routeClass);
	$(".train_row").eq(trainIndex).find("td").eq(5).find("select").val(adultCount);
	$(".train_row").eq(trainIndex).find("td").eq(3).find("select").val(routeClass);
	$(".train_row").eq(trainIndex).find("td").eq(7).find("input").eq(0).click();
}


function buttonClick(id){
	var button = document.getElementById(id);
	button.click();
}

function eventTrigger(id){
	var event = new Event('change');
	document.getElementById(id).dispatchEvent(event);
}
