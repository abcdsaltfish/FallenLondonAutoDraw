function wait(ms=3000) {
    // 类似Sleep函数
    // 用法：await wait(需要等待的豪秒数);
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function waitload(){
    // 等待加载完成
    // 用法：await waitload();
    // 已知branch的按钮和ONWARDS按钮都可以用
    // 抽卡等待能用吗？storylet的等待能用吗？
    while (document.getElementsByClassName('loading-image').length){
        await wait(100); //后台工作时这个值会变成~60000
    }
}
async function clickbranch(id, onwards=true) {
    // 找到指定Id的branch并点击它的按钮，以及ONWARDS按钮
    // 用法：如参数。用完后记得加一句await waitload();
    // 有没有检定都可以用。无视公告。
    // 如果有TRY AGAIN按钮呢？
    allbranch = document.getElementsByClassName('media branch media--branch');
    targeti = -1;
    for (let i = 0; i < allbranch.length; i++){
        if (allbranch[i].dataset.branchId == id){
            targeti = i;
            break;
        }
    }
    if (targeti == -1){
        console.log("error clickbranch " + id + Date().toString());
        return;
    }
    gobutton = allbranch[targeti].querySelector("div:nth-child(2) > div:nth-last-child(1) > button");
    gobutton.click();
    await waitload();
    if (onwards){
        onwardsbutton = document.querySelector("#main > div > div > div.buttons.buttons--storylet-exit-options > button");
        onwardsbutton.click();
        // await waitload(); // 这里waitload实际是失效的，原因未知
    }
}
async function changeoutfit(name){
    // 更改为指定名称的套装
    document.getElementsByTagName("button")[0].click();
    document.querySelector("#root > div > div:nth-child(2) > div.sidemenu-container > div.sidemenu.sidemenu--left.sidemenu--open > div:nth-child(2) > div > div").dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Down',
                code: 'Space',
                keyCode: 32,
                which: 32,
                bubbles: true,
                cancelable: true
        }));
    if (document.querySelector("#root > div > div:nth-child(2) > div.sidemenu-container > div.sidemenu.sidemenu--left.sidemenu--open > div:nth-child(2) > div > div").innerText != name){
        let bars = document.querySelector("#root > div > div:nth-child(2) > div.sidemenu-container > div.sidemenu.sidemenu--left.sidemenu--open > div:nth-child(2) > div > div:nth-child(2) > div");
        for (let i = 0; i < bars.childElementCount; i++){
            if (bars.children[i].innerText == name){
                bars.children[i].click();
                await wait(6000); //可能要等久一点
                break;
            }
        }
    }
    document.getElementsByClassName("sidemenu-overlay sidemenu-overlay--open")[0].click();
}


async function onedrawplay(){
    // 抽一次卡，如果是虫卡就play
    // 返回值：是虫卡true，否则false
    drawbutton = document.querySelector("#main > div > div.cards > div.deck-container > button");
    drawbutton.click();
    await waitload();
    card = document.querySelector("#main > div > div.cards > div.hand > div:nth-child(1)");
    id = card.dataset.eventId;
    if (id == 343400) //虫卡
    {
        cardbutton = document.querySelector("#main > div > div.cards > div.hand > div:nth-child(1) > div > div > div");
        cardbutton.click();
        buttons = document.getElementsByTagName('button');
        lastbutton = lastbutton = buttons[buttons.length-1];
        lastbutton.click(); //只能这样进卡
        await wait();
        clickbranch(251916); //只play不milk
        return true;
    } else
    {
        discardbutton = document.querySelector("#main > div > div.cards > div.hand > div:nth-child(1) > button");
        discardbutton.click();
        return false;
    }
}
// onedrawplay();

cardIDs = [
      342260,
      359129,
      360749,
      356792,
      358836,
      359534,
      357388,
      357379,
      356805,
      357360, // 姨妈卡
      360949,
      358430,
      358919,
      357391,
      356905,
      357385,
      356941,
      360242,
      360267,
      359362
    ];
branchIDs = [
  251392,
  262989,
  264212,
  261361,
  262847,
  263289,
  261811,
  261804,
  261368,
  262169,
  264358,
  264626,
  262879,
  261812,
  261452,
  261808,
  261479,
  263981,
  0,
  0
];

async function oneactinCT(){
    // 使用1体力在银城抽卡用卡
    let cards = document.getElementsByClassName("hand__card-container");
    if (cards.length < 4){
        document.querySelector("#main > div > div.cards > div.deck-container > button").click();
        await waitload();
    }

    let i = 0;
    let slot = -1;
    for (i = 0; i < cardIDs.length; i++){
        for (let j = 0; j < cards.length; j++){
            if (cardIDs[i] == cards[j].dataset.eventId){
                slot = j;
                break;
            }
        }
        if (slot != -1){
            break;
        }
    }

    let cardid = cardIDs[i];
    let branchid = branchIDs[i];
    if (cardid == 359129){
        await changeoutfit("moonlit");
    }else if (cardid == 359534){
        await changeoutfit("W gw");
    }else if (cardid == 360949){
        await changeoutfit("S zee");
    }else if (cardid == 360242){
        // cards[slot].querySelector(".hand__border > div").click();
        // text = document.querySelector("body > div:nth-child(14) > div > div > div > div > div.tooltip__secondary-description > span:nth-child(1)").innerText();
        // if (text[47] != ','){
        //     return ; // to be done
        // }
    }else {
        ;
    }
    cards[slot].querySelector(".hand__border > div").click()
    lastbutton = document.querySelector("body > div:nth-child(14) > div > div > div > div > div.tooltip__buttons > button");
    lastbutton.click();
    await wait();
    clickbranch(branchid);
}
// oneactinCT();

async function oneactCT(){
    // 去银城，使用1体力在银城抽卡用卡，出银城
    visitbutton = document.querySelector("#main > div > div:nth-child(6) > div:nth-child(2) > div > button");
    visitbutton.click();
    await waitload();
    clickbranch(250985);
    await waitload();
    
    await oneactinCT();

    await changeoutfit("worm wo");
    await wait();
    gobackbutton = document.querySelector("#main > div > div:nth-child(9) > div:nth-child(2) > div > button");
    gobackbutton.click();
    await waitload();
    clickbranch(250977);
}


IntervalId = 0;

async function everytenminutes(){
    // 每10分钟抽一次卡，如果是虫卡就玩
    // 记得留1点体力1张卡再开始
    let played = false;

    let firststorylet = document.querySelector("#main > div > div:nth-child(3) > div:nth-child(2) > div > h2");
    if (firststorylet){
        if (firststorylet.innerText == "The Marigold Station"){
            played = await onedrawplay();
            if (!played){
                await waitload();
                await oneactCT();
            }
        }
    }

}

everytenminutes();
IntervalId = setInterval(everytenminutes, 600000);