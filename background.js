chrome.storage.local.set({ 
    color: { primary: '#ff8906', light: '#ffc786', dark: '#b46102'}
})
chrome.storage.local.set({ 
    profile_url: 'profile/profile-1.png'
})

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
        const currState = await chrome.action.getBadgeText({ tabId: tab.id });
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
            console.log(isAuthentication(tab.url));
            
            if (isAuthentication(tab.url)) {
                await chrome.scripting.executeScript({
                    files: [
                        `scripts/authentication.js`, 
                        `scripts/style.js`,
                        `main/Authentication/inject.js`, 
                        `main/Authentication/style.js`,
                    ],
                    target: { tabId: tab.id },
                })
            } else {
                await chrome.scripting.executeScript({
                    files: [
                        `scripts/inject.js`, 
                        `scripts/style.js`,
                        `${endpoint(tab.url)}/inject.js`, 
                        `${endpoint(tab.url)}/style.js`,
                    ],
                    target: { tabId: tab.id },
                })
            }
        }
    }
})

chrome.storage.onChanged.addListener((changes, namespace) => {
    chrome.tabs.query({active: true}, async (tabs) => {
        const tab = tabs[0]

        await chrome.scripting.executeScript({
            files: [`scripts/style.js`, `${endpoint(tab.url)}/style.js`],
            target: { tabId:  tab.id },
        })
    })
});
