webpackJsonp([0],{119:function(e,t,n){"use strict";var r=n(742),a=(n.n(r),new r.Dispatcher);t.a=a},150:function(e,t,n){"use strict";function r(){u.a.dispatch({type:f.LOADING_SAGES}),l.a()}function a(e){u.a.dispatch({type:f.LOADED_SAGES,payload:e})}function o(e){u.a.dispatch({type:f.LOADED_SAGE,payload:e})}function i(e){u.a.dispatch({type:f.REMOVED_SAGE,payload:e})}function c(e){u.a.dispatch({type:f.SAVED_SAGE,payload:e})}function s(e){u.a.dispatch({type:f.SAVE_SAGE_FAILED,payload:e})}var u=n(119),l=n(478);n.d(t,"g",function(){return f}),t.a=r,t.b=a,t.c=o,t.d=i,t.e=c,t.f=s;var f={LOADING_SAGES:"SageActionTypes.LOADING_SAGES",LOADED_SAGES:"SageActionTypes.LOADED_SAGES",LOAD_SAGE:"SageActionTypes.LOAD_SAGE",LOADED_SAGE:"SageActionTypes.LOADED_SAGE",REMOVE_SAGE:"SageActionTypes.REMOVE_SAGE",REMOVED_SAGE:"SageActionTypes.REMOVED_SAGE",SAVE_SAGE:"SageActionTypes.SAVE_SAGE",SAVED_SAGE:"SageActionTypes.SAVED_SAGE",SAVE_SAGE_FAILED:"SageActionTypes.SAVE_SAGE_FAILED"}},234:function(e,t,n){"use strict";function r(e){i.a.dispatch({payload:e,type:c.a.ADD_GREETING})}function a(e){i.a.dispatch({payload:e,type:c.a.NEW_GREETING_CHANGED})}function o(e){i.a.dispatch({payload:e,type:c.a.REMOVE_GREETING})}var i=n(119),c=n(235);t.c=r,t.b=a,t.a=o},235:function(e,t,n){"use strict";var r={ADD_GREETING:"GreetingActionTypes.ADD_GREETING",REMOVE_GREETING:"GreetingActionTypes.REMOVE_GREETING",NEW_GREETING_CHANGED:"GreetingActionTypes.NEW_GREETING_CHANGED"};t.a=r},236:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=n(230),o=(n.n(a),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),i=function(){function e(t,n){var o=this;r(this,e),this._emitter=new a.EventEmitter,this._changed=!1,this._dispatcher=t,this.dispatchToken=t.register(function(e){o._invokeOnDispatch(e)}),this._cleanStateFn=n,this._state=this._cleanStateFn()}return o(e,[{key:"emitChange",value:function(){this._changed=!0}},{key:"hasChanged",value:function(){return this._changed}},{key:"addChangeListener",value:function(e){return this._emitter.addListener("change",e)}},{key:"_cleanState",value:function(){this._changed=!1,this._state=this._cleanStateFn()}},{key:"_invokeOnDispatch",value:function(e){this._changed=!1,this._onDispatch(e),this._changed&&this._emitter.emit("change")}},{key:"_onDispatch",value:function(e){}}]),e}();t.a=i},465:function(e,t,n){"use strict";function r(){return a.createElement(o.Route,{path:"/",component:u.a},a.createElement(o.IndexRedirect,{to:"/greeting"}),a.createElement(o.Route,{path:"greeting",component:i.a}),a.createElement(o.Route,{path:"dashboard",component:i.a}),a.createElement(o.Route,{path:"sages",component:c.a},a.createElement(o.Route,{path:":id",component:i.a})),a.createElement(o.Route,{path:"sayings",component:i.a}),a.createElement(o.Route,{path:"about",component:s.a}))}var a=n(0),o=(n.n(a),n(81)),i=n(469),c=n(473),s=n(467),u=n(471);t.a=r},467:function(e,t,n){"use strict";var r=n(0),a=(n.n(r),function(){return r.createElement("div",{className:"container"},r.createElement("h2",null,"About"),r.createElement("p",null,'Arul "Socrates" Aruldas is a wise old sage often given to spouting sayings that convey wisdom and knowledge far beyond his years.  It was felt that these gems could not be allowed to slip through the cracks.  Here they are preserved for posterity.  Noted down by the bystanders and witnesses to his greatness.'),r.createElement("p",null,"Occasionally other colleagues comments have been jotted down as well. They exist to be a contrast the wisdom in Arul's sayings - we are not worthy!"),r.createElement("h3",null,"About the app"),r.createElement("p",null,"Built using a combination of React, TypeScript and Flux. Hosted on Azure."),r.createElement("h3",null,"Version"),r.createElement("p",null,"This is version: ","1.0.0.1492963702691"," "))});t.a=a},468:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),c=n.n(i),s=n(234),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n._onClick=function(e){s.a(n.props.targetOfGreeting)},n}return o(t,e),u(t,[{key:"render",value:function(){return c.a.createElement("p",{style:{color:"pink"}},"Hello ",this.props.targetOfGreeting,"!",c.a.createElement("button",{className:"btn btn-default btn-danger",onClick:this._onClick},"Remove"))}}]),t}(c.a.Component);t.a=l},469:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),c=n.n(i),s=n(479),u=n(470),l=n(468),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n._onChange=function(){n.setState(n._getStateFromStores())},n.state=n._getStateFromStores(),n}return o(t,e),f(t,[{key:"componentWillMount",value:function(){this.eventSubscription=s.a.addChangeListener(this._onChange)}},{key:"componentWillUnmount",value:function(){this.eventSubscription.remove()}},{key:"render",value:function(){var e=this.state,t=e.greetings,n=e.newGreeting;return c.a.createElement("div",{className:"container-fluid"},c.a.createElement("h1",null,"Hello People!"),c.a.createElement(u.a,{newGreeting:n}),t.map(function(e,t){return c.a.createElement(l.a,{key:t,targetOfGreeting:e})}))}},{key:"_getStateFromStores",value:function(){return s.a.getState()}}]),t}(c.a.Component);t.a=p},470:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),c=n.n(i),s=n(234),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n._handleNewGreetingChange=function(e){var t=e.target.value;s.b(t)},n._onSubmit=function(e){e.preventDefault(),n._preventSubmission||s.c(n.props.newGreeting)},n}return o(t,e),u(t,[{key:"render",value:function(){return c.a.createElement("form",{role:"form"},c.a.createElement("div",{className:"form-group"},c.a.createElement("input",{type:"text",className:"form-control",placeholder:"Who would you like to greet?",value:this.props.newGreeting,style:{color:"#FF69B4"},onChange:this._handleNewGreetingChange}),c.a.createElement("button",{type:"submit",className:"btn btn-default btn-primary",onClick:this._onSubmit,disabled:this._preventSubmission},"Add greeting")))}},{key:"_preventSubmission",get:function(){return!this.props.newGreeting}}]),t}(c.a.Component);t.a=l},471:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),c=n.n(i),s=n(472),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=function(e){function t(e){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return o(t,e),u(t,[{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement(s.a,{path:this.props.location.pathname,routes:this.props.routes}),this.props.children)}}]),t}(c.a.Component);t.a=l},472:function(e,t,n){"use strict";var r=n(0),a=(n.n(r),n(81)),o=n(232),i=n(233),c=(n.n(i),function(e){var t=e.path;e.routes;return r.createElement(o.Navbar,{bsStyle:"default"},r.createElement(o.Navbar.Header,null,r.createElement(o.Navbar.Brand,null,r.createElement(a.Link,{to:"/"},r.createElement("span",{className:"brand-title"},"Proverb"))),r.createElement(o.Navbar.Toggle,null)),r.createElement(o.Navbar.Collapse,null,r.createElement(o.Nav,{activeHref:t},r.createElement(i.LinkContainer,{to:"/dashboard"},r.createElement(o.NavItem,{eventKey:0},r.createElement("i",{className:"fa fa-dashboard"})," Dashboard")),r.createElement(i.LinkContainer,{to:"/sages"},r.createElement(o.NavItem,{eventKey:1},r.createElement("i",{className:"fa fa-users"})," Sages")),r.createElement(i.LinkContainer,{to:"/sayings"},r.createElement(o.NavItem,{eventKey:2},r.createElement("i",{className:"fa fa-comment"})," Sayings"))),r.createElement(o.Nav,{pullRight:!0},r.createElement(i.LinkContainer,{to:"/about"},r.createElement(o.NavItem,{eventKey:1},"About")))))});t.a=c},473:function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=n(0),s=n.n(c),u=n(480),l=n(150),f=n(474),p=n(476),h=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),y=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n._onChange=function(){n.setState(u.a.getState())},n.state=u.a.getState(),n}return i(t,e),h(t,[{key:"componentWillMount",value:function(){this.eventSubscription=u.a.addChangeListener(this._onChange)}},{key:"componentWillUnmount",value:function(){this.eventSubscription.remove()}},{key:"componentDidMount",value:function(){this.state.isInitialised||l.a()}},{key:"render",value:function(){var e=this.state,t=e.isInitialised,n=e.sages,a=t?[].concat(r(n.values())).map(function(e,t){return s.a.createElement(f.a,{key:t,sage:e})}):s.a.createElement(p.a,null);return s.a.createElement("div",{className:"container"},s.a.createElement("h2",null,"Sages"),a)}}]),t}(s.a.Component);t.a=y},474:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),c=n.n(i),s=n(81),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=function(e){function t(e){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return o(t,e),u(t,[{key:"render",value:function(){var e=this.props.sage;return c.a.createElement("div",{className:"col-md-2 col-xs-4"},c.a.createElement(s.Link,{to:"/sages/"+e.id,className:"thumbnail"},c.a.createElement("div",{className:"text-center text-info min-height-120"},c.a.createElement("i",{className:"fa fa-user fa-5x"}),c.a.createElement("h5",null,e.name))))}}]),t}(c.a.Component);t.a=l},475:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(149),a=(n.n(r),n(0)),o=(n.n(a),n(30)),i=n.n(o),c=n(81),s=n(465);i.a.render(a.createElement(c.Router,{history:c.hashHistory},n.i(s.a)()),document.getElementById("content"))},476:function(e,t,n){"use strict";var r=n(0),a=(n.n(r),function(){return r.createElement("h4",{className:"text-primary"},"Loading....",r.createElement("i",{className:"fa fa-circle-o-notch fa-spin fa-fw"}))});t.a=a},477:function(e,t,n){"use strict";function r(e){return e.status>=200&&e.status<300?Promise.resolve(e):Promise.reject(new Error(e.statusText))}function a(e){return e.json()}function o(e){var t=new FormData;return t.append("json",JSON.stringify(e)),t}n.d(t,"a",function(){return i}),t.b=r,t.c=a,t.d=o;var i=function(){return"https://proverb-api.azurewebsites.net/"}},478:function(e,t,n){"use strict";function r(){return fetch(u).then(c.b).then(function(e){return n.i(c.c)(e)}).then(s.b)}function a(e){return fetch(u+"/id").then(c.b).then(function(e){return n.i(c.c)(e)}).then(s.c)}function o(e){return fetch(u+"/id",{method:"DELETE"}).then(c.b).then(function(t){return n.i(s.d)(e)})}function i(e){return fetch(u,{method:"POST",body:n.i(c.d)(e)}).then(c.b).then(function(e){return n.i(c.c)(e)}).then(s.e).catch(s.f)}var c=n(477),s=n(150);t.a=r,t.b=a,t.c=o,t.d=i;var u=c.a+"sage"},479:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(236),c=n(235),s=n(119),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=function(e){function t(e){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,function(){return{greetings:[],newGreeting:""}}))}return o(t,e),u(t,[{key:"getState",value:function(){return this._state}},{key:"_onDispatch",value:function(e){switch(e.type){case c.a.ADD_GREETING:this._state.newGreeting="",this._state.greetings=this._state.greetings.concat(e.payload),this.emitChange();break;case c.a.REMOVE_GREETING:this._state.greetings=this._state.greetings.filter(function(t){return t!==e.payload}),this.emitChange();break;case c.a.NEW_GREETING_CHANGED:this._state.newGreeting=e.payload,this.emitChange()}}}]),t}(i.a),f=new l(s.a);t.a=f},480:function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=n(236),s=n(150),u=n(119),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=function(e){function t(e){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,function(){return{sages:void 0,isInitialised:!1}}))}return i(t,e),l(t,[{key:"getState",value:function(){return this._state}},{key:"_updateState",value:function(e){this._state=Object.assign({},this._state,{sages:e,isInitialised:!0}),this.emitChange()}},{key:"_onDispatch",value:function(e){switch(e.type){case s.g.LOADED_SAGES:var t=e.payload;this._updateState(new Map([].concat(r(t.map(function(e){return[e.id,e]})))));break;case s.g.LOADED_SAGE:var n=e.payload;this._updateState(this._state.sages?this._state.sages.set(n.id,n):new Map([[n.id,n]]));break;case s.g.REMOVED_SAGE:var a=e.payload;this._state.sages.delete(a),this._updateState(this._state.sages)}}}]),t}(c.a),p=new f(u.a);t.a=p},742:function(e,t,n){e.exports.Dispatcher=n(743)},743:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var a=n(744),o=function(){function e(){r(this,e),this._callbacks={},this._isDispatching=!1,this._isHandled={},this._isPending={},this._lastID=1}return e.prototype.register=function(e){var t="ID_"+this._lastID++;return this._callbacks[t]=e,t},e.prototype.unregister=function(e){this._callbacks[e]||a(!1),delete this._callbacks[e]},e.prototype.waitFor=function(e){this._isDispatching||a(!1);for(var t=0;t<e.length;t++){var n=e[t];this._isPending[n]?this._isHandled[n]||a(!1):(this._callbacks[n]||a(!1),this._invokeCallback(n))}},e.prototype.dispatch=function(e){this._isDispatching&&a(!1),this._startDispatching(e);try{for(var t in this._callbacks)this._isPending[t]||this._invokeCallback(t)}finally{this._stopDispatching()}},e.prototype.isDispatching=function(){return this._isDispatching},e.prototype._invokeCallback=function(e){this._isPending[e]=!0,this._callbacks[e](this._pendingPayload),this._isHandled[e]=!0},e.prototype._startDispatching=function(e){for(var t in this._callbacks)this._isPending[t]=!1,this._isHandled[t]=!1;this._pendingPayload=e,this._isDispatching=!0},e.prototype._stopDispatching=function(){delete this._pendingPayload,this._isDispatching=!1},e}();e.exports=o},744:function(e,t,n){"use strict";var r=function(e,t,n,r,a,o,i,c){if(!e){var s;if(void 0===t)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[n,r,a,o,i,c],l=0;s=new Error("Invariant Violation: "+t.replace(/%s/g,function(){return u[l++]}))}throw s.framesToPop=1,s}};e.exports=r}},[475]);