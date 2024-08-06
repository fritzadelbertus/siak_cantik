chrome.storage.local.get(["custom_profile"]).then((result) => {
    if (result) {
        document.querySelector('.profile_photo img').setAttribute('src', "data:image/png;base64," + result.custom_profile)
    } else {
        chrome.storage.local.get(["profile_url"]).then((result) => {
            document.querySelector('.profile_photo img').setAttribute('src', chrome.runtime.getURL(result.profile_url))
        })
    }
})
