/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add('exec-command', function(Y) {


    /**
     * Plugin for the frame module to handle execCommands for Editor
     * @class Plugin.ExecCommand
     * @extends Base
     * @constructor
     * @module editor
     * @submodule exec-command
     */
        var ExecCommand = function() {
            ExecCommand.superclass.constructor.apply(this, arguments);
        };

        Y.extend(ExecCommand, Y.Base, {
            /**
            * An internal workflowReference to the keyCode of the last key that was pressed.
            * @private
            * @property _lastKey
            */
            _lastKey: null,
            /**
            * An internal workflowReference to the instance of the frame plugged into.
            * @private
            * @property _inst
            */
            _inst: null,
            /**
            * Execute a command on the frame's document.
            * @method command
            * @param {String} action The action to perform (bold, italic, fontname)
            * @param {String} value The optional value (helvetica)
            * @return {Node/NodeList} Should return the Node/Nodelist affected
            */
            command: function(action, value) {
                var fn = ExecCommand.COMMANDS[action];
                
                if (fn) {
                    return fn.call(this, action, value);
                } else {
                    return this._command(action, value);
                }
            },
            /**
            * The private version of execCommand that doesn't filter for overrides.
            * @private
            * @method _command
            * @param {String} action The action to perform (bold, italic, fontname)
            * @param {String} value The optional value (helvetica)
            */
            _command: function(action, value) {
                var inst = this.getInstance();
                try {
                    try {
                        inst.config.doc.execCommand('styleWithCSS', null, 1);
                    } catch (e1) {
                        try {
                            inst.config.doc.execCommand('useCSS', null, 0);
                        } catch (e2) {
                        }
                    }
                    inst.config.doc.execCommand(action, null, value);
                } catch (e) {
                }
            },
            /**
            * Get's the instance of YUI bound to the parent frame
            * @method getInstance
            * @return {YUI} The YUI instance bound to the parent frame
            */
            getInstance: function() {
                if (!this._inst) {
                    this._inst = this.get('host').getInstance();
                }
                return this._inst;
            },
            initializer: function() {
                Y.mix(this.get('host'), {
                    execCommand: function(action, value) {
                        return this.exec.command(action, value);
                    },
                    _execCommand: function(action, value) {
                        return this.exec._command(action, value);
                    }
                });

                this.get('host').on('dom:keypress', Y.bind(function(e) {
                    this._lastKey = e.keyCode;
                }, this));
            }
        }, {
            /**
            * execCommand
            * @property NAME
            * @static
            */
            NAME: 'execCommand',
            /**
            * exec
            * @property NS
            * @static
            */
            NS: 'exec',
            ATTRS: {
                host: {
                    value: false
                }
            },
            /**
            * Static object literal of execCommand overrides
            * @property COMMANDS
            * @static
            */
            COMMANDS: {
                /**
                * Wraps the content with a new element of type (tag)
                * @method COMMANDS.wrap
                * @static
                * @param {String} cmd The command executed: wrap
                * @param {String} tag The tag to wrap the selection with
                * @return {NodeList} NodeList of the items touched by this command.
                */
                wrap: function(cmd, tag) {
                    var inst = this.getInstance();
                    return (new inst.Selection()).wrapContent(tag);
                },
                /**
                * Inserts the provided HTML at the cursor, should be a single element.
                * @method COMMANDS.inserthtml
                * @static
                * @param {String} cmd The command executed: inserthtml
                * @param {String} html The html to insert
                * @return {Node} Node instance of the item touched by this command.
                */
                inserthtml: function(cmd, html) {
                    var inst = this.getInstance();
                    if (inst.Selection.hasCursor() || Y.UA.ie) {
                        return (new inst.Selection()).insertContent(html);
                    } else {
                        this._command('inserthtml', html);
                    }
                },
                /**
                * Inserts the provided HTML at the cursor, and focuses the cursor afterwards.
                * @method COMMANDS.insertandfocus
                * @static
                * @param {String} cmd The command executed: insertandfocus
                * @param {String} html The html to insert
                * @return {Node} Node instance of the item touched by this command.
                */
                insertandfocus: function(cmd, html) {
                    var inst = this.getInstance(), out, sel;
                    if (inst.Selection.hasCursor()) {
                        html += inst.Selection.CURSOR;
                        out = this.command('inserthtml', html);
                        sel = new inst.Selection();
                        sel.focusCursor(true, true);
                    } else {
                        this.command('inserthtml', html);
                    }
                    return out;
                },
                /**
                * Inserts a BR at the current cursor position
                * @method COMMANDS.insertbr
                * @static
                * @param {String} cmd The command executed: insertbr
                */
                insertbr: function(cmd) {
                    var inst = this.getInstance(),
                        sel = new inst.Selection(),
                        html = '<var>|</var>', last = null,
                        q = (Y.UA.webkit) ? 'span.Apple-style-span,var' : 'var';

                    if (sel._selection.pasteHTML) {
                        sel._selection.pasteHTML(html);
                    } else {
                        this._command('inserthtml', html);
                    }

                    var insert = function(n) {
                        var c = inst.Node.create('<br>');
                        n.insert(c, 'before');
                        return c;
                    };

                    inst.all(q).each(function(n) {
                        var g = true;   
                        if (Y.UA.webkit) {
                            g = false;
                            if (n.get('innerHTML') === '|') {
                                g = true;
                            }
                        }
                        if (g) {
                            last = insert(n);
                            if ((!last.previous() || !last.previous().test('br')) && Y.UA.gecko) {
                                var s = last.cloneNode();
                                last.insert(s, 'after');
                                last = s;
                            }
                            n.remove();
                        }
                    });
                    if (Y.UA.webkit && last) {
                        insert(last);
                        sel.selectNode(last);
                    }
                },
                /**
                * Inserts an image at the cursor position
                * @method COMMANDS.insertimage
                * @static
                * @param {String} cmd The command executed: insertimage
                * @param {String} img The url of the image to be inserted
                * @return {Node} Node instance of the item touched by this command.
                */
                insertimage: function(cmd, img) {
                    return this.command('inserthtml', '<img src="' + img + '">');
                },
                /**
                * Add a class to all of the elements in the selection
                * @method COMMANDS.addclass
                * @static
                * @param {String} cmd The command executed: addclass
                * @param {String} cls The className to add
                * @return {NodeList} NodeList of the items touched by this command.
                */
                addclass: function(cmd, cls) {
                    var inst = this.getInstance();
                    return (new inst.Selection()).getSelected().addClass(cls);
                },
                /**
                * Remove a class from all of the elements in the selection
                * @method COMMANDS.removeclass
                * @static
                * @param {String} cmd The command executed: removeclass
                * @param {String} cls The className to remove
                * @return {NodeList} NodeList of the items touched by this command.
                */
                removeclass: function(cmd, cls) {
                    var inst = this.getInstance();
                    return (new inst.Selection()).getSelected().removeClass(cls);
                },
                /**
                * Adds a forecolor to the current selection, or creates a new element and applies it
                * @method COMMANDS.forecolor
                * @static
                * @param {String} cmd The command executed: forecolor
                * @param {String} val The color value to apply
                * @return {NodeList} NodeList of the items touched by this command.
                */
                forecolor: function(cmd, val) {
                    var inst = this.getInstance(),
                        sel = new inst.Selection(), n;

                    if (!Y.UA.ie) {
                        this._command('useCSS', false);
                    }
                    if (inst.Selection.hasCursor()) {
                        if (sel.isCollapsed) {
                            if (sel.anchorNode && (sel.anchorNode.get('innerHTML') === '&nbsp;')) {
                                sel.anchorNode.setStyle('color', val);
                                n = sel.anchorNode;
                            } else {
                                n = this.command('inserthtml', '<span style="color: ' + val + '">' + inst.Selection.CURSOR + '</span>');
                                sel.focusCursor(true, true);
                            }
                            return n;
                        } else {
                            return this._command(cmd, val);
                        }
                    } else {
                        this._command(cmd, val);
                    }
                },
                /**
                * Adds a background color to the current selection, or creates a new element and applies it
                * @method COMMANDS.backcolor
                * @static
                * @param {String} cmd The command executed: backcolor
                * @param {String} val The color value to apply
                * @return {NodeList} NodeList of the items touched by this command.
                */
                backcolor: function(cmd, val) {
                    var inst = this.getInstance(),
                        sel = new inst.Selection(), n;
                    
                    if (Y.UA.gecko || Y.UA.opera) {
                        cmd = 'hilitecolor';
                    }
                    if (!Y.UA.ie) {
                        this._command('useCSS', false);
                    }
                    if (inst.Selection.hasCursor()) {
                        if (sel.isCollapsed) {
                            if (sel.anchorNode && (sel.anchorNode.get('innerHTML') === '&nbsp;')) {
                                sel.anchorNode.setStyle('backgroundColor', val);
                                n = sel.anchorNode;
                            } else {
                                n = this.command('inserthtml', '<span style="background-color: ' + val + '">' + inst.Selection.CURSOR + '</span>');
                                sel.focusCursor(true, true);
                            }
                            return n;
                        } else {
                            return this._command(cmd, val);
                        }
                    } else {
                        this._command(cmd, val);
                    }
                },
                /**
                * Sugar method, calles backcolor
                * @method COMMANDS.hilitecolor
                * @static
                * @param {String} cmd The command executed: backcolor
                * @param {String} val The color value to apply
                * @return {NodeList} NodeList of the items touched by this command.
                */
                hilitecolor: function() {
                    return ExecCommand.COMMANDS.backcolor.apply(this, arguments);
                },
                /**
                * Adds a font name to the current selection, or creates a new element and applies it
                * @method COMMANDS.fontname2
                * @deprecated
                * @static
                * @param {String} cmd The command executed: fontname
                * @param {String} val The font name to apply
                * @return {NodeList} NodeList of the items touched by this command.
                */
                fontname2: function(cmd, val) {
                    this._command('fontname', val);
                    var inst = this.getInstance(),
                        sel = new inst.Selection();
                    
                    if (sel.isCollapsed && (this._lastKey != 32)) {
                        if (sel.anchorNode.test('font')) {
                            sel.anchorNode.set('face', val);
                        }
                    }
                },
                /**
                * Adds a fontsize to the current selection, or creates a new element and applies it
                * @method COMMANDS.fontsize2
                * @deprecated
                * @static
                * @param {String} cmd The command executed: fontsize
                * @param {String} val The font size to apply
                * @return {NodeList} NodeList of the items touched by this command.
                */
                fontsize2: function(cmd, val) {
                    this._command('fontsize', val);

                    var inst = this.getInstance(),
                        sel = new inst.Selection();
                    
                    if (sel.isCollapsed && sel.anchorNode && (this._lastKey != 32)) {
                        if (Y.UA.webkit) {
                            if (sel.anchorNode.getStyle('lineHeight')) {
                                sel.anchorNode.setStyle('lineHeight', '');
                            }
                        }
                        if (sel.anchorNode.test('font')) {
                            sel.anchorNode.set('size', val);
                        } else if (Y.UA.gecko) {
                            var p = sel.anchorNode.ancestor(inst.Selection.DEFAULT_BLOCK_TAG);
                            if (p) {
                                p.setStyle('fontSize', '');
                            }
                        }
                    }
                },
                /**
                * Overload for COMMANDS.list
                * @method COMMANDS.insertorderedlist
                * @static
                * @param {String} cmd The command executed: list, ul
                */
                insertunorderedlist: function(cmd) {
                    this.command('list', 'ul');
                },
                /**
                * Overload for COMMANDS.list
                * @method COMMANDS.insertunorderedlist
                * @static
                * @param {String} cmd The command executed: list, ol
                */
                insertorderedlist: function(cmd) {
                    this.command('list', 'ol');
                },
                /**
                * Noramlizes lists creation/destruction for IE. All others pass through to native calls
                * @method COMMANDS.list
                * @static
                * @param {String} cmd The command executed: list (not used)
                * @param {String} tag The tag to deal with
                */
                list: function(cmd, tag) {
                    var inst = this.getInstance(), html,
                        DIR = 'dir', cls = 'yui3-touched',
                        dir, range, div, elm, n, str, s, par, list, lis,
                        useP = (inst.host.editorPara ? true : false),
                        sel = new inst.Selection();

                    cmd = 'insert' + ((tag === 'ul') ? 'un' : '') + 'orderedlist';
                    
                    if (Y.UA.ie && !sel.isCollapsed) {
                        range = sel._selection;
                        html = range.htmlText;
                        div = inst.Node.create(html);
                        if (div.test('li') || div.one('li')) {
                            this._command(cmd, null);
                            return;
                        }
                        if (div.test(tag)) {
                            elm = range.item ? range.item(0) : range.parentElement();
                            n = inst.one(elm);
                            lis = n.all('li');

                            str = '<div>';
                            lis.each(function(l) {
                                if (useP) {
                                    str += '<p>' + l.get('innerHTML') + '</p>';
                                } else {
                                    str += l.get('innerHTML') + '<br>';
                                }
                            });
                            str += '</div>';
                            s = inst.Node.create(str);
                            if (n.get('parentNode').test('div')) {
                                n = n.get('parentNode');
                            }
                            if (n && n.hasAttribute(DIR)) {
                                if (useP) {
                                    s.all('p').setAttribute(DIR, n.getAttribute(DIR));
                                } else {
                                    s.setAttribute(DIR, n.getAttribute(DIR));
                                }
                            }
                            if (useP) {
                                n.replace(s.get('innerHTML'));
                            } else {
                                n.replace(s);
                            }
                            if (range.moveToElementText) {
                                range.moveToElementText(s._node);
                            }
                            range.select();
                        } else {
                            par = Y.one(range.parentElement());
                            if (!par.test(inst.Selection.BLOCKS)) {
                                par = par.ancestor(inst.Selection.BLOCKS);
                            }
                            if (par) {
                                if (par.hasAttribute(DIR)) {
                                    dir = par.getAttribute(DIR);
                                }
                            }
                            if (html.indexOf('<br>') > -1) {
                                html = html.split(/<br>/i);
                            } else {
                                var tmp = inst.Node.create(html),
                                ps = tmp.all('p');

                                if (ps.size()) {
                                    html = [];
                                    ps.each(function(n) {
                                        html.push(n.get('innerHTML'));
                                    });
                                } else {
                                    html = [html];
                                }
                            }
                            list = '<' + tag + ' id="ie-list">';
                            Y.each(html, function(v) {
                                var a = inst.Node.create(v);
                                if (a.test('p')) {
                                    if (a.hasAttribute(DIR)) {
                                        dir = a.getAttribute(DIR);
                                    }
                                    v = a.get('innerHTML');
                                }
                                list += '<li>' + v + '</li>';
                            });
                            list += '</' + tag + '>';
                            range.pasteHTML(list);
                            elm = inst.config.doc.getElementById('ie-list');
                            elm.id = '';
                            if (dir) {
                                elm.setAttribute(DIR, dir);
                            }
                            if (range.moveToElementText) {
                                range.moveToElementText(elm);
                            }
                            range.select();
                        }
                    } else if (Y.UA.ie) {
                        par = inst.one(sel._selection.parentElement());
                        if (par.test('p')) {
                            if (par && par.hasAttribute(DIR)) {
                                dir = par.getAttribute(DIR);
                            }
                            html = Y.Selection.getText(par);
                            if (html === '') {
                                var sdir = '';
                                if (dir) {
                                    sdir = ' dir="' + dir + '"';
                                }
                                list = inst.Node.create(Y.Lang.sub('<{tag}{dir}><li></li></{tag}>', { tag: tag, dir: sdir }));
                                par.replace(list);
                                sel.selectNode(list.one('li'));
                            } else {
                                this._command(cmd, null);
                            }
                        } else {
                            this._command(cmd, null);
                        }
                    } else {
                        inst.all(tag).addClass(cls);
                        if (sel.anchorNode.test(inst.Selection.BLOCKS)) {
                            par = sel.anchorNode;
                        } else {
                            par = sel.anchorNode.ancestor(inst.Selection.BLOCKS);
                        }
                        if (!par) { //No parent, find the first block under the anchorNode
                            par = sel.anchorNode.one(inst.Selection.BLOCKS);
                        }

                        if (par && par.hasAttribute(DIR)) {
                            dir = par.getAttribute(DIR);
                        }
                        if (par && par.test(tag)) {
                            html = inst.Node.create('<div/>');
                            elm = par.all('li');
                            elm.each(function(h) {
                                if (useP) {
                                    html.append('<p>' + h.get('innerHTML') + '</p>');
                                } else {
                                    html.append(h.get('innerHTML') + '<br>');
                                }
                            });
                            if (dir) {
                                if (useP) {
                                    html.all('p').setAttribute(DIR, dir);
                                } else {
                                    html.setAttribute(DIR, dir);
                                }
                            }
                            if (useP) {
                                par.replace(html.get('innerHTML'));
                            } else {
                                par.replace(html);
                            }
                            sel.selectNode(html.get('firstChild'));
                        } else {
                            this._command(cmd, null);
                        }
                        list = inst.all(tag);
                        if (dir) {
                            if (list.size()) {
                                //Changed to a List
                                list.each(function(n) {
                                    if (!n.hasClass(cls)) {
                                        n.setAttribute(DIR, dir);
                                    }
                                });
                            }
                        }

                        list.removeClass(cls);
                    }
                },
                /**
                * Noramlizes alignment for Webkit Browsers
                * @method COMMANDS.justify
                * @static
                * @param {String} cmd The command executed: justify (not used)
                * @param {String} val The actual command from the justify{center,all,left,right} stubs
                */
                justify: function(cmd, val) {
                    if (Y.UA.webkit) {
                        var inst = this.getInstance(),
                            sel = new inst.Selection(),
                            aNode = sel.anchorNode;

                            var bgColor = aNode.getStyle('backgroundColor');
                            this._command(val);
                            sel = new inst.Selection();
                            if (sel.anchorNode.test('div')) {
                                var html = '<span>' + sel.anchorNode.get('innerHTML') + '</span>';
                                sel.anchorNode.set('innerHTML', html);
                                sel.anchorNode.one('span').setStyle('backgroundColor', bgColor);
                                sel.selectNode(sel.anchorNode.one('span'));
                            }
                    } else {
                        this._command(val);
                    }
                },
                /**
                * Override method for COMMANDS.justify
                * @method COMMANDS.justifycenter
                * @static
                */
                justifycenter: function(cmd) {
                    this.command('justify', 'justifycenter');
                },
                /**
                * Override method for COMMANDS.justify
                * @method COMMANDS.justifyleft
                * @static
                */
                justifyleft: function(cmd) {
                    this.command('justify', 'justifyleft');
                },
                /**
                * Override method for COMMANDS.justify
                * @method COMMANDS.justifyright
                * @static
                */
                justifyright: function(cmd) {
                    this.command('justify', 'justifyright');
                },
                /**
                * Override method for COMMANDS.justify
                * @method COMMANDS.justifyfull
                * @static
                */
                justifyfull: function(cmd) {
                    this.command('justify', 'justifyfull');
                }
            }
        });
        
        /**
        * This method is meant to normalize IE's in ability to exec the proper command on elements with CSS styling.
        * @method fixIETags
        * @protected
        * @param {String} cmd The command to execute
        * @param {String} tag The tag to create
        * @param {String} rule The rule that we are looking for.
        */
        var fixIETags = function(cmd, tag, rule) {
            var inst = this.getInstance(),
                doc = inst.config.doc,
                sel = doc.selection.createRange(),
                o = doc.queryCommandValue(cmd),
                html, reg, m, p, d, s, c;

            if (o) {
                html = sel.htmlText;
                reg = new RegExp(rule, 'g');
                m = html.match(reg);

                if (m) {
                    html = html.replace(rule + ';', '').replace(rule, '');

                    sel.pasteHTML('<var id="yui-ie-bs">');

                    p = doc.getElementById('yui-ie-bs');
                    d = doc.createElement('div');
                    s = doc.createElement(tag);
                    
                    d.innerHTML = html;
                    if (p.parentNode !== inst.config.doc.body) {
                        p = p.parentNode;
                    }

                    c = d.childNodes;

                    p.parentNode.replaceChild(s, p);

                    Y.each(c, function(f) {
                        s.appendChild(f);
                    });
                    sel.collapse();
                    if (sel.moveToElementText) {
                        sel.moveToElementText(s);
                    }
                    sel.select();
                }
            }
            this._command(cmd);
        };

        if (Y.UA.ie) {
            ExecCommand.COMMANDS.bold = function() {
                fixIETags.call(this, 'bold', 'b', 'FONT-WEIGHT: bold');
            };
            ExecCommand.COMMANDS.italic = function() {
                fixIETags.call(this, 'italic', 'i', 'FONT-STYLE: italic');
            };
            ExecCommand.COMMANDS.underline = function() {
                fixIETags.call(this, 'underline', 'u', 'TEXT-DECORATION: underline');
            };
        }

        Y.namespace('Plugin');
        Y.Plugin.ExecCommand = ExecCommand;



}, '3.4.0' ,{skinnable:false, requires:['frame']});
