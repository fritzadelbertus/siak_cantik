const tabel = document.querySelector('.box tbody')

const mata_kuliah = { 0: [] }
let smt = 0
let spCount = 0
let smtLabel = [0]
let currChild = null
for(let i = 1; i < tabel.children.length; i++) {
    currChild = tabel.children[i]
    if (currChild.children[0].classList.contains('head')) {
        smt += 1
        if (currChild.children[0].querySelectorAll('strong')[1].innerText == '3') {
            spCount += 1
            smtLabel.push(`SEMESTER PENDEK ${spCount}`)
        } else {
            smtLabel.push(`SEMESTER ${smt-spCount}`)
        }
        mata_kuliah[smt] = []
    } else if (currChild.children[0].classList.contains('ri')) {
        currChild.children[9].children[0].innerText = currChild.children[3].innerText
        mata_kuliah[smt].push([currChild.children[9].children[0], currChild.children[8].innerText, currChild.children[7].innerText])
    }    
}
const last_smt = smt
smt = 1

const gradeToScore = (e, smt, i) => e.target.innerText = mata_kuliah[smt][i][2] 
const scoreToGrade = (e, smt, i) => e.target.innerText = mata_kuliah[smt][i][1] 

let adibox
const applyDataInsertion = (parent, smt, i) => {
    adibox = document.createElement('div')
    adibox.classList.add( i%2 == 0? 'even' : 'odd' )
    adibox.appendChild(mata_kuliah[smt][i][0])
    adibox.innerHTML += `<p class='grade'>${mata_kuliah[smt][i][1]}</p>`
    parent.appendChild(adibox)
    adibox.querySelector('.grade').addEventListener('mouseover', (e) => { gradeToScore(e,smt,i) })
    adibox.querySelector('.grade').addEventListener('mouseout', (e) => { scoreToGrade(e,smt,i) })
}


const tabelNilai = document.createElement('div')
tabelNilai.classList.add('tabel-nilai')

for (let i = 0; i < mata_kuliah[smt].length; i++) {
    applyDataInsertion(tabelNilai, smt, i)
}

const headerNav = document.createElement('div')
headerNav.classList.add('header-nav')
headerNav.innerHTML = `
    <li class="prev-smt">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 
        0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
    </li>
    <li><h5>${smtLabel[smt]}</h5></li>
    <li class="next-smt">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 
        0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
        </svg>
    </li>
`

const tableChange = (p) => {
    smt += p
    if (smt > last_smt) {
        smt = 1
    } else if (smt == 0) {
        smt = last_smt
    }
    tabelNilai.innerHTML = ''
    for (let i = 0; i < mata_kuliah[smt].length; i++) {
        applyDataInsertion(tabelNilai, smt, i)
    }
    headerNav.querySelector('h5').innerText = `${smtLabel[smt]}`
}

headerNav.querySelector('.next-smt').addEventListener('click', () => {tableChange(1)} )
headerNav.querySelector('.prev-smt').addEventListener('click', () => {tableChange(-1)} )

const tableTitle = document.createElement('div')
tableTitle.classList.add('table-title')
tableTitle.innerHTML = `
    <span>Mata kuliah</span>
    <span class="right">Nilai</span>
`
document.querySelector('#content').appendChild(headerNav)
document.querySelector('#content').appendChild(tableTitle)
document.querySelector('#content').appendChild(tabelNilai)
