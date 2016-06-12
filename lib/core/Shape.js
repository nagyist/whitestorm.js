'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shape = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _api = require('../extras/api');

var _Loop = require('../extensions/Loop');

var _defaults = require('../utils/defaults');

var _World = require('./World');

var _Object = require('./Object');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Shape = function (_WHSObject) {
  (0, _inherits3.default)(Shape, _WHSObject);

  /**
   * Constructing WHS.Shape object.
   *
   * @param {Object} params - Inputed parameters.
   * @param {String} type - Shape type.
   * @return {WHS.Shape}
   */

  function Shape(params, type) {
    var _ret;

    (0, _classCallCheck3.default)(this, Shape);

    if (!type) console.error('@constructor: Please specify " type ".');

    var _set = function _set(x, y, z) {
      _this.x = x;
      _this.y = y;
      _this.z = z;
    };

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Shape).call(this, {

      mass: 10,

      helpers: {
        box: false,
        boundingBox: false,
        edges: false,
        faceNormals: false
      },

      pos: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      },

      rot: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      },

      scale: {
        x: 1,
        y: 1,
        z: 1,
        set: _set
      },

      target: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      },

      morph: {
        speed: 1,
        duration: 1
      },

      physics: true

    }));

    (0, _get3.default)((0, _getPrototypeOf2.default)(Shape.prototype), 'setParams', _this).call(_this, params);

    var scope = (0, _assign2.default)(_this, {
      _type: type,
      __params: params,

      wait: [],
      helpers: {
        box: false
      },

      physics: params.physics
    });

    if (_defaults.defaults.debug) console.debug('@WHS.Shape: Shape ' + scope._type + ' found.', scope);

    return _ret = scope, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Shape, [{
    key: 'wait',
    value: function wait(promise) {
      this.wait.push(promise);
      return this;
    }

    /**
     * Applying shadow & position & rotation.
     *
     * @param {...String} tags - Tags that defines what to do with shape
     * additionally.
     */

  }, {
    key: 'wrap',
    value: function wrap() {
      var _scope = this;

      for (var _len = arguments.length, tags = Array(_len), _key = 0; _key < _len; _key++) {
        tags[_key] = arguments[_key];
      }

      if (tags.indexOf('wait') >= 0) {
        return new _promise2.default(function (resolve, reject) {
          _promise2.default.all(_scope.wait).then(function () {
            try {
              _scope.getNative().castShadow = true;
              _scope.getNative().receiveShadow = true;

              _scope.position.set(_scope.__params.pos.x, _scope.__params.pos.y, _scope.__params.pos.z);

              _scope.rotation.set(_scope.__params.rot.x, _scope.__params.rot.y, _scope.__params.rot.z);

              _scope.scale.set(_scope.__params.scale.x, _scope.__params.scale.y, _scope.__params.scale.z);

              // Box helper.
              if (_scope.__params.helpers.box) {
                _scope.helpers.box = new THREE.BoxHelper(_scope.getNative());
              }

              // Bounding box helper.
              if (_scope.__params.helpers.boundingBox) {
                _scope.helpers.boundingBox = new THREE.BoundingBoxHelper(_scope.getNative(), _scope.__params.helpers.boundingBox.color ? _scope.__params.helpers.boundingBox.color : 0xffffff);
              }

              // Edges helper.
              if (_scope.__params.helpers.edges) {
                _scope.helpers.edges = new THREE.EdgesHelper(_scope.getNative(), _scope.__params.helpers.edges.color ? _scope.__params.helpers.edges.color : 0xffffff);
              }

              // faceNormals helper.
              if (_scope.__params.helpers.faceNormals) {
                _scope.helpers.faceNormals = new THREE.FaceNormalsHelper(_scope.getNative(), _scope.__params.helpers.faceNormals.size ? _scope.__params.helpers.faceNormals.size : 2, _scope.__params.helpers.faceNormals.color ? _scope.__params.helpers.faceNormals.color : 0xffffff, _scope.__params.helpers.faceNormals.linewidth ? _scope.__params.helpers.faceNormals.linewidth : 1);
              }

              // vertexNormals helper.
              if (_scope.__params.helpers.vertexNormals) {
                _scope.helpers.vertexNormals = new THREE.VertexNormalsHelper(_scope.getNative(), _scope.__params.helpers.vertexNormals.size ? _scope.__params.helpers.vertexNormals.size : 2, _scope.__params.helpers.vertexNormals.color ? _scope.__params.helpers.vertexNormals.color : 0xffffff, _scope.__params.helpers.vertexNormals.linewidth ? _scope.__params.helpers.vertexNormals.linewidth : 1);
              }

              if (_defaults.defaults.debug) console.debug('@WHS.Shape: Shape ' + _scope._type + ' is ready.', _scope);

              _scope.emit('ready');

              resolve();
            } catch (err) {
              console.error(err.message);
              reject();
            }
          });
        });
      } else {
        return new _promise2.default(function (resolve, reject) {
          try {
            _scope.getNative().castShadow = true;
            _scope.getNative().receiveShadow = true;

            _scope.position.set(_scope.__params.pos.x, _scope.__params.pos.y, _scope.__params.pos.z);

            _scope.rotation.set(_scope.__params.rot.x, _scope.__params.rot.y, _scope.__params.rot.z);

            _scope.scale.set(_scope.__params.scale.x, _scope.__params.scale.y, _scope.__params.scale.z);

            // Box helper.
            if (_scope.__params.helpers.box) {
              _scope.helpers.box = new THREE.BoxHelper(_scope.getNative());
            }

            // Bounding box helper.
            if (_scope.__params.helpers.boundingBox) {
              _scope.helpers.boundingBox = new THREE.BoundingBoxHelper(_scope.getNative(), _scope.__params.helpers.boundingBox.color ? _scope.__params.helpers.boundingBox.color : 0xffffff);
            }

            // Edges helper.
            if (_scope.__params.helpers.edges) {
              _scope.helpers.edges = new THREE.EdgesHelper(_scope.getNative(), _scope.__params.helpers.edges.color ? _scope.__params.helpers.edges.color : 0xffffff);
            }

            // faceNormals helper.
            if (_scope.__params.helpers.faceNormals) {
              _scope.helpers.faceNormals = new THREE.FaceNormalsHelper(_scope.getNative(), _scope.__params.helpers.faceNormals.size ? _scope.__params.helpers.faceNormals.size : 2, _scope.__params.helpers.faceNormals.color ? _scope.__params.helpers.faceNormals.color : 0xffffff, _scope.__params.helpers.faceNormals.linewidth ? _scope.__params.helpers.faceNormals.linewidth : 1);
            }

            // vertexNormals helper.
            if (_scope.__params.helpers.vertexNormals) {
              _scope.helpers.vertexNormals = new THREE.VertexNormalsHelper(_scope.getNative(), _scope.__params.helpers.vertexNormals.size ? _scope.__params.helpers.vertexNormals.size : 2, _scope.__params.helpers.vertexNormals.color ? _scope.__params.helpers.vertexNormals.color : 0xffffff, _scope.__params.helpers.vertexNormals.linewidth ? _scope.__params.helpers.vertexNormals.linewidth : 1);
            }

            if (_defaults.defaults.debug) console.debug('@WHS.Shape: Shape ' + _scope._type + ' is ready.', _scope);

            resolve();

            _scope.emit('ready');
          } catch (err) {
            console.error(err.message);
            reject();
          }
        });
      }
    }

    /**
     * Add shape to WHS.World object.
     *
     * @param {WHS.World} parent - World, were this shape will be.
     * @param {...String} tags - Tags for compiling.
     */

  }, {
    key: 'addTo',
    value: function addTo(parent) {
      var _helpers = this.helpers,
          _scope = this;

      _scope.parent = parent;

      for (var _len2 = arguments.length, tags = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        tags[_key2 - 1] = arguments[_key2];
      }

      if (tags.indexOf('wait') >= 0) {
        return new _promise2.default(function (resolve, reject) {
          _promise2.default.all(_scope.wait).then(function () {
            try {
              console.log(_scope.parent instanceof _World.World);
              var parentNative = _scope.parent instanceof _World.World ? _scope.parent.getScene() : _scope.parent.getNative();

              parentNative.add(_scope.getNative());
              _scope.parent.children.push(_scope);

              if (_scope.__params.helpers.box) parentNative.add(_helpers.box);

              if (_scope.__params.helpers.boundingBox) parentNative.add(_helpers.boundingBox);

              if (_scope.__params.helpers.edges) parentNative.add(_helpers.edges);

              if (_scope.__params.helpers.faceNormals) parentNative.add(_helpers.faceNormals);

              if (_scope.__params.helpers.vertexNormals) parentNative.add(_helpers.vertexNormals);
            } catch (err) {
              console.error(err.message);
              reject();
            } finally {
              if (_scope._wait) {
                _scope.getNative().addEventListener('ready', function () {
                  resolve(_scope);
                });
              } else resolve(_scope);

              _scope.getNative().addEventListener('collide', function () {
                _scope.emit('collide');
              });

              if (_defaults.defaults.debug) {
                console.debug('@WHS.Shape: Shape ' + _scope._type + ' was added to world.', [_scope, _scope.parent]);
              }
            }
          });
        });
      } else {
        return new _promise2.default(function (resolve, reject) {
          try {
            console.log(_scope.parent instanceof _World.World);
            var parentNative = _scope.parent instanceof _World.World ? _scope.parent.getScene() : _scope.parent.getNative();

            parentNative.add(_scope.getNative());
            _scope.parent.children.push(_scope);

            if (_scope.__params.helpers.box) parentNative.add(_helpers.box);

            if (_scope.__params.helpers.boundingBox) parentNative.add(_helpers.boundingBox);

            if (_scope.__params.helpers.edges) parentNative.add(_helpers.edges);

            if (_scope.__params.helpers.faceNormals) parentNative.add(_helpers.faceNormals);

            if (_scope.__params.helpers.vertexNormals) parentNative.add(_helpers.vertexNormals);
          } catch (err) {
            console.error(err.message);
            reject();
          } finally {
            if (_scope._wait) {
              _scope.getNative().addEventListener('ready', function () {
                resolve(_scope);
              });
            } else resolve(_scope);

            _scope.getNative().addEventListener('collide', function () {
              _scope.emit('ready');
            });

            if (_defaults.defaults.debug) {
              console.debug('@WHS.Shape: Shape ' + _scope._type + ' was added to world.', [_scope, _scope.parent]);
            }
          }
        });
      }
    }

    /**
     * Initialize shape's material object.
     */

  }, {
    key: '_initMaterial',
    value: function _initMaterial(params) {
      return this.physics ? (0, _api.loadMaterial)(params)._material : (0, _api.loadMaterial)(params)._materialP;
    }

    /**
     * Clone shape.
     */

  }, {
    key: 'clone',
    value: function clone() {
      return new WHS.Shape(this.getParams(), this._type).copy(this);
    }

    /**
     * Copy shape.
     *
     * @param {WHS.Shape} source - Source object, that will be applied to this.
     */

  }, {
    key: 'copy',
    value: function copy(source) {
      this.setNative(source.getNative().clone());

      console.log(source.rotation);

      this.wrap();

      this.position = source.position.clone();
      this.rotation = source.rotation.clone();

      this._type = source._type;

      return this;
    }

    /**
     * Remove this shape from world.
     *
     * @return {WHS.Shape} - this.
     */

  }, {
    key: 'remove',
    value: function remove() {
      this.parent.getScene().remove(this.getNative());

      this.parent.children.splice(this.parent.children.indexOf(this), 1);
      this.parent = null;

      this.emit('remove');

      if (_defaults.defaults.debug) {
        console.debug('@WHS.Shape: Shape ' + this._type + ' was removed from world', [this]);
      }

      return this;
    }

    /**
     * @return {WHS.World} - World object.
     */

  }, {
    key: 'getWorld',
    value: function getWorld() {
      var p = this.parent;

      while (!(p instanceof _World.World)) {
        if (p) p = p.parent;else return false;
      }

      return p;
    }
  }, {
    key: 'setNative',


    /* Access private data */

    value: function setNative(native) {
      this.native = native;
      return this.native;
    }
  }, {
    key: 'getNative',
    value: function getNative() {
      return this.native;
    }
  }, {
    key: 'setMaterial',
    value: function setMaterial(material) {
      this.native.material = material;
      return this.native.material;
    }
  }, {
    key: 'setAngularVelocity',
    value: function setAngularVelocity() {
      var _getNative;

      return (_getNative = this.getNative()).setAngularVelocity.apply(_getNative, arguments);
    }
  }, {
    key: 'setLinearVelocity',
    value: function setLinearVelocity() {
      var _getNative2;

      return (_getNative2 = this.getNative()).setLinearVelocity.apply(_getNative2, arguments);
    }
  }, {
    key: 'follow',
    value: function follow(curve) {
      var time = arguments.length <= 1 || arguments[1] === undefined ? 1000 : arguments[1];
      var loop = arguments[2];

      var _scope = this,
          gEnd = time;

      var animation = new _Loop.Loop(function (clock) {
        var u = clock.getElapsedTime() * 1000 / gEnd,
            vec1 = curve.getPoint(u % 1),
            vec2 = curve.getPoint((u + 0.01) % 1);

        _scope.position.set(vec1.x, vec1.y, vec1.z);
        _scope.getNative().lookAt(vec2);
      });

      _scope.getWorld().addLoop(animation);

      animation.start();

      if (loop) {
        setInterval(function () {
          animation.stop();

          animation = new _Loop.Loop(function (clock) {
            var u = clock.getElapsedTime() * 1000 / gEnd,
                vec1 = curve.getPoint(u % 1),
                vec2 = curve.getPoint((u + 0.01) % 1);

            _scope.position.set(vec1.x, vec1.y, vec1.z);
            _scope.getNative().lookAt(vec2);
          });

          _scope.getWorld().addLoop(animation);

          animation.start();
        }, time);
      } else {
        setTimeout(function () {
          animation.stop();
          _scope.getWorld().removeLoop(animation);
        }, time);
      }
    }
  }, {
    key: 'nposition',
    get: function get() {
      return this.getNative().position;
    }
  }, {
    key: 'nrotation',
    get: function get() {
      return this.getNative().position;
    }
  }, {
    key: 'position',
    get: function get() {
      this.getNative().__dirtyPosition = true;
      return this.getNative().position;
    },
    set: function set(vector3) {
      this.getNative().__dirtyPosition = true;
      return this.getNative().position.copy(vector3);
    }
  }, {
    key: 'rotation',
    get: function get() {
      this.getNative().__dirtyRotation = true;
      return this.getNative().rotation;
    },
    set: function set(euler) {
      this.getNative().__dirtyRotation = true;
      this.getNative().rotation.copy(euler);

      return this.getNative().rotation;
    }
  }, {
    key: 'scale',
    get: function get() {
      return this.getNative().scale;
    },
    set: function set(vector3) {
      this.getNative().scale = vector3;
      return this.getNative().scale;
    }
  }]);
  return Shape;
}(_Object.WHSObject);

exports.Shape = Shape;
//# sourceMappingURL=Shape.js.map