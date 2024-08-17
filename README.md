# FallenLondonAutoDraw
A JS script used to automatically draw and play cards in Fallen London.

沦敦自动抽卡脚本，新手用JS写的。

# How to Use
## drawcard.js
Open Fallen London in the Chrome and then press F12 to open the Developer Tool. Click the "Console", then paste the code to it and "Enter". Remember to keep the page open and active.

Make sure you're in the Marigold Station with a Hellworm. Don't be in any branch.

在Chrome中打开Fallen London，然后按F12打开开发人员工具。点击“控制台”，将代码粘贴到其中，按下“Enter”运行。

只有在The Marigold Station并且装备有Hellworm才能生效，不要点任何卡，就在The Marigold Station的主页面呆着。

## Seek_out_spy-holes.js
The same.

Make sure you're in "Spelunking in the Sunken Embassy". Use this code and it will play "Seek out spy-holes" every ten minutes.

# Usage

Hellworm card is very profitable. This shell can be used to draw and play it when you sleep, so that your draw times won't be wasted.

今儿中午午睡睡过头了，一觉醒来20体力6卡，瞬间感觉世界离我而去，失落。早就想要做一个沦敦的自动脚本了，刚好最近有空，折腾了一下午加一晚上，结果就是这。简陋的很，不过我以前从来没碰过互联网或者JS脚本之类的，写成这样感觉还行吧。JS写起来挺舒服的，和python不相上下，比C呀汇编呀也不知道好哪里去了。东西就是这么个东西，用来在睡觉的时候抽地狱虫卡，没别的了。以后可能会做成全自动的，就像明日方舟的MAA一样，首先要解决的就是等待和复位的问题，毕竟沦敦服务器总是炸，而且更新时出现的海报不知道会不会有影响。

# Analyse and Structure

Coming soon...

懒得写了……

# Problem
"setTimeout" and "setInterval" are not reliable for long tasks. It may help to set www.fallenlondon.com always active in Chrome setting.

