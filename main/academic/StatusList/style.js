
var cssSlist = (base, text, white) => `
body div#app div#folder {
    #content {
        .stats-title {
            h5,h6 {
                color: ${text};
            }
        }
        .stats-container {
            div {
                background-color: ${base.dark};
                p {
                    color: ${text};
                }
            }
        }
    }
}
`

// App Styling

var changePalleteSlist = (ret) => {
    const style = document.createElement('style')
    style.classList.add('color-injection')
    style.innerHTML = cssSlist(ret.color, "#F7F7F7", '#F7F7F7')

    document.querySelector('head').appendChild(style)
}


chrome.storage.local.get(["color"]).then(changePalleteSlist)