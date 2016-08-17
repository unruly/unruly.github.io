var main = main || (function() {
	function init() {
		$('.navbar').headroom();
		hljs.initHighlightingOnLoad();
	}

	return {
		init: init
	};
})();

main.init();