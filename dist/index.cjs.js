"use strict";var t;Object.defineProperty(exports,"__esModule",{value:!0}),function(t){t.version="1.0.0"}(t||(t={}));const e=t=>{const e=history[t];return function(){const r=e.apply(this,arguments),s=new Event(t);return window.dispatchEvent(s),r}},r=["click","dbclick","contextmenu","mousedown","mouseup","mouseenter","mouseout","mouseover"];exports.Reporter=class{constructor(t){this.data=Object.assign(this.initDef(),t),this.installInnerReporter()}initDef(){return this.version=t.version,window.history.pushstate=e("pushState"),window.history.replaceState=e("replaceState"),{domReporter:!1,historyReporter:!1,hashReporter:!1,jsErroer:!1,repoterVersion:this.version}}setUserId(t){this.data.uuid=t}setExtraData(t){this.data.extraData=t}sendReporter(t){this.report(t)}report(t){const e=Object.assign(this.data,t,{time:Date.now()}),r=new Blob([JSON.stringify(e)],{type:"application/x-www-form-urlencoded"});navigator.sendBeacon(this.data.requestUrl,r)}installInnerReporter(){this.data.historyReporter&&(this.captureEvents(["pushstate"],"history-pv"),this.captureEvents(["replacestate"],"history-pv"),this.captureEvents(["popstate"],"history-pv")),this.data.hashReporter&&this.captureEvents(["hashchange"],"hash-pv"),this.data.domReporter&&this.targetReport(),this.data.jsErroer&&this.jsReport()}captureEvents(t,e,r){t.forEach((t=>{window.addEventListener(t,(()=>{this.report({event:t,targetKey:e,data:r})}))}))}targetReport(){r.forEach((t=>{window.addEventListener(t,(e=>{const r=e.target.getAttribute("target-key");r&&this.sendReporter({targetKey:r,event:t})}))}))}jsReport(){this.captureJsError(),this.capturePromiseReject()}captureJsError(){window.addEventListener("error",(t=>{this.sendReporter({targetKey:"js-error",event:"js",message:t.message})}))}capturePromiseReject(){window.addEventListener("unhandledrejection",(t=>{t.promise.catch((t=>{this.sendReporter({targetKey:"promise-error",event:"promise",message:t})}))}))}},exports.Storage=class{constructor(t){this.storage=window.localStorage,t&&(this.storage=window[t])}get(t){const e=this.storage.getItem(t);try{return e?JSON.parse(e):e}catch(t){return e}}set(t,e){this.storage.setItem(t,JSON.stringify(e))}remove(t){this.storage.removeItem(t)}clear(){this.storage.clear()}};
