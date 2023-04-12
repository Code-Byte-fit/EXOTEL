const nodeMailer=require('nodemailer');
const html=`<h1>HelloWorld</h1>`

async function main(){
    nodeMailer.createTransport({
        host:''
    })
}