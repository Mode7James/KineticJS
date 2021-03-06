/**
 * KineticJS JavaScript Framework v{{version}}
 * http://www.kineticjs.com/
 * Copyright 2013, Eric Rowell
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: {{date}}
 *
 * Copyright (C) 2011 - 2013 by Eric Rowell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/** 
 * @namespace 
 */
var Kinetic = {}; 
(function() {
    Kinetic.version = '{{version}}';
    
    /** 
     * @namespace 
     */
    Kinetic.Filters = {};

    /**
     * Node constructor. Nodes are entities that can be transformed, layered,
     * and have bound events. The stage, layers, groups, and shapes all extend Node.
     * @constructor
     * @param {Object} config
     * {{NodeParams}}
     */
    Kinetic.Node = function(config) {
        this._nodeInit(config);
    };

    /**
     * Shape constructor.  Shapes are primitive objects such as rectangles,
     *  circles, text, lines, etc.
     * @constructor
     * @augments Kinetic.Node
     * @param {Object} config
     * {{ShapeParams}}
     * {{NodeParams}}
     */
    Kinetic.Shape = function(config) {
        this._initShape(config);
    }; 

    /**
     * Container constructor.&nbsp; Containers are used to contain nodes or other containers
     * @constructor
     * @augments Kinetic.Node
     * @param {Object} config
     * {{NodeParams}}
     * {{ContainerParams}}
     */
    Kinetic.Container = function(config) {
        this._containerInit(config);
    };

    /**
     * Stage constructor.  A stage is used to contain multiple layers
     * @constructor
     * @augments Kinetic.Container
     * @param {Object} config
     * @param {String|DomElement} config.container Container id or DOM element
     * {{NodeParams}}
     * {{ContainerParams}}
     */
    Kinetic.Stage = function(config) {
        this._initStage(config);
    };

    /**
     * Layer constructor.  Layers are tied to their own canvas element and are used
     * to contain groups or shapes
     * @constructor
     * @augments Kinetic.Container
     * @param {Object} config
     * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
     * to clear the canvas before each layer draw.  The default value is true.
     * {{NodeParams}}
     * {{ContainerParams}}
     */
    Kinetic.Layer = function(config) {
        this._initLayer(config);
    };

    /**
     * Group constructor.  Groups are used to contain shapes or other groups.
     * @constructor
     * @augments Kinetic.Container
     * @param {Object} config
     * {{NodeParams}}
     * {{ContainerParams}}
     */
    Kinetic.Group = function(config) {
        this._initGroup(config);
    }; 

    /** 
     * @namespace 
     */
    Kinetic.Global = {
        stages: [],
        idCounter: 0,
        ids: {},
        names: {},
        //shapes hash.  rgb keys and shape values
        shapes: {},

        /**
         * @method isDragging returns whether or not drag and drop
         *  is currently active
         * @methodOf Kinetic.Global
         */
        isDragging: function() {
            var dd = Kinetic.DD;  

            // if DD is not included with the build, then
            // drag and drop is not even possible
            if (!dd) {
                return false;
            } 
            // if DD is included with the build
            else {
                return dd.isDragging;
            }
        },
        /**
        * @method isDragReady returns whether or not a drag and drop operation is ready, but may
        *  not necessarily have started
        * @methodOf Kinetic.Global
        */
        isDragReady: function() {
            var dd = Kinetic.DD;  

            // if DD is not included with the build, then
            // drag and drop is not even possible
            if (!dd) {
                return false;
            } 
            // if DD is included with the build
            else {
                return !!dd.node;
            }
        },
        _addId: function(node, id) {
            if(id !== undefined) {
                this.ids[id] = node;
            }
        },
        _removeId: function(id) {
            if(id !== undefined) {
                delete this.ids[id];
            }
        },
        _addName: function(node, name) {
            if(name !== undefined) {
                if(this.names[name] === undefined) {
                    this.names[name] = [];
                }
                this.names[name].push(node);
            }
        },
        _removeName: function(name, _id) {
            if(name !== undefined) {
                var nodes = this.names[name];
                if(nodes !== undefined) {
                    for(var n = 0; n < nodes.length; n++) {
                        var no = nodes[n];
                        if(no._id === _id) {
                            nodes.splice(n, 1);
                        }
                    }
                    if(nodes.length === 0) {
                        delete this.names[name];
                    }
                }
            }
        }
    };
})();

// Uses Node, AMD or browser globals to create a module.

// If you want something that will work in other stricter CommonJS environments,
// or if you need to create a circular dependency, see commonJsStrict.js

// Defines a module "returnExports" that depends another module called "b".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If the 'b' module also uses this type of boilerplate, then
// in the browser, it will create a global .b that is used below.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

// if the module has no dependencies, the above pattern can be simplified to
( function(root, factory) {
    if( typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    }
    else if( typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    }
    else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function() {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return Kinetic;
}));
