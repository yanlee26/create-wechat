const fs = require('fs')
const path = require('path')

const fileDirName =  process.argv[2] ? `${process.argv[2]}` : `index`
const fileName =  process.argv[3] ? `${process.argv[3]}` : `index`

const templates = {
    js: 
`Page({

})
`,
    json: 
`{
    "navigationBarTitleText": "${fileName}"
}
`,
    wxml: 
`
<view class="container">
    <template is="head"/>

    <template is="foot" />
</view>
`,
    wxss: 
``
}

const baseUrl = `page/component`
const appJsonPath = `./app.json`
const fileDir = `./${baseUrl}/${fileDirName}`
const fileFullPath = `./${baseUrl}/${fileDirName}/${fileName}`

const pages = []
pages.push(path.dirname(`${baseUrl}/${fileDirName}/${fileName}/${fileName}`))
const app = {
    pages,
    "debug": false
}  

function createWxComponent(fileDir,filePath, templates,  cb) {
    fs.mkdir(fileDir, err => {
        if (err) throw err
        Object.entries(templates).map(([k, v]) => {
            cb(`${filePath}.${k}`, v)
        })
    })
}

function geneateFile(filePath, str) {
    fs.writeFile(filePath, str, err => {
        if (err) throw err;
        console.log('file created!')
    })
}


createWxComponent(fileDir, `${fileFullPath}`, templates, geneateFile)

geneateFile(appJsonPath, JSON.stringify(app, '', 4))
