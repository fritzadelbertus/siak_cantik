// CSS

var css = (base,text,white) => `
* {
    border-color: ${base.light} !important;
}
h5 {
    color: ${text} !important;
}
svg {
    fill: ${white} !important;
    &:hover {
        fill: ${base.light} !important;
    }
}
p {
    color: ${text} !important;
}
body {
    background: #121212 !important;
    #app {
        .file-nav {
            &>a {
                background-color: ${base.primary};
                &:hover {
                    background-color: ${base.dark};
                }
            }
            li {
                background-color: ${base.dark};
                color: ${text};
                &:hover {
                    background-color: ${base.light};
                    color: ${base.dark};
                }
                &.active {
                    background-color: ${base.primary};
                    color: ${text};
                }
                a {
                    color: inherit;
                }
            }
        }
        #folder {
            background: linear-gradient(160deg, ${base.primary} 50%, ${base.dark});
            ul {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                box-shadow: 0 8ox 32px 0 rgba(0,0,0,0.37);
                .folder-name {
                    color: ${text};
                }
                svg {
                    fill: ${white};
                    &:hover {
                        fill: ${base.light};
                    }
                }
            }
            div {
                h1 em {
                    color: ${text};
                }
                #content{
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    box-shadow: 0 8ox 32px 0 rgba(0,0,0,0.37);
                }
            }
        }
    }
}
`

// App Styling

var changePallete = (ret) => {
    const style = document.createElement('style')
    style.classList.add('color-injection')
    style.innerHTML = css(ret.color, "#F7F7F7", '#F7F7F7')

    document.querySelector('head').appendChild(style)
}


chrome.storage.local.get(["color"]).then(changePallete)