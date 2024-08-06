// CUSTOM PROFILE PHOTO
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

document.querySelector('#profile-input').addEventListener('change', (e) => {
    const [file] = e.target.files
    if (file) {
        const preview = document.querySelector('#profile-preview')
        if (preview) {
            preview.setAttribute('src', URL.createObjectURL(file))
        } else {
            const previewImg = document.createElement('img')
            previewImg.setAttribute('id', 'profile-preview')
            previewImg.setAttribute('src', URL.createObjectURL(file))
            previewImg.setAttribute('alt', 'profile-image-input')
            document.querySelector('.preview-box').appendChild(previewImg)
            document.querySelector('.submit-profile-photo').disabled = false
        }
    }
})

document.querySelector('.submit-profile-photo').addEventListener('click', (e) => {
    var bannerImage = document.getElementById('profile-preview');
    var imgData = getBase64Image(bannerImage);
    
    chrome.storage.local.set({ custom_profile: imgData })
})


// CUSTOM PALLETE

const changePallete = (pallete, profile) => {
    chrome.storage.local.set({ color: pallete, profile_url: profile })
}


const colors = {
    orange: { primary: '#ff8906', light: '#ffc786', dark: '#b46102'},
    blue: { primary: '#285fd6', light: '#7ea6fc', dark: '#002966'},
    green: { primary: '#7cd628', light: '#bbfc7e', dark: '#316600'},
    magenta: { primary: '#d628c7', light: '#fc7ec7', dark: '#66004d'},
}


document.querySelector('.orange').addEventListener('click', () => {
    changePallete(colors.orange, 'profile/profile-1.png')
})
document.querySelector(".blue").addEventListener('click', () => {
    changePallete(colors.blue, 'profile/profile-2.png')
})
document.querySelector(".green").addEventListener('click', () => {
    changePallete(colors.green, 'profile/profile-3.png')
})
document.querySelector(".magenta").addEventListener('click', () => {
    changePallete(colors.magenta, 'profile/profile-4.png')
})



// ON-OFF SWITCH

const root = "https://academic.ui.ac.id/main"
const path_pattern = /https?:\/\/academic\.ui\.ac\.id\/([\w\/]+)/
const endpoint = (url) => path_pattern.exec(url)[1]
const handleChangeBadge = () => {
    chrome.tabs.query({active: true}, async (tabs) => {
        const tab = tabs[0]
        if (tab.url.startsWith(root)) {
            const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
            const nextState = prevState === 'ON' ? 'OFF' : 'ON';
            document.querySelector('.extension-badge').innerText = nextState
            if (nextState === 'ON') {
                document.querySelector('.extension-badge').classList.add('on')
            } else {
                document.querySelector('.extension-badge').classList.remove('on')
            }
    
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
                    files: [
                        `scripts/mount.js`, 
                        `scripts/style.js`,
                        `${endpoint(tab.url)}/style.js`
                    ],
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
    })
}

chrome.tabs.query({active: true}, async (tabs) => {
    chrome.action.getBadgeText({ tabId: tabs[0].id }).then((state) => {     
        if (state === 'ON') {
            document.querySelector('.extension-badge').classList.add('on')
        } else {
            document.querySelector('.extension-badge').classList.remove('on')
        }
        document.querySelector('.extension-badge').innerText = state
    })
})

document.querySelector('.extension-badge').addEventListener('click', handleChangeBadge)

