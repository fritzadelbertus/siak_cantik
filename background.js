chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "ON",
    });
});

const root = "https://academic.ui.ac.id/main"
const path_pattern = /https?:\/\/academic\.ui\.ac\.id\/([\w\/]+)/
const endpoint = (url) => path_pattern.exec(url)[1]

const isAuthentication = (url) => {
    return url.endsWith('Authentication/') || url.endsWith('Authentication/Index')
}

chrome.tabs.onUpdated.addListener( async (tabId, changeInfo, tab) => {
    if (tab.url.startsWith(root)) {
        currState = await chrome.action.getBadgeText({ tabId: tab.id });
        if (changeInfo.status == 'complete' && tab.active && currState == 'ON') {
            if (tab.url.endsWith('Welcome/')) {
                await chrome.scripting.executeScript({
                    files: [`scripts/redirect.js`],
                    target: { tabId: tab.id },
                })
            }
            await chrome.scripting.insertCSS({
                files: ['styles/inject.css', `${endpoint(tab.url)}/style.css`],
                target: { tabId: tab.id },
            });
            await chrome.scripting.executeScript({
                files: [
                    `scripts/${isAuthentication(tab.url) ? 'authentication': 'inject'}.js`, 
                    `${endpoint(tab.url)}/inject.js`],
                target: { tabId: tab.id },
            })
        }
    }
})



chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(root)) {
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        const nextState = prevState === 'ON' ? 'OFF' : 'ON'

        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });
        if (nextState === "ON") {
            await chrome.scripting.insertCSS({
                files: ['styles/inject.css', `${endpoint(tab.url)}/style.css`],
                target: { tabId: tab.id },
            });
            await chrome.scripting.executeScript({
                files: [`scripts/mount.js`],
                target: { tabId: tab.id },
            })
          } else if (nextState === "OFF") {
            await chrome.scripting.removeCSS({
                files: ['styles/inject.css', `${endpoint(tab.url)}/style.css`],
                target: { tabId: tab.id },
            });
            await chrome.scripting.executeScript({
                files: [`scripts/unmount.js`],
                target: { tabId: tab.id },
            })
          }      
    }    
});


