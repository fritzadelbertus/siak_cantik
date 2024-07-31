
// Extract Data

var tabel = document.querySelectorAll('.box');

var tabel_data = tabel[0]
var data_mahasiswa_lengkap = tabel_data.querySelectorAll('td')
var tabel_nilai = tabel[2]
var keterangan_nilai = tabel_nilai.querySelector('td[colspan="13"]')

var nilai_kumulasi = tabel_nilai.querySelectorAll('td.ce.emph')

var list_ip = []
for (let i = 0; i < nilai_kumulasi.length/3; i++){
    list_ip.push(nilai_kumulasi[i*3].innerText)
}
list_ip = list_ip.reverse()

var data_mahasiswa = {
    npm: data_mahasiswa_lengkap[0].innerText,
    nama: data_mahasiswa_lengkap[1].innerText,
    angkatan: data_mahasiswa_lengkap[2].innerText,
    studi: data_mahasiswa_lengkap[3].innerText,
    total_sks: data_mahasiswa_lengkap[6].innerText,
    ipk: data_mahasiswa_lengkap[8].innerText,
    ip: list_ip
}





// Create Element

var currentSemester = 1
var handleIP = (p) => {
    currentSemester += p
    if (currentSemester > data_mahasiswa.ip.length) {
        currentSemester = 1
    } else if (currentSemester == 0) {
        currentSemester = data_mahasiswa.ip.length
    }
    statusbox.querySelector('.ip .text-ip').innerText = data_mahasiswa.ip[currentSemester-1]
    statusbox.querySelector('.ip .small').innerText = `SMT ${currentSemester}`
}

var statusbox = document.createElement('div')
statusbox.classList.add('status-box')
statusbox.innerHTML =`
    <div class="profile_photo">
        <img src="${chrome.runtime.getURL('profile.png')}"/>
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
            <p>SKS Lulus</p><p class='r-stat'>${data_mahasiswa.total_sks}</p>
        </div>
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
                    <p class='small'>SMT ${currentSemester}</p>
                </div>
                <svg class='next-ip' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 
                    118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                </svg>    
            </span>
        </div>
    </div>
`
statusbox.querySelector('.prev-ip').addEventListener('click', (e) => handleIP(-1));
statusbox.querySelector('.next-ip').addEventListener('click', (e) => handleIP(1));


// Inject to content

document.querySelector('#content').appendChild(statusbox)
