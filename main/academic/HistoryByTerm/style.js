// CSS

var cssHist = (base,text,white) => `
body div#app div#folder {
    #content {
        .header-nav {
            li:hover ~ svg {
                background-color: ${base.light};
            }
        }
        .table-title {
            span {
                color: ${text};
            }
        }
        .tabel-nilai {
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
                a {
                    color: ${text};
                    &:hover {
                        color: ${base.light};
                    }
                }
            }        
        }
    }
}

`

// App Styling

var changePalleteHist = (ret) => {
    const style = document.createElement('style')
    style.classList.add('color-injection')
    style.innerHTML = cssHist(ret.color, "#F7F7F7", '#F7F7F7')

    document.querySelector('head').appendChild(style)
}


chrome.storage.local.get(["color"]).then(changePalleteHist)