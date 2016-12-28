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

	'use strict';

	var _initializeGlContext = __webpack_require__(1);

	var _initializeShaders = __webpack_require__(2);

	var _sylvester = __webpack_require__(7);

	var _SceneObject = __webpack_require__(15);

	var _SceneObject2 = _interopRequireDefault(_SceneObject);

	var _Renderer = __webpack_require__(17);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.onload = function () {
	    (0, _initializeGlContext.initializeGLContext)();
	    (0, _initializeShaders.initShaders)();

	    var vertices = [-0.5, 0.5, 0.0, 0.0, 0.5, 0.0, -0.25, 0.25, 0.0];

	    var mainGame = new _Renderer2.default();
	    mainGame.addSceneObjectToRenderArray(new _SceneObject2.default(vertices));
	    mainGame.createVertexBuffer();
	    _initializeGlContext.gl.drawArrays(_initializeGlContext.gl.TRIANGLES, 0, 3);
	}; /**
	    * Created by damiendg on 2016-12-25.
	    */

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

	    gl.clearColor(0.5, 0.5, 0.5, 0.9);
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
	exports.shaderProgram = exports.initShaders = undefined;

	var _initializeGlContext = __webpack_require__(1);

	var _fragment = __webpack_require__(3);

	var _vertex = __webpack_require__(5);

	var shaderProgram = void 0; /**
	                             * Created by damiendg on 2016-12-27.
	                             */


	function initShaders() {

	    exports.shaderProgram = shaderProgram = _initializeGlContext.gl.createProgram();

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
	}

	exports.initShaders = initShaders;
	exports.shaderProgram = shaderProgram;

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

	module.exports = "void main(void) {\n    gl_FragColor = vec4(1, 0.5, 0.0, 1);\n}"

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

	module.exports = "attribute vec3 coordinates;\n\nvoid main(void) {\n    gl_Position = vec4(coordinates, 1.0);;\n}"

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// Copyright (c) 2011, Chris Umbel

	exports.Vector = __webpack_require__(8);
	global.$V = exports.Vector.create;
	exports.Matrix = __webpack_require__(10);
	global.$M = exports.Matrix.create;
	exports.Line = __webpack_require__(12);
	global.$L = exports.Line.create;
	exports.Plane = __webpack_require__(13);
	global.$P = exports.Plane.create;
	exports.Line.Segment = __webpack_require__(14);
	exports.Sylvester = __webpack_require__(9);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (c) 2011, Chris Umbel, James Coglan
	// This file is required in order for any other classes to work. Some Vector methods work with the
	// other Sylvester classes and are useless unless they are included. Other classes such as Line and
	// Plane will not function at all without Vector being loaded first.

	var Sylvester = __webpack_require__(9),
	Matrix = __webpack_require__(10);

	function Vector() {}
	Vector.prototype = {

	    norm: function() {
		var n = this.elements.length;
		var sum = 0;

		while (n--) {
		    sum += Math.pow(this.elements[n], 2);
		}

		return Math.sqrt(sum);
	    },

	    // Returns element i of the vector
	    e: function(i) {
	      return (i < 1 || i > this.elements.length) ? null : this.elements[i - 1];
	    },

	    // Returns the number of rows/columns the vector has
	    dimensions: function() {
	      return {rows: 1, cols: this.elements.length};
	    },

	    // Returns the number of rows in the vector
	    rows: function() {
	      return 1;
	    },

	    // Returns the number of columns in the vector
	    cols: function() {
	      return this.elements.length;
	    },

	    // Returns the modulus ('length') of the vector
	    modulus: function() {
	      return Math.sqrt(this.dot(this));
	    },

	    // Returns true iff the vector is equal to the argument
	    eql: function(vector) {
	    	var n = this.elements.length;
	    	var V = vector.elements || vector;
	    	if (n != V.length) { return false; }
	    	while (n--) {
	    	    if (Math.abs(this.elements[n] - V[n]) > Sylvester.precision) { return false; }
	    	}
	    	return true;
	    },

	    // Returns a copy of the vector
	    dup: function() {
		    return Vector.create(this.elements);
	    },

	    // Maps the vector to another vector according to the given function
	    map: function(fn) {
		var elements = [];
		this.each(function(x, i) {
		    elements.push(fn(x, i));
		});
		return Vector.create(elements);
	    },

	    // Calls the iterator for each element of the vector in turn
	    each: function(fn) {
		var n = this.elements.length;
		for (var i = 0; i < n; i++) {
		    fn(this.elements[i], i + 1);
		}
	    },

	    // Returns a new vector created by normalizing the receiver
	    toUnitVector: function() {
		var r = this.modulus();
		if (r === 0) { return this.dup(); }
		return this.map(function(x) { return x / r; });
	    },

	    // Returns the angle between the vector and the argument (also a vector)
	    angleFrom: function(vector) {
		var V = vector.elements || vector;
		var n = this.elements.length, k = n, i;
		if (n != V.length) { return null; }
		var dot = 0, mod1 = 0, mod2 = 0;
		// Work things out in parallel to save time
		this.each(function(x, i) {
		    dot += x * V[i - 1];
		    mod1 += x * x;
		    mod2 += V[i - 1] * V[i - 1];
		});
		mod1 = Math.sqrt(mod1); mod2 = Math.sqrt(mod2);
		if (mod1 * mod2 === 0) { return null; }
		var theta = dot / (mod1 * mod2);
		if (theta < -1) { theta = -1; }
		if (theta > 1) { theta = 1; }
		return Math.acos(theta);
	    },

	    // Returns true iff the vector is parallel to the argument
	    isParallelTo: function(vector) {
		var angle = this.angleFrom(vector);
		return (angle === null) ? null : (angle <= Sylvester.precision);
	    },

	    // Returns true iff the vector is antiparallel to the argument
	    isAntiparallelTo: function(vector) {
		var angle = this.angleFrom(vector);
		return (angle === null) ? null : (Math.abs(angle - Math.PI) <= Sylvester.precision);
	    },

	    // Returns true iff the vector is perpendicular to the argument
	    isPerpendicularTo: function(vector) {
		var dot = this.dot(vector);
		return (dot === null) ? null : (Math.abs(dot) <= Sylvester.precision);
	    },

	    // Returns the result of adding the argument to the vector
	    add: function(value) {
		var V = value.elements || value;

		if (this.elements.length != V.length) 
		    return this.map(function(v) { return v + value });
		else
		    return this.map(function(x, i) { return x + V[i - 1]; });
	    },

	    // Returns the result of subtracting the argument from the vector
	    subtract: function(v) {
		if (typeof(v) == 'number')
		    return this.map(function(k) { return k - v; });

		var V = v.elements || v;
		if (this.elements.length != V.length) { return null; }
		return this.map(function(x, i) { return x - V[i - 1]; });
	    },

	    // Returns the result of multiplying the elements of the vector by the argument
	    multiply: function(k) {
		return this.map(function(x) { return x * k; });
	    },

	    elementMultiply: function(v) {
		return this.map(function(k, i) {
		    return v.e(i) * k;
		});
	    },

	    sum: function() {
		var sum = 0;
		this.map(function(x) { sum += x;});
		return sum;
	    },

	    chomp: function(n) {
		var elements = [];

		for (var i = n; i < this.elements.length; i++) {
		    elements.push(this.elements[i]);
		}

		return Vector.create(elements);
	    },

	    top: function(n) {
		var elements = [];

		for (var i = 0; i < n; i++) {
		    elements.push(this.elements[i]);
		}

		return Vector.create(elements);
	    },

	    augment: function(elements) {
		var newElements = this.elements;

		for (var i = 0; i < elements.length; i++) {
		    newElements.push(elements[i]);
		}

		return Vector.create(newElements);
	    },

	    x: function(k) { return this.multiply(k); },

	    log: function() {
		return Vector.log(this);
	    },

	    elementDivide: function(vector) {
		return this.map(function(v, i) {
		    return v / vector.e(i);
		});
	    },

	    product: function() {
		var p = 1;

		this.map(function(v) {
		    p *= v;
		});

		return p;
	    },

	    // Returns the scalar product of the vector with the argument
	    // Both vectors must have equal dimensionality
	    dot: function(vector) {
		var V = vector.elements || vector;
		var i, product = 0, n = this.elements.length;	
		if (n != V.length) { return null; }
		while (n--) { product += this.elements[n] * V[n]; }
		return product;
	    },

	    // Returns the vector product of the vector with the argument
	    // Both vectors must have dimensionality 3
	    cross: function(vector) {
		var B = vector.elements || vector;
		if (this.elements.length != 3 || B.length != 3) { return null; }
		var A = this.elements;
		return Vector.create([
		    (A[1] * B[2]) - (A[2] * B[1]),
		    (A[2] * B[0]) - (A[0] * B[2]),
		    (A[0] * B[1]) - (A[1] * B[0])
		]);
	    },

	    // Returns the (absolute) largest element of the vector
	    max: function() {
		var m = 0, i = this.elements.length;
		while (i--) {
		    if (Math.abs(this.elements[i]) > Math.abs(m)) { m = this.elements[i]; }
		}
		return m;
	    },


	    maxIndex: function() {
		var m = 0, i = this.elements.length;
		var maxIndex = -1;

		while (i--) {
		    if (Math.abs(this.elements[i]) > Math.abs(m)) { 
			m = this.elements[i]; 
			maxIndex = i + 1;
		    }
		}

		return maxIndex;
	    },


	    // Returns the index of the first match found
	    indexOf: function(x) {
		var index = null, n = this.elements.length;
		for (var i = 0; i < n; i++) {
		    if (index === null && this.elements[i] == x) {
			index = i + 1;
		    }
		}
		return index;
	    },

	    // Returns a diagonal matrix with the vector's elements as its diagonal elements
	    toDiagonalMatrix: function() {
		return Matrix.Diagonal(this.elements);
	    },

	    // Returns the result of rounding the elements of the vector
	    round: function() {
		return this.map(function(x) { return Math.round(x); });
	    },

	    // Transpose a Vector, return a 1xn Matrix
	    transpose: function() {
		var rows = this.elements.length;
		var elements = [];

		for (var i = 0; i < rows; i++) {
		    elements.push([this.elements[i]]);
		}
		return Matrix.create(elements);
	    },

	    // Returns a copy of the vector with elements set to the given value if they
	    // differ from it by less than Sylvester.precision
	    snapTo: function(x) {
		return this.map(function(y) {
		    return (Math.abs(y - x) <= Sylvester.precision) ? x : y;
		});
	    },

	    // Returns the vector's distance from the argument, when considered as a point in space
	    distanceFrom: function(obj) {
		if (obj.anchor || (obj.start && obj.end)) { return obj.distanceFrom(this); }
		var V = obj.elements || obj;
		if (V.length != this.elements.length) { return null; }
		var sum = 0, part;
		this.each(function(x, i) {
		    part = x - V[i - 1];
		    sum += part * part;
		});
		return Math.sqrt(sum);
	    },

	    // Returns true if the vector is point on the given line
	    liesOn: function(line) {
		return line.contains(this);
	    },

	    // Return true iff the vector is a point in the given plane
	    liesIn: function(plane) {
		return plane.contains(this);
	    },

	    // Rotates the vector about the given object. The object should be a
	    // point if the vector is 2D, and a line if it is 3D. Be careful with line directions!
	    rotate: function(t, obj) {
		var V, R = null, x, y, z;
		if (t.determinant) { R = t.elements; }
		switch (this.elements.length) {
		case 2:
	            V = obj.elements || obj;
	            if (V.length != 2) { return null; }
	            if (!R) { R = Matrix.Rotation(t).elements; }
	            x = this.elements[0] - V[0];
	            y = this.elements[1] - V[1];
	            return Vector.create([
			V[0] + R[0][0] * x + R[0][1] * y,
			V[1] + R[1][0] * x + R[1][1] * y
	            ]);
	            break;
		case 3:
	            if (!obj.direction) { return null; }
	            var C = obj.pointClosestTo(this).elements;
	            if (!R) { R = Matrix.Rotation(t, obj.direction).elements; }
	            x = this.elements[0] - C[0];
	            y = this.elements[1] - C[1];
	            z = this.elements[2] - C[2];
	            return Vector.create([
			C[0] + R[0][0] * x + R[0][1] * y + R[0][2] * z,
			C[1] + R[1][0] * x + R[1][1] * y + R[1][2] * z,
			C[2] + R[2][0] * x + R[2][1] * y + R[2][2] * z
	            ]);
	            break;
		default:
	            return null;
		}
	    },

	    // Returns the result of reflecting the point in the given point, line or plane
	    reflectionIn: function(obj) {
		if (obj.anchor) {
		    // obj is a plane or line
		    var P = this.elements.slice();
		    var C = obj.pointClosestTo(P).elements;
		    return Vector.create([C[0] + (C[0] - P[0]), C[1] + (C[1] - P[1]), C[2] + (C[2] - (P[2] || 0))]);
		} else {
		    // obj is a point
		    var Q = obj.elements || obj;
		    if (this.elements.length != Q.length) { return null; }
		    return this.map(function(x, i) { return Q[i - 1] + (Q[i - 1] - x); });
		}
	    },

	    // Utility to make sure vectors are 3D. If they are 2D, a zero z-component is added
	    to3D: function() {
		var V = this.dup();
		switch (V.elements.length) {
		case 3: break;
		case 2: V.elements.push(0); break;
		default: return null;
		}
		return V;
	    },

	    // Returns a string representation of the vector
	    inspect: function() {
		return '[' + this.elements.join(', ') + ']';
	    },

	    // Set vector's elements from an array
	    setElements: function(els) {
		this.elements = (els.elements || els).slice();
		return this;
	    }
	};

	// Constructor function
	Vector.create = function(elements) {
	    var V = new Vector();
	    return V.setElements(elements);
	};

	// i, j, k unit vectors
	Vector.i = Vector.create([1, 0, 0]);
	Vector.j = Vector.create([0, 1, 0]);
	Vector.k = Vector.create([0, 0, 1]);

	// Random vector of size n
	Vector.Random = function(n) {
	    var elements = [];
	    while (n--) { elements.push(Math.random()); }
	    return Vector.create(elements);
	};

	Vector.Fill = function(n, v) {
	    var elements = [];
	    while (n--) { elements.push(v); }
	    return Vector.create(elements);
	};

	// Vector filled with zeros
	Vector.Zero = function(n) {
	    return Vector.Fill(n, 0);
	};

	Vector.One = function(n) {
	    return Vector.Fill(n, 1);
	};

	Vector.log = function(v) {
	    return v.map(function(x) {
		return Math.log(x);
	    });
	};

	module.exports = Vector;


/***/ },
/* 9 */
/***/ function(module, exports) {

	// Copyright (c) 2011, Chris Umbel, James Coglan
	// This file is required in order for any other classes to work. Some Vector methods work with the
	// other Sylvester classes and are useless unless they are included. Other classes such as Line and
	// Plane will not function at all without Vector being loaded first.           

	Math.sign = function(x) {
	    return x < 0 ? -1: 1;
	}
	                                              
	var Sylvester = {
	    precision: 1e-6,
	    approxPrecision: 1e-5
	};

	module.exports = Sylvester;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (c) 2011, Chris Umbel, James Coglan
	// Matrix class - depends on Vector.

	var fs = __webpack_require__(11);
	var Sylvester = __webpack_require__(9);
	var Vector = __webpack_require__(8);

	// augment a matrix M with identity rows/cols
	function identSize(M, m, n, k) {
	    var e = M.elements;
	    var i = k - 1;

	    while(i--) {
		var row = [];
		
		for(var j = 0; j < n; j++)
		    row.push(j == i ? 1 : 0);
		
	        e.unshift(row);
	    }
	    
	    for(var i = k - 1; i < m; i++) {
	        while(e[i].length < n)
	            e[i].unshift(0);
	    }

	    return $M(e);
	}

	function pca(X) {
	    var Sigma = X.transpose().x(X).x(1 / X.rows());
	    var svd = Sigma.svd();
	    return {U: svd.U, S: svd.S};
	}

	// singular value decomposition in pure javascript
	function svdJs() {
	    var A = this;
	    var V = Matrix.I(A.rows());
	    var S = A.transpose();
	    var U = Matrix.I(A.cols());
	    var err = Number.MAX_VALUE;
	    var i = 0;
	    var maxLoop = 100;

	    while(err > 2.2737e-13 && i < maxLoop) {
	        var qr = S.transpose().qrJs();
	        S = qr.R;
	        V = V.x(qr.Q);
	        qr = S.transpose().qrJs();
	        U = U.x(qr.Q);
	        S = qr.R;

	        var e = S.triu(1).unroll().norm();
	        var f = S.diagonal().norm();

	        if(f == 0)
	            f = 1;

	        err = e / f;

	        i++;
	    }

	    var ss = S.diagonal();
	    var s = [];

	    for(var i = 1; i <= ss.cols(); i++) {
	        var ssn = ss.e(i);
	        s.push(Math.abs(ssn));

	        if(ssn < 0) {
	            for(var j = 0; j < U.rows(); j++) {
	                V.elements[j][i - 1] = -(V.elements[j][i - 1]);
	            }
	        }
	    }

	    return {U: U, S: $V(s).toDiagonalMatrix(), V: V};
	}

	// singular value decomposition using LAPACK
	function svdPack() {
	    var result = lapack.sgesvd('A', 'A', this.elements);

	    return {
	        U: $M(result.U),
	        S: $M(result.S).column(1).toDiagonalMatrix(),
		V: $M(result.VT).transpose()
	    };
	}

	// QR decomposition in pure javascript
	function qrJs() {
	    var m = this.rows();
	    var n = this.cols();
	    var Q = Matrix.I(m);
	    var A = this;
	    
	    for(var k = 1; k < Math.min(m, n); k++) {
		var ak = A.slice(k, 0, k, k).col(1);
		var oneZero = [1];
		
		while(oneZero.length <=  m - k)
		    oneZero.push(0);
		
		oneZero = $V(oneZero);
		var vk = ak.add(oneZero.x(ak.norm() * Math.sign(ak.e(1))));
		var Vk = $M(vk);
		var Hk = Matrix.I(m - k + 1).subtract(Vk.x(2).x(Vk.transpose()).div(Vk.transpose().x(Vk).e(1, 1)));
		var Qk = identSize(Hk, m, n, k);
		A = Qk.x(A);
		// slow way to compute Q
		Q = Q.x(Qk);
	    }
	    
	    return {Q: Q, R: A};
	}

	// QR decomposition using LAPACK
	function qrPack() {
	    var qr = lapack.qr(this.elements);

	    return {
		Q: $M(qr.Q),
		R: $M(qr.R)
	    };
	}

	function Matrix() {}
	Matrix.prototype = {
	    // solve a system of linear equations (work in progress)
	    solve: function(b) {
		var lu = this.lu();
		b = lu.P.x(b);
		var y = lu.L.forwardSubstitute(b);
		var x = lu.U.backSubstitute(y);
		return lu.P.x(x);
		//return this.inv().x(b);
	    },

	    // project a matrix onto a lower dim
	    pcaProject: function(k, U) {
		var U = U || pca(this).U;
		var Ureduce= U.slice(1, U.rows(), 1, k);
		return {Z: this.x(Ureduce), U: U};
	    },

	    // recover a matrix to a higher dimension
	    pcaRecover: function(U) {
		var k = this.cols();
		var Ureduce = U.slice(1, U.rows(), 1, k);
		return this.x(Ureduce.transpose());
	    },    

	    // grab the upper triangular part of the matrix
	    triu: function(k) {
		if(!k)
		    k = 0;
		
		return this.map(function(x, i, j) {
		    return j - i >= k ? x : 0;
		});
	    },

	    // unroll a matrix into a vector
	    unroll: function() {
		var v = [];
		
		for(var i = 1; i <= this.cols(); i++) {
		    for(var j = 1; j <= this.rows(); j++) {
			v.push(this.e(j, i));
		    }
		}

		return $V(v);
	    },

	    // return a sub-block of the matrix
	    slice: function(startRow, endRow, startCol, endCol) {
		var x = [];
		
		if(endRow == 0)
		    endRow = this.rows();
		
		if(endCol == 0)
		    endCol = this.cols();

		for(i = startRow; i <= endRow; i++) {
		    var row = [];

		    for(j = startCol; j <= endCol; j++) {
			row.push(this.e(i, j));
		    }

		    x.push(row);
		}

		return $M(x);
	    },

	    // Returns element (i,j) of the matrix
	    e: function(i,j) {
		if (i < 1 || i > this.elements.length || j < 1 || j > this.elements[0].length) { return null; }
		return this.elements[i - 1][j - 1];
	    },

	    // Returns row k of the matrix as a vector
	    row: function(i) {
		if (i > this.elements.length) { return null; }
		return $V(this.elements[i - 1]);
	    },

	    // Returns column k of the matrix as a vector
	    col: function(j) {
		if (j > this.elements[0].length) { return null; }
		var col = [], n = this.elements.length;
		for (var i = 0; i < n; i++) { col.push(this.elements[i][j - 1]); }
		return $V(col);
	    },

	    // Returns the number of rows/columns the matrix has
	    dimensions: function() {
		return {rows: this.elements.length, cols: this.elements[0].length};
	    },

	    // Returns the number of rows in the matrix
	    rows: function() {
		return this.elements.length;
	    },

	    // Returns the number of columns in the matrix
	    cols: function() {
		return this.elements[0].length;
	    },

	    approxEql: function(matrix) {
		return this.eql(matrix, Sylvester.approxPrecision);
	    },

	    // Returns true iff the matrix is equal to the argument. You can supply
	    // a vector as the argument, in which case the receiver must be a
	    // one-column matrix equal to the vector.
	    eql: function(matrix, precision) {
		var M = matrix.elements || matrix;
		if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
		if (this.elements.length != M.length ||
	            this.elements[0].length != M[0].length) { return false; }
		var i = this.elements.length, nj = this.elements[0].length, j;
		while (i--) { j = nj;
			      while (j--) {
				  if (Math.abs(this.elements[i][j] - M[i][j]) > (precision || Sylvester.precision)) { return false; }
			      }
			    }
		return true;
	    },

	    // Returns a copy of the matrix
	    dup: function() {
		return Matrix.create(this.elements);
	    },

	    // Maps the matrix to another matrix (of the same dimensions) according to the given function
	    map: function(fn) {
	    var els = [], i = this.elements.length, nj = this.elements[0].length, j;
		while (i--) { j = nj;
			      els[i] = [];
			      while (j--) {
				  els[i][j] = fn(this.elements[i][j], i + 1, j + 1);
			      }
			    }
		return Matrix.create(els);
	    },

	    // Returns true iff the argument has the same dimensions as the matrix
	    isSameSizeAs: function(matrix) {
		var M = matrix.elements || matrix;
		if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
		return (this.elements.length == M.length &&
			this.elements[0].length == M[0].length);
	    },

	    // Returns the result of adding the argument to the matrix
	    add: function(matrix) {
		if(typeof(matrix) == 'number') {
		    return this.map(function(x, i, j) { return x + matrix});
		} else {
		    var M = matrix.elements || matrix;
		    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
		    if (!this.isSameSizeAs(M)) { return null; }
		    return this.map(function(x, i, j) { return x + M[i - 1][j - 1]; });
		}
	    },

	    // Returns the result of subtracting the argument from the matrix
	    subtract: function(matrix) {
		if(typeof(matrix) == 'number') {
		    return this.map(function(x, i, j) { return x - matrix});
		} else {
		    var M = matrix.elements || matrix;
		    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
		    if (!this.isSameSizeAs(M)) { return null; }
		    return this.map(function(x, i, j) { return x - M[i - 1][j - 1]; });
		}
	    },

	    // Returns true iff the matrix can multiply the argument from the left
	    canMultiplyFromLeft: function(matrix) {
		var M = matrix.elements || matrix;
		if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
		// this.columns should equal matrix.rows
		return (this.elements[0].length == M.length);
	    },

	    // Returns the result of a multiplication-style operation the matrix from the right by the argument.
	    // If the argument is a scalar then just operate on all the elements. If the argument is
	    // a vector, a vector is returned, which saves you having to remember calling
	    // col(1) on the result.
	    mulOp: function(matrix, op) {
		if (!matrix.elements) {
		    return this.map(function(x) { return op(x, matrix); });
		}

		var returnVector = matrix.modulus ? true : false;
		var M = matrix.elements || matrix;
		if (typeof(M[0][0]) == 'undefined') 
		    M = Matrix.create(M).elements;
		if (!this.canMultiplyFromLeft(M)) 
		    return null; 
		var e = this.elements, rowThis, rowElem, elements = [],
	        sum, m = e.length, n = M[0].length, o = e[0].length, i = m, j, k;

		while (i--) {
	            rowElem = [];
	            rowThis = e[i];
	            j = n;

	            while (j--) {
			sum = 0;
			k = o;

			while (k--) {
	                    sum += op(rowThis[k], M[k][j]);
			}

			rowElem[j] = sum;
	            }

	            elements[i] = rowElem;
		}

		var M = Matrix.create(elements);
		return returnVector ? M.col(1) : M;
	    },

	    // Returns the result of dividing the matrix from the right by the argument.
	    // If the argument is a scalar then just divide all the elements. If the argument is
	    // a vector, a vector is returned, which saves you having to remember calling
	    // col(1) on the result.
	    div: function(matrix) {
		return this.mulOp(matrix, function(x, y) { return x / y});
	    },

	    // Returns the result of multiplying the matrix from the right by the argument.
	    // If the argument is a scalar then just multiply all the elements. If the argument is
	    // a vector, a vector is returned, which saves you having to remember calling
	    // col(1) on the result.
	    multiply: function(matrix) {
		return this.mulOp(matrix, function(x, y) { return x * y});
	    },

	    x: function(matrix) { return this.multiply(matrix); },

	    elementMultiply: function(v) {
	        return this.map(function(k, i, j) {
	            return v.e(i, j) * k;
	        });
	    },

	    // sum all elements in the matrix
	    sum: function() {
	        var sum = 0;

	        this.map(function(x) { sum += x;});

	        return sum;
	    },

	    // Returns a Vector of each colum averaged.
	    mean: function() {
	      var dim = this.dimensions();
	      var r = [];
	      for (var i = 1; i <= dim.cols; i++) {
	        r.push(this.col(i).sum() / dim.rows);
	      }
	      return $V(r);
	    },

	    column: function(n) {
		return this.col(n);
	    },

	    // element-wise log
	    log: function() {
		return this.map(function(x) { return Math.log(x); });
	    },

	    // Returns a submatrix taken from the matrix
	    // Argument order is: start row, start col, nrows, ncols
	    // Element selection wraps if the required index is outside the matrix's bounds, so you could
	    // use this to perform row/column cycling or copy-augmenting.
	    minor: function(a, b, c, d) {
		var elements = [], ni = c, i, nj, j;
		var rows = this.elements.length, cols = this.elements[0].length;
		while (ni--) {
		    i = c - ni - 1;
		    elements[i] = [];
		    nj = d;
		    while (nj--) {
			j = d - nj - 1;
			elements[i][j] = this.elements[(a + i - 1) % rows][(b + j - 1) % cols];
		    }
		}
		return Matrix.create(elements);
	    },

	    // Returns the transpose of the matrix
	    transpose: function() {
	    var rows = this.elements.length, i, cols = this.elements[0].length, j;
		var elements = [], i = cols;
		while (i--) {
		    j = rows;
		    elements[i] = [];
		    while (j--) {
			elements[i][j] = this.elements[j][i];
		    }
		}
		return Matrix.create(elements);
	    },

	    // Returns true iff the matrix is square
	    isSquare: function() {
		return (this.elements.length == this.elements[0].length);
	    },

	    // Returns the (absolute) largest element of the matrix
	    max: function() {
		var m = 0, i = this.elements.length, nj = this.elements[0].length, j;
		while (i--) {
		    j = nj;
		    while (j--) {
			if (Math.abs(this.elements[i][j]) > Math.abs(m)) { m = this.elements[i][j]; }
		    }
		}
		return m;
	    },

	    // Returns the indeces of the first match found by reading row-by-row from left to right
	    indexOf: function(x) {
		var index = null, ni = this.elements.length, i, nj = this.elements[0].length, j;
		for (i = 0; i < ni; i++) {
		    for (j = 0; j < nj; j++) {
			if (this.elements[i][j] == x) { return {i: i + 1, j: j + 1}; }
		    }
		}
		return null;
	    },

	    // If the matrix is square, returns the diagonal elements as a vector.
	    // Otherwise, returns null.
	    diagonal: function() {
		if (!this.isSquare) { return null; }
		var els = [], n = this.elements.length;
		for (var i = 0; i < n; i++) {
		    els.push(this.elements[i][i]);
		}
		return $V(els);
	    },

	    // Make the matrix upper (right) triangular by Gaussian elimination.
	    // This method only adds multiples of rows to other rows. No rows are
	    // scaled up or switched, and the determinant is preserved.
	    toRightTriangular: function() {
		var M = this.dup(), els;
		var n = this.elements.length, i, j, np = this.elements[0].length, p;
		for (i = 0; i < n; i++) {
		    if (M.elements[i][i] == 0) {
			for (j = i + 1; j < n; j++) {
			    if (M.elements[j][i] != 0) {
				els = [];
				for (p = 0; p < np; p++) { els.push(M.elements[i][p] + M.elements[j][p]); }
				M.elements[i] = els;
				break;
			    }
			}
		    }
		    if (M.elements[i][i] != 0) {
			for (j = i + 1; j < n; j++) {
			    var multiplier = M.elements[j][i] / M.elements[i][i];
			    els = [];
			    for (p = 0; p < np; p++) {
				// Elements with column numbers up to an including the number
				// of the row that we're subtracting can safely be set straight to
				// zero, since that's the point of this routine and it avoids having
				// to loop over and correct rounding errors later
				els.push(p <= i ? 0 : M.elements[j][p] - M.elements[i][p] * multiplier);
			    }
			    M.elements[j] = els;
			}
		    }
		}
		return M;
	    },

	    toUpperTriangular: function() { return this.toRightTriangular(); },

	    // Returns the determinant for square matrices
	    determinant: function() {
		if (!this.isSquare()) { return null; }
		if (this.cols == 1 && this.rows == 1) { return this.row(1); }
		if (this.cols == 0 && this.rows == 0) { return 1; }
		var M = this.toRightTriangular();
		var det = M.elements[0][0], n = M.elements.length;
		for (var i = 1; i < n; i++) {
		    det = det * M.elements[i][i];
		}
		return det;
	    },
	    det: function() { return this.determinant(); },

	    // Returns true iff the matrix is singular
	    isSingular: function() {
		return (this.isSquare() && this.determinant() === 0);
	    },

	    // Returns the trace for square matrices
	    trace: function() {
		if (!this.isSquare()) { return null; }
		var tr = this.elements[0][0], n = this.elements.length;
		for (var i = 1; i < n; i++) {
		    tr += this.elements[i][i];
		}
		return tr;
	    },

	    tr: function() { return this.trace(); },

	    // Returns the rank of the matrix
	    rank: function() {
		var M = this.toRightTriangular(), rank = 0;
		var i = this.elements.length, nj = this.elements[0].length, j;
		while (i--) {
		    j = nj;
		    while (j--) {
			if (Math.abs(M.elements[i][j]) > Sylvester.precision) { rank++; break; }
		    }
		}
		return rank;
	    },

	    rk: function() { return this.rank(); },

	    // Returns the result of attaching the given argument to the right-hand side of the matrix
	    augment: function(matrix) {
		var M = matrix.elements || matrix;
		if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
		var T = this.dup(), cols = T.elements[0].length;
		var i = T.elements.length, nj = M[0].length, j;
		if (i != M.length) { return null; }
		while (i--) {
		    j = nj;
		    while (j--) {
			T.elements[i][cols + j] = M[i][j];
		    }
		}
		return T;
	    },

	    // Returns the inverse (if one exists) using Gauss-Jordan
	    inverse: function() {
		if (!this.isSquare() || this.isSingular()) { return null; }
		var n = this.elements.length, i = n, j;
		var M = this.augment(Matrix.I(n)).toRightTriangular();
		var np = M.elements[0].length, p, els, divisor;
		var inverse_elements = [], new_element;
		// Matrix is non-singular so there will be no zeros on the diagonal
		// Cycle through rows from last to first
		while (i--) {
		    // First, normalise diagonal elements to 1
		    els = [];
		    inverse_elements[i] = [];
		    divisor = M.elements[i][i];
		    for (p = 0; p < np; p++) {
	        new_element = M.elements[i][p] / divisor;
			els.push(new_element);
			// Shuffle off the current row of the right hand side into the results
			// array as it will not be modified by later runs through this loop
			if (p >= n) { inverse_elements[i].push(new_element); }
		    }
		    M.elements[i] = els;
		    // Then, subtract this row from those above it to
		    // give the identity matrix on the left hand side
		    j = i;
		    while (j--) {
			els = [];
			for (p = 0; p < np; p++) {
			    els.push(M.elements[j][p] - M.elements[i][p] * M.elements[j][i]);
			}
			M.elements[j] = els;
		    }
		}
		return Matrix.create(inverse_elements);
	    },

	    inv: function() { return this.inverse(); },

	    // Returns the result of rounding all the elements
	    round: function() {
		return this.map(function(x) { return Math.round(x); });
	    },

	    // Returns a copy of the matrix with elements set to the given value if they
	    // differ from it by less than Sylvester.precision
	    snapTo: function(x) {
		return this.map(function(p) {
		    return (Math.abs(p - x) <= Sylvester.precision) ? x : p;
		});
	    },

	    // Returns a string representation of the matrix
	    inspect: function() {
		var matrix_rows = [];
		var n = this.elements.length;
		for (var i = 0; i < n; i++) {
		    matrix_rows.push($V(this.elements[i]).inspect());
		}
		return matrix_rows.join('\n');
	    },

	    // Returns a array representation of the matrix
	    toArray: function() {
	    	var matrix_rows = [];
	    	var n = this.elements.length;
	    	for (var i = 0; i < n; i++) {
	        matrix_rows.push(this.elements[i]);
	    	}
	      return matrix_rows;
	    },


	    // Set the matrix's elements from an array. If the argument passed
	    // is a vector, the resulting matrix will be a single column.
	    setElements: function(els) {
		var i, j, elements = els.elements || els;
		if (typeof(elements[0][0]) != 'undefined') {
		    i = elements.length;
		    this.elements = [];
		    while (i--) {
			j = elements[i].length;
			this.elements[i] = [];
			while (j--) {
			    this.elements[i][j] = elements[i][j];
			}
		    }
		    return this;
		}
		var n = elements.length;
		this.elements = [];
		for (i = 0; i < n; i++) {
		    this.elements.push([elements[i]]);
		}
		return this;
	    },

	    // return the indexes of the columns with the largest value
	    // for each row
	    maxColumnIndexes: function() {
		var maxes = [];

		for(var i = 1; i <= this.rows(); i++) {
		    var max = null;
		    var maxIndex = -1;

		    for(var j = 1; j <= this.cols(); j++) {
			if(max === null || this.e(i, j) > max) {
			    max = this.e(i, j);
			    maxIndex = j;
			}
		    }

		    maxes.push(maxIndex);
		}

		return $V(maxes);
	    },

	    // return the largest values in each row
	    maxColumns: function() {
		var maxes = [];

		for(var i = 1; i <= this.rows(); i++) {
		    var max = null;

		    for(var j = 1; j <= this.cols(); j++) {
			if(max === null || this.e(i, j) > max) {
			    max = this.e(i, j);
			}
		    }

		    maxes.push(max);
		}

		return $V(maxes);
	    },

	    // return the indexes of the columns with the smallest values
	    // for each row
	    minColumnIndexes: function() {
		var mins = [];

		for(var i = 1; i <= this.rows(); i++) {
		    var min = null;
		    var minIndex = -1;

		    for(var j = 1; j <= this.cols(); j++) {
			if(min === null || this.e(i, j) < min) {
			    min = this.e(i, j);
			    minIndex = j;
			}
		    }

		    mins.push(minIndex);
		}

		return $V(mins);
	    },

	    // return the smallest values in each row
	    minColumns: function() {
		var mins = [];

		for(var i = 1; i <= this.rows(); i++) {
		    var min = null;

		    for(var j = 1; j <= this.cols(); j++) {
			if(min === null || this.e(i, j) < min) {
			    min = this.e(i, j);
			}
		    }

		    mins.push(min);
		}

		return $V(mins);
	    },
	    
	    // perorm a partial pivot on the matrix. essentially move the largest
	    // row below-or-including the pivot and replace the pivot's row with it.
	    // a pivot matrix is returned so multiplication can perform the transform.
	    partialPivot: function(k, j, P, A, L) {
		var maxIndex = 0;
		var maxValue = 0;

		for(var i = k; i <= A.rows(); i++) {
		    if(Math.abs(A.e(i, j)) > maxValue) {
			maxValue = Math.abs(A.e(k, j));
			maxIndex = i;
		    }
		}

		if(maxIndex != k) {
		    var tmp = A.elements[k - 1];
		    A.elements[k - 1] = A.elements[maxIndex - 1];
		    A.elements[maxIndex - 1] = tmp;
		    
		    P.elements[k - 1][k - 1] = 0;
		    P.elements[k - 1][maxIndex - 1] = 1;
		    P.elements[maxIndex - 1][maxIndex - 1] = 0;
		    P.elements[maxIndex - 1][k - 1] = 1;
		}
		
		return P;
	    },

	    // solve lower-triangular matrix * x = b via forward substitution
	    forwardSubstitute: function(b) {
		var xa = [];

		for(var i = 1; i <= this.rows(); i++) {
		    var w = 0;

		    for(var j = 1; j < i; j++) {
			w += this.e(i, j) * xa[j - 1];
		    }

		    xa.push((b.e(i) - w) / this.e(i, i));
		}

		return $V(xa);
	    },

	    // solve an upper-triangular matrix * x = b via back substitution
	    backSubstitute: function(b) {
		var xa = [];

		for(var i = this.rows(); i > 0; i--) {
		    var w = 0;

		    for(var j = this.cols(); j > i; j--) {
			w += this.e(i, j) * xa[this.rows() - j];
		    }

		    xa.push((b.e(i) - w) / this.e(i, i));
		}

		return $V(xa.reverse());
	    },
	    
	    luPack: luPack,
	    luJs: luJs,
	    svdJs: svdJs,
	    svdPack: svdPack,
	    qrJs: qrJs,
	    qrPack: qrPack
	};

	// LU factorization from LAPACK
	function luPack() {
	    var lu = lapack.lu(this.elements);
	    return {
		L: $M(lu.L),
		U: $M(lu.U),
		P: $M(lu.P)
		// don't pass back IPIV
	    };
	}

	var tolerance =  1.4901e-08;

	// pure Javascript LU factorization
	function luJs() {
	    var A = this.dup();
	    var L = Matrix.I(A.rows());
	    var P = Matrix.I(A.rows());
	    var U = Matrix.Zeros(A.rows(), A.cols());
	    var p = 1;

	    for(var k = 1; k <= Math.min(A.cols(), A.rows()); k++) {
		P = A.partialPivot(k, p, P, A, L);
		
		for(var i = k + 1; i <= A.rows(); i++) {
		    var l = A.e(i, p) / A.e(k, p);
		    L.elements[i - 1][k - 1] = l;
		    
		    for(var j = k + 1 ; j <= A.cols(); j++) {
			A.elements[i - 1][j - 1] -= A.e(k, j) * l;
		    }
		}
		
		for(var j = k; j <= A.cols(); j++) {
		    U.elements[k - 1][j - 1] = A.e(k, j);
		}

		if(p < A.cols())
		    p++;
	    }    
	    
	    return {L: L, U: U, P: P};
	}

	function getLapack() {
	    try {
		return __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"lapack\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    } catch(e) {}
	}

	var lapack;

	// if node-lapack is installed use the fast, native fortran routines
	if(lapack = getLapack()) {
	    Matrix.prototype.svd = svdPack;
	    Matrix.prototype.qr = qrPack;
	    Matrix.prototype.lu = luPack;
	} else {
	    // otherwise use the slower pure Javascript versions
	    Matrix.prototype.svd = svdJs;
	    Matrix.prototype.qr = qrJs;
	    Matrix.prototype.lu = luJs;
	}

	// Constructor function
	Matrix.create = function(aElements, ignoreLapack) {
	    var M = new Matrix().setElements(aElements);
	    return M;
	};

	// Identity matrix of size n
	Matrix.I = function(n) {
	    var els = [], i = n, j;
	    while (i--) {
		j = n;
		els[i] = [];
		while (j--) {
		    els[i][j] = (i == j) ? 1 : 0;
		}
	    }
	    return Matrix.create(els);
	};

	Matrix.loadFile = function(file) {
	    var contents = fs.readFileSync(file, 'utf-8');
	    var matrix = [];

	    var rowArray = contents.split('\n');
	    for (var i = 0; i < rowArray.length; i++) {
		var d = rowArray[i].split(',');
		if (d.length > 1) {
		    matrix.push(d);
		}
	    }

	    var M = new Matrix();
	    return M.setElements(matrix);
	};

	// Diagonal matrix - all off-diagonal elements are zero
	Matrix.Diagonal = function(elements) {
	    var i = elements.length;
	    var M = Matrix.I(i);
	    while (i--) {
		M.elements[i][i] = elements[i];
	    }
	    return M;
	};

	// Rotation matrix about some axis. If no axis is
	// supplied, assume we're after a 2D transform
	Matrix.Rotation = function(theta, a) {
	    if (!a) {
		return Matrix.create([
		    [Math.cos(theta), -Math.sin(theta)],
		    [Math.sin(theta), Math.cos(theta)]
		]);
	    }
	    var axis = a.dup();
	    if (axis.elements.length != 3) { return null; }
	    var mod = axis.modulus();
	    var x = axis.elements[0] / mod, y = axis.elements[1] / mod, z = axis.elements[2] / mod;
	    var s = Math.sin(theta), c = Math.cos(theta), t = 1 - c;
	    // Formula derived here: http://www.gamedev.net/reference/articles/article1199.asp
	    // That proof rotates the co-ordinate system so theta
	    // becomes -theta and sin becomes -sin here.
	    return Matrix.create([
		[t * x * x + c, t * x * y - s * z, t * x * z + s * y],
		[t * x * y + s * z, t * y * y + c, t * y * z - s * x],
		[t * x * z - s * y, t * y * z + s * x, t * z * z + c]
	    ]);
	};

	// Special case rotations
	Matrix.RotationX = function(t) {
	    var c = Math.cos(t), s = Math.sin(t);
	    return Matrix.create([
		[1, 0, 0],
		[0, c, -s],
		[0, s, c]
	    ]);
	};

	Matrix.RotationY = function(t) {
	    var c = Math.cos(t), s = Math.sin(t);
	    return Matrix.create([
		[c, 0, s],
		[0, 1, 0],
		[-s, 0, c]
	    ]);
	};

	Matrix.RotationZ = function(t) {
	    var c = Math.cos(t), s = Math.sin(t);
	    return Matrix.create([
		[c, -s, 0],
		[s, c, 0],
		[0, 0, 1]
	    ]);
	};

	// Random matrix of n rows, m columns
	Matrix.Random = function(n, m) {
	    if (arguments.length === 1) m = n;
	    return Matrix.Zero(n, m).map(
		function() { return Math.random(); }
	  );
	};

	Matrix.Fill = function(n, m, v) {
	    if (arguments.length === 2) {
		v = m;
		m = n;
	    }

	    var els = [], i = n, j;

	    while (i--) {
		j = m;
		els[i] = [];

		while (j--) {
		    els[i][j] = v;
		}
	    }

	    return Matrix.create(els);
	};

	// Matrix filled with zeros
	Matrix.Zero = function(n, m) {
	    return Matrix.Fill(n, m, 0);
	};

	// Matrix filled with zeros
	Matrix.Zeros = function(n, m) {
	    return Matrix.Zero(n, m);
	};

	// Matrix filled with ones
	Matrix.One = function(n, m) {
	    return Matrix.Fill(n, m, 1);
	};

	// Matrix filled with ones
	Matrix.Ones = function(n, m) {
	    return Matrix.One(n, m);
	};

	module.exports = Matrix;


/***/ },
/* 11 */
/***/ function(module, exports) {

	console.log("I'm `fs` modules");


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (c) 2011, Chris Umbel, James Coglan
	var Vector = __webpack_require__(8);
	var Matrix = __webpack_require__(10);
	var Plane = __webpack_require__(13);
	var Sylvester = __webpack_require__(9);

	// Line class - depends on Vector, and some methods require Matrix and Plane.

	function Line() {}
	Line.prototype = {

	  // Returns true if the argument occupies the same space as the line
	  eql: function(line) {
	    return (this.isParallelTo(line) && this.contains(line.anchor));
	  },

	  // Returns a copy of the line
	  dup: function() {
	    return Line.create(this.anchor, this.direction);
	  },

	  // Returns the result of translating the line by the given vector/array
	  translate: function(vector) {
	    var V = vector.elements || vector;
	    return Line.create([
	      this.anchor.elements[0] + V[0],
	      this.anchor.elements[1] + V[1],
	      this.anchor.elements[2] + (V[2] || 0)
	    ], this.direction);
	  },

	  // Returns true if the line is parallel to the argument. Here, 'parallel to'
	  // means that the argument's direction is either parallel or antiparallel to
	  // the line's own direction. A line is parallel to a plane if the two do not
	  // have a unique intersection.
	  isParallelTo: function(obj) {
	    if (obj.normal || (obj.start && obj.end)) { return obj.isParallelTo(this); }
	    var theta = this.direction.angleFrom(obj.direction);
	    return (Math.abs(theta) <= Sylvester.precision || Math.abs(theta - Math.PI) <= Sylvester.precision);
	  },

	  // Returns the line's perpendicular distance from the argument,
	  // which can be a point, a line or a plane
	  distanceFrom: function(obj) {
	    if (obj.normal || (obj.start && obj.end)) { return obj.distanceFrom(this); }
	    if (obj.direction) {
	      // obj is a line
	      if (this.isParallelTo(obj)) { return this.distanceFrom(obj.anchor); }
	      var N = this.direction.cross(obj.direction).toUnitVector().elements;
	      var A = this.anchor.elements, B = obj.anchor.elements;
	      return Math.abs((A[0] - B[0]) * N[0] + (A[1] - B[1]) * N[1] + (A[2] - B[2]) * N[2]);
	    } else {
	      // obj is a point
	      var P = obj.elements || obj;
	      var A = this.anchor.elements, D = this.direction.elements;
	      var PA1 = P[0] - A[0], PA2 = P[1] - A[1], PA3 = (P[2] || 0) - A[2];
	      var modPA = Math.sqrt(PA1*PA1 + PA2*PA2 + PA3*PA3);
	      if (modPA === 0) return 0;
	      // Assumes direction vector is normalized
	      var cosTheta = (PA1 * D[0] + PA2 * D[1] + PA3 * D[2]) / modPA;
	      var sin2 = 1 - cosTheta*cosTheta;
	      return Math.abs(modPA * Math.sqrt(sin2 < 0 ? 0 : sin2));
	    }
	  },

	  // Returns true iff the argument is a point on the line, or if the argument
	  // is a line segment lying within the receiver
	  contains: function(obj) {
	    if (obj.start && obj.end) { return this.contains(obj.start) && this.contains(obj.end); }
	    var dist = this.distanceFrom(obj);
	    return (dist !== null && dist <= Sylvester.precision);
	  },

	  // Returns the distance from the anchor of the given point. Negative values are
	  // returned for points that are in the opposite direction to the line's direction from
	  // the line's anchor point.
	  positionOf: function(point) {
	    if (!this.contains(point)) { return null; }
	    var P = point.elements || point;
	    var A = this.anchor.elements, D = this.direction.elements;
	    return (P[0] - A[0]) * D[0] + (P[1] - A[1]) * D[1] + ((P[2] || 0) - A[2]) * D[2];
	  },

	  // Returns true iff the line lies in the given plane
	  liesIn: function(plane) {
	    return plane.contains(this);
	  },

	  // Returns true iff the line has a unique point of intersection with the argument
	  intersects: function(obj) {
	    if (obj.normal) { return obj.intersects(this); }
	    return (!this.isParallelTo(obj) && this.distanceFrom(obj) <= Sylvester.precision);
	  },

	  // Returns the unique intersection point with the argument, if one exists
	  intersectionWith: function(obj) {
	    if (obj.normal || (obj.start && obj.end)) { return obj.intersectionWith(this); }
	    if (!this.intersects(obj)) { return null; }
	    var P = this.anchor.elements, X = this.direction.elements,
	        Q = obj.anchor.elements, Y = obj.direction.elements;
	    var X1 = X[0], X2 = X[1], X3 = X[2], Y1 = Y[0], Y2 = Y[1], Y3 = Y[2];
	    var PsubQ1 = P[0] - Q[0], PsubQ2 = P[1] - Q[1], PsubQ3 = P[2] - Q[2];
	    var XdotQsubP = - X1*PsubQ1 - X2*PsubQ2 - X3*PsubQ3;
	    var YdotPsubQ = Y1*PsubQ1 + Y2*PsubQ2 + Y3*PsubQ3;
	    var XdotX = X1*X1 + X2*X2 + X3*X3;
	    var YdotY = Y1*Y1 + Y2*Y2 + Y3*Y3;
	    var XdotY = X1*Y1 + X2*Y2 + X3*Y3;
	    var k = (XdotQsubP * YdotY / XdotX + XdotY * YdotPsubQ) / (YdotY - XdotY * XdotY);
	    return Vector.create([P[0] + k*X1, P[1] + k*X2, P[2] + k*X3]);
	  },

	  // Returns the point on the line that is closest to the given point or line/line segment
	  pointClosestTo: function(obj) {
	    if (obj.start && obj.end) {
	      // obj is a line segment
	      var P = obj.pointClosestTo(this);
	      return (P === null) ? null : this.pointClosestTo(P);
	    } else if (obj.direction) {
	      // obj is a line
	      if (this.intersects(obj)) { return this.intersectionWith(obj); }
	      if (this.isParallelTo(obj)) { return null; }
	      var D = this.direction.elements, E = obj.direction.elements;
	      var D1 = D[0], D2 = D[1], D3 = D[2], E1 = E[0], E2 = E[1], E3 = E[2];
	      // Create plane containing obj and the shared normal and intersect this with it
	      // Thank you: http://www.cgafaq.info/wiki/Line-line_distance
	      var x = (D3 * E1 - D1 * E3), y = (D1 * E2 - D2 * E1), z = (D2 * E3 - D3 * E2);
	      var N = [x * E3 - y * E2, y * E1 - z * E3, z * E2 - x * E1];
	      var P = Plane.create(obj.anchor, N);
	      return P.intersectionWith(this);
	    } else {
	      // obj is a point
	      var P = obj.elements || obj;
	      if (this.contains(P)) { return Vector.create(P); }
	      var A = this.anchor.elements, D = this.direction.elements;
	      var D1 = D[0], D2 = D[1], D3 = D[2], A1 = A[0], A2 = A[1], A3 = A[2];
	      var x = D1 * (P[1]-A2) - D2 * (P[0]-A1), y = D2 * ((P[2] || 0) - A3) - D3 * (P[1]-A2),
	          z = D3 * (P[0]-A1) - D1 * ((P[2] || 0) - A3);
	      var V = Vector.create([D2 * x - D3 * z, D3 * y - D1 * x, D1 * z - D2 * y]);
	      var k = this.distanceFrom(P) / V.modulus();
	      return Vector.create([
	        P[0] + V.elements[0] * k,
	        P[1] + V.elements[1] * k,
	        (P[2] || 0) + V.elements[2] * k
	      ]);
	    }
	  },

	  // Returns a copy of the line rotated by t radians about the given line. Works by
	  // finding the argument's closest point to this line's anchor point (call this C) and
	  // rotating the anchor about C. Also rotates the line's direction about the argument's.
	  // Be careful with this - the rotation axis' direction affects the outcome!
	  rotate: function(t, line) {
	    // If we're working in 2D
	    if (typeof(line.direction) == 'undefined') { line = Line.create(line.to3D(), Vector.k); }
	    var R = Matrix.Rotation(t, line.direction).elements;
	    var C = line.pointClosestTo(this.anchor).elements;
	    var A = this.anchor.elements, D = this.direction.elements;
	    var C1 = C[0], C2 = C[1], C3 = C[2], A1 = A[0], A2 = A[1], A3 = A[2];
	    var x = A1 - C1, y = A2 - C2, z = A3 - C3;
	    return Line.create([
	      C1 + R[0][0] * x + R[0][1] * y + R[0][2] * z,
	      C2 + R[1][0] * x + R[1][1] * y + R[1][2] * z,
	      C3 + R[2][0] * x + R[2][1] * y + R[2][2] * z
	    ], [
	      R[0][0] * D[0] + R[0][1] * D[1] + R[0][2] * D[2],
	      R[1][0] * D[0] + R[1][1] * D[1] + R[1][2] * D[2],
	      R[2][0] * D[0] + R[2][1] * D[1] + R[2][2] * D[2]
	    ]);
	  },

	  // Returns a copy of the line with its direction vector reversed.
	  // Useful when using lines for rotations.
	  reverse: function() {
	    return Line.create(this.anchor, this.direction.x(-1));
	  },

	  // Returns the line's reflection in the given point or line
	  reflectionIn: function(obj) {
	    if (obj.normal) {
	      // obj is a plane
	      var A = this.anchor.elements, D = this.direction.elements;
	      var A1 = A[0], A2 = A[1], A3 = A[2], D1 = D[0], D2 = D[1], D3 = D[2];
	      var newA = this.anchor.reflectionIn(obj).elements;
	      // Add the line's direction vector to its anchor, then mirror that in the plane
	      var AD1 = A1 + D1, AD2 = A2 + D2, AD3 = A3 + D3;
	      var Q = obj.pointClosestTo([AD1, AD2, AD3]).elements;
	      var newD = [Q[0] + (Q[0] - AD1) - newA[0], Q[1] + (Q[1] - AD2) - newA[1], Q[2] + (Q[2] - AD3) - newA[2]];
	      return Line.create(newA, newD);
	    } else if (obj.direction) {
	      // obj is a line - reflection obtained by rotating PI radians about obj
	      return this.rotate(Math.PI, obj);
	    } else {
	      // obj is a point - just reflect the line's anchor in it
	      var P = obj.elements || obj;
	      return Line.create(this.anchor.reflectionIn([P[0], P[1], (P[2] || 0)]), this.direction);
	    }
	  },

	  // Set the line's anchor point and direction.
	  setVectors: function(anchor, direction) {
	    // Need to do this so that line's properties are not
	    // references to the arguments passed in
	    anchor = Vector.create(anchor);
	    direction = Vector.create(direction);
	    if (anchor.elements.length == 2) {anchor.elements.push(0); }
	    if (direction.elements.length == 2) { direction.elements.push(0); }
	    if (anchor.elements.length > 3 || direction.elements.length > 3) { return null; }
	    var mod = direction.modulus();
	    if (mod === 0) { return null; }
	    this.anchor = anchor;
	    this.direction = Vector.create([
	      direction.elements[0] / mod,
	      direction.elements[1] / mod,
	      direction.elements[2] / mod
	    ]);
	    return this;
	  }
	};

	// Constructor function
	Line.create = function(anchor, direction) {
	  var L = new Line();
	  return L.setVectors(anchor, direction);
	};

	// Axes
	Line.X = Line.create(Vector.Zero(3), Vector.i);
	Line.Y = Line.create(Vector.Zero(3), Vector.j);
	Line.Z = Line.create(Vector.Zero(3), Vector.k);

	module.exports = Line;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (c) 2011, Chris Umbel, James Coglan
	// Plane class - depends on Vector. Some methods require Matrix and Line.
	var Vector = __webpack_require__(8);
	var Matrix = __webpack_require__(10);
	var Line = __webpack_require__(12);

	var Sylvester = __webpack_require__(9);

	function Plane() {}
	Plane.prototype = {

	  // Returns true iff the plane occupies the same space as the argument
	  eql: function(plane) {
	    return (this.contains(plane.anchor) && this.isParallelTo(plane));
	  },

	  // Returns a copy of the plane
	  dup: function() {
	    return Plane.create(this.anchor, this.normal);
	  },

	  // Returns the result of translating the plane by the given vector
	  translate: function(vector) {
	    var V = vector.elements || vector;
	    return Plane.create([
	      this.anchor.elements[0] + V[0],
	      this.anchor.elements[1] + V[1],
	      this.anchor.elements[2] + (V[2] || 0)
	    ], this.normal);
	  },

	  // Returns true iff the plane is parallel to the argument. Will return true
	  // if the planes are equal, or if you give a line and it lies in the plane.
	  isParallelTo: function(obj) {
	    var theta;
	    if (obj.normal) {
	      // obj is a plane
	      theta = this.normal.angleFrom(obj.normal);
	      return (Math.abs(theta) <= Sylvester.precision || Math.abs(Math.PI - theta) <= Sylvester.precision);
	    } else if (obj.direction) {
	      // obj is a line
	      return this.normal.isPerpendicularTo(obj.direction);
	    }
	    return null;
	  },

	  // Returns true iff the receiver is perpendicular to the argument
	  isPerpendicularTo: function(plane) {
	    var theta = this.normal.angleFrom(plane.normal);
	    return (Math.abs(Math.PI/2 - theta) <= Sylvester.precision);
	  },

	  // Returns the plane's distance from the given object (point, line or plane)
	  distanceFrom: function(obj) {
	    if (this.intersects(obj) || this.contains(obj)) { return 0; }
	    if (obj.anchor) {
	      // obj is a plane or line
	      var A = this.anchor.elements, B = obj.anchor.elements, N = this.normal.elements;
	      return Math.abs((A[0] - B[0]) * N[0] + (A[1] - B[1]) * N[1] + (A[2] - B[2]) * N[2]);
	    } else {
	      // obj is a point
	      var P = obj.elements || obj;
	      var A = this.anchor.elements, N = this.normal.elements;
	      return Math.abs((A[0] - P[0]) * N[0] + (A[1] - P[1]) * N[1] + (A[2] - (P[2] || 0)) * N[2]);
	    }
	  },

	  // Returns true iff the plane contains the given point or line
	  contains: function(obj) {
	    if (obj.normal) { return null; }
	    if (obj.direction) {
	      return (this.contains(obj.anchor) && this.contains(obj.anchor.add(obj.direction)));
	    } else {
	      var P = obj.elements || obj;
	      var A = this.anchor.elements, N = this.normal.elements;
	      var diff = Math.abs(N[0]*(A[0] - P[0]) + N[1]*(A[1] - P[1]) + N[2]*(A[2] - (P[2] || 0)));
	      return (diff <= Sylvester.precision);
	    }
	  },

	  // Returns true iff the plane has a unique point/line of intersection with the argument
	  intersects: function(obj) {
	    if (typeof(obj.direction) == 'undefined' && typeof(obj.normal) == 'undefined') { return null; }
	    return !this.isParallelTo(obj);
	  },

	  // Returns the unique intersection with the argument, if one exists. The result
	  // will be a vector if a line is supplied, and a line if a plane is supplied.
	  intersectionWith: function(obj) {
	    if (!this.intersects(obj)) { return null; }
	    if (obj.direction) {
	      // obj is a line
	      var A = obj.anchor.elements, D = obj.direction.elements,
	          P = this.anchor.elements, N = this.normal.elements;
	      var multiplier = (N[0]*(P[0]-A[0]) + N[1]*(P[1]-A[1]) + N[2]*(P[2]-A[2])) / (N[0]*D[0] + N[1]*D[1] + N[2]*D[2]);
	      return Vector.create([A[0] + D[0]*multiplier, A[1] + D[1]*multiplier, A[2] + D[2]*multiplier]);
	    } else if (obj.normal) {
	      // obj is a plane
	      var direction = this.normal.cross(obj.normal).toUnitVector();
	      // To find an anchor point, we find one co-ordinate that has a value
	      // of zero somewhere on the intersection, and remember which one we picked
	      var N = this.normal.elements, A = this.anchor.elements,
	          O = obj.normal.elements, B = obj.anchor.elements;
	      var solver = Matrix.Zero(2,2), i = 0;
	      while (solver.isSingular()) {
	        i++;
	        solver = Matrix.create([
	          [ N[i%3], N[(i+1)%3] ],
	          [ O[i%3], O[(i+1)%3]  ]
	        ]);
	      }
	      // Then we solve the simultaneous equations in the remaining dimensions
	      var inverse = solver.inverse().elements;
	      var x = N[0]*A[0] + N[1]*A[1] + N[2]*A[2];
	      var y = O[0]*B[0] + O[1]*B[1] + O[2]*B[2];
	      var intersection = [
	        inverse[0][0] * x + inverse[0][1] * y,
	        inverse[1][0] * x + inverse[1][1] * y
	      ];
	      var anchor = [];
	      for (var j = 1; j <= 3; j++) {
	        // This formula picks the right element from intersection by
	        // cycling depending on which element we set to zero above
	        anchor.push((i == j) ? 0 : intersection[(j + (5 - i)%3)%3]);
	      }
	      return Line.create(anchor, direction);
	    }
	  },

	  // Returns the point in the plane closest to the given point
	  pointClosestTo: function(point) {
	    var P = point.elements || point;
	    var A = this.anchor.elements, N = this.normal.elements;
	    var dot = (A[0] - P[0]) * N[0] + (A[1] - P[1]) * N[1] + (A[2] - (P[2] || 0)) * N[2];
	    return Vector.create([P[0] + N[0] * dot, P[1] + N[1] * dot, (P[2] || 0) + N[2] * dot]);
	  },

	  // Returns a copy of the plane, rotated by t radians about the given line
	  // See notes on Line#rotate.
	  rotate: function(t, line) {
	    var R = t.determinant ? t.elements : Matrix.Rotation(t, line.direction).elements;
	    var C = line.pointClosestTo(this.anchor).elements;
	    var A = this.anchor.elements, N = this.normal.elements;
	    var C1 = C[0], C2 = C[1], C3 = C[2], A1 = A[0], A2 = A[1], A3 = A[2];
	    var x = A1 - C1, y = A2 - C2, z = A3 - C3;
	    return Plane.create([
	      C1 + R[0][0] * x + R[0][1] * y + R[0][2] * z,
	      C2 + R[1][0] * x + R[1][1] * y + R[1][2] * z,
	      C3 + R[2][0] * x + R[2][1] * y + R[2][2] * z
	    ], [
	      R[0][0] * N[0] + R[0][1] * N[1] + R[0][2] * N[2],
	      R[1][0] * N[0] + R[1][1] * N[1] + R[1][2] * N[2],
	      R[2][0] * N[0] + R[2][1] * N[1] + R[2][2] * N[2]
	    ]);
	  },

	  // Returns the reflection of the plane in the given point, line or plane.
	  reflectionIn: function(obj) {
	    if (obj.normal) {
	      // obj is a plane
	      var A = this.anchor.elements, N = this.normal.elements;
	      var A1 = A[0], A2 = A[1], A3 = A[2], N1 = N[0], N2 = N[1], N3 = N[2];
	      var newA = this.anchor.reflectionIn(obj).elements;
	      // Add the plane's normal to its anchor, then mirror that in the other plane
	      var AN1 = A1 + N1, AN2 = A2 + N2, AN3 = A3 + N3;
	      var Q = obj.pointClosestTo([AN1, AN2, AN3]).elements;
	      var newN = [Q[0] + (Q[0] - AN1) - newA[0], Q[1] + (Q[1] - AN2) - newA[1], Q[2] + (Q[2] - AN3) - newA[2]];
	      return Plane.create(newA, newN);
	    } else if (obj.direction) {
	      // obj is a line
	      return this.rotate(Math.PI, obj);
	    } else {
	      // obj is a point
	      var P = obj.elements || obj;
	      return Plane.create(this.anchor.reflectionIn([P[0], P[1], (P[2] || 0)]), this.normal);
	    }
	  },

	  // Sets the anchor point and normal to the plane. If three arguments are specified,
	  // the normal is calculated by assuming the three points should lie in the same plane.
	  // If only two are sepcified, the second is taken to be the normal. Normal vector is
	  // normalised before storage.
	  setVectors: function(anchor, v1, v2) {
	    anchor = Vector.create(anchor);
	    anchor = anchor.to3D(); if (anchor === null) { return null; }
	    v1 = Vector.create(v1);
	    v1 = v1.to3D(); if (v1 === null) { return null; }
	    if (typeof(v2) == 'undefined') {
	      v2 = null;
	    } else {
	      v2 = Vector.create(v2);
	      v2 = v2.to3D(); if (v2 === null) { return null; }
	    }
	    var A1 = anchor.elements[0], A2 = anchor.elements[1], A3 = anchor.elements[2];
	    var v11 = v1.elements[0], v12 = v1.elements[1], v13 = v1.elements[2];
	    var normal, mod;
	    if (v2 !== null) {
	      var v21 = v2.elements[0], v22 = v2.elements[1], v23 = v2.elements[2];
	      normal = Vector.create([
	        (v12 - A2) * (v23 - A3) - (v13 - A3) * (v22 - A2),
	        (v13 - A3) * (v21 - A1) - (v11 - A1) * (v23 - A3),
	        (v11 - A1) * (v22 - A2) - (v12 - A2) * (v21 - A1)
	      ]);
	      mod = normal.modulus();
	      if (mod === 0) { return null; }
	      normal = Vector.create([normal.elements[0] / mod, normal.elements[1] / mod, normal.elements[2] / mod]);
	    } else {
	      mod = Math.sqrt(v11*v11 + v12*v12 + v13*v13);
	      if (mod === 0) { return null; }
	      normal = Vector.create([v1.elements[0] / mod, v1.elements[1] / mod, v1.elements[2] / mod]);
	    }
	    this.anchor = anchor;
	    this.normal = normal;
	    return this;
	  }
	};

	// Constructor function
	Plane.create = function(anchor, v1, v2) {
	  var P = new Plane();
	  return P.setVectors(anchor, v1, v2);
	};

	// X-Y-Z planes
	Plane.XY = Plane.create(Vector.Zero(3), Vector.k);
	Plane.YZ = Plane.create(Vector.Zero(3), Vector.i);
	Plane.ZX = Plane.create(Vector.Zero(3), Vector.j);
	Plane.YX = Plane.XY; Plane.ZY = Plane.YZ; Plane.XZ = Plane.ZX;

	// Returns the plane containing the given points (can be arrays as
	// well as vectors). If the points are not coplanar, returns null.
	Plane.fromPoints = function(points) {
	  var np = points.length, list = [], i, P, n, N, A, B, C, D, theta, prevN, totalN = Vector.Zero(3);
	  for (i = 0; i < np; i++) {
	    P = Vector.create(points[i]).to3D();
	    if (P === null) { return null; }
	    list.push(P);
	    n = list.length;
	    if (n > 2) {
	      // Compute plane normal for the latest three points
	      A = list[n-1].elements; B = list[n-2].elements; C = list[n-3].elements;
	      N = Vector.create([
	        (A[1] - B[1]) * (C[2] - B[2]) - (A[2] - B[2]) * (C[1] - B[1]),
	        (A[2] - B[2]) * (C[0] - B[0]) - (A[0] - B[0]) * (C[2] - B[2]),
	        (A[0] - B[0]) * (C[1] - B[1]) - (A[1] - B[1]) * (C[0] - B[0])
	      ]).toUnitVector();
	      if (n > 3) {
	        // If the latest normal is not (anti)parallel to the previous one, we've strayed off the plane.
	        // This might be a slightly long-winded way of doing things, but we need the sum of all the normals
	        // to find which way the plane normal should point so that the points form an anticlockwise list.
	        theta = N.angleFrom(prevN);
	        if (theta !== null) {
	          if (!(Math.abs(theta) <= Sylvester.precision || Math.abs(theta - Math.PI) <= Sylvester.precision)) { return null; }
	        }
	      }
	      totalN = totalN.add(N);
	      prevN = N;
	    }
	  }
	  // We need to add in the normals at the start and end points, which the above misses out
	  A = list[1].elements; B = list[0].elements; C = list[n-1].elements; D = list[n-2].elements;
	  totalN = totalN.add(Vector.create([
	    (A[1] - B[1]) * (C[2] - B[2]) - (A[2] - B[2]) * (C[1] - B[1]),
	    (A[2] - B[2]) * (C[0] - B[0]) - (A[0] - B[0]) * (C[2] - B[2]),
	    (A[0] - B[0]) * (C[1] - B[1]) - (A[1] - B[1]) * (C[0] - B[0])
	  ]).toUnitVector()).add(Vector.create([
	    (B[1] - C[1]) * (D[2] - C[2]) - (B[2] - C[2]) * (D[1] - C[1]),
	    (B[2] - C[2]) * (D[0] - C[0]) - (B[0] - C[0]) * (D[2] - C[2]),
	    (B[0] - C[0]) * (D[1] - C[1]) - (B[1] - C[1]) * (D[0] - C[0])
	  ]).toUnitVector());
	  return Plane.create(list[0], totalN);
	};

	module.exports = Plane;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (c) 2011, Chris Umbel, James Coglan
	// Line.Segment class - depends on Line and its dependencies.

	var Line = __webpack_require__(12);
	var Vector = __webpack_require__(8);

	Line.Segment = function() {};
	Line.Segment.prototype = {

	  // Returns true iff the line segment is equal to the argument
	  eql: function(segment) {
	    return (this.start.eql(segment.start) && this.end.eql(segment.end)) ||
	        (this.start.eql(segment.end) && this.end.eql(segment.start));
	  },

	  // Returns a copy of the line segment
	  dup: function() {
	    return Line.Segment.create(this.start, this.end);
	  },

	  // Returns the length of the line segment
	  length: function() {
	    var A = this.start.elements, B = this.end.elements;
	    var C1 = B[0] - A[0], C2 = B[1] - A[1], C3 = B[2] - A[2];
	    return Math.sqrt(C1*C1 + C2*C2 + C3*C3);
	  },

	  // Returns the line segment as a vector equal to its
	  // end point relative to its endpoint
	  toVector: function() {
	    var A = this.start.elements, B = this.end.elements;
	    return Vector.create([B[0] - A[0], B[1] - A[1], B[2] - A[2]]);
	  },

	  // Returns the segment's midpoint as a vector
	  midpoint: function() {
	    var A = this.start.elements, B = this.end.elements;
	    return Vector.create([(B[0] + A[0])/2, (B[1] + A[1])/2, (B[2] + A[2])/2]);
	  },

	  // Returns the plane that bisects the segment
	  bisectingPlane: function() {
	    return Plane.create(this.midpoint(), this.toVector());
	  },

	  // Returns the result of translating the line by the given vector/array
	  translate: function(vector) {
	    var V = vector.elements || vector;
	    var S = this.start.elements, E = this.end.elements;
	    return Line.Segment.create(
	      [S[0] + V[0], S[1] + V[1], S[2] + (V[2] || 0)],
	      [E[0] + V[0], E[1] + V[1], E[2] + (V[2] || 0)]
	    );
	  },

	  // Returns true iff the line segment is parallel to the argument. It simply forwards
	  // the method call onto its line property.
	  isParallelTo: function(obj) {
	    return this.line.isParallelTo(obj);
	  },

	  // Returns the distance between the argument and the line segment's closest point to the argument
	  distanceFrom: function(obj) {
	    var P = this.pointClosestTo(obj);
	    return (P === null) ? null : P.distanceFrom(obj);
	  },

	  // Returns true iff the given point lies on the segment
	  contains: function(obj) {
	    if (obj.start && obj.end) { return this.contains(obj.start) && this.contains(obj.end); }
	    var P = (obj.elements || obj).slice();
	    if (P.length == 2) { P.push(0); }
	    if (this.start.eql(P)) { return true; }
	    var S = this.start.elements;
	    var V = Vector.create([S[0] - P[0], S[1] - P[1], S[2] - (P[2] || 0)]);
	    var vect = this.toVector();
	    return V.isAntiparallelTo(vect) && V.modulus() <= vect.modulus();
	  },

	  // Returns true iff the line segment intersects the argument
	  intersects: function(obj) {
	    return (this.intersectionWith(obj) !== null);
	  },

	  // Returns the unique point of intersection with the argument
	  intersectionWith: function(obj) {
	    if (!this.line.intersects(obj)) { return null; }
	    var P = this.line.intersectionWith(obj);
	    return (this.contains(P) ? P : null);
	  },

	  // Returns the point on the line segment closest to the given object
	  pointClosestTo: function(obj) {
	    if (obj.normal) {
	      // obj is a plane
	      var V = this.line.intersectionWith(obj);
	      if (V === null) { return null; }
	      return this.pointClosestTo(V);
	    } else {
	      // obj is a line (segment) or point
	      var P = this.line.pointClosestTo(obj);
	      if (P === null) { return null; }
	      if (this.contains(P)) { return P; }
	      return (this.line.positionOf(P) < 0 ? this.start : this.end).dup();
	    }
	  },

	  // Set the start and end-points of the segment
	  setPoints: function(startPoint, endPoint) {
	    startPoint = Vector.create(startPoint).to3D();
	    endPoint = Vector.create(endPoint).to3D();
	    if (startPoint === null || endPoint === null) { return null; }
	    this.line = Line.create(startPoint, endPoint.subtract(startPoint));
	    this.start = startPoint;
	    this.end = endPoint;
	    return this;
	  }
	};

	// Constructor function
	Line.Segment.create = function(v1, v2) {
	  var S = new Line.Segment();
	  return S.setPoints(v1, v2);
	};

	module.exports = Line.Segment;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _RigidBody = __webpack_require__(16);

	var _RigidBody2 = _interopRequireDefault(_RigidBody);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function SceneObject(modelMatrix, position) {
	    this.postion = position || [0, 0, 0];
	    this.modelMatrix = modelMatrix;
	    this.rigidBody = new _RigidBody2.default();
	} /**
	   * Created by damiendg on 2016-12-25.
	   */


	SceneObject.prototype = {
	    constructor: SceneObject
	};

	exports.default = SceneObject;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by damiendg on 2016-12-28.
	 */
	function RigidBody() {}

	RigidBody.prototype = {
	  constructor: RigidBody
	};

	exports.default = RigidBody;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _initializeGlContext = __webpack_require__(1);

	var _initializeShaders = __webpack_require__(2);

	/**
	 * Created by damiendg on 2016-12-28.
	 */
	function Renderer() {
	    this.renderArray = [];
	    this.vertexArray = [];
	}

	Renderer.prototype = {
	    constructor: Renderer,
	    draw: function draw() {},
	    addSceneObjectToRenderArray: function addSceneObjectToRenderArray(sceneObjectToAdd) {
	        this.renderArray.push(sceneObjectToAdd);
	        this.vertexArray.push(sceneObjectToAdd.modelMatrix);
	    },

	    createVertexBuffer: function createVertexBuffer() {
	        // Create an empty buffer object to store the vertex buffer
	        var vertex_buffer = _initializeGlContext.gl.createBuffer();

	        //Bind appropriate array buffer to it
	        _initializeGlContext.gl.bindBuffer(_initializeGlContext.gl.ARRAY_BUFFER, vertex_buffer);

	        // Pass the vertex data to the buffer
	        _initializeGlContext.gl.bufferData(_initializeGlContext.gl.ARRAY_BUFFER, new Float32Array(this.vertexArray.join().split(",")), _initializeGlContext.gl.STATIC_DRAW);

	        // Unbind the buffer
	        _initializeGlContext.gl.bindBuffer(_initializeGlContext.gl.ARRAY_BUFFER, null);

	        _initializeGlContext.gl.bindBuffer(_initializeGlContext.gl.ARRAY_BUFFER, vertex_buffer);

	        // Get the attribute location
	        var coord = _initializeGlContext.gl.getAttribLocation(_initializeShaders.shaderProgram, "coordinates");

	        // Point an attribute to the currently bound VBO
	        _initializeGlContext.gl.vertexAttribPointer(coord, 3, _initializeGlContext.gl.FLOAT, false, 0, 0);

	        // Enable the attribute
	        _initializeGlContext.gl.enableVertexAttribArray(coord);
	    }

	};

	exports.default = Renderer;

/***/ }
/******/ ]);