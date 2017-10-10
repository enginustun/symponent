var menuComponent = scc(
    sce('nav', {},
        sce('ul', {
            loopTemplate: sce('li', {
                loopModel: slm('menuItem', symMenu)
            },
                sce('a', { className: '{menuItem.active?"active": ""}', href: '{menuItem.url}' }, '{menuItem.name}')
            )
        })
    ),
    'menu-container'
)