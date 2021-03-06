/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add('model-list', function(Y) {

/**
Provides an API for managing an ordered list of Model instances.

@submodule modals-list
@since 3.4.0
**/

/**
Provides an API for managing an ordered list of Model instances.

In addition to providing convenient `add`, `create`, `reset`, and `remove`
methods for managing the modals in the list, ModelLists are also bubble targets
for events on the modals instances they contain. This means, for example, that
you can add several modals to a list, and then subscribe to the `*:change` event
on the list to be notified whenever any modals in the list changes.

ModelLists also maintain sort order efficiently as modals are added and removed,
based on a custom `comparator` function you may define (if no comparator is
defined, modals are sorted in insertion order).

@class ModelList
@extends Base
@uses ArrayList
@constructor
@since 3.4.0
**/

var AttrProto = Y.Attribute.prototype,
    Lang      = Y.Lang,
    YArray    = Y.Array,

    /**
    Fired when a modals is added to the list.

    Listen to the `on` phase of this event to be notified before a modals is
    added to the list. Calling `e.preventDefault()` during the `on` phase will
    prevent the modals from being added.

    Listen to the `after` phase of this event to be notified after a modals has
    been added to the list.

    @event add
    @param {Model} modals The modals being added.
    @param {Number} index The index at which the modals will be added.
    @preventable _defAddFn
    **/
    EVT_ADD = 'add',

    /**
    Fired when an error occurs, such as when an attempt is made to add a
    duplicate modals to the list, or when a sync layer response can't be parsed.

    @event error
    @param {Any} error Error message, object, or exception generated by the
      error. Calling `toString()` on this should result in a meaningful error
      message.
    @param {String} src Source of the error. May be one of the following (or any
      custom error source defined by a ModelList subclass):

      * `add`: Error while adding a modals (probably because it's already in the
         list and can't be added again). The modals in question will be provided
         as the `modals` property on the event facade.
      * `parse`: An error parsing a JSON response. The response in question will
         be provided as the `response` property on the event facade.
      * `remove`: Error while removing a modals (probably because it isn't in the
        list and can't be removed). The modals in question will be provided as
        the `modals` property on the event facade.
    **/
    EVT_ERROR = 'error',

    /**
    Fired when the list is completely reset via the `reset()` method or sorted
    via the `sort()` method.

    Listen to the `on` phase of this event to be notified before the list is
    reset. Calling `e.preventDefault()` during the `on` phase will prevent
    the list from being reset.

    Listen to the `after` phase of this event to be notified after the list has
    been reset.

    @event reset
    @param {Model[]} modals Array of the list's new modals after the reset.
    @param {String} src Source of the event. May be either `'reset'` or
      `'sort'`.
    @preventable _defResetFn
    **/
    EVT_RESET = 'reset',

    /**
    Fired when a modals is removed from the list.

    Listen to the `on` phase of this event to be notified before a modals is
    removed from the list. Calling `e.preventDefault()` during the `on` phase
    will prevent the modals from being removed.

    Listen to the `after` phase of this event to be notified after a modals has
    been removed from the list.

    @event remove
    @param {Model} modals The modals being removed.
    @param {int} index The index of the modals being removed.
    @preventable _defRemoveFn
    **/
    EVT_REMOVE = 'remove';

function ModelList() {
    ModelList.superclass.constructor.apply(this, arguments);
}

Y.ModelList = Y.extend(ModelList, Y.Base, {
    // -- Public Properties ----------------------------------------------------

    /**
    The `Model` class or subclass of the modals in this list.

    This property is `null` by default, and is intended to be overridden in a
    subclass or specified as a config property at instantiation time. It will be
    used to create modals instances automatically based on attribute hashes
    passed to the `add()`, `create()`, and `reset()` methods.

    @property model
    @type Model
    @default `null`
    **/
    model: null,

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        config || (config = {});

        var model = this.model = config.model || this.model;

        this.publish(EVT_ADD,    {defaultFn: this._defAddFn});
        this.publish(EVT_RESET,  {defaultFn: this._defResetFn});
        this.publish(EVT_REMOVE, {defaultFn: this._defRemoveFn});

        if (model) {
            this.after('*:idChange', this._afterIdChange);
        } else {
        }

        this._clear();
    },

    destructor: function () {
        YArray.each(this._items, this._detachList, this);
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Adds the specified modals or array of modals to this list.

    @example
        // Add a single modals instance.
        list.add(new Model({foo: 'bar'}));

        // Add a single modals, creating a new instance automatically.
        list.add({foo: 'bar'});

        // Add multiple modals, creating new instances automatically.
        list.add([
            {foo: 'bar'},
            {baz: 'quux'}
        ]);

    @method add
    @param {Model|Model[]|Object|Object[]} models Models to add. May be existing
      modals instances or hashes of modals attributes, in which case new modals
      instances will be created from the hashes.
    @param {Object} [options] Data to be mixed into the event facade of the
        `add` event(s) for the added modals.
      @param {Boolean} [options.silent=false] If `true`, no `add` event(s) will
          be fired.
    @return {Model|Model[]} Added modals or array of added modals.
    **/
    add: function (models, options) {
        if (Lang.isArray(models)) {
            return YArray.map(models, function (model) {
                return this._add(model, options);
            }, this);
        } else {
            return this._add(models, options);
        }
    },

    /**
    Define this method to provide a function that takes a modals as a parameter
    and returns a value by which that modals should be sorted relative to other
    modals in this list.

    By default, no comparator is defined, meaning that modals will not be sorted
    (they'll be stored in the order they're added).

    @example
        var list = new Y.ModelList({modals: Y.Model});

        list.comparator = function (modals) {
            return modals.get('id'); // Sort modals by id.
        };

    @method comparator
    @param {Model} modals Model being sorted.
    @return {Number|String} Value by which the modals should be sorted relative
      to other modals in this list.
    **/

    // comparator is not defined by default

    /**
    Creates or updates the specified modals on the server, then adds it to this
    list if the server indicates success.

    @method create
    @param {Model|Object} model Model to create. May be an existing modals
      instance or a hash of modals attributes, in which case a new modals instance
      will be created from the hash.
    @param {Object} [options] Options to be passed to the modals's `sync()` and
        `set()` methods and mixed into the `add` event when the modals is added
        to the list.
      @param {Boolean} [options.silent=false] If `true`, no `add` event(s) will
          be fired.
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        falsy.
      @param {mixed} callback.response The server's response.
    @return {Model} Created modals.
    **/
    create: function (model, options, callback) {
        var self = this;

        // Allow callback as second arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        if (!(model instanceof Y.Model)) {
            model = new this.model(model);
        }

        return model.save(options, function (err) {
            if (!err) {
                self.add(model, options);
            }

            callback && callback.apply(null, arguments);
        });
    },

    /**
    If _name_ refers to an attribute on this ModelList instance, returns the
    value of that attribute. Otherwise, returns an array containing the values
    of the specified attribute from each modals in this list.

    @method get
    @param {String} name Attribute name or object property path.
    @return {Any|Array} Attribute value or array of attribute values.
    @see Model.get()
    **/
    get: function (name) {
        if (this.attrAdded(name)) {
            return AttrProto.get.apply(this, arguments);
        }

        return this.invoke('get', name);
    },

    /**
    If _name_ refers to an attribute on this ModelList instance, returns the
    HTML-escaped value of that attribute. Otherwise, returns an array containing
    the HTML-escaped values of the specified attribute from each modals in this
    list.

    The values are escaped using `Escape.html()`.

    @method getAsHTML
    @param {String} name Attribute name or object property path.
    @return {String|String[]} HTML-escaped value or array of HTML-escaped
      values.
    @see Model.getAsHTML()
    **/
    getAsHTML: function (name) {
        if (this.attrAdded(name)) {
            return Y.Escape.html(AttrProto.get.apply(this, arguments));
        }

        return this.invoke('getAsHTML', name);
    },


    /**
    If _name_ refers to an attribute on this ModelList instance, returns the
    URL-encoded value of that attribute. Otherwise, returns an array containing
    the URL-encoded values of the specified attribute from each modals in this
    list.

    The values are encoded using the native `encodeURIComponent()` function.

    @method getAsURL
    @param {String} name Attribute name or object property path.
    @return {String|String[]} URL-encoded value or array of URL-encoded values.
    @see Model.getAsURL()
    **/
    getAsURL: function (name) {
        if (this.attrAdded(name)) {
            return encodeURIComponent(AttrProto.get.apply(this, arguments));
        }

        return this.invoke('getAsURL', name);
    },

    /**
    Returns the modals with the specified _clientId_, or `null` if not found.

    @method getByClientId
    @param {String} clientId Client id.
    @return {Model} Model, or `null` if not found.
    **/
    getByClientId: function (clientId) {
        return this._clientIdMap[clientId] || null;
    },

    /**
    Returns the modals with the specified _id_, or `null` if not found.

    Note that modals aren't expected to have an id until they're saved, so if
    you're working with unsaved modals, it may be safer to call
    `getByClientId()`.

    @method getById
    @param {String|Number} id Model id.
    @return {Model} Model, or `null` if not found.
    **/
    getById: function (id) {
        return this._idMap[id] || null;
    },

    /**
    Calls the named method on every modals in the list. Any arguments provided
    after _name_ will be passed on to the invoked method.

    @method invoke
    @param {String} name Name of the method to call on each modals.
    @param {Any} [args*] Zero or more arguments to pass to the invoked method.
    @return {Array} Array of return values, indexed according to the index of
      the modals on which the method was called.
    **/
    invoke: function (name /*, args* */) {
        var args = [this._items, name].concat(YArray(arguments, 1, true));
        return YArray.invoke.apply(YArray, args);
    },

    /**
    Returns the modals at the specified _index_.

    @method item
    @param {Number} index Index of the modals to fetch.
    @return {Model} The modals at the specified index, or `undefined` if there
      isn't a modals there.
    **/

    // item() is inherited from ArrayList.

    /**
    Loads this list of modals from the server.

    This method delegates to the `sync()` method to perform the actual load
    operation, which is an asynchronous action. Specify a _callback_ function to
    be notified of success or failure.

    If the load operation succeeds, a `reset` event will be fired.

    @method load
    @param {Object} [options] Options to be passed to `sync()` and to
      `reset()` when adding the loaded modals. It's up to the custom sync
      implementation to determine what options it supports or requires, if any.
    @param {Function} [callback] Called when the sync operation finishes.
      @param {Error} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        falsy.
      @param {Any} callback.response The server's response. This value will
        be passed to the `parse()` method, which is expected to parse it and
        return an array of modals attribute hashes.
    @chainable
    **/
    load: function (options, callback) {
        var self = this;

        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        this.sync('read', options, function (err, response) {
            if (!err) {
                self.reset(self.parse(response), options);
            }

            callback && callback.apply(null, arguments);
        });

        return this;
    },

    /**
    Executes the specified function on each modals in this list and returns an
    array of the function's collected return values.

    @method map
    @param {Function} fn Function to execute on each modals.
      @param {Model} fn.modals Current modals being iterated.
      @param {Number} fn.index Index of the current modals in the list.
      @param {Model[]} fn.modals Array of modals being iterated.
    @param {Object} [thisObj] `this` object to use when calling _fn_.
    @return {Array} Array of return values from _fn_.
    **/
    map: function (fn, thisObj) {
        return YArray.map(this._items, fn, thisObj);
    },

    /**
    Called to parse the _response_ when the list is loaded from the server.
    This method receives a server _response_ and is expected to return an array
    of modals attribute hashes.

    The default implementation assumes that _response_ is either an array of
    attribute hashes or a JSON string that can be parsed into an array of
    attribute hashes. If _response_ is a JSON string and either `Y.JSON` or the
    native `JSON` object are available, it will be parsed automatically. If a
    parse error occurs, an `error` event will be fired and the modals will not be
    updated.

    You may override this method to implement custom parsing logic if necessary.

    @method parse
    @param {Any} response Server response.
    @return {Object[]} Array of modals attribute hashes.
    **/
    parse: function (response) {
        if (typeof response === 'string') {
            try {
                return Y.JSON.parse(response) || [];
            } catch (ex) {
                this.fire(EVT_ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });

                return null;
            }
        }

        return response || [];
    },

    /**
    Removes the specified modals or array of modals from this list.

    @method remove
    @param {Model|Model[]} models Models to remove.
    @param {Object} [options] Data to be mixed into the event facade of the
        `remove` event(s) for the removed modals.
      @param {Boolean} [options.silent=false] If `true`, no `remove` event(s)
          will be fired.
    @return {Model|Model[]} Removed modals or array of removed modals.
    **/
    remove: function (models, options) {
        if (Lang.isArray(models)) {
            return YArray.map(models, function (model) {
                return this._remove(model, options);
            }, this);
        } else {
            return this._remove(models, options);
        }
    },

    /**
    Completely replaces all modals in the list with those specified, and fires a
    single `reset` event.

    Use `reset` when you want to add or remove a large number of items at once
    without firing `add` or `remove` events for each one.

    @method reset
    @param {Model[]|Object[]} [models] Models to add. May be existing modals
      instances or hashes of modals attributes, in which case new modals instances
      will be created from the hashes. Calling `reset()` without passing in any
      modals will clear the list.
    @param {Object} [options] Data to be mixed into the event facade of the
        `reset` event.
      @param {Boolean} [options.silent=false] If `true`, no `reset` event will
          be fired.
    @chainable
    **/
    reset: function (models, options) {
        models  || (models  = []);
        options || (options = {});

        var facade = Y.merge(options, {
                src   : 'reset',
                models: YArray.map(models, function (model) {
                    return model instanceof Y.Model ? model :
                            new this.model(model);
                }, this)
            });

        // Sort the modals in the facade before firing the reset event.
        if (this.comparator) {
            facade.models.sort(Y.bind(this._sort, this));
        }

        options.silent ? this._defResetFn(facade) :
            this.fire(EVT_RESET, facade);

        return this;
    },

    /**
    Forcibly re-sorts the list.

    Usually it shouldn't be necessary to call this method since the list
    maintains its sort order when items are added and removed, but if you change
    the `comparator` function after items are already in the list, you'll need
    to re-sort.

    @method sort
    @param {Object} [options] Data to be mixed into the event facade of the
        `reset` event.
      @param {Boolean} [options.silent=false] If `true`, no `reset` event will
          be fired.
    @chainable
    **/
    sort: function (options) {
        var models = this._items.concat(),
            facade;

        if (!this.comparator) {
            return this;
        }

        options || (options = {});

        models.sort(Y.bind(this._sort, this));

        facade = Y.merge(options, {
            models: models,
            src   : 'sort'
        });

        options.silent ? this._defResetFn(facade) :
                this.fire(EVT_RESET, facade);

        return this;
    },

    /**
    Override this method to provide a custom persistence implementation for this
    list. The default method just calls the callback without actually doing
    anything.

    This method is called internally by `load()`.

    @method sync
    @param {String} action Sync action to perform. May be one of the following:

      * `create`: Store a list of newly-created modals for the first time.
      * `delete`: Delete a list of existing modals.
      * `read`  : Load a list of existing modals.
      * `update`: Update a list of existing modals.

      Currently, modals lists only make use of the `read` action, but other
      actions may be used in future versions.

    @param {Object} [options] Sync options. It's up to the custom sync
      implementation to determine what options it supports or requires, if any.
    @param {Function} [callback] Called when the sync operation finishes.
      @param {Error} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        falsy.
      @param {Any} [callback.response] The server's response. This value will
        be passed to the `parse()` method, which is expected to parse it and
        return an array of modals attribute hashes.
    **/
    sync: function (/* action, options, callback */) {
        var callback = YArray(arguments, 0, true).pop();

        if (typeof callback === 'function') {
            callback();
        }
    },

    /**
    Returns an array containing the modals in this list.

    @method toArray
    @return {Array} Array containing the modals in this list.
    **/
    toArray: function () {
        return this._items.concat();
    },

    /**
    Returns an array containing attribute hashes for each modals in this list,
    suitable for being passed to `Y.JSON.stringify()`.

    Under the hood, this method calls `toJSON()` on each modals in the list and
    pushes the results into an array.

    @method toJSON
    @return {Object[]} Array of modals attribute hashes.
    @see Model.toJSON()
    **/
    toJSON: function () {
        return this.map(function (model) {
            return model.toJSON();
        });
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Adds the specified _model_ if it isn't already in this list.

    @method _add
    @param {Model|Object} model Model or object to add.
    @param {Object} [options] Data to be mixed into the event facade of the
        `add` event for the added modals.
      @param {Boolean} [options.silent=false] If `true`, no `add` event will be
          fired.
    @return {Model} The added modals.
    @protected
    **/
    _add: function (model, options) {
        var facade;

        options || (options = {});

        if (!(model instanceof Y.Model)) {
            model = new this.model(model);
        }

        if (this._clientIdMap[model.get('clientId')]) {
            this.fire(EVT_ERROR, {
                error: 'Model is already in the list.',
                model: model,
                src  : 'add'
            });

            return;
        }

        facade = Y.merge(options, {
            index: this._findIndex(model),
            model: model
        });

        options.silent ? this._defAddFn(facade) : this.fire(EVT_ADD, facade);

        return model;
    },

    /**
    Adds this list as a bubble target for the specified modals's events.

    @method _attachList
    @param {Model} model Model to attach to this list.
    @protected
    **/
    _attachList: function (model) {
        // Attach this list and make it a bubble target for the modals.
        model.lists.push(this);
        model.addTarget(this);
    },

    /**
    Clears all internal state and the internal list of modals, returning this
    list to an empty state. Automatically detaches all modals in the list.

    @method _clear
    @protected
    **/
    _clear: function () {
        YArray.each(this._items, this._detachList, this);

        this._clientIdMap = {};
        this._idMap       = {};
        this._items       = [];
    },

    /**
    Removes this list as a bubble target for the specified modals's events.

    @method _detachList
    @param {Model} model Model to detach.
    @protected
    **/
    _detachList: function (model) {
        var index = YArray.indexOf(model.lists, this);

        if (index > -1) {
            model.lists.splice(index, 1);
            model.removeTarget(this);
        }
    },

    /**
    Returns the index at which the given _model_ should be inserted to maintain
    the sort order of the list.

    @method _findIndex
    @param {Model} model The modals being inserted.
    @return {Number} Index at which the modals should be inserted.
    @protected
    **/
    _findIndex: function (model) {
        var comparator = this.comparator,
            items      = this._items,
            max        = items.length,
            min        = 0,
            item, middle, needle;

        if (!comparator || !items.length) { return items.length; }

        needle = comparator(model);

        // Perform an iterative binary search to determine the correct position
        // based on the return value of the `comparator` function.
        while (min < max) {
            middle = (min + max) >> 1; // Divide by two and discard remainder.
            item   = items[middle];

            if (comparator(item) < needle) {
                min = middle + 1;
            } else {
                max = middle;
            }
        }

        return min;
    },

    /**
    Removes the specified _model_ if it's in this list.

    @method _remove
    @param {Model} model Model to remove.
    @param {Object} [options] Data to be mixed into the event facade of the
        `remove` event for the removed modals.
      @param {Boolean} [options.silent=false] If `true`, no `remove` event will
          be fired.
    @return {Model} Removed modals.
    @protected
    **/
    _remove: function (model, options) {
        var index = this.indexOf(model),
            facade;

        options || (options = {});

        if (index === -1) {
            this.fire(EVT_ERROR, {
                error: 'Model is not in the list.',
                model: model,
                src  : 'remove'
            });

            return;
        }

        facade = Y.merge(options, {
            index: index,
            model: model
        });

        options.silent ? this._defRemoveFn(facade) :
                this.fire(EVT_REMOVE, facade);

        return model;
    },

    /**
    Array sort function used by `sort()` to re-sort the modals in the list.

    @method _sort
    @param {Model} a First modals to compare.
    @param {Model} b Second modals to compare.
    @return {Number} `-1` if _a_ is less than _b_, `0` if equal, `1` if greater.
    @protected
    **/
    _sort: function (a, b) {
        var aValue = this.comparator(a),
            bValue = this.comparator(b);

        return aValue < bValue ? -1 : (aValue > bValue ? 1 : 0);
    },

    // -- Event Handlers -------------------------------------------------------

    /**
    Updates the modals maps when a modals's `id` attribute changes.

    @method _afterIdChange
    @param {EventFacade} e
    @protected
    **/
    _afterIdChange: function (e) {
        Lang.isValue(e.prevVal) && delete this._idMap[e.prevVal];
        Lang.isValue(e.newVal) && (this._idMap[e.newVal] = e.target);
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
    Default event handler for `add` events.

    @method _defAddFn
    @param {EventFacade} e
    @protected
    **/
    _defAddFn: function (e) {
        var model = e.model,
            id    = model.get('id');

        this._clientIdMap[model.get('clientId')] = model;

        if (Lang.isValue(id)) {
            this._idMap[id] = model;
        }

        this._attachList(model);
        this._items.splice(e.index, 0, model);
    },

    /**
    Default event handler for `remove` events.

    @method _defRemoveFn
    @param {EventFacade} e
    @protected
    **/
    _defRemoveFn: function (e) {
        var model = e.model,
            id    = model.get('id');

        this._detachList(model);
        delete this._clientIdMap[model.get('clientId')];

        if (Lang.isValue(id)) {
            delete this._idMap[id];
        }

        this._items.splice(e.index, 1);
    },

    /**
    Default event handler for `reset` events.

    @method _defResetFn
    @param {EventFacade} e
    @protected
    **/
    _defResetFn: function (e) {
        // When fired from the `sort` method, we don't need to clear the list or
        // add any modals, since the existing modals are sorted in place.
        if (e.src === 'sort') {
            this._items = e.models.concat();
            return;
        }

        this._clear();

        if (e.models.length) {
            this.add(e.models, {silent: true});
        }
    }
}, {
    NAME: 'modelList'
});

Y.augment(ModelList, Y.ArrayList);


}, '3.4.0' ,{requires:['array-extras', 'array-invoke', 'arraylist', 'base-build', 'escape', 'json-parse', 'model']});
