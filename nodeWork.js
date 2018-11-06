const fs = require('fs');
const dir = '../dataVisPractice/responsive';

const forgetFiles = ['.DS_Store','.gitignore','normalizeReset.css','dark.css','colorSCaleRect','colorScaleCanvas','colorLegend','colorLegendHz']

const docFiles = fs.readdirSync(dir);
const filterdDocs = docFiles.filter(file => !forgetFiles.includes(file))

let docsAndChilds = filterdDocs.map(doc => {
  let thisDoc = {parent: '', children: []}
  let thisUrl = `${dir}/${doc}`
  let childStuff = fs.readdirSync(thisUrl)
  let filteredChildren = childStuff.filter(ch => !ch.includes('.'))

  thisDoc.parent = doc
  thisDoc.children = filteredChildren

  return thisDoc

})
console.log('docsAndChilds')
console.log(docsAndChilds)