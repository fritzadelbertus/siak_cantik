
var cssSche = (base, text, white) => `
body div#app div#folder {
    div#content {
        form {
            fieldset {
                input, select {
                    color: ${text};
                }
                select {
                    background-color: ${base.light};
                    color: ${base.dark};
                    option {
                        color: ${text};
                        background-color: ${base.light};
                        color: ${base.dark};
                    }
                    option:disabled {
                        background: ${base.dark};
                    }
                }
                #search {
                    &::placeholder {
                        color: ${text};
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
        .nav-buttons {
            button {
                color: ${text};
                background-color: ${base.dark};
                color: ${base.light};
                &:hover {
                    background-color: ${base.light};
                    color: ${base.dark};
                }
            }
        }
        .card-container {
            & > div {
                h5 {
                    color: ${text};
                }
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
}
`

// App Styling

var changePalleteSche = (ret) => {
    const style = document.createElement('style')
    style.classList.add('color-injection')
    style.innerHTML = cssSche(ret.color, "#F7F7F7", '#F7F7F7')

    document.querySelector('head').appendChild(style)
}


chrome.storage.local.get(["color"]).then(changePalleteSche)