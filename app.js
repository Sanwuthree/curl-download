/*
  %        Total       %   Received   %    Xferd   Average Speed   Time    Time     Time  Current

[ '0',     '316M',    '0',    '1702k',    '0',     '0',     '619k',     '0',     '0:08:43',    '0:00:02',    '0:08:41' ]
*/

const spawn = require("child_process").spawn;
const emt = require("events").EventEmitter
class Curl extends emt {
    constructor() {
        super()
        this.op = null;
    }
    download(uri, des = "-1") {
        let args = [];
        if (des === "-1") {
            args.push("-O")
        } else {
            args.push("-o");
            args.push(des)
        }
        args.push(uri)
        this.op = spawn("./curl.exe", args);
        this.op.stderr.on("data", (buffer) => {
            let bufStr = buffer.toString().trim();
            if (bufStr[0] != "%") {
                bufStr.split(" ")
                let result= splitBuffer(bufStr);
                this.emit("download-process",result)
            } else {
                console.log(bufStr);
                console.log("============================================================")
            }
        });
        this.op.on("exit",(code,signal)=>{
            console.log("exit",code,signal)
        })
        this.op.stdout.on("data",(chunk)=>{
            console.log("stdout="+chunk)
        })
    }
}
function splitBuffer(str) {
    let arr = [];
    let cacheStr = "";
    let needPush = false;
    for (let i in str) {
        let chr = str[i];
        if (chr == " ") {
            if (needPush == true) {
                arr.push(cacheStr);
                needPush = false;
                cacheStr = ""
            }
        } else {
            cacheStr += chr;
            needPush = true;
        }
    }
    return arr;
}
module.exports = Curl;