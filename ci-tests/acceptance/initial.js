// test/acceptance/index.js
import { Selector } from 'testcafe';

fixture('Initial').page('http://localhost:1337/');

test('The created element is instance of HTMLDivElement.', async (t) => {
    var divElement = sym.createElement('div');
    await t.expect(divElement.toString()).eql('[object HTMLDivElement]');
});