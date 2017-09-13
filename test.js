let Curl =require("./app")
let c=new Curl();

const url = "http://electron-ltsp.oss-cn-hangzhou.aliyuncs.com/lantusupei/lantusupei-6.2.zip";

c.download(url)
c.on("download-process",(arr)=>{
   console.log(arr)
})
