/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _initializeGlContext = __webpack_require__(1);

	var _fragment = __webpack_require__(2);

	var _vertex = __webpack_require__(3);

	function initShaders() {

	    var shaderProgram = _initializeGlContext.gl.createProgram();

	    var vertexShader = (0, _vertex.createVertexShader)();
	    var fragmentShader = (0, _fragment.createFragmentShader)();
	    // Attach a vertex shader
	    _initializeGlContext.gl.attachShader(shaderProgram, vertexShader);

	    // Attach a fragment shader
	    _initializeGlContext.gl.attachShader(shaderProgram, fragmentShader);

	    // Link both the programs
	    _initializeGlContext.gl.linkProgram(shaderProgram);

	    // Use the combined shader program object
	    _initializeGlContext.gl.useProgram(shaderProgram);
	} /**
	   * Created by damiendg on 2016-12-25.
	   */


	window.onload = function () {
	    (0, _initializeGlContext.start)();
	    initShaders();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by damiendg on 2016-12-25.
	 */
	var gl = void 0; // A global variable for the WebGL context


	function start() {
	    var canvas = document.getElementById("glCanvas");
	    // Initialize the GL context
	    exports.gl = gl = initWebGL(canvas);

	    // Only continue if WebGL is available and working
	    if (!gl) {
	        return;
	    }

	    // Set clear color to black, fully opaque
	    gl.clearColor(0.0, 0.0, 0.0, 1.0);
	    // Enable depth testing
	    gl.enable(gl.DEPTH_TEST);
	    // Near things obscure far things
	    gl.depthFunc(gl.LEQUAL);
	    // Clear the color as well as the depth buffer.
	    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}

	function initWebGL(canvas) {
	    // Try to grab the standard context. If it fails, fallback to experimental.
	    exports.gl = gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

	    // If we don't have a GL context, give up now
	    if (!gl) {
	        alert("Unable to initialize WebGL. Your browser may not support it.");
	    }

	    return gl;
	}

	exports.gl = gl;
	exports.start = start;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createFragmentShader = undefined;

	var _initializeGlContext = __webpack_require__(1);

	var _initializeGlContext2 = _interopRequireDefault(_initializeGlContext);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createFragmentShader() {
	    //fragment shader source code
	    var fragCode = "\n        void main(void) { \n            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);\n        };\n        ";
	    // Create fragment shader object
	    var fragmentShader = _initializeGlContext2.default.createShader(_initializeGlContext2.default.FRAGMENT_SHADER);

	    // Attach fragment shader source code
	    _initializeGlContext2.default.shaderSource(fragmentShader, fragCode);

	    // Compile the fragmentt shader
	    _initializeGlContext2.default.compileShader(fragmentShader);
	    return fragmentShader;
	} /**
	   * Created by damiendg on 2016-12-25.
	   */
	exports.createFragmentShader = createFragmentShader;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createVertexShader = undefined;

	var _initializeGlContext = __webpack_require__(1);

	var _initializeGlContext2 = _interopRequireDefault(_initializeGlContext);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createVertexShader() {
	    var vertexCode = "\n    attribute vec3 coordinates;\n\n    void main(void) {\n        gl_Position = vec4(coordinates, 1.0);\n    }\n    \n    ";
	    // Create a vertex shader object
	    var vertexShader = _initializeGlContext2.default.createShader(_initializeGlContext2.default.VERTEX_SHADER);

	    // Attach vertex shader source code
	    _initializeGlContext2.default.shaderSource(vertexShader, vertexCode);

	    // Compile the vertex shader
	    _initializeGlContext2.default.compileShader(vertexShader);

	    return vertexShader;
	} /**
	   * Created by damiendg on 2016-12-25.
	   */
	exports.createVertexShader = createVertexShader;

/***/ }
/******/ ]);