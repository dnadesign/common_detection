DO.Subscribe('app:ready', function(e, $) {
	"use strict";

	var html = $('html');

	// detect android
	if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
		html.addClass('android');
		if(navigator.userAgent.toLowerCase().indexOf('android 2') > -1 || navigator.userAgent.toLowerCase().indexOf('android 3') > -1) {
			html.addClass('android_old');
		}
	}
	if (navigator.userAgent.toLowerCase().indexOf('webkit') > -1) {
		// needed to normalise fonts
		html.addClass('webkit');
	}
	if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		// needed to normalise CSS animations in plan carousel
		html.addClass('chrome');
	}
	if (navigator.userAgent.toLowerCase().indexOf('safari') > -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
		// needed to normalise CSS animations in plan carousel
		if(typeof navigator.appVersion !== "undefined") {
			var version = navigator.appVersion.charAt(navigator.appVersion.indexOf('Version/') + 8)

			html.addClass('safari safari-v'+ version +' safari-lt'+(parseInt(version)+1));
		}
	}
	if (navigator.userAgent.toLowerCase().indexOf('ipad') > -1) {
		// needed to disable animation
		html.addClass('ios ipad');
	}
	if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
		// needed to disable animation
		html.addClass('ios iphone');
	}
	if (navigator.userAgent.toLowerCase().indexOf('msie 10') > -1) {
		html.addClass('lt_ie10');
	}
	if (navigator.userAgent.match(/Trident\/7\./)) {
		html.addClass('lte_ie11');
	}
});