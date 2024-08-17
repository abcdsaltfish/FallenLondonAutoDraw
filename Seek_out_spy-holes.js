WAITTIME = 100;

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function waitload(){
    // 等待加载完成
    while (document.getElementsByClassName('loading-image').length){
        await wait(WAITTIME);
    }
}

cnt = 0;
time1 = 0;
time2 = 0;

async function clickbranch(id) {
    // 找到指定Id的branch并点击它的按钮以及ONWARDS按钮
    hy_branch = document.getElementsByClassName('media branch media--branch');
    let i = 0
    for (i = 0; i < hy_branch.length; i++){
        // console.log(hy_branch[i].dataset.branchId)
        if (hy_branch[i].dataset.branchId == id){
            break;
        }
    }
    gobutton = hy_branch[i].querySelector("div:nth-child(2) > div:nth-child(3) > button");
    gobutton.click();
    time1 = Date.now();
    await waitload();
    time1 = Date.now() - time1;
    onwardsbutton = document.querySelector("#main > div > div > div.buttons.buttons--storylet-exit-options > button");
    onwardsbutton.click();
    time2 = Date.now();
    await waitload();
    time2 = Date.now() - time2;
    cnt++;
    console.log(cnt, time1, time2, Date());
}

// clickbranch(250889);
IntervalId = setInterval(clickbranch, 600000, 250889);