const boxes = document.querySelectorAll('#ti_m .box')
const form1 = boxes[0]
form1.classList.add('first-form')
const form2 = document.querySelector('#ti_m .toolbar')


document.querySelector('#content').appendChild(form1)


if (form2 != null) {
    form2.querySelector('input[name="search"]').setAttribute('placeholder', 'Cari Mata Kuliah')
    document.querySelector('#content').appendChild(form2)
}

if (boxes.length == 2) {

const tabelbox = boxes[1]

const kelas = []

let tabelboxbox
let k = {}
let classData
let classTitle
let classPreq
let startInsert = false
let pengajar
const titlePattern = /[\w]+ - ([\w ():,.\-&\/]+) \((\d+) SKS, Term (\d+)\);[\n\t ]*[\w \.]+-(\d+)/
const reqcapPattern = /Prasyarat:[ ]*[\w, -]*/
const reqPattern = /\w\w\w\w\d\d\d\d\d\d - [\w &-]+/g
const reqgPattern = /\w\w\w\w\d\d\d\d\d\d - ([\w &-]+)/

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
            kelas.push(k)
        }
        classTitle = titlePattern.exec(classData.innerText)
        classPreq = reqcapPattern.exec(classData.innerText)[0]
        classPreq = classPreq.match(reqPattern)
        k = {
            name: classTitle[1],
            sks: classTitle[2],
            term: classTitle[3],
            kurikulum: classTitle[4],
            childrens: [],
            prerequisites: classPreq ? classPreq.map( e => reqgPattern.exec(e)[1]) : null
        }
    }
}

const cardContainer = document.createElement('div')
cardContainer.classList.add('card-container')
const card = {
    card: null,
    detail: null,
    front: null,
}
const detail = {
    next: null,
    prev: null,
    box: null,
    buttonbox: null
}
const subjectstate = {}
let anchor
let parent
const changeClass = (e, p, d) => {
    subjectstate[`${d}`] += p
    if (subjectstate[`${d}`] >= kelas[d].childrens.length) {
        subjectstate[`${d}`] = 0
    } else if (subjectstate[`${d}`] < 0) {
        subjectstate[`${d}`] = kelas[d].childrens.length - 1
    }

    parent = document.querySelector(`.kelas${d}`)
    parent.innerHTML = `<p>${kelas[d].childrens[subjectstate[`${d}`]].pengajar}</p>`
    for (let m = 0; m < kelas[d].childrens[subjectstate[`${d}`]].jadwal.length; m++) {
        parent.innerHTML += `<p>${kelas[d].childrens[subjectstate[`${d}`]].jadwal[m]}, ${kelas[d].childrens[subjectstate[`${d}`]].ruangan[m]}</p>`
    }
    anchor = kelas[d].childrens[subjectstate[`${d}`]].kelas.cloneNode(true)
    parent.appendChild(anchor)
    parent.scrollTop = 0
}

let ptags
const showPreq = (e,d) => {
    e.target.querySelector('h6').innerText = 'Syarat'
    ptags = e.target.querySelectorAll('p')
    ptags[1].innerText = ''
    ptags[0].innerText = ''
    for (let q = 0; q < kelas[d].prerequisites.length; q++) {
        ptags[0].innerHTML += `
        - ${kelas[d].prerequisites[q]} <br>
        `
    } 
}
const showFront = (e, d) => {
    e.target.querySelector('h6').innerText = `${kelas[d].name}`
    ptags = e.target.querySelectorAll('p')
    ptags[0].innerText = `Kurikulum - ${kelas[d].kurikulum}`
    ptags[1].innerText = `${kelas[d].sks} SKS (SMT - ${kelas[d].term})`
} 
document.createElement('div').addEventListener
const insertCard = (container) => {
    for (let j = 0; j < kelas.length; j++) {
        card.card = document.createElement('div')
        card.card.classList.add('card-subject')
        card.front = document.createElement('div')
        card.front.classList.add('front')
        card.front.innerHTML = `
            <h6>${kelas[j].name}</h6>
            <p>Kurikulum - ${kelas[j].kurikulum} \n</p>
            <p>${kelas[j].sks} SKS (SMT - ${kelas[j].term})</p>
        `
        if (kelas[j].prerequisites != null) {
            card.front.addEventListener('mouseover', (e) => {showPreq(e, j);})
            card.front.addEventListener('mouseout', (e) => {showFront(e, j);})
        }
        card.card.appendChild(card.front)
        detail.box = document.createElement('div')
        detail.box.classList.add('detail-box')
        card.detail = document.createElement('div')
        card.detail.classList.add(`card-detail`)
        card.detail.classList.add(`kelas${j}`)
        card.detail.innerHTML += `<p>${kelas[j].childrens[0].pengajar}</p>`
        for (let m = 0; m < kelas[j].childrens[0].jadwal.length; m++) {
            card.detail.innerHTML += `<p>${kelas[j].childrens[0].jadwal[m]}, ${kelas[j].childrens[0].ruangan[m]}</p>`
        }
        anchor = kelas[j].childrens[0].kelas.cloneNode(true)
        card.detail.appendChild(anchor)
        subjectstate[`${j}`] = 0
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
        detail.prev.addEventListener('click', (e) => {changeClass(e,-1, j)})
        detail.next.addEventListener('click', (e) => {changeClass(e,1, j)})
        detail.prev
        detail.box.appendChild(card.detail)
        detail.box.appendChild(detail.buttonbox)
        card.card.appendChild(detail.box)
        container.appendChild(card.card)
    }
}
insertCard(cardContainer)
document.querySelector('#content').appendChild(cardContainer)
}

