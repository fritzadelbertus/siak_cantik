
var cssPay = (base, text, white) => `
body div#app div#folder {
    #content {
        .tabel-bayar {
            h5,h6 {
                color: ${text};
            }
            .header-tabel {
                p {
                    color: ${text};
                }
            }
            .data-tabel {
                div {
                    &.even{
                        background-color: ${base.dark};
                    }
                    &.odd {
                        background-color: ${base.primary};
                    }
                    p {
                        color: ${text};
                    }
                }
            }
        }
    }
}
`

// App Styling

var changePalletePay = (ret) => {
    const style = document.createElement('style')
    style.classList.add('color-injection')
    style.innerHTML = cssPay(ret.color, "#F7F7F7", '#F7F7F7')

    document.querySelector('head').appendChild(style)
}


chrome.storage.local.get(["color"]).then(changePalletePay)