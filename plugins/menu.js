const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandOptions;
    let { cm } = require(__dirname + "/../framework/zokou");

    var commands = {};
    var mode = "public";

    if ((s.MODE).toLowerCase() !== "yes") {
        mode = "private";
    }

    cm.map((command) => {
        if (!commands[command.categorie]) commands[command.categorie] = [];
        commands[command.categorie].push(command.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const currentTime = moment().format('HH:mm:ss');
    const currentDate = moment().format('DD/MM/YYYY');

    let headerMessage = `
╭─────────────────╮  
│        *GOODCHILD-MD*     │  
│      *BEST WHATSAPP BOT*  │  
╰─────────────────╯  

╭━━❰ *AVAILABLE MENUS* ❱━━╮  
┃ ❒  ▸ *MENU* 🧷               
┃ ❒  ▸ *MENU2*   ⚒️              
┃ ❒  ▸ *BUGMENU* 🦠
┃ =======================
┃ ❒  ▸ *PLUGINS*  : ${cm.length}   
┃ ❒  ▸ *RAM*      : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}    
┃ ❒  ▸ *SYSTEM* 🤖  : ${os.platform()}         
┃ ❒  ▸ *THEME*  : GOODCHILD-MD 
╰━━━━━━━━━━━━━━━━━━━━━━╯  

📌 _*Type the command to proceed.*_  
════════════════════════  
😊 enjoy for using a Goodchild-md  💥
════════════════════════\n`;

    let fullMenu = `\n *COMMANDS*${readmore}\n`;

    for (const category in commands) {
        fullMenu += ` ╭─────❒ *${category}* ✣`;
        for (const cmd of commands[category]) {
            fullMenu += `\n││▸ ${cmd}`;
        }
        fullMenu += `\n╰───────────────▸▸ \n`;
    }
       let imageUrl = "https://files.catbox.moe/8spkl4.jpeg";
       
    fullMenu += `> BOT CREATED BY LeonardTech\n`;

    const imageOrVideoUrl = mybotpic();
    const musicUrl = "https://files.catbox.moe/iihpr0.mp3";

    try {
        // If it's a video or gif
        if (imageOrVideoUrl.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, {
                video: { url: imageOrVideoUrl },
                caption: headerMessage + fullMenu,
                footer: "HEROKU*, developed by LeonardTech",
                gifPlayback: true
            }, { quoted: ms });
        } 
        // If it's a static image
        else if (imageOrVideoUrl.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(dest, {
                image: { url: imageOrVideoUrl },
                caption: headerMessage + fullMenu,
                footer: "HEROKU*, developed by LeonardTech"
            }, { quoted: ms });
        } 
        // If none of the above, send text only
        else {
            await repondre(headerMessage + fullMenu);
        }

        // Send background music after menu
        await zk.sendMessage(dest, {
            audio: { url: musicUrl },
            mimetype: 'audio/mp4',
            ptt: false
        }, { quoted: ms });

    } catch (error) {
        console.log("🥵🥵 Menu error: " + error);
        repondre("🥵🥵 Menu error: " + error);
    }
});
