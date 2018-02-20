(function(vWidth) {
	function Adp() {
		var w = Math.min(window.innerWidth, document.documentElement.clientWidth);
		document.documentElement.style.fontSize = w / vWidth * 100 + "px"
	}
	var timer = null;
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
		clearTimeout(timer);
		timer = setTimeout(Adp, 300)
	}, false);
	window.addEventListener("pageshow", function(window) {
		// eslint-disable-next-line
		window.persisted && (clearTimeout(timer), timer = setTimeout(Adp, 300))
	}, false);
	document.addEventListener("DOMContentLoaded", Adp, false)
})(750);