
chrome.storage.local.get(["custom_profile"]).then((result) => {
    if (result) {
        document.querySelector('.profile_photo img').setAttribute('src', "data:image/png;base64," + result.custom_profile)
    } else {
        chrome.storage.local.get(["profile_url"]).then((result) => {
            document.querySelector('.profile_photo img').setAttribute('src', chrome.runtime.getURL(result.profile_url))
        })
    }
})

var cssSumm = (base, text, white) => `
#content {
    & > button {
        background-color: ${base.dark};
        color: ${text};
        &:hover {
            background-color: ${base.light};
            color: ${base.dark};
        }
    }
    div.status-box{
        .back {
            table {
                tbody {
                    tr.x {
                    background: ${base.primary};
                    }
                    tr.alt {
                    background: ${base.dark};
                    }
                    td {
                        color: ${text};
                    }
                    th {
                        color: ${text};
                        background: ${base.dark};
                    }
                }
            }
        }
    }
}

`
var changePalleteSumm = (ret) => {
    const style = document.createElement('style')
    style.classList.add('color-injection')
    style.innerHTML = cssSumm(ret.color, "#F7F7F7", '#F7F7F7')

    document.querySelector('head').appendChild(style)
}


chrome.storage.local.get(["color"]).then(changePalleteSumm)