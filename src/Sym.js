//check if `sym` is already exists or not.
if (!window.sym) {

    //helper functions
    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }
    function getValueByStringAttr(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, ''); // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n - 1; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        var k = a[a.length - 1];
        return o[k];
    };

    // sym library
    window.sym = (new function () {
        var self = this,
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
                circle: true,
                clipPath: true,
                defs: true,
                ellipse: true,
                g: true,
                image: true,
                line: true,
                linearGradient: true,
                mask: true,
                path: true,
                pattern: true,
                polygon: true,
                polyline: true,
                radialGradient: true,
                rect: true,
                stop: true,
                svg: true,
                text: true,
                tspan: true
            },
            allowedProperties = {
                /**
                 * Standard Properties
                 */
                accept: true,
                acceptCharset: true,
                accessKey: true,
                action: true,
                allowFullScreen: true,
                allowTransparency: true,
                alt: true,
                async: true,
                autoComplete: true,
                // autoFocus is polyfilled/normalized by AutoFocusUtils autoFocus: false,
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
                data: true, // For `<object />` acts as `src`.
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
                // Caution; `option.selected` is not updated if `select.multiple` is disabled
                // with `removeAttribute`.
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
                // Setting .type throws on non-<input> tags
                type: true,
                useMap: true,
                value: true,
                width: true,
                wmode: true,
                wrap: true,

                /**
                 * RDFa Properties
                 */
                about: true,
                datatype: true,
                inlist: true,
                prefix: true,
                // property is also supported for OpenGraph in meta tags.
                property: true,
                resource: true,
                'typeof': true,
                vocab: true,

                /**
                 * Non-standard Properties
                 */
                // autoCapitalize and autoCorrect are supported in Mobile Safari for keyboard
                // hints.
                autoCapitalize: true,
                autoCorrect: true,
                // autoSave allows WebKit/Blink to persist values of input fields on page
                // reloads
                autoSave: true,
                // color is for Safari mask-icon link
                color: true,
                // itemProp, itemScope, itemType are for Microdata support. See
                // http://schema.org/docs/gs.html
                itemProp: true,
                itemScope: true,
                itemType: true,
                // itemID and itemRef are for Microdata support as well but only specified in
                // the WHATWG spec document. See
                // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
                itemID: true,
                itemRef: true,
                // results show looking glass icon and recent searches on input search fields in
                // WebKit/Blink
                results: true,
                // IE-only attribute that specifies security restrictions on an iframe as an
                // alternative to the sandbox attribute on IE<10
                security: true,
                // IE-only attribute that controls focus behavior
                unselectable: true
            },
            DOMPropertyNames = {
                acceptCharset: 'accept-charset',
                className: 'class',
                htmlFor: 'for',
                httpEquiv: 'http-equiv'
            },
            idPrefix = 'sym-element-',
            idCounter = 0;

        //model detection regexp and its execution result definitions
        var modelReg = /[{]([a-zA-z.:'"?!\s=|&+\-*\/$]*)[}]/g, // /\{([!])*\s*([a-zA-Z_$][a-zA-Z_0-9]*|([a-zA-Z_$][a-zA-Z_0-9]*[.])+([a-zA-Z_$][a-zA-Z_0-9]*)+)\s*\}/gi,
            execResult;

        //it will be used to generate id for elements which has no id
        var generateId = function () {
            return idPrefix + idCounter++;
        }

        //creates and return HTML Node from string
        var htmlFromString = function (s) {
            var div = document.createElement('div');
            div.innerHTML = s;
            return div.firstChild;
        }

        //adds event listeners to element
        var addEventListeners = function (elem, events) {
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

        //finds match by regex and replace matched key with its value in model
        var findAndReplaceExecResult = function (elem, nakedValue, models) {
            var parsedValue = nakedValue;
            if (~nakedValue.indexOf('{') && ~nakedValue.indexOf('{')) {
                var $index = -1;
                var parsedIndex = parseInt(elem.__symModelKey);
                if (!isNaN(parseInt(parsedIndex))) {
                    $index = parsedIndex;
                }
                else{
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

        var deepCopyCustomAttributesAndEvents = function (newElem, oldElem) {
            for (var i = 0; i < newElem.childNodes.length; i++) {
                var newChild = newElem.childNodes[i],
                    oldChild = oldElem.childNodes[i];
                deepCopyCustomAttributesAndEvents(newChild, oldChild);
            }
            if (newElem && oldElem) {
                if (oldElem.loopTemplate && !newElem.loopTemplate) {
                    newElem.loopTemplate = oldElem.loopTemplate;
                }
                if (oldElem.loopModel && !newElem.loopModel) {
                    newElem.loopModel = oldElem.loopModel;
                }
                addEventListeners(newElem, oldElem.symEvents);
            }
            for (var key in oldElem.attributes) {
                if (oldElem.attributes.hasOwnProperty(key) && !(oldElem.attributes[key] instanceof Attr)) {
                    newElem.attributes[key] = oldElem.attributes[key];
                }
            }
        }

        var createItemList = function (elem) {
            if (elem.loopTemplate) {
                var itemModel = elem.loopTemplate.loopModel.list,
                    oldRenderedList = {};
                if ((Array.isArray(itemModel) || typeof itemModel === 'object') && elem.loopTemplate instanceof Node) {
                    
                    //if element has child nodes, keep them to compare to decide whether it needs to be deleted or not
                    for (var i = 0; i < elem.childNodes.length; i++) {
                        oldRenderedList[elem.childNodes[i].__symId] = elem.childNodes[i];
                    }
                    for (var key in itemModel) {
                        //if current itemModel element's type is string, wrap this element by String, 
                        //because we need to keep __symId value in its attribute.
                        itemModel[key] = (typeof itemModel[key] === 'string' ? new String(itemModel[key]) : itemModel[key]);
                        var item = itemModel[key];

                        //if this condition will be matched then no need to clone and append new element, it already exists 
                        if (item.__symId && oldRenderedList[item.__symId]) {
                            delete oldRenderedList[item.__symId];
                        }
                        else {
                            var renderedItem = elem.loopTemplate.cloneNode(true);
                            deepCopyCustomAttributesAndEvents(renderedItem, elem.loopTemplate);
                            //generate new id to keep elements unique
                            renderedItem.__symId = generateId();
                            item.__symId = renderedItem.__symId;

                            if (!renderedItem.__symModels) {
                                renderedItem.__symModels = {};
                            }
                            //assign current model to list-item element
                            renderedItem.__symModels[elem.loopTemplate.loopModel.name] = itemModel[key];
                            renderedItem.__symModel = itemModel[key];
                            renderedItem.__symModelKey = key;

                            //append list item to element
                            elem.appendChild(renderedItem);
                        }
                    }

                    //if this list has item, it needs to be deleted from DOM
                    for (var symId in oldRenderedList) {
                        oldRenderedList[symId].parentNode.removeChild(oldRenderedList[symId]);
                    }

                    //create recursive model scope for cloned element
                    createModelScope(elem);
                    //render child nodes 
                    for (var i = 0; i < elem.childNodes.length; i++) {
                        deepRenderAttrAndText(elem.childNodes[i]);
                    }
                }
            }
        }

        //renders element's attributes and inner text
        var renderAttributesAndText = function (elem) {
            if (elem.nodeType == Node.TEXT_NODE && !elem.parentNode.attributes['__nakedinnervalue']) {
                elem.parentNode.attributes['__nakedinnervalue'] = elem.nodeValue;
            }

            if (elem instanceof Node && elem.nodeType != Node.TEXT_NODE) {
                if (elem.attributes) {
                    for (var i = 0; i < elem.attributes.length; i++) {
                        var attr = elem.attributes[i],
                            nakedValue = elem.attributes['__naked' + attr.name];
                        if (nakedValue && typeof nakedValue === 'string' && ~nakedValue.indexOf('{')) {
                            attr.value = findAndReplaceExecResult(elem, nakedValue, elem.__symModels);
                            if (attr.name.toLowerCase() === 'value') {
                                elem.value = attr.value;
                            }
                        }
                        if (attr.name === 'checked' && !(attr.value === 'true')) {
                            elem.removeAttribute(attr.name);
                        }
                    }
                    if ('render' in elem.attributes) {
                        if (elem.attributes.render.value !== 'true') {
                            elem.style.display = 'none';
                        }
                        else {
                            elem.style.display = 'initial';
                        }
                    }
                }
            }
            else {
                var nakedValue = elem.parentNode.attributes['__nakedinnervalue'];
                if (nakedValue && typeof nakedValue === 'string' && ~nakedValue.indexOf('{')) {
                    elem.nodeValue = findAndReplaceExecResult(elem, nakedValue, elem.parentNode.__symModels);
                }
            }
            createItemList(elem);
        }

        //creates deeply model scope for element and its children
        var createModelScope = function (elem, force) {
            for (var i = 0; i < elem.childNodes.length; i++) {
                var curChild = elem.childNodes[i];
                if (elem.__symModels) {
                    if (!curChild.__symModels) {
                        curChild.__symModels = {};
                    }
                    for (var key in elem.__symModels) {
                        if (!curChild.__symModels.hasOwnProperty(key) || (force === true)) {
                            curChild.__symModels[key] = elem.__symModels[key];
                        }
                    }
                }
                if(elem.hasOwnProperty('__symModelKey') && !curChild.hasOwnProperty('__symModelKey') ){
                    curChild.__symModelKey = elem.__symModelKey;
                }
                createModelScope(curChild, force);
            }
        }

        //this method will be used to refresh component
        var deepRenderAttrAndText = function (elem) {
            for (var i = 0; i < elem.childNodes.length; i++) {
                deepRenderAttrAndText(elem.childNodes[i]);
            }
            renderAttributesAndText(elem);
            //addEventListeners(elem, elem.symEvents);

            if (elem.tagName === 'SELECT') {
                elem.value = findAndReplaceExecResult(elem, elem.attributes.__nakedvalue, elem.__symModels);
            }
        }

        //creates component Node and returns helper functions
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

            return {
                refresh: function () {
                    deepRenderAttrAndText(container);
                },
                updateModel: function (modelName, model) {
                    if (model) {
                        if (!elem.__symModels) {
                            elem.__symModels = {};
                        }
                        elem.__symModels[modelName] = model;
                        createModelScope(elem, true);
                    }
                }
            }
        }

        //creates elements' DOM without rendering
        self.createElement = function (tagName, attrs) {
            var childList = Array.prototype.slice.call(arguments, 2),
                elem;

            if (allowedElements.hasOwnProperty(tagName)) {
                elem = document.createElement(tagName);

                if (typeof attrs === 'object') {

                    if (attrs.models && typeof attrs.models === 'object') {
                        if (!elem.__symModels) {
                            elem.__symModels = attrs.models;
                        }
                    } else if (!elem.__symModels) {
                        elem.__symModels = {};
                    }


                    if (attrs.loopTemplate && !elem.loopTemplate) {
                        elem.loopTemplate = attrs.loopTemplate;
                    }
                    if (attrs.loopModel && !elem.loopModel) {
                        elem.loopModel = attrs.loopModel;
                    }

                    for (var key in attrs) {
                        if (allowedProperties.hasOwnProperty(key) || isCustomAttribute(key)) {
                            var validPropName = DOMPropertyNames[key] ? DOMPropertyNames[key] : key;
                            elem.setAttribute(validPropName, attrs[key]);
                            elem.attributes['__naked' + validPropName] = attrs[key];
                        }
                        else if (key === 'events') {
                            elem.symEvents = attrs[key];
                            addEventListeners(elem);
                        }
                    }

                    elem.__symId = generateId();
                }

                //append child elements
                for (var i = 0; i < childList.length; i++) {
                    if (childList[i] instanceof Node) {
                        elem.appendChild(childList[i]);
                    }
                    else if (typeof childList[i] === 'string') {
                        var newElem = htmlFromString(childList[i]);
                        elem.appendChild(newElem);
                        elem.attributes['__nakedinnervalue'] = childList[i];
                    }
                }
            }
            return elem;
        }

        self.defineLoop = function (name, list) {
            return { name: name, list: list };
        }
    }());
} else {
    console.error('There is already an object of window named sym.');
    console.log('current `sym` object: ', window.sym);
}