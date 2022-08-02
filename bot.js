const { Telegraf } = require('telegraf')
const axios = require('axios')

const bot = new Telegraf("5538462229:AAGZMsNrYR-1iBGNoWF0tfZjf9DZHiYYkWM")

bot.start((ctx) => {
    let usuario = ctx.from;

    ctx.reply("Bienvenido "+usuario.first_name +" "+usuario.last_name);
    ctx.reply("En este bot podras consultar personas por dni");
    ctx.reply("/dni 76541230");
})

bot.command('dni', async (ctx) => {
    let mensaje = ctx.message;

    let _dni = (mensaje.text.replace("/dni ", ""));

    let url = "https://www.softwarelion.xyz/api/reniec/reniec-dni";
    let json = {
        dni: _dni
    };

    let config = {
        headers : {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNDM5LCJjb3JyZW8iOiJwcnVlYmFzZWxkZWF0aEBnbWFpbC5jb20iLCJpYXQiOjE2NTk0NTk5MTJ9.yJLg-rxe32DGsnAV4dodTpPkmD-eA6vhC-zj23praGY"
        }
    }

    let response = await axios.post(url, json, config);

    if(response.data.success){
        let persona = response.data.result;

        let mensaje = "Ap. Parterno >> "+persona.paterno+
                      "\n\nAp. Materno >> "+persona.materno+
                      "\n\nNombres >> "+persona.nombres+
                      "\n\nCod. Veri >> "+persona.codigoVerificacion+
                      "\n\nSexo >> "+persona.sexo;


        ctx.reply(mensaje)
    }
})

bot.launch()