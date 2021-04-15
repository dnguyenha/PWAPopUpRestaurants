# ES6 Static Site Renderer ... With Markdown

Simplest way that I could think of to generate a static site with ES6 templates.

## Quick Start

With [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

```
npm install
npm start

```

Right click over `index.html` and Open with Live Server.

## How to include your own content

The basic format of a page is a .js file with the same name as the .html file that you want to have generated. For instance:

``` index.js

const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor(){
        super({title:"Home", sName:"Richard Hildred"});
    }
    render(sPage) {
        return `
        ${this.requireMarked('_pages/index.md')}
        `;
    }
}

```

Of course this could also be used for a single page site just by using 1 template. You would also want to change the links in the `_partials/Nav.js` and `css/main.css` to bookmarklets. I wish that I had thought of this node.js approach before I did the [client side approach here](https://github.com/rhildred/browserBlog).

You can substitute your own template for the default template. The one included is:

```
const Page = require("../_partials/Page");
const Head = require("../_partials/Head");
const Header = require("../_partials/Header");
const Nav = require("../_partials/Nav");
const Footer = require("../_partials/Footer");

module.exports = class extends Page {
    constructor(options){
        super();
        Object.assign(this, options);
    }
    renderHeadHeaderNav(sPage) {
        return `
<!DOCTYPE html>
<html lang="en" class="${sPage}">
    <head>
    ${new Head(this).render()}
    <title>${this.title}</title>
    </head>
    <body>
        ${new Header(this).render()}
        ${new Nav(this).render()}
        <main>
    `;
    }
    renderFooter(sPage){
        return `
    </main>
    ${new Footer(this).render()}
    </body>
</html>
        `;
    }
}

```

As you hopefully can see it uses lots of little files from the partials folder. You may want to paste the common part of an existing template in there. You may also want to have 1 template for pages and another for an index or overview.