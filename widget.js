function wait(ms=1000) {
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
    console.log("here");
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
                await wait(); //可能要等久一点
                break;
            }
        }
    }
    document.getElementsByClassName("sidemenu-overlay sidemenu-overlay--open")[0].click();
}