(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{149:function(A,g,I){"use strict";I.r(g),I.d(g,"pageQuery",function(){return n});var C=I(7),Q=I.n(C),E=I(0),B=I.n(E),t=I(157),e=I(158),i=function(A){function g(){return A.apply(this,arguments)||this}return Q()(g,A),g.prototype.render=function(){var A=this.props.data.site.siteMetadata.title;return B.a.createElement(t.a,{location:this.props.location,title:A},B.a.createElement(e.a,{title:"404: Not Found"}),B.a.createElement("h1",null,"Not Found"),B.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))},g}(B.a.Component);g.default=i;var n="1097489062"},153:function(A,g,I){var C;A.exports=(C=I(156))&&C.default||C},154:function(A,g,I){"use strict";var C=I(0),Q=I.n(C),E=I(4),B=I.n(E),t=I(33),e=I.n(t);I.d(g,"a",function(){return e.a});I(153),Q.a.createContext({});B.a.object,B.a.string.isRequired,B.a.func,B.a.func},155:function(A,g,I){"use strict";I.d(g,"a",function(){return e}),I.d(g,"b",function(){return i});var C=I(161),Q=I.n(C),E=I(162),B=I.n(E);B.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete B.a.googleFonts;var t=new Q.a(B.a);var e=t.rhythm,i=t.scale},156:function(A,g,I){"use strict";I.r(g);I(34);var C=I(0),Q=I.n(C),E=I(4),B=I.n(E),t=I(55),e=I(2),i=function(A){var g=A.location,I=e.default.getResourcesForPathnameSync(g.pathname);return I?Q.a.createElement(t.a,Object.assign({location:g,pageResources:I},I.json)):null};i.propTypes={location:B.a.shape({pathname:B.a.string.isRequired}).isRequired},g.default=i},157:function(A,g,I){"use strict";var C=I(7),Q=I.n(C),E=I(0),B=I.n(E),t=I(154),e=I(155),i=function(A){function g(){return A.apply(this,arguments)||this}return Q()(g,A),g.prototype.render=function(){var A,g=this.props,I=g.location,C=g.title,Q=g.children;return A="/"===I.pathname?B.a.createElement("h2",{style:{marginBottom:Object(e.a)(1.5),marginTop:Object(e.a)(1.5),marginLeft:20}},B.a.createElement(t.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},C)):null,B.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(e.a)(24),padding:Object(e.a)(1.5)+" "+Object(e.a)(.75)}},B.a.createElement("header",null,A),B.a.createElement("main",null,Q))},g}(B.a.Component);g.a=i},158:function(A,g,I){"use strict";var C=I(159),Q=I(0),E=I.n(Q),B=I(4),t=I.n(B),e=I(163),i=I.n(e),n=I(160),a=I.n(n);function o(A){var g=A.description,I=A.lang,Q=A.meta,B=A.title,t=C.data.site,e=g||t.siteMetadata.description;return E.a.createElement(i.a,{htmlAttributes:{lang:I},title:B,titleTemplate:"%s | "+t.siteMetadata.title,meta:[{name:"description",content:e},{property:"og:title",content:B},{property:"og:description",content:e},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:t.siteMetadata.author},{name:"twitter:title",content:B},{name:"twitter:description",content:e}].concat(Q),link:[{rel:"icon",type:"image/gif",sizes:"16x16",href:""+a.a},{rel:"icon",type:"image/gif",sizes:"32x32",href:""+a.a},{rel:"shortcut icon",type:"image/gif",href:""+a.a}]})}o.defaultProps={lang:"en",meta:[],description:""},o.propTypes={description:t.a.string,lang:t.a.string,meta:t.a.arrayOf(t.a.object),title:t.a.string.isRequired},g.a=o},159:function(A){A.exports={data:{site:{siteMetadata:{title:"Haichao Blog",description:"The place where Haichao writes when he want.",author:"Haichao Zhu"}}}}},160:function(A,g){A.exports="data:image/vnd.microsoft.icon;base64,R0lGODlhEAAQAPEAAAAAAACE/wAAAAAAACH5BAlkAAIAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAEQRAEQRAEgSAIQhAEQRAEQRAIBAQCgUAgEAgEAoEgEAgEBAKBQCAQCAQCQSAQCAgEAoFAIBAIBIJAIBAQCAQCgUAgEAgEgUAgICAgICAgICAgICAQEBAQICAgICAgICAgICAQEBAQICAgICAgICAgICAQEBAQICAgICAgICAgICAQEBAQICAgICAgICAgICAQEBAQEBAQEBAQEBAgICAgEBAQEBAQEBAQEBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJBQACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAEQRAEQRAEgSAIQhAEQRAEQRAIBAQCgUAgEAgEAoFAIAgEBAKBQCAQCAQCgUAgCAQEAoEgEAgEAoFAIBAIBAQCgSAQCAQCgUAgEBAQICAgIBAQEBAQEBAQEBAQECAgICAQEBAQEBAQEBAQEBAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQEBAQEBAQEBAQEBAgICAgEBAQEBAQEBAQEBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJWgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAEQRAEQRAEgSAIQhAEQRAEQRAIBAQCgSAQCAQEAoFAIAgEBAKBIBAIBAICgUAgCAQEAoEgEBAEAgGBQCAIBAQCgSAQEAgCgYBAIBAQICAgIBAQICAgEBAQICAQECAgICAQECAgICAQEBAgEBAgICAgEBAgICAgIBAQEBAQICAgIBAQICAgICAgEBAQECAgICAQEBAQEBAQEBAQEBAgICAgEBAQEBAQEBAQEBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJWgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAIQhAEQRAEgSAIQhAIQhAEQRAIBAQCgSAQEAgCgUBAIAgEBAKBIBAQCAKBQEAgCAQEAoEgEBAIAoFAQCAIBAQCgSAQEAgCgUBAIBAQICAgIBAQICAQEBAQICAQECAgICAQECAgEBAQECAgEBAgICAgEBAgIBAQEBAgIBAQICAgIBAQICAQEBAQICAQECAgICAQEBAQEBAQECAgEBAgICAgEBAQEBAQEBAgIBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJWgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAIgiAIghAEgSAIQhAIgiAIQhAIBAQCgSAQEAgEAkEgEAgEBAKBIBAQCASCQCAgCAQEAoEgEBAIBIFAQCAIBAQCgSAQEAgCgYBAIBAQICAgIBAQIBAQECAgICAQECAgICAQEBAQECAgICAgEBAgICAgEBAQECAgICAgIBAQICAgIBAQECAgICAgICAQECAgICAQECAgICAgICAgEBAgICAgECAgICAgICAgIBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJWgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAIgiAIgiAEgSAIQhAIgiAIgiAIBAQCgSAQEAgEAoFAIAgEBAKBIBAQCAQCgUAgCAQEAoEgEBAIBAKBQCAIBAQCgSAQCAQCgUAgEBAQICAgIBAQEBAQEBAQEBAQECAgICAQEBAQEBAQEBAQEBAgICAgEBAgICAgICAgIBAQICAgIBAQICAgICAgICAQECAgICAQECAgICAgICAgEBAgICAgEBAgICAgICAgIBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJWgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAIgiAIgiAEgSAIQhAIgiAIgiAIBAQCgSAQEAgEAoFAIAgEBAKBIBAQCAQCgUAgCAQEAoEgEBAIBAKBQCAIBAQCgSAQCAQCgUAgEBAQICAgIBAQEBAQEBAQEBAQECAgICAQEBAQEBAQEBAQEBAgICAgEBAgICAgICAgIBAQICAgIBAQICAgICAgICAQECAgICAQECAgICAgICAgEBAgICAgEBAgICAgICAgIBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJWgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAIgiAIgiAIgiAIQhAEgiAIgiAQCAQCgSAQCAQEAoFAIBAIBAKBIBAIBAICgUAgEAgEAoEgEBAEAgGBQCAQCAQCgSAQEAgCgYBAICAgICAgIBAQICAgEBAQICAgICAgICAQECAgICAQEBAgICAgICAgEBAgICAgIBAQECAgICAgIBAQICAgICAgEBAQICAgICAQECAgICAgICAQEBAgICAgEBAgICAgICAgIBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJWgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAEQRAEQRAEgSAIQhAEQRAEQRAIBAQCgSAQCAQEAoFAIBAIBAKBIBAIBAICgUAgEAgEAoEgEBAEAgGBQCAQCAQCgSAQEAgCgYBAICAgICAgIBAQICAgEBAQICAgICAgICAQECAgICAQEBAgICAgICAgEBAgICAgIBAQECAgICAgIBAQICAgICAgEBAQICAgICAQECAgICAgICAQEBAgICAgEBAgICAgICAgIBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJWgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAEQRAEQRAEgSAIQhAEQRAEQRAIBAQCgSAQEAgEgUBAIBAIBAKBIBAQCASBQEAgEAgEAoEgEBAIBIFAQCAQCAQCgSAQEAgEgUBAICAgICAgIBAQICAgEBAQICAgICAgICAQECAgIBAQECAgICAgICAgEBAgICAQEBAgICAgICAgIBAQICAgEBAQICAgICAgICAQEBAQEBAQEBAQEBAgICAgEBAQEBAQEBAQEBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJWgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAEQRAEQRAEgSAIQhAEQRAEQRAIBAQCgSAQCAQEAoFAIBAIBAKBIBAIBAQCgUAgEAgEAoEgEAgEBAKBQCAQCAQCgSAQCAQEAoFAICAgICAgIBAQEBAgICAgICAgICAgICAQEBAQICAgICAgICAgICAgEBAQECAgICAgICAgICAgIBAQEBAgICAgICAgICAgICAQEBAQEBAQEBAQEBAgICAgEBAQEBAQEBAQEBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJWgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAEQRAEQRAEgSAIQhAEQRAEQRAIBAQCgSAQCAQEAoFAIBAIBAKBIBAIBAQCgUAgEAgEAoEgEAgEBAKBQCAQCAQCgSAQCAQEAoFAICAgICAgIBAQEBAgICAgICAgICAgICAQEBAQICAgICAgICAgICAgEBAQECAgICAgICAgICAgIBAQEBAgICAgICAgICAgICAQEBAQEBAQEBAQEBAgICAgEBAQEBAQEBAQEBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAA7"}}]);
//# sourceMappingURL=component---src-pages-404-js-4adc9c6e6cc4cc0bc0e5.js.map