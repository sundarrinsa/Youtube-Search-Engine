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
	$('#results').html('');
	$('#buttons').html('');

	q = $('#query').val();

	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			type:'video',
			key: 'AIzaSyCvk3NNMQASZgFkCNxIp9jH-l8O0PXhDUo',
			maxResults: 12
		},
		function(data) {
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;

			console.log(data);

			$.each(data.items, function (i, item) {

				var output = getOutput(item);

				$('#results').append(output);
			});

			var buttons = getButtons(prevPageToken, nextPageToken);

			$('#buttons').append(buttons);
		}
	);
}

// Next Page Function
function nextPage(){
	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query');

	$('#results').html('');
	$('#buttons').html('');

	q = $('#query').val();

	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type:'video',
			key: 'AIzaSyCvk3NNMQASZgFkCNxIp9jH-l8O0PXhDUo',
			maxResults: 12
		},
		function(data){
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;

			console.log(data);

			$.each(data.items, function(i, item){
				var output = getOutput(item);

				$('#results').append(output);
			});

			var buttons = getButtons(prevPageToken, nextPageToken);

			$('#buttons').append(buttons);
		}
	);
}



// Prev page
function prevPage(){
	var token = $('#prev-button').data('token');
	var q = $('#prev-button').data('query');

	// Clear Results
	$('#results').html('');
	$('#buttons').html('');

	// Get Form Input
	q = $('#query').val();

	// Run GET Request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type:'video',
			key: 'AIzaSyCvk3NNMQASZgFkCNxIp9jH-l8O0PXhDUo',
			maxResults: 12
		},
		function(data){
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;

			// Log Data
			console.log(data);

			$.each(data.items, function(i, item){
				// Get Output
				var output = getOutput(item);

				// Display Results
				$('#results').append(output);
			});

			var buttons = getButtons(prevPageToken, nextPageToken);

			// Display Buttons
			$('#buttons').append(buttons);
		}
	);
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
				'<a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'"><img src="'+thumb+'"> </a>' +
				'<header>' +
					'<h1><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title.substr(0, 30)+' ...</a></h1>' +
				'</header>' +
				'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
				'<p><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+description.substr(0, 50) +'...</a></p>' +
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
		var btnoutput = '<div class="button-container">'+'<button id="next-button" class="btn btn-default" data-token="'+nextPageToken+'" data-query="'+q+'"' + 'onclick="nextPage();">Próxima</button></div>';
	} else {
		var btnoutput = '<div class="button-container">'+'<button id="prev-button" class="btn btn-default" data-token="'+prevPageToken+'" data-query="'+q+'"' + 'onclick="prevPage();">Anterior</button>' + '<button id="next-button" class="btn btn-default" data-token="'+nextPageToken+'" data-query="'+q+'"' + 'onclick="prevPage();">Próxima</button></div>';
	}
	return btnoutput;
}
