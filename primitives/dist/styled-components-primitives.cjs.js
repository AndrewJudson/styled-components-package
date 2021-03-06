'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reactPrimitives = require('react-primitives');
var tslib = require('tslib');
var React = require('react');
require('shallowequal');
var stylis = require('stylis');
var unitless = require('@emotion/unitless');
var transformDeclPairs = require('css-to-react-native');
var postcss = require('postcss');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var reactPrimitives__default = /*#__PURE__*/_interopDefaultLegacy(reactPrimitives);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var unitless__default = /*#__PURE__*/_interopDefaultLegacy(unitless);
var transformDeclPairs__default = /*#__PURE__*/_interopDefaultLegacy(transformDeclPairs);

var EMPTY_ARRAY = Object.freeze([]);
var EMPTY_OBJECT = Object.freeze({});

var errorMap = {
    '1': 'Cannot create styled-component for component: %s.\n\n',
    '2': "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",
    '3': 'Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n',
    '4': 'The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n',
    '5': 'The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n',
    '6': "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",
    '7': 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',
    '8': 'ThemeProvider: Please make your "theme" prop an object.\n\n',
    '9': 'Missing document `<head>`\n\n',
    '10': 'Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n',
    '11': '_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n',
    '12': 'It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n',
    '13': '%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n',
    '14': 'ThemeProvider: "theme" prop is required.\n\n',
    '15': "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",
    '16': "Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",
    '17': "CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n",
};

var ERRORS = process.env.NODE_ENV !== 'production' ? errorMap : {};
/**
 * super basic version of sprintf
 */
function format() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var a = args[0];
    var b = [];
    for (var c = 1, len = args.length; c < len; c += 1) {
        b.push(args[c]);
    }
    b.forEach(function (d) {
        a = a.replace(/%[a-z]/, d);
    });
    return a;
}
/**
 * Create an error file out of errors.md for development and a simple web link to the full errors
 * in production mode.
 */
function throwStyledComponentsError(code) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    if (process.env.NODE_ENV === 'production') {
        return new Error("An error occurred. See https://git.io/JUIaE#" + code + " for more information." + (interpolations.length > 0 ? " Args: " + interpolations.join(', ') : ''));
    }
    else {
        return new Error(format.apply(void 0, tslib.__spreadArray([ERRORS[code]], interpolations)).trim());
    }
}

var SC_ATTR = (typeof process !== 'undefined' && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR)) ||
    'data-styled';
var SC_ATTR_ACTIVE = 'active';
var SC_ATTR_VERSION = 'data-styled-version';
var SC_VERSION = "6.0.0-prealpha";
var SPLITTER = '/*!sc*/\n';
var IS_BROWSER = typeof window !== 'undefined' && 'HTMLElement' in window;
var DISABLE_SPEEDY = Boolean(typeof SC_DISABLE_SPEEDY === 'boolean'
    ? SC_DISABLE_SPEEDY
    : typeof process !== 'undefined' &&
        typeof process.env.REACT_APP_SC_DISABLE_SPEEDY !== 'undefined' &&
        process.env.REACT_APP_SC_DISABLE_SPEEDY !== ''
        ? process.env.REACT_APP_SC_DISABLE_SPEEDY === 'false'
            ? false
            : process.env.REACT_APP_SC_DISABLE_SPEEDY
        : typeof process !== 'undefined' &&
            typeof process.env.SC_DISABLE_SPEEDY !== 'undefined' &&
            process.env.SC_DISABLE_SPEEDY !== ''
            ? process.env.SC_DISABLE_SPEEDY === 'false'
                ? false
                : process.env.SC_DISABLE_SPEEDY
            : process.env.NODE_ENV !== 'production');

/** Create a GroupedTag with an underlying Tag implementation */
var makeGroupedTag = function (tag) {
    return new DefaultGroupedTag(tag);
};
var BASE_SIZE = 1 << 9;
var DefaultGroupedTag = /** @class */ (function () {
    function DefaultGroupedTag(tag) {
        this.groupSizes = new Uint32Array(BASE_SIZE);
        this.length = BASE_SIZE;
        this.tag = tag;
    }
    DefaultGroupedTag.prototype.indexOfGroup = function (group) {
        var index = 0;
        for (var i = 0; i < group; i++) {
            index += this.groupSizes[i];
        }
        return index;
    };
    DefaultGroupedTag.prototype.insertRules = function (group, rules) {
        if (group >= this.groupSizes.length) {
            var oldBuffer = this.groupSizes;
            var oldSize = oldBuffer.length;
            var newSize = oldSize;
            while (group >= newSize) {
                newSize <<= 1;
                if (newSize < 0) {
                    throw throwStyledComponentsError(16, "" + group);
                }
            }
            this.groupSizes = new Uint32Array(newSize);
            this.groupSizes.set(oldBuffer);
            this.length = newSize;
            for (var i = oldSize; i < newSize; i++) {
                this.groupSizes[i] = 0;
            }
        }
        var ruleIndex = this.indexOfGroup(group + 1);
        if (Array.isArray(rules)) {
            for (var i = 0, l = rules.length; i < l; i++) {
                if (this.tag.insertRule(ruleIndex, rules[i])) {
                    this.groupSizes[group]++;
                    ruleIndex++;
                }
            }
        }
        else {
            if (this.tag.insertRule(ruleIndex, rules)) {
                this.groupSizes[group]++;
            }
        }
    };
    DefaultGroupedTag.prototype.clearGroup = function (group) {
        if (group < this.length) {
            var length_1 = this.groupSizes[group];
            var startIndex = this.indexOfGroup(group);
            var endIndex = startIndex + length_1;
            this.groupSizes[group] = 0;
            for (var i = startIndex; i < endIndex; i++) {
                this.tag.deleteRule(startIndex);
            }
        }
    };
    DefaultGroupedTag.prototype.getGroup = function (group) {
        var css = '';
        if (group >= this.length || this.groupSizes[group] === 0) {
            return css;
        }
        var length = this.groupSizes[group];
        var startIndex = this.indexOfGroup(group);
        var endIndex = startIndex + length;
        for (var i = startIndex; i < endIndex; i++) {
            css += "" + this.tag.getRule(i) + SPLITTER;
        }
        return css;
    };
    return DefaultGroupedTag;
}());

var MAX_SMI = 1 << (31 - 1);
var groupIDRegister = new Map();
var reverseRegister = new Map();
var nextFreeGroup = 1;
var getGroupForId = function (id) {
    if (groupIDRegister.has(id)) {
        return groupIDRegister.get(id);
    }
    while (reverseRegister.has(nextFreeGroup)) {
        nextFreeGroup++;
    }
    var group = nextFreeGroup++;
    if (process.env.NODE_ENV !== 'production' && ((group | 0) < 0 || group > MAX_SMI)) {
        throw throwStyledComponentsError(16, "" + group);
    }
    groupIDRegister.set(id, group);
    reverseRegister.set(group, id);
    return group;
};
var getIdForGroup = function (group) {
    return reverseRegister.get(group);
};
var setGroupForId = function (id, group) {
    groupIDRegister.set(id, group);
    reverseRegister.set(group, id);
};

var SELECTOR = "style[" + SC_ATTR + "][" + SC_ATTR_VERSION + "=\"" + SC_VERSION + "\"]";
var MARKER_RE = new RegExp("^" + SC_ATTR + "\\.g(\\d+)\\[id=\"([\\w\\d-]+)\"\\].*?\"([^\"]*)");
var outputSheet = function (sheet) {
    var tag = sheet.getTag();
    var length = tag.length;
    var css = '';
    var _loop_1 = function (group) {
        var id = getIdForGroup(group);
        if (id === undefined)
            return "continue";
        var names = sheet.names.get(id);
        var rules = tag.getGroup(group);
        if (names === undefined || rules.length === 0)
            return "continue";
        var selector = SC_ATTR + ".g" + group + "[id=\"" + id + "\"]";
        var content = '';
        if (names !== undefined) {
            names.forEach(function (name) {
                if (name.length > 0) {
                    content += name + ",";
                }
            });
        }
        // NOTE: It's easier to collect rules and have the marker
        // after the actual rules to simplify the rehydration
        css += "" + rules + selector + "{content:\"" + content + "\"}" + SPLITTER;
    };
    for (var group = 0; group < length; group++) {
        _loop_1(group);
    }
    return css;
};
var rehydrateNamesFromContent = function (sheet, id, content) {
    var names = content.split(',');
    var name;
    for (var i = 0, l = names.length; i < l; i++) {
        // eslint-disable-next-line
        if ((name = names[i])) {
            sheet.registerName(id, name);
        }
    }
};
var rehydrateSheetFromTag = function (sheet, style) {
    var parts = style.innerHTML.split(SPLITTER);
    var rules = [];
    for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i].trim();
        if (!part)
            continue;
        var marker = part.match(MARKER_RE);
        if (marker) {
            var group = parseInt(marker[1], 10) | 0;
            var id = marker[2];
            if (group !== 0) {
                // Rehydrate componentId to group index mapping
                setGroupForId(id, group);
                // Rehydrate names and rules
                // looks like: data-styled.g11[id="idA"]{content:"nameA,"}
                rehydrateNamesFromContent(sheet, id, marker[3]);
                sheet.getTag().insertRules(group, rules);
            }
            rules.length = 0;
        }
        else {
            rules.push(part);
        }
    }
};
var rehydrateSheet = function (sheet) {
    var nodes = document.querySelectorAll(SELECTOR);
    for (var i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i];
        if (node && node.getAttribute(SC_ATTR) !== SC_ATTR_ACTIVE) {
            rehydrateSheetFromTag(sheet, node);
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    }
};

function getNonce() {
    return typeof __webpack_nonce__ !== 'undefined' ? __webpack_nonce__ : null;
}

var ELEMENT_TYPE = 1;
/* Node.ELEMENT_TYPE */
/** Find last style element if any inside target */
var findLastStyleTag = function (target) {
    var childNodes = target.childNodes;
    for (var i = childNodes.length; i >= 0; i--) {
        var child = childNodes[i];
        if (child && child.nodeType === ELEMENT_TYPE && child.hasAttribute(SC_ATTR)) {
            return child;
        }
    }
    return undefined;
};
/** Create a style element inside `target` or <head> after the last */
var makeStyleTag = function (target) {
    var head = document.head;
    var parent = target || head;
    var style = document.createElement('style');
    var prevStyle = findLastStyleTag(parent);
    var nextSibling = prevStyle !== undefined ? prevStyle.nextSibling : null;
    style.setAttribute(SC_ATTR, SC_ATTR_ACTIVE);
    style.setAttribute(SC_ATTR_VERSION, SC_VERSION);
    var nonce = getNonce();
    if (nonce)
        style.setAttribute('nonce', nonce);
    parent.insertBefore(style, nextSibling);
    return style;
};
/** Get the CSSStyleSheet instance for a given style element */
var getSheet = function (tag) {
    if (tag.sheet) {
        return tag.sheet;
    }
    // Avoid Firefox quirk where the style element might not have a sheet property
    var styleSheets = document.styleSheets;
    for (var i = 0, l = styleSheets.length; i < l; i++) {
        var sheet = styleSheets[i];
        if (sheet.ownerNode === tag) {
            return sheet;
        }
    }
    throw throwStyledComponentsError(17);
};

/** Create a CSSStyleSheet-like tag depending on the environment */
var makeTag = function (_a) {
    var isServer = _a.isServer, useCSSOMInjection = _a.useCSSOMInjection, target = _a.target;
    if (isServer) {
        return new VirtualTag(target);
    }
    else if (useCSSOMInjection) {
        return new CSSOMTag(target);
    }
    else {
        return new TextTag(target);
    }
};
var CSSOMTag = /** @class */ (function () {
    function CSSOMTag(target) {
        var element = (this.element = makeStyleTag(target));
        // Avoid Edge bug where empty style elements don't create sheets
        element.appendChild(document.createTextNode(''));
        this.sheet = getSheet(element);
        this.length = 0;
    }
    CSSOMTag.prototype.insertRule = function (index, rule) {
        try {
            this.sheet.insertRule(rule, index);
            this.length++;
            return true;
        }
        catch (_error) {
            return false;
        }
    };
    CSSOMTag.prototype.deleteRule = function (index) {
        this.sheet.deleteRule(index);
        this.length--;
    };
    CSSOMTag.prototype.getRule = function (index) {
        var rule = this.sheet.cssRules[index];
        // Avoid IE11 quirk where cssText is inaccessible on some invalid rules
        if (rule !== undefined && typeof rule.cssText === 'string') {
            return rule.cssText;
        }
        else {
            return '';
        }
    };
    return CSSOMTag;
}());
/** A Tag that emulates the CSSStyleSheet API but uses text nodes */
var TextTag = /** @class */ (function () {
    function TextTag(target) {
        var element = (this.element = makeStyleTag(target));
        this.nodes = element.childNodes;
        this.length = 0;
    }
    TextTag.prototype.insertRule = function (index, rule) {
        if (index <= this.length && index >= 0) {
            var node = document.createTextNode(rule);
            var refNode = this.nodes[index];
            this.element.insertBefore(node, refNode || null);
            this.length++;
            return true;
        }
        else {
            return false;
        }
    };
    TextTag.prototype.deleteRule = function (index) {
        this.element.removeChild(this.nodes[index]);
        this.length--;
    };
    TextTag.prototype.getRule = function (index) {
        if (index < this.length) {
            return this.nodes[index].textContent;
        }
        else {
            return '';
        }
    };
    return TextTag;
}());
/** A completely virtual (server-side) Tag that doesn't manipulate the DOM */
var VirtualTag = /** @class */ (function () {
    function VirtualTag(_target) {
        this.rules = [];
        this.length = 0;
    }
    VirtualTag.prototype.insertRule = function (index, rule) {
        if (index <= this.length) {
            this.rules.splice(index, 0, rule);
            this.length++;
            return true;
        }
        else {
            return false;
        }
    };
    VirtualTag.prototype.deleteRule = function (index) {
        this.rules.splice(index, 1);
        this.length--;
    };
    VirtualTag.prototype.getRule = function (index) {
        if (index < this.length) {
            return this.rules[index];
        }
        else {
            return '';
        }
    };
    return VirtualTag;
}());

var SHOULD_REHYDRATE = IS_BROWSER;
var defaultOptions = {
    isServer: !IS_BROWSER,
    useCSSOMInjection: !DISABLE_SPEEDY,
};
/** Contains the main stylesheet logic for stringification and caching */
var StyleSheet = /** @class */ (function () {
    function StyleSheet(options, globalStyles, names) {
        if (options === void 0) { options = EMPTY_OBJECT; }
        if (globalStyles === void 0) { globalStyles = {}; }
        this.options = tslib.__assign(tslib.__assign({}, defaultOptions), options);
        this.gs = globalStyles;
        this.names = new Map(names);
        // We rehydrate only once and use the sheet that is created first
        if (!this.options.isServer && IS_BROWSER && SHOULD_REHYDRATE) {
            SHOULD_REHYDRATE = false;
            rehydrateSheet(this);
        }
    }
    /** Register a group ID to give it an index */
    StyleSheet.registerId = function (id) {
        return getGroupForId(id);
    };
    StyleSheet.prototype.reconstructWithOptions = function (options, withNames) {
        if (withNames === void 0) { withNames = true; }
        return new StyleSheet(tslib.__assign(tslib.__assign({}, this.options), options), this.gs, (withNames && this.names) || undefined);
    };
    StyleSheet.prototype.allocateGSInstance = function (id) {
        return (this.gs[id] = (this.gs[id] || 0) + 1);
    };
    /** Lazily initialises a GroupedTag for when it's actually needed */
    StyleSheet.prototype.getTag = function () {
        return this.tag || (this.tag = makeGroupedTag(makeTag(this.options)));
    };
    /** Check whether a name is known for caching */
    StyleSheet.prototype.hasNameForId = function (id, name) {
        return this.names.has(id) && this.names.get(id).has(name);
    };
    /** Mark a group's name as known for caching */
    StyleSheet.prototype.registerName = function (id, name) {
        getGroupForId(id);
        if (!this.names.has(id)) {
            var groupNames = new Set();
            groupNames.add(name);
            this.names.set(id, groupNames);
        }
        else {
            this.names.get(id).add(name);
        }
    };
    /** Insert new rules which also marks the name as known */
    StyleSheet.prototype.insertRules = function (id, name, rules) {
        this.registerName(id, name);
        this.getTag().insertRules(getGroupForId(id), rules);
    };
    /** Clears all cached names for a given group ID */
    StyleSheet.prototype.clearNames = function (id) {
        if (this.names.has(id)) {
            this.names.get(id).clear();
        }
    };
    /** Clears all rules for a given group ID */
    StyleSheet.prototype.clearRules = function (id) {
        this.getTag().clearGroup(getGroupForId(id));
        this.clearNames(id);
    };
    /** Clears the entire tag which deletes all rules but not its names */
    StyleSheet.prototype.clearTag = function () {
        // NOTE: This does not clear the names, since it's only used during SSR
        // so that we can continuously output only new rules
        this.tag = undefined;
    };
    /** Outputs the current sheet as a CSS string with markers for SSR */
    StyleSheet.prototype.toString = function () {
        return outputSheet(this);
    };
    return StyleSheet;
}());

var SEED = 5381;
// When we have separate strings it's useful to run a progressive
// version of djb2 where we pretend that we're still looping over
// the same string
var phash = function (h, x) {
    var i = x.length;
    while (i) {
        h = (h * 33) ^ x.charCodeAt(--i);
    }
    return h;
};
// This is a djb2 hashing function
var hash = function (x) {
    return phash(SEED, x);
};

var COMMENT_REGEX = /^\s*\/\/.*$/gm;
var COMPLEX_SELECTOR_PREFIX = [':', '[', '.', '#'];
function createStylisInstance(_a) {
    var _b = _a === void 0 ? EMPTY_OBJECT : _a, _c = _b.options, options = _c === void 0 ? EMPTY_OBJECT : _c, _d = _b.plugins, plugins = _d === void 0 ? EMPTY_ARRAY : _d;
    var _componentId;
    var _selector;
    var _selectorRegexp;
    var _consecutiveSelfRefRegExp;
    var selfReferenceReplacer = function (match, offset, string) {
        if (
        // do not replace the first occurrence if it is complex (has a modifier)
        (offset === 0 ? !COMPLEX_SELECTOR_PREFIX.includes(string[_selector.length]) : true) && // no consecutive self refs (.b.b); that is a precedence boost and treated differently
            !string.match(_consecutiveSelfRefRegExp)) {
            return "." + _componentId;
        }
        return match;
    };
    /**
     * When writing a style like
     *
     * & + & {
     *   color: red;
     * }
     *
     * The second ampersand should be a reference to the static component class. stylis
     * has no knowledge of static class so we have to intelligently replace the base selector.
     *
     * https://github.com/thysultan/stylis.js/tree/v4.0.2#abstract-syntax-structure
     */
    var selfReferenceReplacementPlugin = function (element) {
        if (element.type === stylis.RULESET && element.value.includes('&')) {
            var props = element.props;
            props[0] = props[0].replace(_selectorRegexp, selfReferenceReplacer);
        }
    };
    var stringifyRules = function (css, selector, prefix, componentId) {
        if (selector === void 0) { selector = ''; }
        if (prefix === void 0) { prefix = ''; }
        if (componentId === void 0) { componentId = '&'; }
        var flatCSS = css.replace(COMMENT_REGEX, '');
        // stylis has no concept of state to be passed to plugins
        // but since JS is single-threaded, we can rely on that to ensure
        // these properties stay in sync with the current stylis run
        _componentId = componentId;
        _selector = selector;
        _selectorRegexp = new RegExp("\\" + _selector + "\\b", 'g');
        _consecutiveSelfRefRegExp = new RegExp("(\\" + _selector + "\\b){2,}");
        var middlewares = plugins.slice();
        if (options.prefix || options.prefix === undefined) {
            middlewares.push(stylis.prefixer);
        }
        middlewares.push(selfReferenceReplacementPlugin, stylis.stringify);
        return stylis.serialize(stylis.compile(prefix || selector ? prefix + " " + selector + " { " + flatCSS + " }" : flatCSS), stylis.middleware(middlewares));
    };
    stringifyRules.hash = plugins.length
        ? plugins
            .reduce(function (acc, plugin) {
            if (!plugin.name) {
                throwStyledComponentsError(15);
            }
            return phash(acc, plugin.name);
        }, SEED)
            .toString()
        : '';
    return stringifyRules;
}

var StyleSheetContext = React__default['default'].createContext(undefined);
StyleSheetContext.Consumer;
var StylisContext = React__default['default'].createContext(undefined);
StylisContext.Consumer;
new StyleSheet();
var mainStylis = createStylisInstance();

var Keyframes = /** @class */ (function () {
    function Keyframes(name, rules) {
        var _this = this;
        this.inject = function (styleSheet, stylisInstance) {
            if (stylisInstance === void 0) { stylisInstance = mainStylis; }
            var resolvedName = _this.name + stylisInstance.hash;
            if (!styleSheet.hasNameForId(_this.id, resolvedName)) {
                styleSheet.insertRules(_this.id, resolvedName, stylisInstance(_this.rules, resolvedName, '@keyframes'));
            }
        };
        this.toString = function () {
            throw throwStyledComponentsError(12, String(_this.name));
        };
        this.name = name;
        this.id = "sc-keyframes-" + name;
        this.rules = rules;
    }
    Keyframes.prototype.getName = function (stylisInstance) {
        if (stylisInstance === void 0) { stylisInstance = mainStylis; }
        return this.name + stylisInstance.hash;
    };
    return Keyframes;
}());

// Taken from https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/shared/dangerousStyleValue.js
function addUnitIfNeeded(name, value) {
    // https://github.com/amilajack/eslint-plugin-flowtype-errors/issues/133
    if (value == null || typeof value === 'boolean' || value === '') {
        return '';
    }
    if (typeof value === 'number' && value !== 0 && !(name in unitless__default['default'])) {
        return value + "px"; // Presumes implicit 'px' suffix for unitless numbers
    }
    return String(value).trim();
}

function getComponentName(target) {
    return ((process.env.NODE_ENV !== 'production' ? typeof target === 'string' && target : false) ||
        target.displayName ||
        target.name ||
        'Component');
}

/**
 * inlined version of
 * https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/hyphenateStyleName.js
 */
var uppercaseCheck = /([A-Z])/;
var uppercasePattern = /([A-Z])/g;
var msPattern = /^ms-/;
var prefixAndLowerCase = function (char) { return "-" + char.toLowerCase(); };
/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 */
function hyphenateStyleName(string) {
    return uppercaseCheck.test(string)
        ? string.replace(uppercasePattern, prefixAndLowerCase).replace(msPattern, '-ms-')
        : string;
}

function isFunction(test) {
    return typeof test === 'function';
}

function isPlainObject(x) {
    return (x !== null &&
        typeof x === 'object' &&
        (x.toString ? x.toString() : Object.prototype.toString.call(x)) === '[object Object]' &&
        /* check for reasonable markers that the object isn't an element for react & preact/compat */
        !('props' in x && (x.$$typeof || x.constructor === undefined)));
}

function isStatelessFunction(test) {
    return typeof test === 'function' && !(test.prototype && test.prototype.isReactComponent);
}

function isStyledComponent(target) {
    return typeof target === 'object' && 'styledComponentId' in target;
}

/**
 * It's falsish not falsy because 0 is allowed.
 */
var isFalsish = function (chunk) {
    return chunk === undefined || chunk === null || chunk === false || chunk === '';
};
var objToCssArray = function (obj, prevKey) {
    var rules = [];
    for (var key in obj) {
        if (!obj.hasOwnProperty(key) || isFalsish(obj[key]))
            continue;
        if ((Array.isArray(obj[key]) && obj[key].isCss) || isFunction(obj[key])) {
            rules.push(hyphenateStyleName(key) + ":", obj[key], ';');
        }
        else if (isPlainObject(obj[key])) {
            rules.push.apply(rules, objToCssArray(obj[key], key));
        }
        else {
            rules.push(hyphenateStyleName(key) + ": " + addUnitIfNeeded(key, obj[key]) + ";");
        }
    }
    return prevKey ? tslib.__spreadArray(tslib.__spreadArray([prevKey + " {"], rules), ['}']) : rules;
};
// TODO: use overloads to make this type less crazy
function flatten(chunk, executionContext, styleSheet, stylisInstance) {
    if (Array.isArray(chunk)) {
        var ruleSet = [];
        for (var i = 0, len = chunk.length, result = void 0; i < len; i += 1) {
            result = flatten(chunk[i], executionContext, styleSheet, stylisInstance);
            if (result === '')
                continue;
            else if (Array.isArray(result))
                ruleSet.push.apply(ruleSet, result);
            else
                ruleSet.push(result);
        }
        return ruleSet;
    }
    if (isFalsish(chunk)) {
        return '';
    }
    /* Handle other components */
    if (isStyledComponent(chunk)) {
        return "." + chunk.styledComponentId;
    }
    /* Either execute or defer the function */
    if (isFunction(chunk)) {
        if (isStatelessFunction(chunk) && executionContext) {
            var chunkFn = chunk;
            var result = chunkFn(executionContext);
            if (process.env.NODE_ENV !== 'production' &&
                typeof result === 'object' &&
                !Array.isArray(result) &&
                !(result instanceof Keyframes) &&
                !isPlainObject(result)) {
                // eslint-disable-next-line no-console
                console.error(getComponentName(chunkFn) + " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.");
            }
            return flatten(result, executionContext, styleSheet, stylisInstance);
        }
        else
            return chunk;
    }
    if (chunk instanceof Keyframes) {
        if (styleSheet) {
            chunk.inject(styleSheet, stylisInstance);
            return chunk.getName(stylisInstance);
        }
        else
            return chunk;
    }
    /* Handle objects */
    return isPlainObject(chunk) ? objToCssArray(chunk) : chunk.toString();
}

function interleave(strings, interpolations) {
    var result = [strings[0]];
    for (var i = 0, len = interpolations.length; i < len; i += 1) {
        result.push(interpolations[i], strings[i + 1]);
    }
    return result;
}

/**
 * Used when flattening object styles to determine if we should
 * expand an array of styles.
 */
var addTag = function (arg) {
    if (Array.isArray(arg)) {
        // eslint-disable-next-line no-param-reassign
        arg.isCss = true;
    }
    return arg;
};
function css(styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    if (isFunction(styles) || isPlainObject(styles)) {
        var styleFunctionOrObject = styles;
        return addTag(flatten(interleave(EMPTY_ARRAY, tslib.__spreadArray([styleFunctionOrObject], interpolations))));
    }
    var styleStringArray = styles;
    if (interpolations.length === 0 &&
        styleStringArray.length === 1 &&
        typeof styleStringArray[0] === 'string') {
        return styleStringArray;
    }
    return addTag(flatten(interleave(styleStringArray, interpolations)));
}

function constructWithOptions(componentConstructor, tag, options) {
    if (options === void 0) { options = EMPTY_OBJECT; }
    // We trust that the tag is a valid component as long as it isn't falsish
    // Typically the tag here is a string or function (i.e. class or pure function component)
    // However a component may also be an object if it uses another utility, e.g. React.memo
    // React will output an appropriate warning however if the `tag` isn't valid
    if (!tag) {
        throw throwStyledComponentsError(1, tag);
    }
    /* This is callable directly as a template function */
    var templateFunction = function (initialStyles) {
        var interpolations = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            interpolations[_i - 1] = arguments[_i];
        }
        return componentConstructor(tag, options, css.apply(void 0, tslib.__spreadArray([initialStyles], interpolations)));
    };
    /* Modify/inject new props at runtime */
    templateFunction.attrs = function (attrs) {
        return constructWithOptions(componentConstructor, tag, tslib.__assign(tslib.__assign({}, options), { attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean) }));
    };
    /**
     * If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = function (config) {
        return constructWithOptions(componentConstructor, tag, tslib.__assign(tslib.__assign({}, options), config));
    };
    return templateFunction;
}

var ThemeContext = React__default['default'].createContext(undefined);
var ThemeConsumer = ThemeContext.Consumer;
function mergeTheme(theme, outerTheme) {
    if (!theme) {
        throw throwStyledComponentsError(14);
    }
    if (isFunction(theme)) {
        var themeFn = theme;
        var mergedTheme = themeFn(outerTheme);
        if (process.env.NODE_ENV !== 'production' &&
            (mergedTheme === null || Array.isArray(mergedTheme) || typeof mergedTheme !== 'object')) {
            throw throwStyledComponentsError(7);
        }
        return mergedTheme;
    }
    if (Array.isArray(theme) || typeof theme !== 'object') {
        throw throwStyledComponentsError(8);
    }
    return outerTheme ? tslib.__assign(tslib.__assign({}, outerTheme), theme) : theme;
}
/**
 * Provide a theme to an entire react component tree via context
 */
function ThemeProvider(props) {
    var outerTheme = React.useContext(ThemeContext);
    var themeContext = React.useMemo(function () { return mergeTheme(props.theme, outerTheme); }, [
        props.theme,
        outerTheme,
    ]);
    if (!props.children) {
        return null;
    }
    return React__default['default'].createElement(ThemeContext.Provider, { value: themeContext }, props.children);
}

function determineTheme(props, providedTheme, defaultProps) {
    if (defaultProps === void 0) { defaultProps = EMPTY_OBJECT; }
    return (props.theme !== defaultProps.theme && props.theme) || providedTheme || defaultProps.theme;
}

var _a;
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
// copied from react-is
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
/**
 * Adapted from hoist-non-react-statics to avoid the react-is dependency.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true,
};
var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true,
};
var FORWARD_REF_STATICS = {
    $$typeof: true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
};
var MEMO_STATICS = {
    $$typeof: true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true,
};
var TYPE_STATICS = (_a = {},
    _a[REACT_FORWARD_REF_TYPE] = FORWARD_REF_STATICS,
    _a[REACT_MEMO_TYPE] = MEMO_STATICS,
    _a);
// adapted from react-is
function isMemo(object) {
    var $$typeofType = 'type' in object && object.type.$$typeof;
    return $$typeofType === REACT_MEMO_TYPE;
}
function getStatics(component) {
    // React v16.11 and below
    if (isMemo(component)) {
        return MEMO_STATICS;
    }
    // React v16.12 and above
    return '$$typeof' in component
        ? TYPE_STATICS[component['$$typeof']]
        : REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, excludelist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components
        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, excludelist);
            }
        }
        var keys = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }
        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!(key in KNOWN_STATICS) &&
                !(excludelist && excludelist[key]) &&
                !(sourceStatics && key in sourceStatics) &&
                !(targetStatics && key in targetStatics)) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                }
                catch (e) {
                    /* ignore */
                }
            }
        }
    }
    return targetComponent;
}

function withTheme(Component) {
    var WithTheme = React__default['default'].forwardRef(function (props, ref) {
        var theme = React.useContext(ThemeContext);
        var themeProp = determineTheme(props, theme, Component.defaultProps);
        if (process.env.NODE_ENV !== 'production' && themeProp === undefined) {
            // eslint-disable-next-line no-console
            console.warn("[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class \"" + getComponentName(Component) + "\"");
        }
        return React__default['default'].createElement(Component, tslib.__assign({}, props, { theme: themeProp, ref: ref }));
    });
    hoistNonReactStatics(WithTheme, Component);
    WithTheme.displayName = "WithTheme(" + getComponentName(Component) + ")";
    return WithTheme;
}

var useTheme = function () { return React.useContext(ThemeContext); };

var AD_REPLACER_R = /(a)(d)/gi;
/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
 * counterparts */
var charsLength = 52;
/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
var getAlphabeticChar = function (code) { return String.fromCharCode(code + (code > 25 ? 39 : 97)); };
/* input a number, usually a hash and convert it to base-52 */
function generateAlphabeticName(code) {
    var name = '';
    var x;
    /* get a char and divide by alphabet-length */
    for (x = Math.abs(code); x > charsLength; x = (x / charsLength) | 0) {
        name = getAlphabeticChar(x % charsLength) + name;
    }
    return (getAlphabeticChar(x % charsLength) + name).replace(AD_REPLACER_R, '$1-$2');
}

function generateComponentId(str) {
    return generateAlphabeticName(hash(str) >>> 0);
}

var generated = {};
/**
 * InlineStyle takes arbitrary CSS and generates a flat object
 */
function makeInlineStyleClass(styleSheet) {
    var InlineStyle = /** @class */ (function () {
        function InlineStyle(rules) {
            this.rules = rules;
        }
        InlineStyle.prototype.generateStyleObject = function (executionContext) {
            // keyframes, functions, and component selectors are not allowed for React Native
            var flatCSS = flatten(this.rules, executionContext).join('');
            var hash = generateComponentId(flatCSS);
            if (!generated[hash]) {
                var root = postcss.parse(flatCSS);
                var declPairs_1 = [];
                root.each(function (node) {
                    if (node.type === 'decl') {
                        declPairs_1.push([node.prop, node.value]);
                    }
                    else if (process.env.NODE_ENV !== 'production' && node.type !== 'comment') {
                        /* eslint-disable no-console */
                        console.warn("Node of type " + node.type + " not supported as an inline style");
                    }
                });
                var styleObject = transformDeclPairs__default['default'](declPairs_1);
                var styles = styleSheet.create({
                    generated: styleObject,
                });
                generated[hash] = styles.generated;
            }
            return generated[hash];
        };
        return InlineStyle;
    }());
    return InlineStyle;
}

function isTag(target) {
    return (typeof target === 'string' &&
        (process.env.NODE_ENV !== 'production'
            ? target.charAt(0) === target.charAt(0).toLowerCase()
            : true));
}

function generateDisplayName(target) {
    return isTag(target) ? "styled." + target : "Styled(" + getComponentName(target) + ")";
}

/**
  mixin-deep; https://github.com/jonschlinkert/mixin-deep
  Inlined such that it will be consistently transpiled to an IE-compatible syntax.

  The MIT License (MIT)

  Copyright (c) 2014-present, Jon Schlinkert.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
var isObject = function (val) {
    return (typeof val === 'function' || (typeof val === 'object' && val !== null && !Array.isArray(val)));
};
var isValidKey = function (key) {
    return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
};
function mixin(target, val, key) {
    var obj = target[key];
    if (isObject(val) && isObject(obj)) {
        mixinDeep(obj, val);
    }
    else {
        target[key] = val;
    }
}
function mixinDeep(target) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    for (var _a = 0, rest_1 = rest; _a < rest_1.length; _a++) {
        var obj = rest_1[_a];
        if (isObject(obj)) {
            for (var key in obj) {
                if (isValidKey(key)) {
                    mixin(target, obj[key], key);
                }
            }
        }
    }
    return target;
}

function useResolvedAttrs(theme, props, attrs) {
    if (theme === void 0) { theme = EMPTY_OBJECT; }
    // NOTE: can't memoize this
    // returns [context, resolvedAttrs]
    // where resolvedAttrs is only the things injected by the attrs themselves
    var context = tslib.__assign(tslib.__assign({}, props), { theme: theme });
    var resolvedAttrs = {};
    attrs.forEach(function (attrDef) {
        var resolvedAttrDef = typeof attrDef === 'function' ? attrDef(context) : attrDef;
        var key;
        /* eslint-disable guard-for-in */
        for (key in resolvedAttrDef) {
            context[key] = resolvedAttrs[key] = resolvedAttrDef[key];
        }
        /* eslint-enable guard-for-in */
    });
    return [context, resolvedAttrs];
}
// Validator defaults to true if not in HTML/DOM env
var validAttr = function () { return true; };
function useStyledComponentImpl(forwardedComponent, props, forwardedRef) {
    var componentAttrs = forwardedComponent.attrs, inlineStyle = forwardedComponent.inlineStyle, defaultProps = forwardedComponent.defaultProps, shouldForwardProp = forwardedComponent.shouldForwardProp, target = forwardedComponent.target;
    // NOTE: the non-hooks version only subscribes to this when !componentStyle.isStatic,
    // but that'd be against the rules-of-hooks. We could be naughty and do it anyway as it
    // should be an immutable value, but behave for now.
    var theme = determineTheme(props, React.useContext(ThemeContext), defaultProps);
    var _a = useResolvedAttrs(theme || EMPTY_OBJECT, props, componentAttrs), context = _a[0], attrs = _a[1];
    var generatedStyles = inlineStyle.generateStyleObject(context);
    var refToForward = forwardedRef;
    var elementToBeCreated = attrs.$as || props.$as || attrs.as || props.as || target;
    var computedProps = attrs !== props ? tslib.__assign(tslib.__assign({}, props), attrs) : props;
    var propsForElement = {};
    // eslint-disable-next-line guard-for-in
    for (var key in computedProps) {
        if (key[0] === '$' || key === 'as')
            continue;
        else if (key === 'forwardedAs') {
            propsForElement.as = computedProps[key];
        }
        else if (!shouldForwardProp || shouldForwardProp(key, validAttr, elementToBeCreated)) {
            propsForElement[key] = computedProps[key];
        }
    }
    propsForElement.style =
        typeof props.style === 'function'
            ? function (state) {
                return [generatedStyles].concat(props.style(state));
            }
            : [generatedStyles].concat(props.style || []);
    propsForElement.ref = refToForward;
    return React.createElement(elementToBeCreated, propsForElement);
}
var _StyledNativeComponent = (function (InlineStyle) {
    var createStyledNativeComponent = function (target, options, rules) {
        var isTargetStyledComp = isStyledComponent(target);
        var styledComponentTarget = target;
        var _a = options.displayName, displayName = _a === void 0 ? generateDisplayName(target) : _a, _b = options.attrs, attrs = _b === void 0 ? EMPTY_ARRAY : _b;
        // fold the underlying StyledComponent attrs up (implicit extend)
        var finalAttrs = isTargetStyledComp && styledComponentTarget.attrs
            ? styledComponentTarget.attrs.concat(attrs).filter(Boolean)
            : attrs;
        // eslint-disable-next-line prefer-destructuring
        var shouldForwardProp = options.shouldForwardProp;
        if (isTargetStyledComp && styledComponentTarget.shouldForwardProp) {
            var shouldForwardPropFn_1 = styledComponentTarget.shouldForwardProp;
            if (options.shouldForwardProp) {
                var passedShouldForwardPropFn_1 = options.shouldForwardProp;
                // compose nested shouldForwardProp calls
                shouldForwardProp = function (prop, filterFn, elementToBeCreated) {
                    return shouldForwardPropFn_1(prop, filterFn, elementToBeCreated) &&
                        passedShouldForwardPropFn_1(prop, filterFn, elementToBeCreated);
                };
            }
            else {
                // eslint-disable-next-line prefer-destructuring
                shouldForwardProp = shouldForwardPropFn_1;
            }
        }
        /**
         * forwardRef creates a new interim component, which we'll take advantage of
         * instead of extending ParentComponent to create _another_ interim class
         */
        var WrappedStyledComponent;
        var forwardRef = function (props, ref) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useStyledComponentImpl(WrappedStyledComponent, props, ref);
        };
        forwardRef.displayName = displayName;
        WrappedStyledComponent = React__default['default'].forwardRef(forwardRef);
        WrappedStyledComponent.attrs = finalAttrs;
        WrappedStyledComponent.inlineStyle = new InlineStyle(isTargetStyledComp ? styledComponentTarget.inlineStyle.rules.concat(rules) : rules);
        WrappedStyledComponent.displayName = displayName;
        WrappedStyledComponent.shouldForwardProp = shouldForwardProp;
        // @ts-expect-error we don't actually need this for anything other than detection of a styled-component
        WrappedStyledComponent.styledComponentId = true;
        // fold the underlying StyledComponent target up since we folded the styles
        WrappedStyledComponent.target = isTargetStyledComp ? styledComponentTarget.target : target;
        WrappedStyledComponent.withComponent = function withComponent(tag) {
            var newOptions = tslib.__assign(tslib.__assign({}, options), { attrs: finalAttrs });
            return createStyledNativeComponent(tag, newOptions, rules);
        };
        Object.defineProperty(WrappedStyledComponent, 'defaultProps', {
            get: function () {
                return this._foldedDefaultProps;
            },
            set: function (obj) {
                this._foldedDefaultProps = isTargetStyledComp
                    ? mixinDeep({}, styledComponentTarget.defaultProps, obj)
                    : obj;
            },
        });
        hoistNonReactStatics(WrappedStyledComponent, target, {
            // all SC-specific things should not be hoisted
            attrs: true,
            inlineStyle: true,
            displayName: true,
            shouldForwardProp: true,
            target: true,
            withComponent: true,
        });
        return WrappedStyledComponent;
    };
    return createStyledNativeComponent;
});

var InlineStyle = makeInlineStyleClass(reactPrimitives__default['default'].StyleSheet);
var StyledNativeComponent = _StyledNativeComponent(InlineStyle);
var styled = function (tag) { return constructWithOptions(StyledNativeComponent, tag); };
/* React native lazy-requires each of these modules for some reason, so let's
 *  assume it's for a good reason and not eagerly load them all */
var aliases = ['Image', 'Text', 'Touchable', 'View'];
/* Define a getter for each alias which simply gets the reactNative component
 * and passes it to styled */
aliases.forEach(function (alias) {
    return Object.defineProperty(styled, alias, {
        enumerable: true,
        configurable: false,
        get: function () {
            return styled(reactPrimitives__default['default'][alias]);
        },
    });
});

exports.ThemeConsumer = ThemeConsumer;
exports.ThemeContext = ThemeContext;
exports.ThemeProvider = ThemeProvider;
exports.css = css;
exports['default'] = styled;
exports.isStyledComponent = isStyledComponent;
exports.useTheme = useTheme;
exports.withTheme = withTheme;
//# sourceMappingURL=styled-components-primitives.cjs.js.map
