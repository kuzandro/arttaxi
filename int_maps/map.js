$('.part').hover (
	function() {
		$('.description').html($(this).attr('description-data'));
		$('.description').fadeIn(5);
	},
	function() {
		$('.description').fadeOut(50);
	}
)