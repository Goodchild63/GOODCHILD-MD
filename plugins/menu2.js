const util = require('util');

const fs = require('fs-extra');

const { zokou } = require(__dirname + "/../framework/zokou");

const { format } = require(__dirname + "/../framework/mesfonctions");

const os = require("os");

const moment = require("moment-timezone");

const s = require(__dirname + "/../set");



zokou({ nomCom: "menu", categorie: "Menu" }, async (dest, zk, commandeOptions) => {

    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;

    let { cm } = require(__dirname + "/../framework//zokou");

    var coms = {};

    var mode = "public";

    

    if ((s.MODE).toLocaleLowerCase() != "yes") {

        mode = "private";

    }





    



    cm.map(async (com, index) => {

        if (!coms[com.categorie])

            coms[com.categorie] = [];

        coms[com.categorie].push(com.nomCom);

    });



    moment.tz.setDefault(s.TZ);



// Créer une date et une heure en GMT

const temps = moment().format('HH:mm:ss');

const date = moment().format('DD/MM/YYYY');



  let infoMsg =  `

╔════➻⊷➻════──
║  ━═━ *GOODCHILD MD* ━═━
║ ┃𒊹ᴍᴏᴅᴇ: ${mode}
║ ┃𒊹ᴜsᴇʀ : ${s.OWNER_NAME}
║ ┃𒊹ʟɪʙʀᴀʀʏ : Baileys
║ ┃𒊹ᴘʀᴇғɪx : ${s.PREFIXE}
║ ┃𒊹ᴅᴀᴛᴇ : ${date}
║ ┃𒊹ᴛɪᴍᴇ : ${temps}
║ ┃𒊹ᴛᴏᴏʟs : ${cm.length}
║ ┃𒊹ʀᴀᴍ : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
║ ┃𒊹ʜᴏsᴛ : ${os.platform()}
║  ━━━━═════━━━━
╚════➻⊷➻════───\n\n`;


    

let menuMsg = `
╭──━━━━──── 
│╔════➳════╗
│║☯ _*GOODCHILD TECH*_
│╚════➳════╝
╰──━━━━────\n

|◈ʟᴇᴏɴᴀʀᴅ ᴄᴏᴍɴᴅs
`;



    for (const cat in coms) {

        menuMsg += ` ╔═━━═ _*${cat}*_ ═━━══➻`;

        for (const cmd of coms[cat]) {
            
            menuMsg += `
║☯ ${cmd}`;

        }

        menuMsg += `
╚══━━━━════───➳
 ══════✣══════ 
║☯ _*GOODCHILD TECH*_║
 ══════✣══════ 
 ━━━━━━━━━━━━━\n`

    }



    menuMsg += `


  ═══════════════
 ║☯ _*GOODCHILD MD 2024*_
 ║☯ _*ENJOY LIFE*_ 
  ═══════════════
  ━━━━═══════━━━━ 
 ┃╔══════════════╗
 ┃║☯ _*POWERED BY GOODCHILD 🥷*_
 ┃╚══════════════╝
  ━━━━═══════━━━━ \n

|𒊹KEEP USING GOODCHILD MD 
`;



   var lien = mybotpic();



   if (lien.match(/\.(mp4|gif)$/i)) {

    try {

        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *TKM-BOT*, déveloper Cod3uchiha" , gifPlayback : true }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

// Vérification pour .jpeg ou .png

else if (lien.match(/\.(jpeg|png|jpg)$/i)) {

    try {

        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *TKM-bot*, déveloper cod3uchiha" }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

else {

    

    repondre(infoMsg + menuMsg);

    

}



});
