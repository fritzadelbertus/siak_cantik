
var cssSchef = (base, text, white) => `
body div#app div#folder {
    div#content {
        .first-form {
            tbody {
                select {
                    background-color: ${base.light};
                    color: ${base.dark};
                }
            }
        }
        .toolbar {
            fieldset {
                input, select {
                    color: ${text};
                }
                input[name="search"] {
                    &::placeholder {
                        color: ${text};
                    }
                }
                select {
                    background-color: ${base.light};
                    color: ${base.dark};
                    optgroup {
                        color: ${text};
                        background-color: ${base.dark};
                        color: ${text};
                        option {
                            color: ${text};
                            background-color: ${base.light};
                            color: ${base.dark};
                        }
                    }
                }
                input.button {
                    background-color: ${base.dark};
                    color: ${base.light};
                    &:hover {
                        background-color: ${base.light};
                        color: ${base.dark};
                    }
                }
            }
        }
        .card-container {
            .card-subject {
                background-color: ${base.dark};
                .front {
                    h6 {
                        color: ${text};
                    }
                    p {
                        color: ${text};
                    }
                }
                .detail-box {
                    .card-detail {
                        a {
                            color: ${text};
                        }
                    }
                    & > div {
                        button {
                            background-color: ${base.primary};
                            &:hover {
                                background-color: ${base.dark};
                            }
                        }
                    }
                }
            }
        }
    }
}                

`

// App Styling

var changePalleteSchef = (ret) => {
    const style = document.createElement('style')
    style.classList.add('color-injection')
    style.innerHTML = cssSchef(ret.color, "#F7F7F7", '#F7F7F7')

    document.querySelector('head').appendChild(style)
}


chrome.storage.local.get(["color"]).then(changePalleteSchef)