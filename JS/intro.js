
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Aphalina;
    (function (Aphalina) {
        var TransformMatrix = (function () {
            function TransformMatrix(a, b, c, d, e, f) {
                if (a === void 0) { a = 1; }
                if (b === void 0) { b = 0; }
                if (c === void 0) { c = 0; }
                if (d === void 0) { d = 1; }
                if (e === void 0) { e = 0; }
                if (f === void 0) { f = 0; }
                this.setTransform(a, b, c, d, e, f);
            }
            TransformMatrix.prototype.setTransform = function (a, b, c, d, e, f) {
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.e = e;
                this.f = f;
            };
            TransformMatrix.prototype.reset = function () {
                this.setTransform(1, 0, 0, 1, 0, 0);
            };
            TransformMatrix.prototype.transform = function (a, b, c, d, e, f) {
                var a1 = this.a, b1 = this.b, c1 = this.c, d1 = this.d, e1 = this.e, f1 = this.f;
                this.a = a1 * a + c1 * b;
                this.b = b1 * a + d1 * b;
                this.c = a1 * c + c1 * d;
                this.d = b1 * c + d1 * d;
                this.e = a1 * e + c1 * f + e1;
                this.f = b1 * e + d1 * f + f1;
            };
            TransformMatrix.prototype.translate = function (tx, ty) {
                this.transform(1, 0, 0, 1, tx, ty);
            };
            TransformMatrix.prototype.rotate = function (angle) {
                angle = angle * Math.PI / 180;
                var cos = Math.cos(angle), sin = Math.sin(angle);
                this.transform(cos, sin, -sin, cos, 0, 0);
            };
            TransformMatrix.prototype.scale = function (sx, sy) {
                this.transform(sx, 0, 0, sy, 0, 0);
            };
            TransformMatrix.prototype.skew = function (ax, ay) {
                this.transform(1, Math.tan(ay * Math.PI / 180), Math.tan(ax * Math.PI / 180), 1, 0, 0);
            };
            return TransformMatrix;
        }());
        Aphalina.TransformMatrix = TransformMatrix;
        var Shape = (function () {
            function Shape(element) {
                this._pathProgress = 0;
                this._pathLenght = 0;
                this._rotateAlongPath = false;
                this.element = element;
                var transformAttribute = this.element.getAttribute("data-transform");
                var pivotAttribute = this.element.getAttribute("data-pivot");
                if (transformAttribute) {
                    var transformValues = transformAttribute.split(" ");
                    this._x = parseFloat(transformValues[0]);
                    this._y = parseFloat(transformValues[1]);
                    this._scaleX = parseFloat(transformValues[2]);
                    this._scaleY = parseFloat(transformValues[3]);
                    this._rotation = parseFloat(transformValues[4]);
                    this._skewX = parseFloat(transformValues[5]);
                    this._skewY = parseFloat(transformValues[6]);
                }
                else {
                    this._x = 0;
                    this._y = 0;
                    this._scaleX = 1;
                    this._scaleY = 1;
                    this._rotation = 0;
                    this._skewX = 0;
                    this._skewY = 0;
                }
                if (pivotAttribute) {
                    var pivotValues = pivotAttribute.split(" ");
                    this._pivotX = parseFloat(pivotValues[0]);
                    this._pivotY = parseFloat(pivotValues[1]);
                }
                else {
                    this._pivotX = 0;
                    this._pivotY = 0;
                }
                this._matrix = new TransformMatrix();
                this._isDirty = false;
            }
            Object.defineProperty(Shape.prototype, "x", {
                get: function () { return this._x; },
                set: function (val) { this._x = val; this._isDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Shape.prototype, "y", {
                get: function () { return this._y; },
                set: function (val) { this._y = val; this._isDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Shape.prototype, "scaleX", {
                get: function () { return this._scaleX; },
                set: function (val) { this._scaleX = val; this._isDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Shape.prototype, "scaleY", {
                get: function () { return this._scaleY; },
                set: function (val) { this._scaleY = val; this._isDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Shape.prototype, "rotation", {
                get: function () { return this._rotation; },
                set: function (val) { this._rotation = val; this._isDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Shape.prototype, "skewX", {
                get: function () { return this._skewX; },
                set: function (val) { this._skewX = val; this._isDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Shape.prototype, "skewY", {
                get: function () { return this._skewY; },
                set: function (val) { this._skewY = val; this._isDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Shape.prototype, "pivotX", {
                get: function () { return this._pivotX; },
                set: function (val) { this._pivotX = val; this._isDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Shape.prototype, "pivotY", {
                get: function () { return this._pivotY; },
                set: function (val) { this._pivotY = val; this._isDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Shape.prototype, "path", {
                get: function () { return this._path; },
                set: function (val) { this._path = val; this._pathLenght = 0; this._isDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Shape.prototype, "pathProgress", {
                get: function () { return this._pathProgress; },
                set: function (val) { this._pathProgress = val; this._isDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Shape.prototype, "rotateAlongPath", {
                get: function () { return this._rotateAlongPath; },
                set: function (val) { this._rotateAlongPath = val; this._isDirty = true; },
                enumerable: true,
                configurable: true
            });
            Shape.prototype.update = function () {
                if (this._isDirty) {
                    if (this._path) {
                        if (this._pathLenght == 0)
                            this._pathLenght = this._path.getTotalLength();
                        var distance = this._pathProgress * this._pathLenght;
                        var pathPoint = this._path.getPointAtLength(distance);
                        this._x = pathPoint.x - this._pivotX;
                        this._y = pathPoint.y - this._pivotY;
                        if (this._rotateAlongPath) {
                            if (this.pathProgress < 0.99) {
                                var pathPoint2 = this._path.getPointAtLength((this._pathProgress + 0.001) * this._pathLenght);
                                this._rotation = Math.atan2(pathPoint2.y - pathPoint.y, pathPoint2.x - pathPoint.x) / Math.PI * 180.0;
                            }
                            else {
                                var pathPoint2 = this._path.getPointAtLength((this._pathProgress - 0.001) * this._pathLenght);
                                this._rotation = Math.atan2(pathPoint.y - pathPoint2.y, pathPoint.x - pathPoint2.x) / Math.PI * 180.0;
                            }
                        }
                    }
                    var m = this._matrix;
                    m.reset();
                    m.translate(this._pivotX, this._pivotY);
                    m.translate(this._x, this._y);
                    m.rotate(this._rotation);
                    m.skew(this._skewX, this._skewY);
                    m.scale(this._scaleX, this._scaleY);
                    m.translate(-this._pivotX, -this._pivotY);
                    var matrixString = 'matrix(' + this._matrix.a + ' ' + this._matrix.b + ' ' + this._matrix.c + ' ' + this._matrix.d + ' ' + this._matrix.e + ' ' + this._matrix.f + ')';
                    this.element.setAttribute('transform', matrixString);
                    this._isDirty = false;
                }
            };
            return Shape;
        }());
        Aphalina.Shape = Shape;
        var SpriteGroup = (function (_super) {
            __extends(SpriteGroup, _super);
            function SpriteGroup(element) {
                var _this = _super.call(this, element) || this;
                var currentFrameAttribute = _this.element.getAttribute("data-currentframe");
                if (currentFrameAttribute) {
                    _this._currentFrame = parseFloat(currentFrameAttribute);
                }
                else {
                    _this._currentFrame = 1;
                }
                _this._oldCurrentFrame = _this._currentFrame;
                return _this;
            }
            Object.defineProperty(SpriteGroup.prototype, "currentFrame", {
                get: function () { return this._currentFrame; },
                set: function (val) { this._currentFrame = val; },
                enumerable: true,
                configurable: true
            });
            SpriteGroup.prototype.calculateActualFrameIndex = function (frame) {
                return (Math.abs(Math.floor(frame - 1))) % this.element.childElementCount;
            };
            SpriteGroup.prototype.update = function () {
                _super.prototype.update.call(this);
                if (this._currentFrame && this._currentFrame != this._oldCurrentFrame) {
                    if (this._oldCurrentFrame != -1) {
                        this.element.children[this.calculateActualFrameIndex(this._oldCurrentFrame)].setAttribute('visibility', 'hidden');
                    }
                    this.element.children[this.calculateActualFrameIndex(this._currentFrame)].setAttribute('visibility', 'inherit');
                    this._oldCurrentFrame = this._currentFrame;
                }
            };
            return SpriteGroup;
        }(Shape));
        Aphalina.SpriteGroup = SpriteGroup;
        var Scene = (function () {
            function Scene(sceneId) {
                this._map = {};
                this.id = sceneId;
            }
            Scene.prototype.svg = function (elementId) {
                var t = this._map[elementId];
                if (!t) {
                    t = this.createShape(elementId);
                    this._map[elementId] = t;
                }
                return t;
            };
            Scene.prototype.createShape = function (elementId) {
                var element = document.getElementById(elementId);
                var shapeTypeAttribute = element.getAttribute("data-shapetype");
                if (shapeTypeAttribute) {
                    switch (shapeTypeAttribute) {
                        case "SpriteGroup":
                            return new SpriteGroup(element);
                    }
                }
                else
                    return new Shape(element);
            };
            Scene.prototype.update = function () {
                for (var elementId in this._map) {
                    if (this._map.hasOwnProperty(elementId)) {
                        this._map[elementId].update();
                    }
                }
            };
            Scene.prototype.load = function () {
                if (this.onload)
                    this.onload();
            };
            Scene.prototype.unload = function () {
                if (this.onunload)
                    this.onunload();
            };
            return Scene;
        }());
        Aphalina.Scene = Scene;
        var Animation = (function () {
            function Animation() {
            }
            Animation.prototype.showScene = function (scene) {
                if (this.currentScene) {
                    var domElement = document.getElementById(this.currentScene.id);
                    domElement.style.visibility = 'hidden';
                    this.currentScene.unload();
                }
                this.currentScene = scene;
                if (this.currentScene) {
                    var domElement = document.getElementById(this.currentScene.id);
                    domElement.style.visibility = 'visible';
                    this.currentScene.load();
                    this.update();
                }
            };
            Animation.prototype.update = function () {
                if (this.currentScene)
                    this.currentScene.update();
            };
            return Animation;
        }());
        Aphalina.Animation = Animation;
    })(Aphalina || (Aphalina = {}));
    var an = new Aphalina.Animation();
    var animation = new Aphalina.Animation();
    update = function() { animation.update();  }
    function build__Scene_1() {
      scene = new Aphalina.Scene('Scene_1');
      scene.Main_Timeline = new TimelineMax({paused : true, onUpdate : function () { update(); }});
      scene.Main_Timeline.set('#Kor_1', { opacity : 0 }, 0);
      scene.Main_Timeline.set('#Kor_2', { opacity : 0 }, 0);
      scene.Main_Timeline.set('#Kor_szem_1', { opacity : 0 }, 0);
      scene.Main_Timeline.set('#Kor_szem_2', { opacity : 0 }, 0);
      scene.Main_Timeline.set('#Gorbe_2', {  attr : {"stroke-dasharray" : 574.7824, "stroke-dashoffset" : 574.7824} }, 0);
      scene.Main_Timeline.set('#Gorbe_1', {  attr : {"stroke-dasharray" : 26.9338, "stroke-dashoffset" : 26.9338} }, 0);
      scene.Main_Timeline.set('#O_betu', { opacity : 0 }, 0);
      scene.Main_Timeline.set('#P_betu', { opacity : 0 }, 0);
      scene.Main_Timeline.set('#G_betu', { opacity : 0,  attr : {fill : "#F0563F"} }, 0);
      scene.Main_Timeline.set('#T_betu', { opacity : 0 }, 0);
      scene.Main_Timeline.set('#Gorbe_3', {  attr : {"stroke-dasharray" : 280.6379, "stroke-dashoffset" : 280.6379} }, 0);
      scene.Main_Timeline.to('#Kor_1', 1, { opacity : 1, ease : Power0.easeNone }, 0);
      scene.Main_Timeline.to('#Kor_2', 1, { opacity : 1, ease : Power0.easeNone }, 0.1);
      scene.Main_Timeline.to('#Kor_szem_1', 1, { opacity : 1, ease : Power0.easeNone }, 0.2);
      scene.Main_Timeline.to('#Kor_szem_2', 1, { opacity : 1, ease : Power0.easeNone }, 0.3);
      scene.Main_Timeline.to('#T_betu', 1, { opacity : 1, ease : Power0.easeNone }, 1.3);
      scene.Main_Timeline.to('#G_betu', 1, { opacity : 1, ease : Power0.easeNone }, 1.4);
      scene.Main_Timeline.set('#G_betu', {  attr : {fill : "#F0563F"} }, 2.4);
      scene.Main_Timeline.to('#P_betu', 1, { opacity : 1, ease : Power0.easeNone }, 1.5);
      scene.Main_Timeline.to('#O_betu', 1, { opacity : 1, ease : Power0.easeNone }, 1.6);
      scene.Main_Timeline.to('#Gorbe_2', 1.4, { ease : Power0.easeNone,  attr : {"stroke-dashoffset" : 0} }, 2.6);
      scene.Main_Timeline.to('#Gorbe_1', 0.3, { ease : Power0.easeNone,  attr : {"stroke-dashoffset" : 0} }, 2.7);
      scene.Main_Timeline.to('#Gorbe_3', 0.9, { ease : Power0.easeNone,  attr : {"stroke-dashoffset" : 0} }, 3.1);
      scene.onload = function() {
        animation.Scene_1.Main_Timeline.restart();
      }
      scene.onunload = function() {
        animation.Scene_1.Main_Timeline.pause();
      }
      return scene;
    }
    function init() {
      animation.Scene_1 = build__Scene_1();
      animation.showScene(animation.Scene_1);
    }
