//SEARCH HANDLER
$(function() {
    var searchField = $('#query');
    var icon = $('#search-btn');
    
    //focus event handle
    $(searchField).on('focus', function() {
        $(this).animate({
            width: '570px'
        }, 400);
        $(icon).animate({
            right: '3px'
        }, 400);
    });
    
    //blur event handle
    $(searchField).on('blur', function() {
        if(searchField.val() == '') {
            $(searchField).animate({
                width: '100%'
            },400, function() {});
            $(icon).animate({
                right: '205px'
            },400, function() {});
        }
    });

	$('#search-form').submit(function (e) {
		e.preventDefault();
	});
});

function search(){
	// clear results
	$('#results').html('');
	$('#buttons').html('');
	
	// get form Input
	q = $('#query').val();
	
	// run GET request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			type:'video',
			key: 'AIzaSyCvk3NNMQASZgFkCNxIp9jH-l8O0PXhDUo'
		},function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				
				// log data
				console.log(data);

				$.each(data.items, function(i, item){
					// get output
					var output = getOutput(item);

					// display results
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				// display buttons
				$('#buttons').append(buttons);
		});
}

//build output
function getOutput(item){
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	// build output string
	var output = '<div class="col-md-3">' +
		'<div class="panel">' +
			'<article>' +
				'<div class="thumbnail">' +
				'<img src="'+thumb+'">' +
				'<header>' +
					'<h1><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h1>' +
				'</header>' +
				'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
				'<p>'+description.substr(0, 50) +'...</p>' +
			'</div>' +
			'</article>' +
		'</div>' +
		'</div>' +
		'';

	return output;
}

//BUTTONS

function getButtons(prevPageToken, nextPageToken){
	if(!prevPageToken){
		var btnoutput = '<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
			'onclick="nextPage();">Next Page</button></div>';
	} else {
		var btnoutput = '<div class="button-container">'+
			'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
			'onclick="prevPage();">Prev Page</button>' +
			'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
			'onclick="nextPage();">Next Page</button></div>';
	}

	return btnoutput;
}
