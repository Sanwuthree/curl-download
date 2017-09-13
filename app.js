const spawn=require("child_process").spawn;
const emt=require("events").EventEmitter
class Curl extends emt {
    constructor(){
        super()
        console.log("Hello Curl");
        this.op=null;
    }
    download(uri,des="-1"){
        let args=[];
        if(des==="-1"){
            args.push("-O")
        }else{
            args.push("-o");
            args.push(des)
        }
        args.push(uri)
        this.op=spawn("./curl.exe",args);
        this.op.stderr.on("data",this.onErrorData)
    }
    onErrorData(buffer){
        console.log(buffer.toString())
    }
}
module.exports=Curl;