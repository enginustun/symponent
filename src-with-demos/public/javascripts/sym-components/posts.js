var postModel = { isAdding: false, addingPost: {} };
function addPost() {
    if (postModel.addingPost.name && postModel.addingPost.url) {
        var newPost = {};
        newPost.name = postModel.addingPost.name;
        newPost.url = postModel.addingPost.url;
        newPost.views = 0;
        newPost.user = 'Anonymous';
        newPost.when = 'just now';
        newPost.upvotes = 0;
        symPosts.push(newPost);
        postModel.addingPost.name = '';
        postModel.addingPost.url = '';
    } else {
        alert('title and url are mandatory fields.')
    }
}
var postComponent = scc(
    sce('div', {},
        sce('div', {
            className: 'posts-container',
            loopTemplate: sce('div', {
                className: 'post-item',
                loopModel: slm('post', symPosts)
            },
                sce('div', {
                    className: 'close',
                    events: {
                        click: function (e, elem) {
                            var delIndex = symPosts.indexOf(elem.model.post);
                            if (~delIndex) {
                                symPosts.splice(delIndex, 1);
                            }
                        }
                    }
                }, 'x'),
                sce('div', { className: 'post-header' },
                    sce('span', {
                        className: 'up-button',
                        events: {
                            click: function (e, elem) {
                                elem.model.post.upvotes++;
                            }
                        }
                    }, '&#x25B2;'),
                    sce('a', {
                        href: '{post.url}',
                        target: '_blank',
                        events: {
                            click: function (e, elem) {
                                elem.model.post.views++;
                            }
                        }
                    }, '{post.name}'),
                    sce('div', {},
                        sce('small', {}, '{post.upvotes} up'),
                        sce('span', {}, ' | '),
                        sce('small', {}, 'by {post.user}'),
                        sce('span', {}, ' | '),
                        sce('small', {}, '{post.when}'),
                        sce('span', {}, ' | '),
                        sce('small', {}, '{post.views} views'),
                    )
                )
            ),
        }),
        sce('div', {
            model: { postModel: postModel }, 
            className: 'post-add-form-container'
        },
            sce('button', {
                events: {
                    click: function (e, elem) {
                        elem.model.postModel.isAdding = true;
                        console.log(elem.model.postModel);
                    }
                }
            }, 'Add New Post'),
            sce('div', { className: 'clearfix' }),
            sce('div', {
                className: 'post-add-form',
                render: '{postModel.isAdding}'
            },
                sce('div', {
                    className: 'close',
                    events: {
                        click: function (e, elem) { elem.model.postModel.isAdding = false; }
                    }
                }, 'x'),
                sce('div', { className: 'form-group' },
                    sce('label', {}, 'Title: '),
                    sce('input', {
                        placeholder: 'enter post title',
                        value: '{postModel.addingPost.name||""}',
                        events: {
                            keyup: function (e, elem) {
                                elem.model.postModel.addingPost.name = e.target.value;
                                if (e.keyCode == 13) {
                                    addPost();
                                }
                            }
                        }
                    })
                ),
                sce('div', { className: 'form-group' },
                    sce('label', {}, 'Url: '),
                    sce('input', {
                        placeholder: 'enter post url',
                        value: '{postModel.addingPost.url||""}',
                        events: {
                            keyup: function (e, elem) {
                                elem.model.postModel.addingPost.url = e.target.value;
                                if (e.keyCode == 13) {
                                    addPost();
                                }
                            }
                        }
                    })
                ),
                sce('button', {
                    events: {
                        click: function (e, elem) {
                            addPost();
                        }
                    }
                }, 'Add Post'),
                sce('div', { className: 'clearfix' })
            )
        )
    ),
    'posts-container'
);