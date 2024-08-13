WAITTIME = 5000;

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

IntervalId = 0;
successcnt = 0;
wormcnt = 0;

async function onedraw() {
    // 检查是否归位
    storylets = document.getElementsByClassName('media storylet');
    firsttitle = storylets[0].getElementsByTagName('h2')[0].innerText;
    if (firsttitle != "The Marigold Station"){
        clearInterval(IntervalId);
        nowtime = (new Date).toString();
        console.log("Some error message in "+ nowtime);
        return;
    }
    
    // 抽卡
    drawbutton = document.querySelector("#main > div > div.cards > div.deck-container > button");
    drawbutton.click();
    await wait(WAITTIME);
    
    // 用卡
    card = document.querySelector("#main > div > div.cards > div.hand > div:nth-child(1)");
    id = card.dataset.eventId;
    if (id == 343400) //虫卡
    {
        cardbutton = document.querySelector("#main > div > div.cards > div.hand > div:nth-child(1) > div > div > div");
        cardbutton.click();
        buttons = document.getElementsByTagName('button');
        lastbutton = lastbutton = buttons[buttons.length-1];
        lastbutton.click();
        await wait(WAITTIME);
        document.querySelector("#main > div > div:nth-child(2)").querySelectorAll('button')[1].click();
        await wait(WAITTIME);
        onwardsbutton = document.querySelector("#main > div > div > div.buttons.buttons--storylet-exit-options > button");
        onwardsbutton.click();
        wormcnt += 1;
    }
    else
    {
        discardbutton = document.querySelector("#main > div > div.cards > div.hand > div:nth-child(1) > button");
        discardbutton.click();
    }
    successcnt += 1;
    console.log(successcnt);
    console.log(wormcnt);
}

onedraw();
IntervalId = setInterval(onedraw, 600000);