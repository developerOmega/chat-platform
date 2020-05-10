/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _auth_execute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth_execute */ \"./assets/js/auth_execute.js\");\n/* harmony import */ var _user_execute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user_execute */ \"./assets/js/user_execute.js\");\n\n\n\nif (window.location.pathname === '/') {\n  let login = new _auth_execute__WEBPACK_IMPORTED_MODULE_0__[\"LoginAuthExecute\"]('/');\n  login.execute();\n}\n\nif (window.location.pathname === '/home') {\n  let logout = new _auth_execute__WEBPACK_IMPORTED_MODULE_0__[\"LogoutAuthExecute\"]('/');\n  logout.execute();\n  let users = new _user_execute__WEBPACK_IMPORTED_MODULE_1__[\"UserGetAllExecute\"]('/');\n  users.execute();\n}\n\n//# sourceURL=webpack:///./assets/js/app.js?");

/***/ }),

/***/ "./assets/js/auth_execute.js":
/*!***********************************!*\
  !*** ./assets/js/auth_execute.js ***!
  \***********************************/
/*! exports provided: LoginAuthExecute, LogoutAuthExecute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoginAuthExecute\", function() { return LoginAuthExecute; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LogoutAuthExecute\", function() { return LogoutAuthExecute; });\n/* harmony import */ var _execute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./execute */ \"./assets/js/execute.js\");\n/* harmony import */ var _components_authenticate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/authenticate */ \"./assets/js/components/authenticate.js\");\n\n\n\nclass AuthExecute extends _execute__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(pathname) {\n    super(pathname);\n    this.auth = new _components_authenticate__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  }\n\n}\n\nclass LoginAuthExecute extends AuthExecute {\n  constructor(pathname) {\n    super(pathname);\n  }\n\n  execute() {\n    const self = this;\n    document.querySelector('form').addEventListener('submit', function (e) {\n      e.preventDefault();\n      self.auth.login(this);\n    });\n  }\n\n}\n\nclass LogoutAuthExecute extends AuthExecute {\n  constructor(pathname) {\n    super(pathname);\n  }\n\n  execute() {\n    const self = this;\n    document.querySelector('#logout_session').addEventListener('submit', function (e) {\n      e.preventDefault();\n      self.auth.logout(this);\n    });\n  }\n\n}\n\n\n\n//# sourceURL=webpack:///./assets/js/auth_execute.js?");

/***/ }),

/***/ "./assets/js/components/authenticate.js":
/*!**********************************************!*\
  !*** ./assets/js/components/authenticate.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Auth; });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./assets/js/components/data.js\");\n\nclass Auth extends _data__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(url) {\n    super(url);\n  }\n\n  login(self) {\n    let url = `${this.url}/api/v1/login`;\n    let params = {\n      method: 'POST',\n      headers: {\n        \"Content-type\": \"application/x-www-form-urlencoded; charset=UTF-8\"\n      },\n      body: `email=${self.email.value}&password=${self.password.value}`\n    };\n    fetch(url, params).then(resp => resp.json()).then(data => {\n      console.log(data);\n      localStorage.setItem('tokenLogin', JSON.stringify(data.token));\n      localStorage.setItem('userAuth', JSON.stringify(data.user));\n      self.submit();\n    }).catch(err => console.log(err));\n  }\n\n  logout(self) {\n    if (this.token == '') {\n      return self.submit();\n    }\n\n    localStorage.removeItem('tokenLogin');\n    localStorage.removeItem('userAuth');\n    return self.submit();\n  }\n\n}\n\n//# sourceURL=webpack:///./assets/js/components/authenticate.js?");

/***/ }),

/***/ "./assets/js/components/data.js":
/*!**************************************!*\
  !*** ./assets/js/components/data.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Data; });\nclass Data {\n  constructor(url) {\n    this.url = 'http://localhost:3000';\n    this.token = !localStorage.getItem('tokenLogin') || localStorage.getItem('tokenLogin') == undefined ? '' : JSON.parse(localStorage.getItem('tokenLogin'));\n  }\n\n  get(id = 'all', callback) {\n    return callback(null, this.url);\n  }\n\n  post(value, callback) {\n    return callback(null, this.url);\n  }\n\n  put(id, value, callback) {\n    return callback(null, this.url);\n  }\n\n  delete(id, callback) {\n    return callback(null, this.url);\n  }\n\n}\n\n//# sourceURL=webpack:///./assets/js/components/data.js?");

/***/ }),

/***/ "./assets/js/components/user.js":
/*!**************************************!*\
  !*** ./assets/js/components/user.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return User; });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./assets/js/components/data.js\");\n\nclass User extends _data__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(url) {\n    super(url);\n  }\n\n  get(id = 'all', callback) {\n    let urlData = id === 'all' ? `${this.url}/api/v1/users` : `${this.url}/api/v1/users/${id}`;\n    let h = new Headers();\n    h.append('Authorization', this.token);\n    let req = new Request(urlData, {\n      method: 'GET',\n      mode: 'cors',\n      headers: h\n    });\n    fetch(req).then(resp => resp.json()).then(result => callback(null, result)).catch(err => callback(err));\n  }\n\n  post(value, callback) {\n    let urlData = `${this.url}/api/v1/users`;\n    let params = {\n      method: 'POST',\n      headers: {\n        \"Content-type\": \"application/x-www-form-urlencoded; charset=UTF-8\",\n        \"Authorization\": `${this.token}`\n      },\n      body: `name=${value.name}&email=${value.email}&password=${value.password}`\n    };\n    fetch(urlData, params).then(resp = resp.json()).then(result => callback(null, result)).then(err => callback(err));\n  }\n\n  put(id, value, callback) {\n    let urlData = `${url}/api/v1/users/${id}`;\n    let params = {\n      method: 'PUT',\n      headers: {\n        \"Content-type\": \"application/x-www-form-urlencoded; charset=UTF-8\",\n        \"Authorization\": `${this.token}`\n      },\n      // body: `name=${value.name}&email=${value.email}`\n      body: `name=${value.name}`\n    };\n    fetch(urlData, params).then(rest => rest.json()).then(result => callback(null, result)).catch(err => callback(err));\n  }\n\n  putActive(id, value, callback) {\n    let urlData = `${url}/api/v1/users/${id}`;\n    let params = {\n      method: 'PUT',\n      headers: {\n        \"Content-type\": \"application/x-www-form-urlencoded; charset=UTF-8\",\n        \"Authorization\": `${this.token}`\n      },\n      // body: `name=${value.name}&email=${value.email}`\n      body: `idSession=${value.idSession}`\n    };\n    fetch(urlData, params).then(rest => rest.json()).then(result => callback(null, result)).catch(err => callback(err));\n  }\n\n  delete(id, callback) {\n    let urlData = `${url}/api/v1/users/${id}`;\n    let h = new Headers();\n    h.append('Authorization', `${this.token}`);\n    let params = {\n      method: 'DELETE',\n      headers: h\n    };\n    fetch(urlData, params).then(rest => rest.json()).then(result => callback(null, result)).catch(err => callback(err));\n  }\n\n}\n\n//# sourceURL=webpack:///./assets/js/components/user.js?");

/***/ }),

/***/ "./assets/js/execute.js":
/*!******************************!*\
  !*** ./assets/js/execute.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Execute; });\nclass Execute {\n  constructor(pathname) {\n    this.pathname = pathname;\n    this.userAuth = !localStorage.getItem('userAuth') || localStorage.getItem('userAuth') == undefined ? '' : JSON.parse(localStorage.getItem('userAuth'));\n  }\n\n  execute() {\n    return this.pathname;\n  }\n\n}\n\n//# sourceURL=webpack:///./assets/js/execute.js?");

/***/ }),

/***/ "./assets/js/user_execute.js":
/*!***********************************!*\
  !*** ./assets/js/user_execute.js ***!
  \***********************************/
/*! exports provided: UserGetAllExecute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserGetAllExecute\", function() { return UserGetAllExecute; });\n/* harmony import */ var _execute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./execute */ \"./assets/js/execute.js\");\n/* harmony import */ var _components_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/user */ \"./assets/js/components/user.js\");\n\n\n\nclass UserExecute extends _execute__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(pathname) {\n    super(pathname);\n    this.user = new _components_user__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  }\n\n}\n\nclass UserGetAllExecute extends UserExecute {\n  constructor(pathname) {\n    super(pathname);\n  }\n\n  execute() {\n    this.user.get('all', (err, users) => {\n      if (err) {\n        console.error(err);\n      } // let contentUsers = document.querySelector('#content_users');\n      // users.users.forEach( user => {\n      //     contentUsers.innerHTML += `<button id= '${ user.idSession }' >${ user.email }</button>`\n      // });\n\n    });\n  }\n\n}\n\n\n\n//# sourceURL=webpack:///./assets/js/user_execute.js?");

/***/ })

/******/ });