const categories = document.querySelectorAll('#ti_m h3')

const kelas = [
    {
        name: 'Internal',
        items: []
    }, 
    {
        name: 'Bersama',
        items: []
    },
    {
        name: 'Eksternal',
        items: []
    }
]

let tabelbox
let tabelboxbox
let k = {}
let classData
let classTitle
let startInsert = false
let pengajar
const titlePattern = /[\w]+ - ([\w &]+)\((\d) SKS, Term (\d+)\); [\w \.]+-(\d+)/
for (let i = 0; i < categories.length; i++) {
    tabelbox = categories[i].nextSibling.nextSibling;
    if (tabelbox.classList.contains('box')) {
        tabelboxbox = tabelbox.children[0]
        for (let j = 2; j < tabelboxbox.children.length; j++) {
            classData = tabelboxbox.children[j]
            if (classData.classList.contains('x') || classData.classList.contains('alt')) {
                if (classData.children.length > 5) {
                    pengajar = classData.children[6].innerHTML.split('<br>')
                    k.childrens.push({
                        kelas: classData.children[1].children[0],
                        jadwal: classData.children[4].innerHTML.split('<br>'),
                        ruangan: classData.children[5].innerHTML.split('<br>'),
                        pengajar: pengajar.map((e) => e.replace('-', '')).join('\n')
                    })
                } else {
                    k.childrens.push({
                        kelas: classData.children[1].children[0],
                        jadwal: '',
                        ruangan: '',
                        pengajar: '',
                    })
                }
            } else {
                if (startInsert == false) {
                    startInsert = true
                } else {
                    kelas[i].items.push(k)
                }
                classTitle = titlePattern.exec(classData.innerText)
                k = {
                    name: classTitle[1],
                    sks: classTitle[2],
                    term: classTitle[3],
                    kurikulum: classTitle[4],
                    childrens: []
                }
            }
        }
    }
}

const cardContainer = document.createElement('div')
cardContainer.classList.add('card-container')
const card = {
    card: null,
    subcontainer: null,
    detail: null,
}
const detail = {
    next: null,
    prev: null,
    box: null,
    buttonbox: null
}
const subjectstate = {}
let ptags
let parent
const changeClass = (e, p, i, j) => {
    subjectstate[`${i} - ${j}`] += p
    if (subjectstate[`${i} - ${j}`] >= kelas[i].items[j].childrens.length) {
        subjectstate[`${i} - ${j}`] = 0
    } else if (subjectstate[`${i} - ${j}`] < 0) {
        subjectstate[`${i} - ${j}`] = kelas[i].items[j].childrens.length - 1
    }
    ptags = document.querySelectorAll(`.${kelas[i].name}${j} p`)

    ptags[0].innerText = kelas[i].items[j].childrens[subjectstate[`${i} - ${j}`]].pengajar
    for (let m=1; m < ptags.length; m++) {
        ptags[m].innerText = `${kelas[i].items[j].childrens[subjectstate[`${i} - ${j}`]].jadwal[m-1]} - ${kelas[i].items[j].childrens[subjectstate[`${i} - ${j}`]].ruangan[m-1]}`
    }
    
    
    
    parent = document.querySelector(`.${kelas[i].name}${j}`)
    parent.removeChild(parent.lastElementChild)
    parent.appendChild(kelas[i].items[j].childrens[subjectstate[`${i} - ${j}`]].kelas)
}

const insertSubContainer = (i, container) => {
    card.subcontainer = document.createElement('div')
    card.subcontainer.innerHTML = `<h5>Kelas ${kelas[i].name}</h5>`
    card.subcontainer.classList.add(kelas[i].name)
    for (let j = 0; j < kelas[i].items.length; j++) {
        card.card = document.createElement('div')
        card.card.classList.add('card-subject')
        card.card.innerHTML = `<div class='front'>
            <h6>${kelas[i].items[j].name}</h6>
            <p>Kurikulum - ${kelas[i].items[j].kurikulum}</p>
            <p>${kelas[i].items[j].sks} SKS (SMT - ${kelas[i].items[j].term})</p>
            </div>
        `
        detail.box = document.createElement('div')
        detail.box.classList.add('detail-box')
        card.detail = document.createElement('div')
        card.detail.classList.add(`card-detail`)
        card.detail.classList.add(`${kelas[i].name}${j}`)
        card.detail.innerHTML += `
            <p>${kelas[i].items[j].childrens[0].pengajar}</p>
        `
        for (let m = 0; m < kelas[i].items[j].childrens[0].jadwal.length; m++) {
            card.detail.innerHTML += `<p>${kelas[i].items[j].childrens[0].jadwal[m]} - ${kelas[i].items[j].childrens[0].ruangan[m]}</p>`
        }
        card.detail.appendChild(kelas[i].items[j].childrens[0].kelas)
        subjectstate[`${i} - ${j}`] = 0
        detail.next = document.createElement('button')
        detail.prev = document.createElement('button')
        detail.prev.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 
        288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
        `
        detail.next.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32
        224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
        </svg>
            `

        detail.buttonbox = document.createElement('div')
        detail.buttonbox.appendChild(detail.prev)
        detail.buttonbox.appendChild(detail.next)
        detail.prev.addEventListener('click', (e) => {changeClass(e,-1, i, j)})
        detail.next.addEventListener('click', (e) => {changeClass(e,1, i, j)})
        detail.prev
        detail.box.appendChild(card.detail)
        detail.box.appendChild(detail.buttonbox)
        card.card.appendChild(detail.box)
        card.subcontainer.appendChild(card.card)
    } 
    container.appendChild(card.subcontainer)
}

for (let i = 0; i < kelas.length; i++) {
    if (kelas[i].items.length > 0) {
        insertSubContainer(i, cardContainer)
    }
}

const handleChangeSubClass = (i) => {
    document.querySelector('.card-container').innerHTML = ''
    insertSubContainer(i, document.querySelector('.card-container'))
    document.querySelector('.card-container').scrollTop = 0
}

const classButtons = document.createElement('div')
classButtons.classList.add('nav-buttons')
const internalButton = document.createElement('button')
const bersamaButton = document.createElement('button')
const eksternalButton = document.createElement('button')
classButtons.appendChild(internalButton)
classButtons.appendChild(bersamaButton)
classButtons.appendChild(eksternalButton)
internalButton.innerText = 'Kelas Internal'
bersamaButton.innerText = 'Kelas Bersama'
eksternalButton.innerText = 'Kelas Eksternal'

internalButton.addEventListener('click', (e) => {handleChangeSubClass(0)})
bersamaButton.addEventListener('click', (e) => {handleChangeSubClass(1)})
eksternalButton.addEventListener('click', (e) => {handleChangeSubClass(2)})

const form = document.querySelector('form')
const formButton = form.querySelectorAll('.button')
const selectLines = form.querySelectorAll('option:disabled')
for (let i = 0; i < selectLines.length; i++) {
    selectLines[i].innerHTML =''
}

document.querySelector('#content').appendChild(cardContainer)
document.querySelector('#content').appendChild(classButtons)
document.querySelector('#content').appendChild(form)


