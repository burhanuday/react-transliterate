(this["webpackJsonpreact-transliterate-example"]=this["webpackJsonpreact-transliterate-example"]||[]).push([[0],{10:function(e,t,a){},15:function(e,t,a){},20:function(e,t,a){"use strict";a.r(t);a(10);var n=a(0),l=a.n(n),r=a(5),i=a.n(r),o=a(3),u=[{label:"Amharic",value:"am"},{label:"Arabic",value:"ar"},{label:"Bangla",value:"bn"},{label:"Belarusian",value:"be"},{label:"Bulgarian",value:"bg"},{label:"Chinese (Hong Kong)",value:"yue-hant"},{label:"Chinese (Simplified)",value:"zh"},{label:"Chinese (Traditional)",value:"zh-hant"},{label:"French",value:"fr"},{label:"German",value:"de"},{label:"Greek",value:"el"},{label:"Gujarati",value:"gu"},{label:"Hebrew",value:"he"},{label:"Hindi",value:"hi"},{label:"Italian",value:"it"},{label:"Japanese",value:"ja"},{label:"Kannada",value:"kn"},{label:"Malayalam",value:"ml"},{label:"Marathi",value:"mr"},{label:"Nepali",value:"ne"},{label:"Odia",value:"or"},{label:"Persian",value:"fa"},{label:"Portuguese (Brazil)",value:"pt"},{label:"Punjabi",value:"pa"},{label:"Russian",value:"ru"},{label:"Sanskrit",value:"sa"},{label:"Serbian",value:"sr"},{label:"Sinhala",value:"si"},{label:"Spanish",value:"es"},{label:"Tamil",value:"ta"},{label:"Telugu",value:"te"},{label:"Tigrinya",value:"ti"},{label:"Ukrainian",value:"uk"},{label:"Urdu",value:"ur"},{label:"Vietnamese",value:"vi"}],s=a(6),c=a.n(s);function v(){return(v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}"undefined"!==typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!==typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var f="_1tkHS",h="_1KtfG",d=13,b=14,g=9,m=32,p=function(e){var t=e.renderComponent,a=void 0===t?function(e){return Object(n.createElement)("input",Object.assign({},e))}:t,l=e.lang,r=void 0===l?"hi":l,i=e.offsetX,o=void 0===i?0:i,u=e.offsetY,s=void 0===u?10:u,p=e.onChange,y=void 0===p?function(){}:p,S=e.onChangeText,O=void 0===S?function(){}:S,w=e.onBlur,j=void 0===w?function(){}:w,x=e.value,C=e.onKeyDown,E=void 0===C?function(){}:C,k=e.containerClassName,B=void 0===k?"":k,T=e.containerStyles,I=void 0===T?{}:T,N=e.activeItemStyles,P=void 0===N?{}:N,D=e.maxOptions,M=void 0===D?5:D,K=e.hideSuggestionBoxOnMobileDevices,H=void 0!==K&&K,U=e.hideSuggestionBoxBreakpoint,L=void 0===U?450:U,R=e.triggerKeys,z=void 0===R?[m,b,d,g]:R,W=e.insertCurrentSelectionOnBlur,A=void 0===W||W,F=e.showCurrentWordAsLastSuggestion,G=void 0===F||F,J=function(e,t){if(null==e)return{};var a,n,l={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,["renderComponent","lang","offsetX","offsetY","onChange","onChangeText","onBlur","value","onKeyDown","containerClassName","containerStyles","activeItemStyles","maxOptions","hideSuggestionBoxOnMobileDevices","hideSuggestionBoxBreakpoint","triggerKeys","insertCurrentSelectionOnBlur","showCurrentWordAsLastSuggestion"]),X=Object(n.useState)([]),Y=X[0],_=X[1],q=Object(n.useState)(0),V=q[0],Q=q[1],Z=Object(n.useState)(0),$=Z[0],ee=Z[1],te=Object(n.useState)(0),ae=te[0],ne=te[1],le=Object(n.useState)(-1),re=le[0],ie=le[1],oe=Object(n.useState)(-1),ue=oe[0],se=oe[1],ce=Object(n.useRef)(null),ve=Object(n.useState)({width:0,height:0}),fe=ve[0],he=ve[1],de=Object(n.useMemo)((function(){return!H||fe.width>L}),[fe,L,H]),be=function(){ne(0),_([])},ge=function(e){var t,a=x;if("string"===typeof a){var n=a.substring(0,re)+Y[e]+" "+a.substring(ue+1,a.length);setTimeout((function(){var t,a;t=ce.current,a=re+Y[e].length+1,t&&(t.selectionStart?(t.focus(),t.setSelectionRange(a,a)):t.focus())}),1);var l={target:{value:n}};return O(n),y(l),be(),null===(t=ce.current)||void 0===t?void 0:t.focus()}},me=function(){var e=window.innerWidth,t=window.innerHeight;he({width:e,height:t})};return Object(n.useEffect)((function(){window.addEventListener("resize",me);var e=window.innerWidth,t=window.innerHeight;return he({width:e,height:t}),function(){window.removeEventListener("resize",me)}}),[]),Object(n.createElement)("div",{style:v({},I,{position:"relative"}),className:B},a(v({onChange:function(e){var t=e.currentTarget.value;if(y(e),O(t),de){var a,n=(a=e.target,a&&"number"===typeof a.selectionStart&&"number"===typeof a.selectionEnd?{start:a.selectionStart,end:a.selectionEnd}:{start:0,end:0}).end,l=ce.current;if(l){var i=c()(l,n),o=t.lastIndexOf(" ",n-1)<t.lastIndexOf("\n",n-1)?t.lastIndexOf("\n",n-1):t.lastIndexOf(" ",n-1);ie(o+1),se(n-1);var u=t.slice(o+1,n);if(u){!function(t){try{if(!de)return Promise.resolve();var a="https://inputtools.google.com/request?text="+t+"&itc="+r+"-t-i0-und&num="+(G?M-1:M)+"&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage",n=function(t,a){try{var n=t()}catch(e){return a(e)}return n&&n.then?n.then(void 0,a):n}((function(){return Promise.resolve(fetch(a)).then((function(e){return Promise.resolve(e.json()).then((function(e){if(e&&"SUCCESS"===e[0]){var a=G?[].concat(e[1][0][1],[t]):e[1][0][1];_(a)}}))}))}),(function(e){console.error("There was an error with transliteration",e)}));Promise.resolve(n&&n.then?n.then((function(){})):void 0)}catch(e){return Promise.reject(e)}}(u);var s=l.getBoundingClientRect(),v=i.top<s.height?i.top+l.offsetTop:s.height-(l.scrollHeight-i.top)%s.height+l.offsetTop,f=Math.min(i.left+l.offsetLeft-10,l.offsetLeft+s.width-100);ee(v),Q(f)}else be()}}},onKeyDown:function(e){if(Y.length>0)if(z.includes(e.keyCode))e.preventDefault(),ge(ae);else switch(e.keyCode){case 27:e.preventDefault(),be();break;case 38:e.preventDefault(),ne((Y.length+ae-1)%Y.length);break;case 40:e.preventDefault(),ne((ae+1)%Y.length);break;default:E(e)}else E(e)},onBlur:function(e){"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0||(A&&Y[0]?ge(0):be()),j(e)},ref:ce,value:x},J)),de&&Y.length>0&&Object(n.createElement)("ul",{style:{left:V+o+"px",top:$+s+"px",position:"absolute",width:"auto"},className:f},Y.map((function(e,t){return Object(n.createElement)("li",{className:t===ae?h:void 0,style:t===ae&&P||{},onMouseEnter:function(){ne(t)},onClick:function(){return ge(t)},key:e},e)}))))},y=(a(15),a(34)),S=function(){var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],r=t[1],i=Object(n.useState)("hi"),s=Object(o.a)(i,2),c=s[0],v=s[1];return l.a.createElement("div",{className:"container"},l.a.createElement("h2",null,"React transliterate"),l.a.createElement("select",{className:"language-dropdown",value:c,onChange:function(e){return v(e.target.value)}},u.map((function(e){return l.a.createElement("option",{key:e.value,value:e.value},e.label)}))),l.a.createElement("div",{className:"spacer"}),l.a.createElement("label",{htmlFor:"react-transliterate-input"},"Using input"),l.a.createElement(p,{value:a,onChangeText:function(e){r(e)},lang:c,placeholder:"Start typing here...",id:"react-transliterate-input"}),l.a.createElement("div",{className:"spacer"}),l.a.createElement("label",{htmlFor:"react-transliterate-textarea"},"Using textarea"),l.a.createElement(p,{renderComponent:function(e){return l.a.createElement("textarea",e)},value:a,onChangeText:function(e){r(e)},lang:c,placeholder:"Start typing here...",id:"react-transliterate-textarea"}),l.a.createElement("div",{className:"spacer"}),l.a.createElement("label",{htmlFor:"react-transliterate-material-ui-input"},"Using Material UI input"),l.a.createElement(p,{renderComponent:function(e){var t=e.ref;return delete e.ref,l.a.createElement(y.a,Object.assign({fullWidth:!0},e,{inputRef:t}))},value:a,onChangeText:function(e){r(e)},lang:c,placeholder:"Start typing here...",id:"react-transliterate-material-ui-input"}))};i.a.render(l.a.createElement(S,null),document.getElementById("root"))},9:function(e,t,a){e.exports=a(20)}},[[9,1,2]]]);
//# sourceMappingURL=main.5b18f80c.chunk.js.map