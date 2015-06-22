DO.Subscribe('app:ready', function(e, $) {
	"use strict";

	// detect js
	var html = $('html');
	// html.removeClass('no-js');

	// test for svg. We need this for android 2.x and IE8
  	Modernizr.addTest('svg', !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);

  	// another test to search for inline img's using .svg and switching to .png
	if (!Modernizr.svg) {
	    var imgs = document.getElementsByTagName('img');
	    var svgExtension = /.*\.svg$/
	    var l = imgs.length;
	    for(var i = 0; i < l; i++) {
	        if(imgs[i].src.match(svgExtension)) {
	            imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
	        }
	    }
	}

	// function to test for properties
	Modernizr.addValueTest = function(property,value){
	    var testName= (property+value).replace(/-/g,'');
	    Modernizr.addTest(testName , function () {
	        var element = document.createElement('link');
	        var body = document.getElementsByTagName('HEAD')[0];
	        var properties = [];
	        var upcaseProp = property.replace(/(^|-)([a-z])/g, function(a, b, c){ return c.toUpperCase(); });
	        properties[property] = property;
	        properties['Webkit'+upcaseProp] ='-webkit-'+property;
	        properties['Moz'+upcaseProp] ='-moz-'+property;
	        properties['ms'+upcaseProp] ='-ms-'+property;

	        body.insertBefore(element, null);
	        for (var i in properties) {
	            if (element.style[i] !== undefined) {
	                element.style[i] = value;
	            }
	        }
	        //ie7,ie8 doesnt support getComputedStyle
	        //so this is the implementation
	        if(!window.getComputedStyle) {
	            window.getComputedStyle = function(el, pseudo) {
	                this.el = el;
	                this.getPropertyValue = function(prop) {
	                    var re = /(\-([a-z]){1})/g;
	                    if (prop == 'float') prop = 'styleFloat';
	                    if (re.test(prop)) {
	                        prop = prop.replace(re, function () {
	                            return arguments[2].toUpperCase();
	                        });
	                    }
	                    return el.currentStyle[prop] ? el.currentStyle[prop] : null;
	                };
	                return this;
	            };
	        }

	        var st = window.getComputedStyle(element, null),
	            currentValue = st.getPropertyValue("-webkit-"+property) ||
	                st.getPropertyValue("-moz-"+property) ||
	                st.getPropertyValue("-ms-"+property) ||
	                st.getPropertyValue(property);

	        if(currentValue!== value){
	            element.parentNode.removeChild(element);
	            return false;
	        }
	        element.parentNode.removeChild(element);
	        return true;
	    });
	}

	// test to see if preserve-3d is available, we need this for IE
	Modernizr.addValueTest('transform-style','preserve-3d');

});