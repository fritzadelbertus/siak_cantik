// MAIN COMPONENTS

const folder = document.createElement('div')
folder.id = 'folder'

const title = document.createElement('h1')
title.innerHTML = '<em>SIAK-NG</em>'

const filenav = document.createElement('ul')
filenav.classList.add('file-nav')

filenav.innerHTML = `
    <li class='active'>Login</li>
    <li>Kontak</li>
`

const main_components = { folder, title, filenav }


// APP CREATION

const body = document.querySelector('body')
const app = document.createElement('div')
app.id = 'app'

const folderLeft = document.createElement('div')
const contentBox = document.createElement('div')
contentBox.id = 'content'
folderLeft.appendChild(main_components.title)
folderLeft.appendChild(contentBox)

main_components.folder.appendChild(folderLeft)

const folderUp = document.createElement('div')
folderUp.classList.add('file-nav-container')
folderUp.appendChild(main_components.filenav)

app.appendChild(folderUp)
app.appendChild(main_components.folder)

for (let i = 0; i < body.children.length; i++) {
    body.children[i].style.display = 'none'
}

body.appendChild(app);

// LINK INJECTION

const link1 = document.createElement('link')
link1.setAttribute('rel', 'preconnect')
link1.setAttribute('href', 'https://fonts.googleapis.com')
const link2 = document.createElement('link')
link2.setAttribute('rel', 'preconnect')
link2.setAttribute('href', 'https://fonts.gstatic.com')
link2.setAttribute('crossorigin', 'anonymous')
const link3 = document.createElement('link')
link3.setAttribute('rel', 'stylesheet')
link3.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Rubik+Mono+One&display=swap')

document.head.appendChild (link1);
document.head.appendChild (link2);
document.head.appendChild (link3);

