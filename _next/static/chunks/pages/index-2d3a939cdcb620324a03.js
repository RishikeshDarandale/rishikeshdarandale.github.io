_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[8],{"/EDR":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n("QeBL")}])},QeBL:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return u}));n("nKUr");var r=n("VfE9"),o=n("YFqc"),a=n.n(o),i=n("zgTm"),c=n.n(i);function u(){return Object(r.d)("div",null,Object(r.d)("section",{pt:"6|8|12|20"},Object(r.d)("div",{variant:"container"},Object(r.d)("div",{display:"flex",flexDirection:"column",textAlign:"center",justifyContent:"center"},Object(r.d)("p",{color:"primary",textTransform:"uppercase",m:"0"},"Hey, I'm"),Object(r.d)("h1",{variant:"heading.h1",fontWeight:"bolder",lineHeight:"tight"},c.a.name),Object(r.d)("div",{display:"flex",alignItems:"center",justifyContent:"center",size:"64|80",rounded:"full",mb:"4",mx:"auto",bg:"secondary",pt:"2"},Object(r.d)("picture",null,Object(r.d)("source",{srcSet:c.a.social.gravatar+"?s=300",media:"(min-width: 640px)"}),Object(r.d)("img",{rounded:"full",srcSet:c.a.social.gravatar+"?s=250",alt:c.a.name,height:"auto"}))),Object(r.d)("p",{variant:"text.lead",mt:2,pb:2,borderBottomWidth:1},c.a.bio)),Object(r.d)("div",{display:"grid",gridAutoFlow:"dense",col:"1|1|2",gap:"8|8|12",mt:8},Object(r.d)("div",null,Object(r.d)("h3",null,"Introduction"),c.a.aboutMe.split("\n\n").map((function(e,t){return Object(r.d)("p",{mb:3,key:t},e)}))),Object(r.d)("div",null,Object(r.d)("h3",null,"Highlights"),Object(r.d)("ul",{listStyle:"disc",paddingInlineStart:4},c.a.highlights.map((function(e,t){return Object(r.d)("li",{key:t},e)}))))),Object(r.d)("div",{display:"flex",justifyContent:"center",gap:"4",mt:"6"},Object(r.d)(a.a,{passHref:!0,href:"/about"},Object(r.d)("a",{variant:"button.primary.lg"},"About ",Object(r.d)(r.a,{name:"arrow-right",ml:"2",size:"4"}))),Object(r.d)("a",{variant:"button.outlineSecondary.lg",href:"#"},"Projects")))))}},YFqc:function(e,t,n){e.exports=n("cTJO")},cTJO:function(e,t,n){"use strict";var r=n("J4zp"),o=n("284h");t.__esModule=!0,t.default=void 0;var a=o(n("q1tI")),i=n("elyg"),c=n("nOHt"),u=n("vNVm"),l={};function s(e,t,n,r){if((0,i.isLocalURL)(t)){e.prefetch(t,n,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;l[t+"%"+n+(o?"%"+o:"")]=!0}}var d=function(e){var t=!1!==e.prefetch,n=(0,c.useRouter)(),o=n&&n.pathname||"/",d=a.default.useMemo((function(){var t=(0,i.resolveHref)(o,e.href,!0),n=r(t,2),a=n[0],c=n[1];return{href:a,as:e.as?(0,i.resolveHref)(o,e.as):c||a}}),[o,e.href,e.as]),f=d.href,p=d.as,v=e.children,b=e.replace,h=e.shallow,g=e.scroll,m=e.locale;"string"===typeof v&&(v=a.default.createElement("a",null,v));var y=a.Children.only(v),j=y&&"object"===typeof y&&y.ref,O=(0,u.useIntersection)({rootMargin:"200px"}),w=r(O,2),E=w[0],_=w[1],M=a.default.useCallback((function(e){E(e),j&&("function"===typeof j?j(e):"object"===typeof j&&(j.current=e))}),[j,E]);(0,a.useEffect)((function(){var e=_&&t&&(0,i.isLocalURL)(f),r="undefined"!==typeof m?m:n&&n.locale,o=l[f+"%"+p+(r?"%"+r:"")];e&&!o&&s(n,f,p,{locale:r})}),[p,f,_,m,t,n]);var x={ref:M,onClick:function(e){y.props&&"function"===typeof y.props.onClick&&y.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,a,c,u){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,i.isLocalURL)(n))&&(e.preventDefault(),null==c&&(c=r.indexOf("#")<0),t[o?"replace":"push"](n,r,{shallow:a,locale:u}).then((function(e){e&&c&&(window.scrollTo(0,0),document.body.focus())})))}(e,n,f,p,b,h,g,m)},onMouseEnter:function(e){(0,i.isLocalURL)(f)&&(y.props&&"function"===typeof y.props.onMouseEnter&&y.props.onMouseEnter(e),s(n,f,p,{priority:!0}))}};return(e.passHref||"a"===y.type&&!("href"in y.props))&&(x.href=(0,i.addBasePath)((0,i.addLocale)(p,"undefined"!==typeof m?m:n&&n.locale,n&&n.defaultLocale))),a.default.cloneElement(y,x)};t.default=d},vNVm:function(e,t,n){"use strict";var r=n("J4zp"),o=n("TqRt");t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!c,o=(0,a.useRef)(),l=(0,a.useState)(!1),s=r(l,2),d=s[0],f=s[1],p=(0,a.useCallback)((function(e){o.current&&(o.current(),o.current=void 0),n||d||e&&e.tagName&&(o.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=u.get(t);if(n)return n;var r=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return u.set(t,n={id:t,observer:o,elements:r}),n}(n),o=r.id,a=r.observer,i=r.elements;return i.set(e,t),a.observe(e),function(){a.unobserve(e),0===i.size&&(a.disconnect(),u.delete(o))}}(e,(function(e){return e&&f(e)}),{rootMargin:t}))}),[n,t,d]);return(0,a.useEffect)((function(){c||d||(0,i.default)((function(){return f(!0)}))}),[d]),[p,d]};var a=n("q1tI"),i=o(n("0G5g")),c="undefined"!==typeof IntersectionObserver;var u=new Map}},[["/EDR",0,1,3,2]]]);