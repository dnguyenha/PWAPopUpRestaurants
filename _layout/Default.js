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