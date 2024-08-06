
var cssAuth = (base, text, white) => `
body {
    div#app {
        div#folder {
            div {
                #content {
                    .contact-box {
                        & > div {
                            div {
                                div {
                                    .phone {
                                        a {
                                            color: ${base.light};
                                            &:hover {
                                                color: ${text};
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                    }
                    .login-box {
                        form {
                            p {
                                label {
                                    color: ${text};
                                }
                                input {
                                    color: ${text};
                                    &:is(:-webkit-autofill, :autofill) {
                                        background-color: ${base.dark};
                                    }
                                }
                                
                            }
                            #submit {
                                input {
                                    background-color: ${base.dark};
                                    border-color: ${base.light} ${base.dark} ${base.dark} ${base.light};
                                    &:hover {
                                        background-color: ${base.light};
                                    }
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
var changePalleteAuth = (ret) => {
    const style = document.createElement('style')
    style.classList.add('color-injection')
    style.innerHTML = cssAuth(ret.color, "#F7F7F7", '#F7F7F7')

    document.querySelector('head').appendChild(style)
}


chrome.storage.local.get(["color"]).then(changePalleteAuth)