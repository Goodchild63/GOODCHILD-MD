const util = require('util');

const fs = require('fs-extra');

const { zokou } = require(__dirname + "/../framework/zokou");

const { format } = require(__dirname + "/../framework/mesfonctions");

const os = require("os");

const moment = require("moment-timezone");

const s = require(__dirname + "/../set");



zokou({ nomCom: "list", categorie: "Menu" }, async (dest, zk, commandeOptions) => {

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
╭────✧ *GOODCHILD MD* ✧────◆
      MADE BY GOODCHILD TECH
     ╭──────────────
|♧│   *ᴘʀᴇғɪx* : ${s.PREFIXE}
|♧│   *ᴘʀᴏᴘʀɪᴇᴛᴀɪʀᴇ* : ${s.OWNER_NAME}
|♧│   *ᴍᴏᴅᴇ* : ${mode}
|♧│   *ᴄᴏᴍᴍᴀɴᴅᴇs* : ${cm.length}
|♧│   *ᴅᴀᴛᴇ* : ${date}
|♧│   *ʜᴏᴜʀ* : ${temps}
|♧│   *ʀᴀᴍ* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
|♧│   *ᴘʟᴀᴛᴇғᴏʀᴍᴇ* : ${os.platform()}
|♧│   *ᴅᴇᴠᴇʀᴏᴘᴇʀ* : *GOODCHILD TECH*
|♧│   *ɴᴀᴛɪᴏɴ* : ᴛᴀɴᴢᴀɴɪᴀ
|♧|    * ᴠᴇʀsɪᴏɴ*    : ᴠ10.0.0
    ╰───────────────
╰─────✧ʟᴇᴏɴᴀʀᴅ ᴍᴅ✧─────◆ \n\n`;
    
    let menuMsg = `
THIS IS GOODCHILD MD BY *GOODCHILD*


*JUST ENGOY 😌*
`;

    if (commandeOptions.categorie) {
        const categorieSelectionnee = commandeOptions.categorie;
        if (coms[categorieSelectionnee]) {
            menuMsg += `╭────  ${categorieSelectionnee}  ────`;
            for (const cmd of coms[categorieSelectionnee]) {
                menuMsg += `
*☞︎︎︎ ${cmd}*`;
            }
            menuMsg += `
╰═════════════⊷\n`;
        } else {
            menuMsg += `La catégorie "${categorieSelectionnee}" n'existe pas.\n`;
        }
    } else {
        for (const cat in coms) {
            menuMsg += `╭────✧  ${cat}  ✧────`;
            for (const cmd of coms[cat]) {
                menuMsg += `
*☞︎︎ ${cmd}*`;
            }
            menuMsg += `
╰═════════════⊷ \n`;
        }
    }

    menuMsg += `
◇            ◇
*»»————— ★ —————««*
" 🥷🥷🥷🥷🥷🥷🥷🥷🥷."
 
 *DEVELOPER BY *GOODCHILD TECH*
*»»—————    ★   —————««*
`;

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Leonard-MD*, développé par GOODCHILD-TECH" , gifPlayback : true }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Leonard-MD*, développé par GOODCHILD-TECH" }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else {
        repondre(infoMsg + menuMsg);
    }
});
