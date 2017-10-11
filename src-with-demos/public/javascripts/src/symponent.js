/**
 * Symponent.js
 * (c) 2017-Present Engin Üstün
 * Released under the MIT License.
 */
(function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    }
    else if (typeof define === "function" && define.amd) {
        define([], f)
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
        g.sym = f()
    }
})(function symponent() {
    
    //helper functions
    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    //returns deeper object,
    //ex: obj = { name: 'engin', accounts: { creditCard: {...}, payrollCard: {...} } };
    //getObjectByString(obj, 'accounts.creditCard');  >>>>  ***** returns creditCard: {...} *****
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

    //creates and return HTML Node from string
    function htmlFromString(s) {
        var div = document.createElement('div');
        div.innerHTML = s;
        return div.firstChild;
    }

    //check if value is primitive
    function isPrimitive(value) {
        return (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean'
        )
    }

    //checks if object is array or json object. can it be iterated with forin loop?
    function isIterable(obj) {
        if (obj) {
            var propType = Object.prototype.toString.call(obj);
            return propType === '[object Object]' || propType === '[object Array]';
        }
        return false;
    }

    //checks if passed element is Node and also its type is TEXT_NODE
    function isTextNode(node) {
        return (node instanceof Node && node.nodeType === Node.TEXT_NODE);
    }

    // sym library
    return (new function () {
        var self = this,
            allowedAttrNameStart = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD',
            allowedAttrName = allowedAttrNameStart + '\\-.0-9\\uB7\\u0300-\\u036F\\u203F-\\u2040',
            isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + allowedAttrName + ']*$')),
            observableArrayMethods = ['concat', 'copyWithin', 'push', 'pop', 'reduce', 'reduceRight', 'reverse', 'shift', 'unshift', 'slice', 'some', 'sort', 'splice'],
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
            DOMPropertyNames = {
                acceptCharset: 'accept-charset',
                className: 'class',
                htmlFor: 'for',
                httpEquiv: 'http-equiv'
            },
            idPrefix = 'sym-element-',
            idCounter = 0;

        //model detection regexp and its execution result definitions
        var modelReg = /[{]\s*([!]{0,1}\s*[a-zA-Z_$][0-9a-zA-Z.:\s'"?!=|&+\-*\/\[\]$şŞıİçÇöÖüÜĞğ]*)\s*[}]/g,
            weedOutReg = /[a-zA-Z_$][0-9a-zA-Z_$]*([.][a-zA-Z_$][0-9a-zA-Z_$]*)+/g,
            execResult;

        //it will be used to generate id for elements which has no id
        function generateId() {
            return idPrefix + idCounter++;
        }

        //checks if str is renderable template syntax or not
        function isTemplateSyntax(str) {
            return (typeof str === 'string' && ~str.indexOf('{') && ~str.indexOf('}'))
        }

        //adds event listeners to element
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

        //finds match by regex and replace matched key with its value in model
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

        //custom event definition for rendering text nodes.
        var renderTextNodeEvent = document.createEvent('Event');
        renderTextNodeEvent.initEvent('renderTextNodeEvent', true, true);

        //assigns "renderTextNodeEvent" to "TextNode" to update its value when it needs to be changed.
        function addRenderTextNodeEventListener(elem, elemId, nakedValue) {
            elem.addEventListener('renderTextNodeEvent', function () {
                setBoundElements(nakedValue, elem, elemId, 'innervalue');
                elem.nodeValue = findAndReplaceExecResult(elem, nakedValue, elem.model);
            });
        }

        //copies self defined attributes, templates, models etc. for cloned elements from template element
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

        //defines empty setter to properties which will be evaluated on rendering phase to avoid XSS attack and external interventions.
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

        //shows to get/set definitions of model are done
        function defineRenderedTrue(model) {
            if (!model.hasOwnProperty('__isRendered')) {
                Object.defineProperty(model, '__isRendered', {
                    enumerable: false,
                    value: true
                });
            }
        }

        //defines special properties, the heart of library
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

        //recursive helper function of defineGettersAndSetters, actually all work is done here 
        function defineGettersAndSettersHelper(model, elem) {
            if (isIterable(model) && !model.__isRendered) {
                for (var propName in model) {
                    // IIFE
                    (function (propName) {
                        if (model.hasOwnProperty(propName)) {
                            var modelProp = model[propName];
                            if (isIterable(modelProp)) {
                                defineGettersAndSettersHelper(modelProp, elem);
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

        //defines get and set functions of each property of element's models
        function defineGettersAndSetters(elem) {
            if (!isTextNode(elem) && isIterable(elem.model)) {
                for (var propName in elem.model) {
                    if (elem.model.hasOwnProperty(propName)) {
                        var modelProp = elem.model[propName];
                        defineGettersAndSettersHelper(modelProp, elem);
                    }
                }
            }
        }

        //binds elements and models
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

        //clones loop template. it is used when a new element is added to list.
        function cloneLoopTemplate(elem, curModel, itemModel, key, index) {
            var clonedItem = elem.loopTemplate.cloneNode(true);
            deepCopyCustomAttributesAndEvents(clonedItem, elem.loopTemplate);

            if (!clonedItem.model) {
                clonedItem.model = {};
            }
            //assign current model to list-item element
            clonedItem.model[elem.loopTemplate.loopModel.name] = itemModel[key];
            clonedItem.__symModelKey = key;
            if (isPrimitive(itemModel[key])) {
                clonedItem.model[elem.loopTemplate.loopModel.name] = itemModel
            }

            //creates a list if it is not exists in model, adds unique __symElementId to that list
            if (curModel.__symElementIds) {
                if (isPrimitive(itemModel[key])) {
                    if (!curModel.__symElementIds[index + '_' + itemModel[key]]) {
                        curModel.__symElementIds[index + '_' + itemModel[key]] = [];
                    }
                    curModel.__symElementIds[index + '_' + itemModel[key]].push(clonedItem.__symElementId);
                } else {
                    curModel.__symElementIds.push(clonedItem.__symElementId);
                }
            }
            return clonedItem;
        }

        //makes arrays observable. if any changes on arrays through array methods, list will be re-rendered.
        function makeArrayObservable(model, elem) {
            if (Array.isArray(model) && !model.__symObservable) {
                Object.defineProperty(model, '__symObservable', { value: true });
                for (var i = 0; i < observableArrayMethods.length; i++) {
                    // var methodName = observableArrayMethods[i];
                    (function (methodName) {
                        if (Array.prototype[methodName]) {
                            Object.defineProperty(model, methodName, {
                                value: function () {
                                    var result = Array.prototype[methodName].apply(this, arguments);
                                    deepRenderItemList(elem);
                                    return result;
                                }
                            });
                        }
                    })(observableArrayMethods[i]);
                }
            }
        }

        //checks, creates or removes items for repeatable elements. also creates model scope of each loop items.
        function renderItemList(elem, renderSelf) {
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
                    var index = 0,
                        preRenderedCount = elem.childNodes.length;
                    for (var key in itemModel) {
                        var curModel = itemModel[key],
                            isCurModelPrimitive = isPrimitive(curModel);
                        if (isCurModelPrimitive) {
                            curModel = itemModel;
                        }
                        if (!curModel.__symElementIds) {
                            Object.defineProperty(curModel, '__symElementIds', {
                                enumerable: false,
                                value: [],
                                writable: true
                            });
                        }

                        //preRenderedCount means that count of elements which are rendered according to model before
                        if (index < preRenderedCount) {
                            var curChild = elem.childNodes[index],
                                needToRerender = false,
                                indexOfSymElement = -1;

                            //at least the order of list might be changed.
                            if (isCurModelPrimitive) {
                                //trying to decide that whether the list is changed or not.
                                if (curModel.__symElementIds[index + '_' + itemModel[key]]) {
                                    indexOfSymElement = curModel.__symElementIds[index + '_' + itemModel[key]].indexOf(curChild.__symElementId);
                                    needToRerender = (indexOfSymElement === -1);
                                }
                                else {
                                    var curKeys = Object.keys(curModel.__symElementIds);
                                    var foundKeys = curKeys.filter(function (k) {
                                        return ~k.indexOf(index + '_');
                                    });
                                    if (foundKeys.length > 0) {
                                        delete curModel.__symElementIds[foundKeys[0]];
                                    }
                                    needToRerender = true;
                                }
                            } else {
                                indexOfSymElement = curModel.__symElementIds.indexOf(curChild.__symElementId);
                                needToRerender = (indexOfSymElement === -1);
                            }
                            if (needToRerender) { //if rerendering is necessary, current element is replaced with newly created element.
                                var clonedItem = cloneLoopTemplate(elem, curModel, itemModel, key, index);
                                var delIndex = -1;
                                if (curChild.model) {
                                    for (var innerModelName in curChild.model) {
                                        if (curChild.model.hasOwnProperty(innerModelName)) {
                                            var innerModel = curChild.model[innerModelName];
                                            if (Array.isArray(innerModel.__symElementIds)) {
                                                delIndex = innerModel.__symElementIds.indexOf(curChild.__symElementId);
                                            }
                                            innerModel.__symElementIds.splice(delIndex, 1);
                                        }
                                    }
                                }
                                createModelScope(clonedItem);
                                deepRenderAttrAndText(clonedItem);
                                curChild.parentNode.replaceChild(clonedItem, curChild);
                            }

                        } else { //initially preRenderedCount equals to 0, new elements are rendered according to model
                            var clonedItem = cloneLoopTemplate(elem, curModel, itemModel, key, index);

                            elem.appendChild(clonedItem);
                            createModelScope(clonedItem);
                            deepRenderAttrAndText(clonedItem);
                        }
                        index++;
                    }
                    //loop through difference between preRenderedCount and current index which equals to list's length in model
                    for (var i = 0; i < preRenderedCount - index; i++) {
                        //if this difference is greater than zero, previously rendered element should be removed from screen.
                        var preElem = elem.childNodes[preRenderedCount - i - 1];
                        preElem.parentNode.removeChild(preElem);
                    }
                }
            }
        }

        //renders element's attributes and inner text
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

        //re-renders elements specified. it is being used while creating components, re-rendering lists etc.
        function deepRenderAttrAndText(elem) {
            for (var i = 0; i < elem.childNodes.length; i++) {
                deepRenderAttrAndText(elem.childNodes[i]);
            }
            renderAttributesAndText(elem);
        }

        //re-renders lists
        function deepRenderItemList(elem) {
            for (var i = 0; i < elem.childNodes.length; i++) {
                deepRenderItemList(elem.childNodes[i]);
            }
            renderItemList(elem, true);

            if (elem.tagName === 'SELECT') {
                elem.value = findAndReplaceExecResult(elem, elem.attributes.__nakedvalue, elem.model);
            }
        }

        //single render element on model change
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
                                elem.parentNode.replaceChild(elem.commentNode, elem);
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

        //creates deeply model scope for element and its children
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

        //creates elements' DOM without rendering
        self.createElement = function (tagName, attrs) {
            var childList = Array.prototype.slice.call(arguments, 2),
                elem;

            if (allowedElements.hasOwnProperty(tagName)) {
                elem = document.createElement(tagName);

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

                    for (var key in attrs) {
                        if (allowedProperties.hasOwnProperty(key) || isCustomAttribute(key)) {
                            var validPropName = DOMPropertyNames[key] ? DOMPropertyNames[key] : key;
                            elem.setAttribute(validPropName, attrs[key]);
                            if (isTemplateSyntax(attrs[key])) {
                                elem.attributes['__naked' + validPropName] = attrs[key];
                                defineEmptySetter(elem.attributes, '__naked' + validPropName);
                            }
                        }
                        else if (key === 'events') {
                            elem.symEvents = attrs[key];
                            addEventListeners(elem);
                        }
                    }

                    elem.__symElementId = generateId();
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

        //creates loop model with passed list. it will be used to create repeated list as loopModel.
        self.createLoopModel = function (name, list) {
            return { name: name, list: list };
        }
    }());
});