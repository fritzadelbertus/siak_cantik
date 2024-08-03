const user = document.querySelector('h3').innerText.split('-')
const statusData = document.querySelector('.box tbody')

let stats = []
for (let i = 1; i < statusData.children.length; i++) {
    stats.push({
        period: statusData.children[i].children[0].innerText,
        status: statusData.children[i].children[1].innerText
    })
}

stats = stats.reverse()

const statListTitle = document.createElement('div')
statListTitle.classList.add('stats-title')
statListTitle.innerHTML = `
    <h5>STATUS AKADEMIS</h5>
    <h6>${user[1]} - ${user[0]}</h6>
`

const statusContainer = document.createElement('div')
statusContainer.classList.add('stats-container')

const periodToStats = (e,i) => e.target.innerText = stats[i].status
const statsToPeriod = (e,i) => e.target.innerText = stats[i].period

let sbox
for (let i = 0; i < stats.length; i++) {
    sbox = document.createElement('div')
    sbox.classList.add(stats[i].status.toLowerCase())
    sbox.innerHTML = `<p class='status-text'>${stats[i].period}</p>`
    statusContainer.appendChild(sbox)
    sbox.children[0].addEventListener('mouseover', (e) => { periodToStats(e,i) })
    sbox.children[0].addEventListener('mouseout', (e) => { statsToPeriod(e,i) })
}


document.querySelector('#content').appendChild(statListTitle)
document.querySelector('#content').appendChild(statusContainer)

