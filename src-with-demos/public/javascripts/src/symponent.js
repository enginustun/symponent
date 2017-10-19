/**
 * Symponent.js
 * (c) 2017-Present Engin Üstün
 * Released under the MIT License.
 */
(function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
    }
    else if (typeof define === "function" && define.amd) {
        define([], f);
    }
    else {
        var g;
        if (typeof window !== "undefined") {
            g = window;
        }
        else if (typeof global !== "undefined") {
            g = global;
        }
        else if (typeof self !== "undefined") {
            g = self;
        }
        else {
            g = this;
        }

        /**@namespace sym */
        g.sym = f();
    }
})(function symponent() {

    /**
     * Adds backslash (\) in front of the special characters for regexp.
     * @memberOf sym
     * @private
     * @inner
     * @param {string} str - String will be escaped.
     */
    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    /**
     * Replaces all matches of 'find' parameter with 'replace' parameter in 'str'.
     * @memberOf sym
     * @private
     * @inner
     * @param {string} str - String will be modified.
     * @param {string} find - Find string
     * @param {string} replace - Replace string
     */
    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    /**
     * It changes the first letter of input string to uppercase. 
     * @private
     * @inner
     * @param {string} input - input parameter to capitalize.
     */
    function capitalizeFirstLetter(input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    /**
     * Starting with word 2, It changes the first letter of each string to uppercase. 
     * @example
     * 'accept-charset' -> 'acceptCharset'
     * 'color-interpolation-filters' -> 'colorInterpolationFilters'
     * @private
     * @inner
     * @param {string} attrName - input parameter.
     */
    function capitalizedAttribute(attrName) {
        if (typeof attrName === 'string' && ~attrName.indexOf('-')) {
            var splittedNames = attrName.split('-');
            var result = splittedNames[0];
            for (var i = 1; i < splittedNames.length; i++) {
                var curName = splittedNames[i];
                result += capitalizeFirstLetter(curName);
            }
            return result;
        }
        return attrName;
    }

    /**
     * Finds and returns deeper object by string parameter.
     * @example 
     * obj = { name: 'engin', accounts: { creditCard: {...}, payrollCard: {...} } };
     * getObjectByString(obj, 'accounts.creditCard'); 
     * //>> creditCard: {...}
     * @memberOf sym
     * @private
     * @inner
     * @param {Object} o - object will be searched for field in 's' parameter(s).
     * @param {string} s - string nested field names in 'o' object.
     */
    function getObjectByString(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    };

    /**
     * Creates and returns HTML Node from string parameter given.
     * @memberOf sym
     * @private
     * @inner
     * @param {string} s - HTML string.
     */
    function htmlFromString(s) {
        var div = document.createElement('div');
        div.innerHTML = s;
        return div.firstChild;
    }

    /**
     * Checks given parameter, whether its type is primitive or not.
     * @memberOf sym
     * @private
     * @inner
     * @param {*} value - Any value will be checked.
     */
    function isPrimitive(value) {
        return (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean'
        );
    }

    /**
     * Checks if object is array or JSON object. If it is so, it can be iterated with for-forin loops.
     * @memberOf sym
     * @private
     * @inner
     * @param {*} obj - Any object to check.
     */
    function isIterable(obj) {
        if (obj) {
            var propType = Object.prototype.toString.call(obj);
            return propType === '[object Object]' || propType === '[object Array]';
        }
        return false;
    }

    /**
     * Checks if passed parameter is Text Node.
     * @memberOf sym
     * @private
     * @inner
     * @param {Object} node - Parameter will be checked by its type.
     */
    function isTextNode(node) {
        return (node instanceof Node && node.nodeType === Node.TEXT_NODE);
    }

    return (new function () {
        var self = this,
            xmlns = 'http://www.w3.org/2000/svg',
            xlink = 'http://www.w3.org/1999/xlink',
            allowedAttrNameStart = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD',
            allowedAttrName = allowedAttrNameStart + '\\-.0-9\\uB7\\u0300-\\u036F\\u203F-\\u2040',
            isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + allowedAttrName + ']*$')),
            allowedElements = {
                a: true,
                abbr: true,
                address: true,
                area: true,
                article: true,
                aside: true,
                audio: true,
                b: true,
                base: true,
                bdi: true,
                bdo: true,
                big: true,
                blockquote: true,
                body: true,
                br: true,
                button: true,
                canvas: true,
                caption: true,
                cite: true,
                code: true,
                col: true,
                colgroup: true,
                data: true,
                datalist: true,
                dd: true,
                del: true,
                details: true,
                dfn: true,
                dialog: true,
                div: true,
                dl: true,
                dt: true,
                em: true,
                embed: true,
                fieldset: true,
                figcaption: true,
                figure: true,
                footer: true,
                form: true,
                h1: true,
                h2: true,
                h3: true,
                h4: true,
                h5: true,
                h6: true,
                head: true,
                header: true,
                hgroup: true,
                hr: true,
                html: true,
                i: true,
                iframe: true,
                img: true,
                input: true,
                ins: true,
                kbd: true,
                keygen: true,
                label: true,
                legend: true,
                li: true,
                link: true,
                main: true,
                map: true,
                mark: true,
                menu: true,
                menuitem: true,
                meta: true,
                meter: true,
                nav: true,
                noscript: true,
                object: true,
                ol: true,
                optgroup: true,
                option: true,
                output: true,
                p: true,
                param: true,
                picture: true,
                pre: true,
                progress: true,
                q: true,
                rp: true,
                rt: true,
                ruby: true,
                s: true,
                samp: true,
                script: true,
                section: true,
                select: true,
                small: true,
                source: true,
                span: true,
                strong: true,
                style: true,
                sub: true,
                summary: true,
                sup: true,
                table: true,
                tbody: true,
                td: true,
                textarea: true,
                tfoot: true,
                th: true,
                thead: true,
                time: true,
                title: true,
                tr: true,
                track: true,
                u: true,
                ul: true,
                'var': true,
                video: true,
                wbr: true,

                // SVG
                circle: 'svg',
                clipPath: 'svg',
                defs: 'svg',
                ellipse: 'svg',
                g: 'svg',
                image: 'svg',
                line: 'svg',
                linearGradient: 'svg',
                mask: 'svg',
                path: 'svg',
                pattern: 'svg',
                polygon: 'svg',
                polyline: 'svg',
                radialGradient: 'svg',
                rect: 'svg',
                stop: 'svg',
                svg: 'svg',
                text: 'svg',
                tspan: 'svg'
            },
            allowedProperties = {
                accept: true,
                acceptCharset: true,
                accessKey: true,
                action: true,
                allowFullScreen: true,
                allowTransparency: true,
                alt: true,
                async: true,
                autoComplete: true,
                autoPlay: true,
                capture: true,
                cellPadding: true,
                cellSpacing: true,
                charSet: true,
                challenge: true,
                checked: true,
                cite: true,
                classID: true,
                className: true,
                cols: true,
                colSpan: true,
                content: true,
                contentEditable: true,
                contextMenu: true,
                controls: true,
                coords: true,
                crossOrigin: true,
                data: true,
                dateTime: true,
                'default': true,
                defaultvalue: true,
                defer: true,
                dir: true,
                disabled: true,
                download: true,
                draggable: true,
                encType: true,
                form: true,
                formAction: true,
                formEncType: true,
                formMethod: true,
                formNoValidate: true,
                formTarget: true,
                frameBorder: true,
                headers: true,
                height: true,
                hidden: true,
                high: true,
                href: true,
                hrefLang: true,
                htmlFor: true,
                httpEquiv: true,
                icon: true,
                id: true,
                inputMode: true,
                integrity: true,
                is: true,
                keyParams: true,
                keyType: true,
                kind: true,
                label: true,
                lang: true,
                list: true,
                loop: true,
                low: true,
                manifest: true,
                marginHeight: true,
                marginWidth: true,
                max: true,
                maxLength: true,
                media: true,
                mediaGroup: true,
                method: true,
                min: true,
                minLength: true,
                multiple: true,
                muted: true,
                name: true,
                nonce: true,
                noValidate: true,
                open: true,
                optimum: true,
                pattern: true,
                placeholder: true,
                poster: true,
                preload: true,
                profile: true,
                radioGroup: true,
                readOnly: true,
                rel: true,
                render: true,
                required: true,
                reversed: true,
                role: true,
                rows: true,
                rowSpan: true,
                sandbox: true,
                scope: true,
                scoped: true,
                scrolling: true,
                seamless: true,
                selected: true,
                shape: true,
                size: true,
                sizes: true,
                span: true,
                spellCheck: true,
                src: true,
                srcDoc: true,
                srcLang: true,
                srcSet: true,
                start: true,
                step: true,
                style: true,
                summary: true,
                tabIndex: true,
                target: true,
                title: true,
                type: true,
                useMap: true,
                value: true,
                width: true,
                wmode: true,
                wrap: true,
                about: true,
                datatype: true,
                inlist: true,
                prefix: true,
                property: true,
                resource: true,
                'typeof': true,
                vocab: true,
                autoCapitalize: true,
                autoCorrect: true,
                autoSave: true,
                color: true,
                itemProp: true,
                itemScope: true,
                itemType: true,
                itemID: true,
                itemRef: true,
                results: true,
                security: true,
                unselectable: true
            },
            allowedSVGProperties = {
                accentHeight: 'accent-height',
                'accent-height': 0,
                accumulate: 0,
                additive: 0,
                alignmentBaseline: 'alignment-baseline',
                allowReorder: 'allowReorder',
                alphabetic: 0,
                amplitude: 0,
                arabicForm: 'arabic-form',
                ascent: 0,
                attributeName: 'attributeName',
                attributeType: 'attributeType',
                autoReverse: 'autoReverse',
                azimuth: 0,
                baseFrequency: 'baseFrequency',
                baseProfile: 'baseProfile',
                baselineShift: 'baseline-shift',
                bbox: 0,
                begin: 0,
                bias: 0,
                by: 0,
                calcMode: 'calcMode',
                capHeight: 'cap-height',
                clip: 0,
                clipPath: 'clip-path',
                clipRule: 'clip-rule',
                clipPathUnits: 'clipPathUnits',
                colorInterpolation: 'color-interpolation',
                colorInterpolationFilters: 'color-interpolation-filters',
                colorProfile: 'color-profile',
                colorRendering: 'color-rendering',
                contentScriptType: 'contentScriptType',
                contentStyleType: 'contentStyleType',
                cursor: 0,
                cx: 0,
                cy: 0,
                d: 0,
                decelerate: 0,
                descent: 0,
                diffuseConstant: 'diffuseConstant',
                direction: 0,
                display: 0,
                divisor: 0,
                dominantBaseline: 'dominant-baseline',
                dur: 0,
                dx: 0,
                dy: 0,
                edgeMode: 'edgeMode',
                elevation: 0,
                enableBackground: 'enable-background',
                end: 0,
                exponent: 0,
                externalResourcesRequired: 'externalResourcesRequired',
                fill: 0,
                fillOpacity: 'fill-opacity',
                fillRule: 'fill-rule',
                filter: 0,
                filterRes: 'filterRes',
                filterUnits: 'filterUnits',
                floodColor: 'flood-color',
                floodOpacity: 'flood-opacity',
                focusable: 0,
                fontFamily: 'font-family',
                fontSize: 'font-size',
                fontSizeAdjust: 'font-size-adjust',
                fontStretch: 'font-stretch',
                fontStyle: 'font-style',
                fontVariant: 'font-variant',
                fontWeight: 'font-weight',
                format: 0,
                from: 0,
                fx: 0,
                fy: 0,
                g1: 0,
                g2: 0,
                glyphName: 'glyph-name',
                glyphOrientationHorizontal: 'glyph-orientation-horizontal',
                glyphOrientationVertical: 'glyph-orientation-vertical',
                glyphRef: 'glyphRef',
                gradientTransform: 'gradientTransform',
                gradientUnits: 'gradientUnits',
                hanging: 0,
                horizAdvX: 'horiz-adv-x',
                horizOriginX: 'horiz-origin-x',
                ideographic: 0,
                imageRendering: 'image-rendering',
                'in': 0,
                in2: 0,
                intercept: 0,
                k: 0,
                k1: 0,
                k2: 0,
                k3: 0,
                k4: 0,
                kernelMatrix: 'kernelMatrix',
                kernelUnitLength: 'kernelUnitLength',
                kerning: 0,
                keyPoints: 'keyPoints',
                keySplines: 'keySplines',
                keyTimes: 'keyTimes',
                lengthAdjust: 'lengthAdjust',
                letterSpacing: 'letter-spacing',
                lightingColor: 'lighting-color',
                limitingConeAngle: 'limitingConeAngle',
                local: 0,
                markerEnd: 'marker-end',
                markerMid: 'marker-mid',
                markerStart: 'marker-start',
                markerHeight: 'markerHeight',
                markerUnits: 'markerUnits',
                markerWidth: 'markerWidth',
                mask: 0,
                maskContentUnits: 'maskContentUnits',
                maskUnits: 'maskUnits',
                mathematical: 0,
                mode: 0,
                numOctaves: 'numOctaves',
                offset: 0,
                opacity: 0,
                operator: 0,
                order: 0,
                orient: 0,
                orientation: 0,
                origin: 0,
                overflow: 0,
                overlinePosition: 'overline-position',
                overlineThickness: 'overline-thickness',
                paintOrder: 'paint-order',
                panose1: 'panose-1',
                pathLength: 'pathLength',
                patternContentUnits: 'patternContentUnits',
                patternTransform: 'patternTransform',
                patternUnits: 'patternUnits',
                pointerEvents: 'pointer-events',
                points: 0,
                pointsAtX: 'pointsAtX',
                pointsAtY: 'pointsAtY',
                pointsAtZ: 'pointsAtZ',
                preserveAlpha: 'preserveAlpha',
                preserveAspectRatio: 'preserveAspectRatio',
                primitiveUnits: 'primitiveUnits',
                r: 0,
                radius: 0,
                refX: 'refX',
                refY: 'refY',
                renderingIntent: 'rendering-intent',
                repeatCount: 'repeatCount',
                repeatDur: 'repeatDur',
                requiredExtensions: 'requiredExtensions',
                requiredFeatures: 'requiredFeatures',
                restart: 0,
                result: 0,
                rotate: 0,
                rx: 0,
                ry: 0,
                scale: 0,
                seed: 0,
                shapeRendering: 'shape-rendering',
                slope: 0,
                spacing: 0,
                specularConstant: 'specularConstant',
                specularExponent: 'specularExponent',
                speed: 0,
                spreadMethod: 'spreadMethod',
                startOffset: 'startOffset',
                stdDeviation: 'stdDeviation',
                stemh: 0,
                stemv: 0,
                stitchTiles: 'stitchTiles',
                stopColor: 'stop-color',
                stopOpacity: 'stop-opacity',
                strikethroughPosition: 'strikethrough-position',
                strikethroughThickness: 'strikethrough-thickness',
                string: 0,
                stroke: 0,
                strokeDasharray: 'stroke-dasharray',
                strokeDashoffset: 'stroke-dashoffset',
                strokeLinecap: 'stroke-linecap',
                strokeLinejoin: 'stroke-linejoin',
                strokeMiterlimit: 'stroke-miterlimit',
                strokeOpacity: 'stroke-opacity',
                strokeWidth: 'stroke-width',
                surfaceScale: 'surfaceScale',
                systemLanguage: 'systemLanguage',
                tableValues: 'tableValues',
                targetX: 'targetX',
                targetY: 'targetY',
                textAnchor: 'text-anchor',
                textDecoration: 'text-decoration',
                textRendering: 'text-rendering',
                textLength: 'textLength',
                to: 0,
                transform: 0,
                u1: 0,
                u2: 0,
                underlinePosition: 'underline-position',
                underlineThickness: 'underline-thickness',
                unicode: 0,
                unicodeBidi: 'unicode-bidi',
                unicodeRange: 'unicode-range',
                unitsPerEm: 'units-per-em',
                vAlphabetic: 'v-alphabetic',
                vHanging: 'v-hanging',
                vIdeographic: 'v-ideographic',
                vMathematical: 'v-mathematical',
                values: 0,
                vectorEffect: 'vector-effect',
                version: 0,
                vertAdvY: 'vert-adv-y',
                vertOriginX: 'vert-origin-x',
                vertOriginY: 'vert-origin-y',
                viewBox: 'viewBox',
                viewTarget: 'viewTarget',
                visibility: 0,
                widths: 0,
                wordSpacing: 'word-spacing',
                writingMode: 'writing-mode',
                x: 0,
                xHeight: 'x-height',
                x1: 0,
                x2: 0,
                xChannelSelector: 'xChannelSelector',
                xlinkActuate: 'xlink:actuate',
                xlinkArcrole: 'xlink:arcrole',
                xlinkHref: 'xlink:href',
                xlinkRole: 'xlink:role',
                xlinkShow: 'xlink:show',
                xlinkTitle: 'xlink:title',
                xlinkType: 'xlink:type',
                xmlBase: 'xml:base',
                xmlLang: 'xml:lang',
                xmlSpace: 'xml:space',
                y: 0,
                y1: 0,
                y2: 0,
                yChannelSelector: 'yChannelSelector',
                z: 0,
                zoomAndPan: 'zoomAndPan'
            },
            DOMPropertyNames = {
                acceptCharset: 'accept-charset',
                acceptcharset: 'accept-charset',
                className: 'class',
                classname: 'class',
                htmlFor: 'for',
                htmlfor: 'for',
                httpEquiv: 'http-equiv',
                httpequiv: 'http-equiv'
            },
            idPrefix = 'sym-element-',
            idCounter = 0;

        //model detection regexp and its execution result definitions
        var modelReg = /[{]\s*([!]{0,1}\s*[a-zA-Z_$][0-9a-zA-Z.:\s'"?!=|&+\-*\/\[\]$şŞıİçÇöÖüÜĞğ]*)\s*[}]/g,
            weedOutReg = /[a-zA-Z_$][0-9a-zA-Z_$]*([.][a-zA-Z_$][0-9a-zA-Z_$]*)+/g,
            execResult;

        /**
         * Returns unique sequential ID string for each call.
         * @memberOf sym
         * @private
         * @inner
         */
        function generateId() {
            return idPrefix + idCounter++;
        }

        /**
         * Checks if 'str' parameter is renderable template syntax or not.
         * @example 
         * // {user}, {user.name}, {user.isAdmin?'yes':'no'}, ...
         * @memberOf sym
         * @private
         * @inner
         * @param {string} str - String parameter which will be checked.
         */
        function isTemplateSyntax(str) {
            return (typeof str === 'string' && ~str.indexOf('{') && ~str.indexOf('}'));
        }

        /**
         * Adds given event listeners to 'elem'.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} elem - DOM element to be modified.
         * @param {Object[]} events - An array of events which will be bound to 'elem' DOM parameter.
         */
        function addEventListeners(elem, events) {
            if (events) {
                elem.symEvents = events;
            }
            if (typeof elem.symEvents === 'object') {
                for (var curEventName in elem.symEvents) {
                    if (elem.symEvents.hasOwnProperty(curEventName)) {
                        var curEventHandler = elem.symEvents[curEventName];
                        elem.addEventListener(curEventName, function (e) { curEventHandler.call(elem, e, elem) });
                    }
                }
            }
        }

        /**
         * Finds model names, defines them as variables and evaluate template syntax in 'nakedValue' and returns it.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} elem - DOM element to calculate $index.
         * @param {string} nakedValue - Template Syntax value which bound to element before.
         * @param {Object} models - 'elem's model.
         */
        function findAndReplaceExecResult(elem, nakedValue, models) {
            var parsedValue = nakedValue;
            if (isTemplateSyntax(nakedValue)) {
                var $index = -1;
                var parsedIndex = parseInt(elem.__symModelKey);
                if (!isNaN(parseInt(parsedIndex))) {
                    $index = parsedIndex;
                }
                else {
                    $index = elem.__symModelKey;
                }
                while ((execResult = modelReg.exec(nakedValue)) !== null) {
                    var executableValue = execResult[1];
                    var resolveExecutableValue = function () {
                        if (typeof models === 'object') {
                            for (var modelName in models) {
                                eval('var ' + modelName + ' = models[modelName];');
                            }
                        }
                        return eval(executableValue);
                    };
                    var currentVal = resolveExecutableValue();
                    parsedValue = replaceAll(parsedValue, '{' + executableValue + '}', currentVal);
                }
            }
            if (parsedValue === 'undefined') {
                parsedValue = '';
            }
            return parsedValue;
        }

        // Custom event definition to render Text Nodes.
        var renderTextNodeEvent = document.createEvent('Event');
        renderTextNodeEvent.initEvent('renderTextNodeEvent', true, true);

        /**
         * Assigns "renderTextNodeEvent" to "TextNode"s to update its value when it is necessary.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} elem - TextNode element to add custom event.
         * @param {string} elemId - Element's id to make it findable and unique.
         * @param {string} nakedValue - Naked Template Syntax value as string.
         */
        function addRenderTextNodeEventListener(elem, elemId, nakedValue) {
            elem.addEventListener('renderTextNodeEvent', function () {
                setBoundElements(nakedValue, elem, elemId, 'innervalue');
                elem.nodeValue = findAndReplaceExecResult(elem, nakedValue, elem.model);
            });
        }

        /**
         * Copies self defined attributes, templates, models and etc. to cloned(new) elements from template(old) element.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} newElem - Newly created DOM element.
         * @param {Object} oldElem - Old DOM element.
         */
        function deepCopyCustomAttributesAndEvents(newElem, oldElem) {
            for (var i = 0; i < newElem.childNodes.length; i++) {
                var newChild = newElem.childNodes[i],
                    oldChild = oldElem.childNodes[i];
                deepCopyCustomAttributesAndEvents(newChild, oldChild);
            }
            if (isTextNode(newElem) && isTemplateSyntax(oldElem.nodeValue)) {
                //when cloning a node, oldElem's value is non-rendered value, so it can be used as nakedValue
                addRenderTextNodeEventListener(newElem, generateId(), oldElem.nodeValue);
                setTimeout(function () {
                    newElem.dispatchEvent(renderTextNodeEvent);
                });
            } else if (newElem && oldElem) {
                if (oldElem.loopTemplate && !newElem.loopTemplate) {
                    newElem.loopTemplate = oldElem.loopTemplate;
                }
                if (oldElem.loopModel && !newElem.loopModel) {
                    newElem.loopModel = oldElem.loopModel;
                }
                addEventListeners(newElem, oldElem.symEvents);

                newElem.__symElementId = generateId();
                for (var key in oldElem.attributes) {
                    if (oldElem.attributes.hasOwnProperty(key) && !(oldElem.attributes[key] instanceof Attr)) {
                        newElem.attributes[key] = oldElem.attributes[key];
                    }
                };
            }
        }

        /**
         * Defines empty setter to properties which will be evaluated on rendering phase to avoid XSS attack and external interventions.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} currentObject - Object to define empty getter and setter.
         * @param {string} propKey - Property Key for getter and empty setter.
         */
        function defineEmptySetter(currentObject, propKey) {
            var storedValue = currentObject[propKey];
            Object.defineProperty(currentObject, propKey,
                {
                    get: function () { return storedValue },
                    set: function (val) {
                        console.log('OMG! OMG! We are hacked. You need to try other tricks, bad boy :)');
                    }
                }
            )
        }

        /**
         * Defines to show whether get/set definitions are done or not.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} model - Model to define '__isRendered' property.
         */
        function defineRenderedTrue(model) {
            if (!model.hasOwnProperty('__isRendered')) {
                Object.defineProperty(model, '__isRendered', {
                    enumerable: false,
                    value: true
                });
            }
        }

        /**
         * Defines special properties to re-render UI when it is necessary according to bound properties.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} model - Model which is bound with one or more elements
         * @param {string} propName - Property's name to define re-render logic.
         * @param {string} propValue - Property's value to define re-render logic.
         */
        function defineGetterAndStter(model, propName, propValue) {
            Object.defineProperty(model, '__sym' + propName, {
                enumerable: false,
                value: propValue,
                writable: true
            });
            Object.defineProperty(model, propName,
                {
                    get: function () { return model['__sym' + propName] },
                    set: function (val) {
                        var oldVal = model['__sym' + propName];
                        model['__sym' + propName] = val;
                        if (oldVal != val) {
                            if (model && model.__symBound && isIterable(model.__symBound[propName])) {
                                for (var curId in model.__symBound[propName]) {
                                    var curBoundElemProps = model.__symBound[propName][curId];
                                    renderAttributeOrText(curBoundElemProps.elem, curBoundElemProps.attributes);
                                }
                            }
                        }
                    }
                }
            );
        }

        /**
         * Recursive helper function of 'defineGettersAndSetters'.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} model - Element's data model.
         */
        function defineGettersAndSettersHelper(model) {
            if (isIterable(model) && !model.__isRendered) {
                for (var propName in model) {
                    // IIFE
                    (function (propName) {
                        if (model.hasOwnProperty(propName)) {
                            var modelProp = model[propName];
                            if (isIterable(modelProp)) {
                                defineGettersAndSettersHelper(modelProp);
                            }
                            else if (isPrimitive(modelProp)) {
                                defineGetterAndStter(model, propName, modelProp);
                            }
                        }
                    }(propName));
                }
                defineRenderedTrue(model);
            }
        }

        /**
         * Defines get amd set functions of element's model for each property.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} elem - DOM element to define custom setter according to its models.
         */
        function defineGettersAndSetters(elem) {
            if (!isTextNode(elem) && isIterable(elem.model)) {
                for (var propName in elem.model) {
                    if (elem.model.hasOwnProperty(propName)) {
                        var modelProp = elem.model[propName];
                        defineGettersAndSettersHelper(modelProp);
                    }
                }
            }
        }

        /**
         * Binds elements and models together.
         * @memberOf sym
         * @private
         * @inner
         * @param {string} nakedValue - Template Syntax containing string value to find model and its property name.
         * @param {Object} elem - Related DOM elemnt.
         * @param {string} elemId - DOM element's unique id (it is required because TextNode's custom attributes cannot read from element in IE).
         * @param {string} attrName - Attribute name to bind model and attribute together.
         */
        function setBoundElements(nakedValue, elem, elemId, attrName) {
            while ((execResult = weedOutReg.exec(nakedValue)) !== null) {
                var propertyName = execResult[1],
                    modelName = execResult[0].replace(propertyName, '');
                propertyName = propertyName.substr(1);
                //model will be parsed from string rather than eval function
                var model = getObjectByString(elem.model, modelName);

                //define bound elements' container object
                if (!model.hasOwnProperty('__symBound')) {
                    Object.defineProperty(model, '__symBound', {
                        enumerable: false,
                        value: {},
                        writable: true
                    });
                }

                //when model is sent to library which has no attribute named 'propertyName', getter and setter must be defined for undefined value
                if (model && !model.hasOwnProperty(propertyName)) {
                    defineGetterAndStter(model, propertyName, undefined);
                }
                if (!model.__symBound[propertyName]) {
                    model.__symBound[propertyName] = {};
                }
                if (!model.__symBound[propertyName][elemId]) {
                    model.__symBound[propertyName][elemId] = {
                        elem: elem
                    };
                }
                var elementProps = model.__symBound[propertyName][elemId];
                if (!elementProps.attributes) {
                    elementProps.attributes = [];
                }
                if (attrName && !~elementProps.attributes.indexOf(attrName)) {
                    elementProps.attributes.push(attrName);
                }
            }
        }

        /**
         * Clones 'loopTemplate' while creating UI by iterating 'loopModel' list.
         * Creates a cloned DOM element for 'curModel' from loopTemplate.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} elem - DOM element which contains loopTemplate.
         * @param {Object} curModel - Current model in iteration of list.
         * @param {(Object | Object[])} itemModel - All items which is being iterated currently.
         * @param {string} key - string key.
         * @param {number} index - number index.
         */
        function cloneLoopTemplate(elem, curModel, itemModel, key) {
            var clonedItem = elem.loopTemplate.cloneNode(true);
            deepCopyCustomAttributesAndEvents(clonedItem, elem.loopTemplate);

            if (!clonedItem.model) {
                clonedItem.model = {};
            }
            //assign current model to list-item element
            clonedItem.model[elem.loopTemplate.loopModel.name] = itemModel[key];
            clonedItem.__symModelKey = key;

            //creates a list if it is not exists in model, adds unique __symElementId to that list
            if (curModel.__symElements) {
                curModel.__symElements[clonedItem.__symElementId] = clonedItem;
            }
            return clonedItem;
        }

        /**
         * Defines '__symElements' property for given model.
         * @memberOf sym
         * @private
         * @inner 
         * @param {Object} curModel - model object to define property.
         */
        function defineSymElementIdProperty(curModel) {
            if (!curModel.__symElements) {
                Object.defineProperty(curModel, '__symElements', {
                    enumerable: false,
                    value: {},
                    writable: true
                });
            }
        }

        /**
         * Makes arrays observable. If any change is occurred on arrays through array methods, list will be re-rendered.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object[]} model - Array object to make observable.
         * @param {Object} elem - DOM element to re-render if any change is occurred in given array.
         */
        function makeArrayObservable(model, elem) {
            if (Array.isArray(model) && !model.__symObservable) {
                Object.defineProperty(model, '__symObservable', { value: true });

                Object.defineProperty(model, 'unshift', {
                    value: function () {
                        var oldLength = this.length;
                        var result = Array.prototype.unshift.apply(this, arguments);
                        for (var i = result - oldLength - 1; i >= 0; i--) {
                            var curModel = this[i];
                            if (isPrimitive(curModel)) {
                                curModel = this;
                            }
                            defineSymElementIdProperty(curModel);

                            var clonedItem = cloneLoopTemplate(elem, curModel, this, i);
                            if (elem.childNodes.length == 0) {
                                elem.appendChild(clonedItem);
                            } else {
                                elem.insertBefore(clonedItem, elem.firstChild);
                            }

                            createModelScope(clonedItem);
                            deepRenderAttrAndText(clonedItem);
                        }
                        return result;
                    }
                });

                Object.defineProperty(model, 'shift', {
                    value: function () {
                        var result = Array.prototype.shift.apply(this, arguments);
                        if (elem.firstChild) {
                            elem.removeChild(elem.firstChild);
                        }
                        return result;
                    }
                });

                Object.defineProperty(model, 'push', {
                    value: function () {
                        var oldLength = this.length;
                        var result = Array.prototype.push.apply(this, arguments);
                        for (var i = oldLength; i < result; i++) {
                            var curModel = this[i];
                            if (isPrimitive(curModel)) {
                                curModel = this;
                            }
                            defineSymElementIdProperty(curModel);

                            var clonedItem = cloneLoopTemplate(elem, curModel, this, i);
                            elem.appendChild(clonedItem);
                            createModelScope(clonedItem);
                            deepRenderAttrAndText(clonedItem);
                        }
                        return result;
                    }
                });

                Object.defineProperty(model, 'pop', {
                    value: function () {
                        var result = Array.prototype.pop.apply(this, arguments);
                        if (elem.lastChild) {
                            elem.removeChild(elem.lastChild);
                        }
                        return result;
                    }
                });

                Object.defineProperty(model, 'splice', {
                    value: function () {
                        var result = Array.prototype.splice.apply(this, arguments);
                        var delElems = [];
                        for (var i = 0; i < result.length; i++) {
                            var curModel = result[i];
                            if (isPrimitive(curModel)) {
                                curModel = this;
                                var keys = Object.keys(curModel.__symElements);
                                var curElem = curModel.__symElements[keys[i]];
                                if (curElem.parentNode) {
                                    curElem.parentNode.removeChild(curElem);
                                }
                                delete curModel.__symElements[keys[i]];
                            }
                            else {
                                var keys = Object.keys(curModel.__symElements);
                                for (var j = 0; j < keys.length; j++) {
                                    var curElem = curModel.__symElements[keys[j]];
                                    if (curElem.parentNode) {
                                        curElem.parentNode.removeChild(curElem);
                                    }
                                    delete curModel.__symElements[keys[j]];
                                }
                            }
                        }
                        return result;
                    }
                });

                Object.defineProperty(model, 'sort', {
                    value: function () {
                        var result = Array.prototype.sort.apply(this, arguments);
                        deepRenderItemList(elem);
                        return result;
                    }
                });

                Object.defineProperty(model, 'reverse', {
                    value: function () {
                        var result = Array.prototype.reverse.apply(this, arguments);
                        deepRenderItemList(elem);
                        return result;
                    }
                });
            }
        }

        /**
         * Checks, creates or removes items for repeatable elements. Also creates model scope of each loop item.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} elem - Parent DOM element which will be container of generated list from loopModel.
         */
        function renderItemList(elem) {
            if (elem.loopTemplate) {
                var itemModel = elem.loopTemplate.loopModel.list;

                //itemModel needs to be evaluated if it contains template syntax.
                if (isTemplateSyntax(itemModel)) {
                    while ((execResult = weedOutReg.exec(itemModel)) !== null) {
                        var propertyName = execResult[1],
                            modelName = execResult[0].replace(propertyName, '');
                        itemModel = getObjectByString(elem.model[modelName], propertyName);
                    }
                }

                makeArrayObservable(itemModel, elem);
                if ((Array.isArray(itemModel) || typeof itemModel === 'object') && elem.loopTemplate instanceof Node) {
                    elem.innerHTML = '';
                    for (var key in itemModel) {
                        var curModel = itemModel[key];
                        if (isPrimitive(curModel)) {
                            curModel = itemModel;
                        }
                        defineSymElementIdProperty(curModel);

                        var clonedItem = cloneLoopTemplate(elem, curModel, itemModel, key);
                        elem.appendChild(clonedItem);
                        createModelScope(clonedItem);
                        deepRenderAttrAndText(clonedItem);
                    }
                }
            }
        }

        /**
         * Renders element's attributes and inner text according to Template Syntax which is defined when creating.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} elem - DOM element which will be rendered according to its bound model properties.
         */
        function renderAttributesAndText(elem) {
            if (!isTextNode(elem)) {
                if (elem.attributes) {
                    var removeChecked = false;
                    for (var i = 0; i < elem.attributes.length; i++) {
                        var attr = elem.attributes[i],
                            attrName = attr.name.toLowerCase(),
                            nakedValue = elem.attributes['__naked' + attrName];
                        if (isTemplateSyntax(nakedValue)) {
                            setBoundElements(nakedValue, elem, elem.__symElementId, attrName);
                            attr.value = findAndReplaceExecResult(elem, nakedValue, elem.model);
                            if (~attrName.indexOf('data-sym-attr-')) {
                                var nakedAttrName = attrName.replace('data-sym-attr-', '');
                                elem.setAttribute((DOMPropertyNames[capitalizedAttribute(nakedAttrName)] || nakedAttrName), attr.value);
                            }
                            if (attrName === 'value') {
                                elem.value = attr.value;
                            }
                        }
                        if (attrName === 'checked') {
                            if (!(attr.value === 'true')) {
                                removeChecked = true;
                            }
                            else if (attr.value.toLowerCase() === 'true' || attr.value.toLowerCase() === 'checked') {
                                elem.checked = true;
                                elem.setAttribute('checked', true);
                            }
                        }
                    }
                    if (removeChecked) {
                        elem.checked = false;
                    }
                    if ('render' in elem.attributes) {
                        if (!elem.commentNode) {
                            elem.commentNode = document.createComment('sym-render');
                        }
                        if (elem.attributes.render.value !== 'true') {
                            elem.parentNode.replaceChild(elem.commentNode, elem);
                        }
                        else if (elem.commentNode.parentNode) {
                            elem.commentNode.parentNode.replaceChild(elem, elem.commentNode);
                        }
                    }
                }
            }
            else {
                //text node needs to be updated, so trigger custom event
                elem.dispatchEvent(renderTextNodeEvent);
            }
            renderItemList(elem);
            defineGettersAndSetters(elem);
        }

        /**
         * Re-renders element specified with its children deeply.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} elem - DOM element will be rendered.
         */
        function deepRenderAttrAndText(elem) {
            for (var i = 0; i < elem.childNodes.length; i++) {
                deepRenderAttrAndText(elem.childNodes[i]);
            }
            renderAttributesAndText(elem);
        }

        /**
         * Renders iterable item list deeply.
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} elem - DOM element will be rendered as list.
         */
        function deepRenderItemList(elem) {
            for (var i = 0; i < elem.childNodes.length; i++) {
                deepRenderItemList(elem.childNodes[i]);
            }
            renderItemList(elem, true);

            if (elem.tagName === 'SELECT') {
                elem.value = findAndReplaceExecResult(elem, elem.attributes.__nakedvalue, elem.model);
            }
        }

        /**
         * Render element's Template Syntax containing attributes and inner text
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} elem - DOM element will be rendered.
         * @param {Object[]} attributes - attributes which need to be evaluated.
         */
        function renderAttributeOrText(elem, attributes) {
            if (!isTextNode(elem)) {
                if (elem.attributes) {
                    for (var i = 0; i < attributes.length; i++) {
                        var attrName = attributes[i];
                        if (attrName === 'checked') {
                            elem.checked = true;
                            elem.setAttribute('checked', true);
                        }
                        var attr = elem.attributes[attrName],
                            nakedValue = elem.attributes['__naked' + attrName];
                        if (isTemplateSyntax(nakedValue)) {
                            setBoundElements(nakedValue, elem, elem.__symElementId, attrName);
                            attr.value = findAndReplaceExecResult(elem, nakedValue, elem.model);
                            if (~attrName.indexOf('data-sym-attr-')) {
                                var nakedAttrName = attrName.replace('data-sym-attr-', '');
                                elem.setAttribute((DOMPropertyNames[capitalizedAttribute(nakedAttrName)] || nakedAttrName), attr.value);
                            }
                            if (attrName === 'value') {
                                elem.value = attr.value;
                            }
                        }
                        if (attrName === 'checked' && !(attr.value === 'true')) {
                            elem.checked = false;
                        }
                        if (attrName === 'render') {
                            if (!elem.commentNode) {
                                elem.commentNode = document.createComment('sym-render');
                            }
                            if (elem.attributes.render.value !== 'true') {
                                if (elem.parentNode) {
                                    elem.parentNode.replaceChild(elem.commentNode, elem);
                                }
                            }
                            else {
                                elem.commentNode.parentNode.replaceChild(elem, elem.commentNode);
                            }
                        }
                    }
                }
            }
            else {
                //text node needs to be updated, so trigger custom event
                elem.dispatchEvent(renderTextNodeEvent);
            }
        }

        /**
         * Creates model scope deeply for element and its children
         * @memberOf sym
         * @private
         * @inner
         * @param {Object} elem - DOM element to create its model scope.
         * @param {boolean} force - Forces to re-create 'model scpoe' if its value equals to true.
         */
        function createModelScope(elem, force) {
            for (var i = 0; i < elem.childNodes.length; i++) {
                var curChild = elem.childNodes[i];
                if (elem.model) {
                    if (!curChild.model) {
                        curChild.model = {};
                    }
                    for (var key in elem.model) {
                        if (!curChild.model.hasOwnProperty(key) || (force === true)) {
                            curChild.model[key] = elem.model[key];
                        }
                    }
                }
                if (elem.hasOwnProperty('__symModelKey') && !curChild.hasOwnProperty('__symModelKey')) {
                    curChild.__symModelKey = elem.__symModelKey;
                }
                createModelScope(curChild, force);
            }
            if (elem.model && isTemplateSyntax(elem.model)) {
                elem.model = eval(elem.model);
            }

            if (elem.loopTemplate) {
                defineEmptySetter(elem, 'loopTemplate');
                if (elem.loopTemplate.loopModel) {
                    defineEmptySetter(elem.loopTemplate, 'loopModel');
                    if (elem.loopTemplate.loopModel.list) {
                        defineEmptySetter(elem.loopTemplate.loopModel, 'list');
                    }
                }
            }
            defineEmptySetter(elem, 'model');
        }

        /**
         * Creates component and appends it to specified container. Returns object which contains helper functions.
         * @memberOf sym
         * @public
         * @alias createComponent
         * @param {Object} elem - DOM element will be placed into container.
         * @param {Object|string} - Container DOM element or its string id selector.
         */
        self.createComponent = function (elem, container) {
            if (typeof container === 'string') {
                container = document.getElementById(container);
            }

            if (container instanceof Node && elem instanceof Node) {
                elem.renderTemplate = elem.outerHTML;
                container.innerHTML = '';
                container.appendChild(elem);
                createModelScope(elem);
                deepRenderAttrAndText(container);
            }
            /**
             * @namespace sym.createComponent
             */
            return {
                /**
                 * Refreshes DOM UI after if model list is changed.
                 * @memberOf sym.createComponent#
                 * @public
                 * @param {Object|string} refreshElem - DOM Node object or selector id as string to refresh list on UI.
                 */
                refreshList: function (refreshElem) {
                    if (refreshElem instanceof Node) {
                        deepRenderItemList(refreshElem);
                    }
                    else if (typeof refreshElem === 'string') {
                        refreshElem = document.getElementById(refreshElem);
                        deepRenderItemList(refreshElem);
                    }
                    else {
                        deepRenderItemList(container);
                    }
                },
                /**
                 * Updates element's model and automatically refreshes it.
                 * @memberOf sym.createComponent#
                 * @public
                 * @param {string} modelName - Name of model which will be updated.
                 * @param {Object} model - New model to update.
                 */
                updateModel: function (modelName, model) {
                    if (model) {
                        if (!elem.model) {
                            elem.model = {};
                        }
                        elem.model[modelName] = model;
                        createModelScope(elem, true);
                        deepRenderAttrAndText(container);
                    }
                }
            }
        }

        /**
         * Creates DOM element with given tagName and attributes.
         * @memberOf sym
         * @public
         * @alias createElement
         * @param {string} tagName - Name of HTML tag which will be created.
         * @param {Object[]} attrs - Attributes to assign to created element.
         */
        self.createElement = function (tagName, attrs) {
            var childList = Array.prototype.slice.call(arguments, 2),
                elem;
            if (tagName && typeof tagName === 'string') {
                tagName = tagName.toLowerCase();
            }
            if (allowedElements.hasOwnProperty(tagName)) {
                var isSVGRelated = (allowedElements[tagName] === 'svg');
                if (isSVGRelated) {
                    elem = document.createElementNS(xmlns, tagName);
                }
                else {
                    elem = document.createElement(tagName);
                }
                elem.__symElementId = generateId();

                if (typeof attrs === 'object') {

                    if (attrs.model && typeof attrs.model === 'object') {
                        if (!elem.model) {
                            elem.model = attrs.model;
                        }
                    } else if (!elem.model) {
                        elem.model = {};
                    }

                    if (attrs.loopTemplate && !elem.loopTemplate) {
                        elem.loopTemplate = attrs.loopTemplate;
                    }
                    if (attrs.loopModel && !elem.loopModel) {
                        elem.loopModel = attrs.loopModel;
                    }
                    if (attrs.events) {
                        elem.symEvents = attrs.events;
                        addEventListeners(elem);
                    }

                    for (var key in attrs) {
                        var isPropCompletelyValid = allowedProperties.hasOwnProperty(key),
                            validPropName = DOMPropertyNames[key] ? DOMPropertyNames[key] : key;
                        if (~validPropName.indexOf('data-sym-attr-')) {
                            var nakedAttrName = validPropName.replace('data-sym-attr-', '');
                            if (isSVGRelated && (allowedSVGProperties.hasOwnProperty(nakedAttrName) || allowedSVGProperties.hasOwnProperty(capitalizedAttribute(nakedAttrName)))) {
                                isPropCompletelyValid = true;
                            } else if (allowedProperties.hasOwnProperty(nakedAttrName) || allowedProperties.hasOwnProperty(capitalizedAttribute(nakedAttrName))) {
                                isPropCompletelyValid = true;
                            }
                        } else if (isCustomAttribute(key)) {
                            isPropCompletelyValid = true;
                        } else {
                            if (isSVGRelated && (allowedSVGProperties.hasOwnProperty(validPropName) || allowedSVGProperties.hasOwnProperty(capitalizedAttribute(validPropName)))) {
                                isPropCompletelyValid = true;
                            } else if (allowedProperties.hasOwnProperty(validPropName) || allowedProperties.hasOwnProperty(capitalizedAttribute(validPropName))) {
                                isPropCompletelyValid = true;
                            }
                        }

                        if (isPropCompletelyValid) {
                            elem.setAttribute(validPropName, attrs[key]);
                            validPropName = validPropName.toLowerCase();
                            if (isTemplateSyntax(attrs[key])) {
                                elem.attributes['__naked' + validPropName] = attrs[key];
                                defineEmptySetter(elem.attributes, '__naked' + validPropName);
                            }
                        }
                    }
                }

                //append child elements
                for (var i = 0; i < childList.length; i++) {
                    if (childList[i] instanceof Node) {
                        elem.appendChild(childList[i]);
                    }
                    else if (typeof childList[i] === 'string') {
                        var newElem = htmlFromString(childList[i]);
                        elem.appendChild(newElem);
                        if (isTemplateSyntax(childList[i])) {
                            addRenderTextNodeEventListener(newElem, generateId(), childList[i]);
                        }
                    }
                }
            }
            return elem;
        }

        /**
         * Creates loop model with given list. The list will be used to create repeated list as loopModel.
         * @memberOf sym
         * @public
         * @alias createLoopModel
         * @param {string} name - Parameter name to use for each item in list when iterating it.
         * @param {Object[]} list - Array to use when creating repetitive lists.
         */
        self.createLoopModel = function (name, list) {
            return { name: name, list: list };
        }
    }());
});