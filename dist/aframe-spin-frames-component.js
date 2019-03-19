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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

AFRAME.registerComponent('spin-frames', {
  multiple: true,
  schema: {
    // configurable options
    vifnum: { type: 'string' },
    folder: { type: 'string' },
    sensitivity: { default: 3.2 },
    frameIndex: { type: 'number', default: 24 },
    clickToSpin: { type: 'boolean', default: false },
    stereo: { type: 'string', default: 'left' },

    // default flags
    loading: { default: true },
    enabled: { default: true },
    initTick: { type: 'boolean', default: false }
  },
  init: function() {
    this.textures = [];
    this.IMAGECOUNT = 36;
    this.FRAMES = 88;
    this.COUNTER = 2112; // starting image * FRAMES

    this.startX = 0;
    this.lookVector = new THREE.Vector2();
    this.mouseDown = false;
    this.touchDown = false;
    this.bindMethods();
  },

  update: function() {
    this.loadImages();
    this.updateMeshTexture(this.data.frameIndex);
    // this.setStereoLayer();
  },

  play: function() {
    this.addEventListeners();
  },

  pause: function() {
    this.removeEventListeners();
    this.lookVector.set(0, 0);
  },

  remove: function() {
    this.pause();
  },

  bindMethods: function() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    this.setStereoLayer = this.setStereoLayer.bind(this);
    this.onExitVr = this.onExitVr.bind(this);
    this.onEnterVr = this.onEnterVr.bind(this);
  },

  addEventListeners: function() {
    const canvasEl = this.el.sceneEl.canvas;
    const aScene = document.querySelector('a-scene');
    // Mouse events
    canvasEl.addEventListener('mousedown', this.onMouseDown, false);
    canvasEl.addEventListener('mousemove', this.onMouseMove, false);
    canvasEl.addEventListener('mouseup', this.onMouseUp, false);

    // Touch events
    canvasEl.addEventListener('touchstart', this.onTouchStart, false);
    canvasEl.addEventListener('touchmove', this.onTouchMove, false);
    canvasEl.addEventListener('touchend', this.onTouchEnd, false);

    aScene.addEventListener('enter-vr', this.onEnterVr, false);
    aScene.addEventListener('exit-vr', this.onExitVr, false);
  },

  removeEventListeners: function() {
    const canvasEl = this.el.sceneEl && this.el.sceneEl.canvas;
    if (canvasEl) {
      canvasEl.removeEventListener('mousedown', this.onMouseDown);
      canvasEl.removeEventListener('mousemove', this.onMouseMove);
      canvasEl.removeEventListener('mouseup', this.onMouseUp);

      canvasEl.removeEventListener('touchstart', this.onTouchStart);
      canvasEl.removeEventListener('touchmove', this.onTouchMove);
      canvasEl.removeEventListener('touchend', this.onTouchEnd);
    }
  },

  tick: function(time, delta) {
    if (this.data.initTick) {
      this.updateImageByFrame(time, delta);
    }
  },

  loadImages: function() {
    const loader = new THREE.TextureLoader();
    this.textures = [];
    for (let i = 10; i <= 360; i += 10) {
      let num = i.toString();
      let zeroString = '000';
      let padded = zeroString.substring(num.length, 4) + num;
      this.textures.push(
        loader.load(
          `${this.data.folder}AIL${this.data.vifnum}_${
            this.data.stereo
          }_${padded}.png`
        )
      );
    }
  },

  updateMeshTexture: function(index) {
    const mesh = this.el.getObject3D('mesh');
    if (!mesh || !mesh.material) return;
    mesh.material.map = this.textures[index];
  },

  updateImageByFrame: function(time, delta) {
    if (!this.data.clickToSpin) {
      // Calculate rotation if dragging
      this.COUNTER += Math.round(time);
      // Avoid negative modulus
      this.data.frameIndex =
        ((Math.round(this.COUNTER * (1 / this.FRAMES)) % this.IMAGECOUNT) +
          this.IMAGECOUNT) %
        this.IMAGECOUNT;
    } else {
      // Calculate rotation for auto spin
      this.COUNTER += Math.round(delta);
      this.data.frameIndex =
        Math.round(this.COUNTER * (1 / this.FRAMES)) % this.IMAGECOUNT;
    }
    this.updateMeshTexture(this.data.frameIndex);
  },

  isRotationActive: function() {
    return this.data.enabled && (this.mouseDown || this.touchDown);
  },

  rotateObject: function(clientX) {
    if (clientX === this.startX) return;

    const currentX = clientX;
    let direction = 1;

    if (currentX > this.startX) {
      direction = -1;
    }

    const amountMoved =
      Math.abs(currentX - this.startX) * direction * this.data.sensitivity;
    this.updateImageByFrame(amountMoved);
    this.startX = currentX;
  },

  onMouseMove: function(event) {
    if (!this.data.enabled || !this.mouseDown || this.data.clickToSpin) return;

    const previousMouseEvent = this.previousMouseEvent;

    let movementX;
    movementX = event.movementX || event.mozMovementX || 0;

    if (movementX === undefined) {
      movementX = event.screenX - previousMouseEvent.screenX;
    }
    this.previousMouseEvent = event;

    if (this.isRotationActive()) {
      this.lookVector.x += movementX;
      this.rotateObject(this.lookVector.x);
    }
  },

  onMouseDown: function(event) {
    this.mouseDown = true;
    this.previousMouseEvent = event;
  },

  onMouseUp: function() {
    this.mouseDown = false;
    if (!this.data.clickToSpin) return;
    this.data.initTick
      ? (this.data.initTick = false)
      : (this.data.initTick = true);
  },

  // TOUCH CONTROLS
  onTouchMove: function(event) {
    if (!this.data.enabled || !this.touchDown) return;

    const previousTouchEvent = this.previousTouchEvent;
    const touch = event.touches[0];
    const movementX = touch.screenX - previousTouchEvent.touches[0].screenX;

    this.previousTouchEvent = event;

    if (this.isRotationActive()) {
      this.lookVector.x += movementX;
      this.rotateObject(this.lookVector.x);
    }
  },

  onTouchStart: function(event) {
    this.touchDown = true;
    this.previousTouchEvent = event;
  },

  onTouchEnd: function() {
    this.touchDown = false;
  },

  onEnterVr: function() {
    this.setStereoLayer('enter-vr');
  },

  onExitVr: function() {
    window.location.reload(true);
  },

  setStereoLayer: function(event) {
    const obj3d = this.el.object3D.children[0];

    if (this.data.stereo === 'left') {
      obj3d.layers.set(0);
    }

    if (this.data.stereo === 'right') {
      obj3d.layers.set(2);
      obj3d.visible = false;
    }

    if (event === 'enter-vr') {
      if (this.data.stereo === 'left') {
        obj3d.layers.set(1);
      }
      if (this.data.stereo === 'right') {
        obj3d.visible = true;
        obj3d.layers.set(2);
      }
    }

    if (event === 'exit-vr') {
      if (this.data.stereo === 'right') {
        obj3d.visible = false;
      }
    }
  }
});


/***/ })
/******/ ]);