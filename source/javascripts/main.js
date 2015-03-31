var main = main || (function() {
	function init() {
		$('.navbar').headroom();
	}

	return {
		init: init
	};
})();

main.init();