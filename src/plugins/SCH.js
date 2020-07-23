/**
 * @author Debonex
 * @fileoverview push messages about new card [SCH]
 * @date 2020年7月23日16:12:54
 */

const axios = require("axios")
const cheerio = require("cheerio")

//#region load
const main = function () {
    axios.get("https://github.com/Debonex?tab=repositories").then(resp => {
        var $ = cheerio.load(resp.data)
        var lis = $("#user-repositories-list li")
        var repos = []
        for (var i = 0; i < lis.length; i++) {
            var li = lis.eq(i)
            var repo = {
                repoName: li.find("h3").text().trim(),
                repoUrl: li.find("h3 a").attr("href").trim(),
                repoDesc: li.find("p").text().trim(),
                language: li.find("[itemprop=programmingLanguage]").text().trim(),
                star: li.find(".muted-link.mr-3").eq(0).text().trim(),
                fork: li.find(".muted-link.mr-3").eq(1).text().trim(),
                forkedFrom: li.find(".f6.text-gray.mb-1 a").text().trim()
            }
            repos.push(repo)
        }        
        console.log(repos)
        setTimeout(() => {
            main()
        }, 20000);
    }).catch(err=>{
        setTimeout(() => {
            main()
        }, 20000);
    })
}

main()


console.log('Plugin SCH loaded.')

//#endregion


const handle = function (ws) {
    ws.on('message', function (msg) {
        console.log('SCH recieve: ' + msg)
    })
}

exports.handle = handle