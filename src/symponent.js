//check if `sym` is already exists or not.
if (!window.sym) {

    //helper functions
    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

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

        //check if value is primitive
        function isPrimitive(value) {
            return (
                typeof value === 'string' ||
                typeof value === 'number' ||
                typeof value === 'boolean'
            )
        }

        //checks if object is array or json object. can it be iterated with forin loop?
        var isIterable = function (obj) {
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
            if (~nakedValue.indexOf('{') && ~nakedValue.indexOf('}')) {
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

        //copies self defined attributes, templates, models etc. for cloned elements from template element
        var deepCopyCustomAttributesAndEvents = function (newElem, oldElem) {
            for (var i = 0; i < newElem.childNodes.length; i++) {
                var newChild = newElem.childNodes[i],
                    oldChild = oldElem.childNodes[i];
                deepCopyCustomAttributesAndEvents(newChild, oldChild);
            }
            if (newElem && oldElem && !isTextNode(newElem)) {
                if (oldElem.loopTemplate && !newElem.loopTemplate) {
                    newElem.loopTemplate = oldElem.loopTemplate;
                }
                if (oldElem.loopModel && !newElem.loopModel) {
                    newElem.loopModel = oldElem.loopModel;
                }
                addEventListeners(newElem, oldElem.symEvents);
                for (var key in oldElem.attributes) {
                    if (oldElem.attributes.hasOwnProperty(key) && !(oldElem.attributes[key] instanceof Attr)) {
                        newElem.attributes[key] = oldElem.attributes[key];
                    }
                };
                newElem.__symElementId = generateId();
            }
        }

        //checks, creates or removes items for repeatable elements. also creates model scope of each loop items.
        var createItemList = function (elem) {
            if (elem.loopTemplate) {
                var itemModel = elem.loopTemplate.loopModel.list,
                    oldRenderedList = {};
                if ((Array.isArray(itemModel) || typeof itemModel === 'object') && elem.loopTemplate instanceof Node) {

                    //if element has child nodes, keep them to compare to decide whether it needs to be deleted or not
                    for (var i = 0; i < elem.childNodes.length; i++) {
                        if (!isTextNode(elem.childNodes[i])) {
                            var elemId = elem.childNodes[i].__symElementId;
                            oldRenderedList[elemId] = elem.childNodes[i];
                        }
                    }
                    for (var key in itemModel) {
                        //if current itemModel element's type is string, wrap this element by String, 
                        //because we need to keep __symElementId value in its attribute.
                        var curModel = itemModel[key];
                        if (isPrimitive(curModel)) {
                            console.warn('Please do not use primitive values as model');
                        }
                        else {
                            if (!curModel.__symElementIds) {
                                Object.defineProperty(curModel, '__symElementIds', {
                                    enumerable: false,
                                    value: [],
                                    writable: true
                                });
                            }
                            var anyPreRenderedFound = [];
                            if (curModel.__symElementIds) {
                                anyPreRenderedFound = curModel.__symElementIds.filter(function (id) {
                                    return oldRenderedList[id];
                                });
                            }
                            //if this condition will be matched then no need to clone and append new element, it already exists 
                            if (anyPreRenderedFound.length > 0) {
                                for (var i = 0; i < anyPreRenderedFound.length; i++) {
                                    var foundedId = anyPreRenderedFound[i];
                                    delete oldRenderedList[foundedId];
                                }
                            }
                            else {
                                var renderedItem = elem.loopTemplate.cloneNode(true);
                                deepCopyCustomAttributesAndEvents(renderedItem, elem.loopTemplate);
                                //generate new id to keep elements unique
                                renderedItem.__symElementId = generateId();
                                if (typeof item !== 'string') {
                                    curModel.__symElementIds && curModel.__symElementIds.push(renderedItem.__symElementId);
                                }

                                if (!renderedItem.model) {
                                    renderedItem.model = {};
                                }
                                //assign current model to list-item element
                                renderedItem.model[elem.loopTemplate.loopModel.name] = itemModel[key];
                                renderedItem.__symModelKey = key;

                                //append list item to element
                                elem.appendChild(renderedItem);
                            }
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

        //defines empty setter to properties which will be evaluated on rendering phase to avoid XSS attack and external interventions.
        var defineEmptySetter = function (currentObject, propKey) {
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

        //binds elements and models
        var setBindedElements = function (nakedValue, elem, type, attrName) {
            var modelObj = isTextNode(elem) ? elem.parentNode.model : elem.model;
            while ((execResult = weedOutReg.exec(nakedValue)) !== null) {
                var propertyName = execResult[1],
                    modelName = execResult[0].replace(propertyName, '');
                propertyName = propertyName.substr(1);
                var model = eval('modelObj.' + modelName);

                //define binded elements' container object
                if (!model.hasOwnProperty('__symBinded')) {
                    Object.defineProperty(model, '__symBinded', {
                        enumerable: false,
                        value: {},
                        writable: true
                    });
                }

                if (!model.__symBinded[propertyName]) {
                    model.__symBinded[propertyName] = {};
                }
                var ourElem = isTextNode(elem) ? elem.parentNode : elem;
                if (!model.__symBinded[propertyName][ourElem.__symElementId]) {
                    model.__symBinded[propertyName][ourElem.__symElementId] = {
                        elem: ourElem,
                        type: type
                    };
                }
                var elementProps = model.__symBinded[propertyName][ourElem.__symElementId];
                if (!elementProps.attributes) {
                    elementProps.attributes = [];
                }
                if (!~elementProps.attributes.indexOf(attrName)) {
                    elementProps.attributes.push(attrName);
                }
            }
        }

        //renders element's attributes and inner text
        var renderAttributesAndText = function (elem) {
            if (isTextNode(elem) && !elem.parentNode.attributes['__nakedinnervalue']) {
                elem.parentNode.attributes['__nakedinnervalue'] = elem.nodeValue;
                defineEmptySetter(elem.parentNode.attributes, '__nakedinnervalue');
            }

            if (!isTextNode(elem)) {
                if (elem.attributes) {
                    var removeChecked = false;
                    for (var i = 0; i < elem.attributes.length; i++) {
                        var attr = elem.attributes[i],
                            nakedValue = elem.attributes['__naked' + attr.name];
                        if (nakedValue && typeof nakedValue === 'string' && ~nakedValue.indexOf('{')) {
                            setBindedElements(nakedValue, elem, 'attributes', attr.name);
                            attr.value = findAndReplaceExecResult(elem, nakedValue, elem.model);
                            if (attr.name.toLowerCase() === 'value') {
                                elem.value = attr.value;
                            }
                        }
                        if (attr.name.toLowerCase() === 'checked' && !(attr.value === 'true')) {
                            removeChecked = true;
                        }
                    }
                    if (removeChecked) {
                        elem.removeAttribute('checked');
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
                    setBindedElements(nakedValue, elem, 'innerValue');
                    elem.nodeValue = findAndReplaceExecResult(elem, nakedValue, elem.parentNode.model);
                }
            }
            createItemList(elem);

            defineGettersAndSetters(elem);
        }

        //shows to get/set definitions of model are done
        var defineRenderedTrue = function (model) {
            if (!model.hasOwnProperty('__isRendered')) {
                Object.defineProperty(model, '__isRendered', {
                    enumerable: false,
                    value: true
                });
            }
        }

        //single render element on model change
        var renderAttributeOrText = function (elem, type, attributes) {
            if (!isTextNode(elem) && type === 'attributes') {
                if (elem.attributes) {
                    for (var i = 0; i < attributes.length; i++) {
                        var attrName = attributes[i];
                        if (attrName === 'checked') {
                            elem.setAttribute('checked', 'checked');
                        }
                        var attr = elem.attributes[attrName],
                            nakedValue = elem.attributes['__naked' + attrName];
                        if (nakedValue && typeof nakedValue === 'string' && ~nakedValue.indexOf('{')) {
                            attr.value = findAndReplaceExecResult(elem, nakedValue, elem.model);
                            if (attr.name.toLowerCase() === 'value') {
                                elem.value = attr.value;
                            }
                        }
                        if (attr.name.toLowerCase() === 'checked' && !(attr.value === 'true')) {
                            elem.removeAttribute(attr.name);
                        }
                        if (attrName === 'render') {
                            if (elem.attributes.render.value !== 'true') {
                                elem.style.display = 'none';
                            }
                            else {
                                elem.style.display = 'initial';
                            }
                        }
                    }
                }
            }
            else {
                var nakedValue = elem.attributes['__nakedinnervalue'];
                if (nakedValue && typeof nakedValue === 'string' && ~nakedValue.indexOf('{')) {
                    for (var childNodeKey in elem.childNodes) {
                        if (elem.childNodes.hasOwnProperty(childNodeKey)) {
                            var childNode = elem.childNodes[childNodeKey];
                            if (isTextNode(childNode)) {
                                childNode.nodeValue = findAndReplaceExecResult(childNode, nakedValue, elem.model);
                            }
                        }
                    }
                }
            }
        }

        //recursive helper function of defineGettersAndSetters, actually all work is done here 
        var defineGettersAndSettersHelper = function (model, elem) {
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
                                Object.defineProperty(model, '__sym' + propName, {
                                    enumerable: false,
                                    value: modelProp,
                                    writable: true
                                });
                                Object.defineProperty(model, propName,
                                    {
                                        get: function () { return model['__sym' + propName] },
                                        set: function (val) {
                                            model['__sym' + propName] = val;

                                            if (isIterable(model.__symBinded[propName])) {
                                                for (var elemId in model.__symBinded[propName]) {
                                                    if (model.__symBinded[propName].hasOwnProperty(elemId)) {
                                                        var elementProps = model.__symBinded[propName][elemId];
                                                        renderAttributeOrText(elementProps.elem, elementProps.type, elementProps.attributes);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                );
                            }
                        }
                    }(propName));
                }
                defineRenderedTrue(model);
            }
        }

        //defines get and set functions of each property of element's models
        var defineGettersAndSetters = function (elem) {
            if (!isTextNode(elem) && isIterable(elem.model)) {
                for (var propName in elem.model) {
                    if (elem.model.hasOwnProperty(propName)) {
                        var modelProp = elem.model[propName];
                        defineGettersAndSettersHelper(modelProp, elem);
                    }
                }
            }
        }

        //creates deeply model scope for element and its children
        var createModelScope = function (elem, force) {
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
        }

        //this method will be used to refresh component
        var deepRenderAttrAndText = function (elem) {
            for (var i = 0; i < elem.childNodes.length; i++) {
                deepRenderAttrAndText(elem.childNodes[i]);
            }
            renderAttributesAndText(elem);
            //addEventListeners(elem, elem.symEvents);

            if (elem.tagName === 'SELECT') {
                elem.value = findAndReplaceExecResult(elem, elem.attributes.__nakedvalue, elem.model);
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
                        if (!elem.model) {
                            elem.model = {};
                        }
                        elem.model[modelName] = model;
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
                            if (typeof attrs[key] === 'string' && ~attrs[key].indexOf('{') && ~attrs[key].indexOf('}')) {
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
                        if (~childList[i].indexOf('{') && ~childList[i].indexOf('}')) {
                            elem.attributes['__nakedinnervalue'] = childList[i];
                            defineEmptySetter(elem.attributes, '__nakedinnervalue');
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
} else {
    console.error('There is already an object of window named sym.');
    console.log('current `sym` object: ', window.sym);
}