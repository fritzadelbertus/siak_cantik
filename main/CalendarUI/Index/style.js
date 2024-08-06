
var cssCall = (base, text, white) => `
body div#app div#folder {
    div#content {
        .schedule-box {
            form {
                select {
                    background-color: ${base.light};
                    color: ${base.dark};
                    optgroup {
                        background-color: ${base.dark};
                        color: ${text};
                        option {
                            background-color: ${base.light};
                            color: ${base.dark};
                        }
                    }
                }
            }
            .schedule-nav {
                a {
                    color: ${text};
                    background-color: ${base.dark};
                    &.current {
                        color: ${base.dark};
                        background-color: ${base.light};
                    }
                    &:hover {
                        color: ${base.dark};
                        background-color: ${base.light};
                    }
                }
            }
            .schedule-table {
                & > div {
                    &.even {
                        background-color: ${base.primary};
                    }
                    &.odd {
                        background-color: ${base.dark};
                    }
                }
            }
        } 
    }
}
`

// App Styling

var changePalleteCall = (ret) => {
    const style = document.createElement('style')
    style.classList.add('color-injection')
    style.innerHTML = cssCall(ret.color, "#F7F7F7", '#F7F7F7')

    document.querySelector('head').appendChild(style)
}


chrome.storage.local.get(["color"]).then(changePalleteCall)