const fs = require('fs');
const dir = '../dataVisPractice/responsive';
const forgetFiles = ['.DS_Store','.gitignore','normalizeReset.css','dark.css','colorSCaleRect','colorScaleCanvas','colorLegend','colorLegendHz']
const docFiles = fs.readdirSync(dir);
const filterdDocs = docFiles.filter(file => !forgetFiles.includes(file))

const setupFileObj = (arr) => {
  let thisUrl = `${dir}/${arr}`
  let childStuff = fs.readdirSync(thisUrl)
  let filteredChildren = childStuff.filter(ch => !ch.includes('.'))
  return {
    parent: arr, 
    children: filteredChildren
  }
}

let docsAndChilds = filterdDocs.map(setupFileObj);

console.log('docsAndChilds')
console.log(docsAndChilds)