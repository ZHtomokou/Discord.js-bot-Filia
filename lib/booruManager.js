const https = require("https");
const xml2js = require("xml2js");

async function rule34(message) {
    if(!message.channel.nsfw) {
        return message.channel.send(":warning: This channel is not NSFW!");
    }
    let args = message.content.split(" ");
    if(!args[1]) return;
    args.shift();
    args = JSON.stringify(args);
    args = args.replace(/,/g, "+").replace(/"/g, "");
    args = args.substring(1, args.length - 1);
    message.channel.send("The result of \"" + args + "\" is ...");
    
    var url = "https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=" + args;
    console.log(url);
    https.get(url, function(res) {
        var body = "";
        res.on("data", function(chunk) {
            body += chunk;
        });
        res.on("end", function() {
            var parser = new xml2js.Parser();
            parser.parseString(body, function(err, result) {
                var postCount = result.posts.$.count;
                if(postCount > 100) {
                    postCount = 100;
                }
                if(postCount > 0) {
                    var picNum = Math.floor(Math.random() * postCount);
                    var r34Pic = result.posts.post[picNum].$.file_url;
                    message.channel.send({
                        files: [r34Pic]
                    });
                } else {
                    console.log("Nothing found : " + args);
                    message.channel.send("Nothing found : " + args);
                }
            });
        });
    }).on("error", function(e) {
        console.log("Error : " + e);
    });
}

module.exports.rule34 = rule34;
