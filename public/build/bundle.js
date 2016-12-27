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

	var _initializeShaders = __webpack_require__(2);

	/**
	 * Created by damiendg on 2016-12-25.
	 */
	window.onload = function () {
	  (0, _initializeGlContext.initializeGLContext)();
	  (0, _initializeShaders.initShaders)();
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


	function initializeGLContext() {
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
	    //set WebGL viewPort
	    gl.viewport(0, 0, canvas.width, canvas.height);
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
	exports.initializeGLContext = initializeGLContext;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initShaders = undefined;

	var _initializeGlContext = __webpack_require__(1);

	var _fragment = __webpack_require__(3);

	var _vertex = __webpack_require__(5);

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
	   * Created by damiendg on 2016-12-27.
	   */
	exports.initShaders = initShaders;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createFragmentShader = undefined;

	var _initializeGlContext = __webpack_require__(1);

	var _basicFragment = __webpack_require__(4);

	var _basicFragment2 = _interopRequireDefault(_basicFragment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by damiendg on 2016-12-25.
	 */
	function createFragmentShader() {
	    //fragment shader source code
	    var fragCode = _basicFragment2.default;
	    // Create fragment shader object
	    var fragmentShader = _initializeGlContext.gl.createShader(_initializeGlContext.gl.FRAGMENT_SHADER);
	    // Attach fragment shader source code
	    _initializeGlContext.gl.shaderSource(fragmentShader, fragCode);
	    // Compile the fragmentt shader
	    _initializeGlContext.gl.compileShader(fragmentShader);

	    return fragmentShader;
	}
	exports.createFragmentShader = createFragmentShader;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "void main(void) {\n    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);\n}"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createVertexShader = undefined;

	var _initializeGlContext = __webpack_require__(1);

	var _basicVertex = __webpack_require__(6);

	var _basicVertex2 = _interopRequireDefault(_basicVertex);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by damiendg on 2016-12-25.
	 */
	function createVertexShader() {
	    var vertexCode = _basicVertex2.default;
	    // Create a vertex shader object
	    var vertexShader = _initializeGlContext.gl.createShader(_initializeGlContext.gl.VERTEX_SHADER);

	    // Attach vertex shader source code
	    _initializeGlContext.gl.shaderSource(vertexShader, vertexCode);

	    // Compile the vertex shader
	    _initializeGlContext.gl.compileShader(vertexShader);

	    return vertexShader;
	}

	exports.createVertexShader = createVertexShader;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "attribute vec3 coordinates;\n\nvoid main(void) {\n    gl_Position = vec4(coordinates, 1.0);\n}"

/***/ }
/******/ ]);