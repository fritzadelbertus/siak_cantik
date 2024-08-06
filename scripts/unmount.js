for (let i = 0; i < body.children.length; i++) {
    body.children[i].style.display = ''
}

app.style.display = 'none'

var previousStyle = document.querySelectorAll('style.color-injection')
for (let i = 0; i < previousStyle.length; i++) {
    document.querySelector('head').removeChild(previousStyle[i])
}