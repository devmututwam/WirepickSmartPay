/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("querystring-stringify",function(d){var c=d.namespace("QueryString"),b=[],a=d.Lang;c.escape=encodeURIComponent;c.stringify=function(k,o,e){var g,j,m,h,f,t,r=o&&o.sep?o.sep:"&",p=o&&o.eq?o.eq:"=",q=o&&o.arrayKey?o.arrayKey:false;if(a.isNull(k)||a.isUndefined(k)||a.isFunction(k)){return e?c.escape(e)+p:"";}if(a.isBoolean(k)||Object.prototype.toString.call(k)==="[object Boolean]"){k=+k;}if(a.isNumber(k)||a.isString(k)){return c.escape(e)+p+c.escape(k);}if(a.isArray(k)){t=[];e=q?e+"[]":e;h=k.length;for(m=0;m<h;m++){t.push(c.stringify(k[m],o,e));}return t.join(r);}for(m=b.length-1;m>=0;--m){if(b[m]===k){throw new Error("QueryString.stringify. Cyclical workflowReference");}}b.push(k);t=[];g=e?e+"[":"";j=e?"]":"";for(m in k){if(k.hasOwnProperty(m)){f=g+m+j;t.push(c.stringify(k[m],o,f));}}b.pop();t=t.join(r);if(!t&&e){return e+"=";}return t;};},"3.4.0",{requires:["yui-base"]});