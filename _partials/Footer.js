const Page = require("./Page");

module.exports = class extends Page{
    constructor(options){
        super(options);
    }
    render(){
        return `
            <footer>
                </br></br>
                &copy; <script>document.write(new Date().getFullYear())</script> ${this.sName}
            </footer>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
            <script src="js/main.js"></script>
        `;
    }
}