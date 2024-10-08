// Extract Data

const tabel = document.querySelectorAll('.box');

const tabel_data = tabel[0]
const data_mahasiswa_lengkap = tabel_data.querySelectorAll('td')
const tabel_nilai = tabel[2].children[0]

let list_ip = []

for (let i = 2; i < tabel_nilai.children.length-1; i++) {
    if (tabel_nilai.children[i].children.length <= 3) {
        list_ip.push('-')
    } else {
        list_ip.push(tabel_nilai.children[i].querySelector('td.ce.emph').innerText)
    }
}


list_ip = list_ip.reverse()

const nama_pembimbing = /\d+ - ([\w \.\,]+)/
const data_mahasiswa = {
    npm: data_mahasiswa_lengkap[0].innerText,
    nama: data_mahasiswa_lengkap[1].innerText,
    angkatan: data_mahasiswa_lengkap[2].innerText,
    studi: data_mahasiswa_lengkap[3].innerText,
    pembimbing: nama_pembimbing.exec(data_mahasiswa_lengkap[4].innerText)[1],
    status_akademis: data_mahasiswa_lengkap[5].innerText,
    total_sks: data_mahasiswa_lengkap[6].innerText,
    total_mutu: data_mahasiswa_lengkap[7].innerText,
    ipk: data_mahasiswa_lengkap[8].innerText,
    ip: list_ip
}


const generateSMT = (i) => {
    if (i%3 == 0) {
        return `SP ${i/3}`
    } else {
        return `SMT ${i-(Math.floor(i/3))}`
    }
}

// Create Element

const ipCycleCheck = (csmt) => csmt > data_mahasiswa.ip.length ? 1 : csmt == 0 ? data_mahasiswa.ip.length : csmt

let currentSemester = 1
const handleIP = (p) => {
    const statusbox = document.querySelector('.status-box')
    currentSemester += p
    currentSemester = ipCycleCheck(currentSemester)
    if (data_mahasiswa.ip[currentSemester-1] == '-') {
        currentSemester += p
    }
    currentSemester = ipCycleCheck(currentSemester)
    statusbox.querySelector('.ip .text-ip').innerText = data_mahasiswa.ip[currentSemester-1]
    statusbox.querySelector('.ip .small').innerText = `${generateSMT(currentSemester)}`
}

let currDisplay = 'front'
const frontDisplay = document.createElement('div')
frontDisplay.classList.add('front')
frontDisplay.innerHTML = `
        <div class="profile_photo">
            <img />
        </div>
        <div class="stats">
            <h5> ${data_mahasiswa.nama} </h5>
            <div>
                <p>NPM</p><p class='r-stat'>${data_mahasiswa.npm}</p>
            </div>
            <div>
                <p>Angkatan</p><p class='r-stat'>${data_mahasiswa.angkatan}</p>
            </div>
            <div>
                <p>Program Studi</p><p class='r-stat'>${data_mahasiswa.studi}</p>
            </div>
            <div>
                <p>Pembimbing Akademis</p><p class='r-stat'>${data_mahasiswa.pembimbing}</p>
            </div>
            <div>
                <p>Status Akademis</p><p class='r-stat'>${data_mahasiswa.status_akademis}</p>
            </div>
            <div>
                <p>SKS Lulus</p><p class='r-stat'>${data_mahasiswa.total_sks}</p>
            </div>
            <div>
                <p>Mutu</p><p class='r-stat'>${data_mahasiswa.total_mutu}</p>
            </div>
        </div>    
`
const backDisplay = document.createElement('div')
backDisplay.classList.add('back')
backDisplay.innerHTML = `
        <h5> ${data_mahasiswa.nama} </h5>
        <div class='ipk-container' style="border-bottom:0">
            <span class='ipk'><p>IPK</p><p>${data_mahasiswa.ipk}</p></span>
            <span class='ip'>
                <svg class='prev-ip' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 
                    246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                </svg>
                    
                <div> 
                    <p>IP</p>
                    <p class='text-ip'>${data_mahasiswa.ip[currentSemester-1]}</p>
                    <p class='small'>${generateSMT(currentSemester)}</p>
                </div>
                <svg class='next-ip' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 
                    118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                </svg>    
            </span>
        </div>
    `
const tabelClone = tabel[2].cloneNode(true)
const allTD = tabelClone.querySelectorAll('td')
for (let i = 0; i < allTD.length; i++) {
    allTD[i].setAttribute('style', '')
}
const allTDri = tabelClone.querySelectorAll('td.ri')
for (let i = 0; i < allTDri.length; i++) {
    allTDri[i].classList.remove('ri')
}
const tabelBox = document.createElement('div')
tabelBox.classList.add('tabel-container')
tabelBox.appendChild(tabelClone)
backDisplay.appendChild(tabelBox)
const statusbox = document.createElement('div')
statusbox.classList.add('status-box')
statusbox.appendChild(frontDisplay)
statusbox.appendChild(backDisplay)
statusbox.querySelector('.prev-ip').addEventListener('click', (e) => handleIP(-1));
statusbox.querySelector('.next-ip').addEventListener('click', (e) => handleIP(1));
statusbox.querySelector('.back').style.display = 'none'

const handleToggleButton = (e) => {
    if (currDisplay == 'front') {
        currDisplay = 'back'
        document.querySelector('.status-box').querySelector('.back').style.display = ''
        document.querySelector('.status-box').querySelector('.front').style.display = 'none'
        e.target.innerText = 'Kembali'
    } else if (currDisplay == 'back') {
        currDisplay = 'front'
        document.querySelector('.status-box').querySelector('.back').style.display = 'none'
        document.querySelector('.status-box').querySelector('.front').style.display = ''
        e.target.innerText = 'Lihat IP/IPK'
    }
}

// Inject to content
const toggleButton = document.createElement('button')
toggleButton.innerText = 'Lihat IP/IPK'
toggleButton.addEventListener('click', handleToggleButton)
document.querySelector('#content').appendChild(statusbox)
document.querySelector('#content').appendChild(toggleButton)
    

