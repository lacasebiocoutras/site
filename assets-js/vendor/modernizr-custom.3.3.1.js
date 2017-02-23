!function(e,t,n){function r(e,t){return typeof e===t}function i(){var e,t,n,i,o,s,a;for(var l in S)if(S.hasOwnProperty(l)){if(e=[],t=S[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(i=r(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)s=e[o],a=s.split("."),1===a.length?x[a[0]]=i:(!x[a[0]]||x[a[0]]instanceof Boolean||(x[a[0]]=new Boolean(x[a[0]])),x[a[0]][a[1]]=i),y.push((i?"":"no-")+a.join("-"))}}function o(e){var t=C.className,n=x._config.classPrefix||"";if(_&&(t=t.baseVal),x._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}x._config.enableClasses&&(t+=" "+n+e.join(" "+n),_?C.className.baseVal=t:C.className=t)}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):_?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function a(e,t){if("object"==typeof e)for(var n in e)N(e,n)&&a(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),i=x[r[0]];if(2==r.length&&(i=i[r[1]]),"undefined"!=typeof i)return x;t="function"==typeof t?t():t,1==r.length?x[r[0]]=t:(!x[r[0]]||x[r[0]]instanceof Boolean||(x[r[0]]=new Boolean(x[r[0]])),x[r[0]][r[1]]=t),o([(t&&0!=t?"":"no-")+r.join("-")]),x._trigger(e,t)}return x}function l(e,t){return!!~(""+e).indexOf(t)}function f(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function u(e,t){return function(){return e.apply(t,arguments)}}function c(e,t,n){var i;for(var o in e)if(e[o]in t)return n===!1?e[o]:(i=t[e[o]],r(i,"function")?u(i,n||t):i);return!1}function d(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function p(){var e=t.body;return e||(e=s(_?"svg":"body"),e.fake=!0),e}function v(e,n,r,i){var o,a,l,f,u="modernizr",c=s("div"),d=p();if(parseInt(r,10))for(;r--;)l=s("div"),l.id=i?i[r]:u+(r+1),c.appendChild(l);return o=s("style"),o.type="text/css",o.id="s"+u,(d.fake?d:c).appendChild(o),d.appendChild(c),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),c.id=u,d.fake&&(d.style.background="",d.style.overflow="hidden",f=C.style.overflow,C.style.overflow="hidden",C.appendChild(d)),a=n(c,e),d.fake?(d.parentNode.removeChild(d),C.style.overflow=f,C.offsetHeight):c.parentNode.removeChild(c),!!a}function g(t,r){var i=t.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(d(t[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];i--;)o.push("("+d(t[i])+":"+r+")");return o=o.join(" or "),v("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function m(e,t,i,o){function a(){c&&(delete A.style,delete A.modElem)}if(o=!r(o,"undefined")&&o,!r(i,"undefined")){var u=g(e,i);if(!r(u,"undefined"))return u}for(var c,d,p,v,m,h=["modernizr","tspan"];!A.style;)c=!0,A.modElem=s(h.shift()),A.style=A.modElem.style;for(p=e.length,d=0;p>d;d++)if(v=e[d],m=A.style[v],l(v,"-")&&(v=f(v)),A.style[v]!==n){if(o||r(i,"undefined"))return a(),"pfx"!=t||v;try{A.style[v]=i}catch(e){}if(A.style[v]!=m)return a(),"pfx"!=t||v}return a(),!1}function h(e,t,n,i,o){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+j.join(s+" ")+s).split(" ");return r(t,"string")||r(t,"undefined")?m(a,t,i,o):(a=(e+" "+O.join(s+" ")+s).split(" "),c(a,t,n))}function w(e,t,r){return h(e,n,n,t,r)}var y=[],S=[],T={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){S.push({name:e,fn:t,options:n})},addAsyncTest:function(e){S.push({name:null,fn:e})}},x=function(){};x.prototype=T,x=new x,x.addTest("json","JSON"in e&&"parse"in JSON&&"stringify"in JSON),x.addTest("serviceworker","serviceWorker"in navigator),x.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),x.addTest("svgfilters",function(){var t=!1;try{t="SVGFEColorMatrixElement"in e&&2==SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE}catch(e){}return t});var C=t.documentElement,_="svg"===C.nodeName.toLowerCase();x.addTest("srcset","srcset"in s("img")),x.addTest("inlinesvg",function(){var e=s("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)}),x.addTest("canvas",function(){var e=s("canvas");return!(!e.getContext||!e.getContext("2d"))}),x.addTest("canvastext",function(){return x.canvas!==!1&&"function"==typeof s("canvas").getContext("2d").fillText}),x.addTest("canvaswinding",function(){if(x.canvas===!1)return!1;var e=s("canvas").getContext("2d");return e.rect(0,0,10,10),e.rect(2,2,6,6),e.isPointInPath(5,5,"evenodd")===!1});var b=T._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];T._prefixes=b,x.addTest("csspositionsticky",function(){var e="position:",t="sticky",n=s("a"),r=n.style;return r.cssText=e+b.join(t+";"+e).slice(0,-e.length),-1!==r.position.indexOf(t)});var E={}.toString;x.addTest("svgclippaths",function(){return!!t.createElementNS&&/SVGClipPath/.test(E.call(t.createElementNS("http://www.w3.org/2000/svg","clipPath")))}),x.addTest("svgforeignobject",function(){return!!t.createElementNS&&/SVGForeignObject/.test(E.call(t.createElementNS("http://www.w3.org/2000/svg","foreignObject")))}),x.addTest("smil",function(){return!!t.createElementNS&&/SVGAnimate/.test(E.call(t.createElementNS("http://www.w3.org/2000/svg","animate")))});var N;!function(){var e={}.hasOwnProperty;N=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),T._l={},T.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),x.hasOwnProperty(e)&&setTimeout(function(){x._trigger(e,x[e])},0)},T._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},x._q.push(function(){T.addTest=a}),x.addTest("svgasimg",t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"));var P="Moz O ms Webkit",j=T._config.usePrefixes?P.split(" "):[];T._cssomPrefixes=j;var O=T._config.usePrefixes?P.toLowerCase().split(" "):[];T._domPrefixes=O;var k={elem:s("modernizr")};x._q.push(function(){delete k.elem});var A={style:k.elem.style};x._q.unshift(function(){delete A.style}),T.testAllProps=h,T.testAllProps=w,x.addTest("borderimage",w("borderImage","url() 1",!0)),x.addTest("flexbox",w("flexBasis","1px",!0)),x.addTest("flexboxlegacy",w("boxDirection","reverse",!0)),x.addTest("flexboxtweener",w("flexAlign","end",!0));var V=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return v("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();T.mq=V,x.addTest("mediaqueries",V("only all")),i(),o(y),delete T.addTest,delete T.addAsyncTest;for(var z=0;z<x._q.length;z++)x._q[z]();e.Modernizr=x}(window,document);