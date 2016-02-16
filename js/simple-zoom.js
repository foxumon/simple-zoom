jQuery(function() {
	var height = 100;
	var width = 100;
	var container = $('#zoom');
	var image = $('#zoom img');

	function resize(h,w){
		w = typeof w !== 'undefined' ? w : 'auto';
		h = typeof h !== 'undefined' ? h : 'auto';

		w = w != Infinity ? w : 100;
		h = h != Infinity ? h : 100;

		width = (w != 'auto' ? w : width);
		height = (h != 'auto' ? h : height);

		w = (w != 'auto' ? w+'%' : w);
		h = (h != 'auto' ? h+'%' : h);

		image.css('height',h);
		image.css('width',w);
	}

	function reset() {
		resize(100);
		image.css({
			'left': 'auto',
			'top': 'auto'
		});
	}

	$('#zoom_in').click(function(){
		resize((height + 50));
	});

	$('#zoom_out').click(function(){
		if(image.width() > container.width()) {
			resize(undefined,100);
			image.css('left', 'auto');
			height = (Math.floor(parseFloat(image.height() / $('#manga').height()) * 100));
		} else {
			height = height - 50;
			if(height < 100){height=100;}
			resize(height);
		}

		maxHeight = image.height() - container.height();

		mtop = parseInt(image.css("top"));
		newTop = false;

		if (mtop < 0 && mtop * -1 > maxHeight) {
			newTop = maxHeight * -1;
		}
		if (mtop > 0) {
			newTop = 0;
		}

		if(newTop !== false) {
			image.css('top', newTop);
		}
	});

	$('#fit').click(function(){
		reset();
	});

	image.draggable({drag: function(event, ui) {
		maxHeight = image.height() - container.height();
		maxWidth = image.width() - container.width();

		var newTop = ui.position.top;
		var newLeft = ui.position.left;

		if (ui.position.top < 0 && ui.position.top * -1 > maxHeight) {
			newTop = maxHeight * -1;
		}
		if (ui.position.top > 0) {
			newTop = 0;
		}
		if (ui.position.left < 0 && ui.position.left * -1 > maxWidth) {
			newLeft = maxWidth * -1;
		}
		if (ui.position.left > 0 || image.width() < container.width()) {
			newLeft = 'auto';
		}

		ui.position.top = newTop;
		ui.position.left = newLeft;
	},cursor: "grabbing"});

	//Update image
	function newpic(pic) {
		image.attr('src',pic);
		image.one( "load", function() {
			reset();
		});
	}
});