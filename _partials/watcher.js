fs = require('fs');

// folder of package.json for `npm start`
const sDir = process.cwd();

const fGenerate = () => {
  fs.readdirSync(sDir).forEach((sFile) => {
    const oStat = fs.statSync(`${sDir}/${sFile}`);
    let aFile = sFile.split('.');
    if (!oStat.isDirectory() && aFile.pop() === 'js') {
      // Only do .js files in the current folder
      const sPage = aFile.join('.');
      aFile.push('html');
      const sOut = aFile.join('.');
      try {
        delete require.cache[`${sDir}/${sFile}`];
        const Page = require(`${sDir}/${sFile}`);
        const oPage = new Page();
        let sOutput = oPage.renderHeadHeaderNav(sPage);
        sOutput += oPage.render(sPage);
        sOutput += oPage.renderFooter(sPage);
        // new Page().render(sPage) is the business. You can see how it works in the sample js files
        fs.writeFileSync(`${sDir}/${sOut}`, sOutput, { mode: 0o644 });
      } catch (err) {
        // An error occurred
        console.error(err);
      }
    }
  });

}

// generate all html from all js files in the project folder the first time
fGenerate();

fWatcher = (sNewDir)=>{
  const stats = fs.statSync(`${sDir}/index.html`);
  fs.readdirSync(sNewDir).forEach((sFile) => {
    const fStats = fs.statSync(`${sNewDir}/${sFile}`);
    if(fStats.isDirectory()){
      // recurse into directory
      fWatcher(`${sNewDir}/${sFile}`);
    } else if(sFile.match(".js") && fStats.mtimeMs > stats.mtimeMs){
      // file is changed so we regenerate everything. It is quick and I 
      // couldn't think of a good way to match dependencies
      fGenerate();
      console.log(`change to ${sNewDir}/${sFile}`);
      return;      
    }
  });
}

// generate in 3 seconds if there is a change
setInterval(()=>{
  fWatcher(sDir);
}, 3000);
