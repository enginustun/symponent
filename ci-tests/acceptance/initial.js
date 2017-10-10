// test/acceptance/index.js
import { Selector } from 'testcafe';

fixture('Initial').page('http://localhost:1337/');

test('post-add-form should be rendered only add button is clicked.', async (t) => {
    await t.expect(Selector('.post-add-form-container .post-add-form').length == 0);
    await t.click(Selector('.post-add-form-container > button')).expect(Selector('.post-add-form-container .post-add-form').length > 0);
});