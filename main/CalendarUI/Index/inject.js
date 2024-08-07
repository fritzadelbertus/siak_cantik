const table = document.querySelector('.box tbody')

const cleanText = (text) => {
    text = text.replace(/\n/g, '')
    text = text.replace(/Lain-lain/g, '')
    return text
}

let schedule = []
for (let i = 1; i < table.children.length; i++) {
    schedule.push({
        duration: cleanText(table.children[i].children[0].innerText),
        description: cleanText(table.children[i].children[3].innerText)
    })
}

const newTable = document.createElement('div')
newTable.classList.add('schedule-table')

let node = {}
const startScroll = (e,t) => {
    node.width = e.target.offsetWidth
    node.parentWidth = e.target.parentNode.offsetWidth
    e.target.style.animation = `p-${t} ${(node.width-300)/60}s linear forwards`
    e.target.style["animation-play-state"] = 'running'
    e.target.style.cursor = 'pointer'
}
const revertScroll = (e) => {
    e.target.style.animation =  'unset';
    e.target.style.cursor = 'default'
}

const freezeScroll = (e) => {
    if (e.target.style["animation-play-state"] == 'running') {
        e.target.style["animation-play-state"] = 'paused'
    } else {
        e.target.style["animation-play-state"] = 'running'
    }
}


let scheduleItem
const keyframes = document.createElement('style')
document.querySelector('head').appendChild(keyframes)
for (let i = 0; i < schedule.length; i++) {
    scheduleItem = document.createElement('div')
    scheduleItem.classList.add(i%2 ? 'even' : 'odd')
    scheduleItem.innerHTML = `
        <p>${schedule[i].duration}</p>
        <div><p class='description'>${schedule[i].description}</p></div>
    `
    newTable.appendChild(scheduleItem)

}

const oldButtons = document.querySelector('.tab ul').cloneNode(true)
console.log(oldButtons);

const buttons = {
    prev: oldButtons.children[0].children[0],
    curr: oldButtons.children[1].children[0],
    next: oldButtons.children.length > 2 ? oldButtons.children[2].children[0]: null,
}


const pattern1 = /(\d+)\/\d+ - (\d)/
const pattern2 = /https?:\/\/academic\.ui\.ac\.id\/[\w\/]+\?per=(\d+)-(\d)/
const isCurrent = (text) => {
    if (!document.URL.endsWith('/Index') && pattern2.exec(document.URL)) {
        return pattern1.exec(text)[1] == pattern2.exec(document.URL)[1] && pattern1.exec(text)[2] == pattern2.exec(document.URL)[2]
    }
}

buttons.curr.classList.add(isCurrent(buttons.curr.innerText) ? 'current' : document.URL.endsWith('/Index') ? 'current' : 'n')

const newButtons = document.createElement('div')
newButtons.classList.add('schedule-nav')
newButtons.appendChild(buttons.prev)
newButtons.appendChild(buttons.curr)

if (buttons.next) {
    buttons.next.classList.add(isCurrent(buttons.next.innerText) ? 'current' : 'n')
    newButtons.appendChild(buttons.next)
}

const scheduleTitle = document.createElement('h5')
scheduleTitle.innerText = 'KALENDER AKADEMIK'

const scheduleBox = document.createElement('div')
scheduleBox.classList.add('schedule-box')

scheduleBox.appendChild(newButtons)
scheduleBox.appendChild(scheduleTitle)
scheduleBox.appendChild(newTable)

const prevForm = document.querySelector('form')
if (prevForm) {
    scheduleBox.appendChild(prevForm.cloneNode(true))
}


document.querySelector('#content').appendChild(scheduleBox)





const eventDesc = newTable.querySelectorAll('.description')
const injectKeyframe = (i,end) => {
    return `@keyframes p-${i} {
        from {left: 0px;}
        to {left: -${end}px;}
    }
    `
}
const addKeyframes = () => {
    for (let i = 0; i < eventDesc.length; i++) {
        if (eventDesc[i].offsetWidth > 300) {
            keyframes.innerHTML += injectKeyframe(i, eventDesc[i].offsetWidth - 300)    
            eventDesc[i].addEventListener('mouseover', (e) => { startScroll(e,i) })
            eventDesc[i].addEventListener('mouseout', (e) => { revertScroll(e,i) })
            eventDesc[i].addEventListener('click', (e) => { freezeScroll(e,i) })
        }   
    }
}
setTimeout(addKeyframes, 1000)
