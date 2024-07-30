// Import Font Custom

const styleNode           = document.createElement ("style");
styleNode.textContent   = "@font-face { font-family: 'Rubik Mono One'; src: url('"
                        + chrome.runtime.getURL("rubik_mono_one.ttf")
                        + "'); }"
                        ;
document.head.appendChild (styleNode);

// Ambil Data Mahasiswa dan IP Semester

const tabel = document.querySelectorAll('.box');

const tabel_data = tabel[0]
const data_mahasiswa = tabel_data.querySelectorAll('td')
const data_penting = {
    npm: data_mahasiswa[0].innerText,
    nama: data_mahasiswa[1].innerText,
    angkatan: data_mahasiswa[2].innerText,
    studi: data_mahasiswa[3].innerText,
    total_sks: data_mahasiswa[6].innerText,
    ipk: data_mahasiswa[8].innerText
}

const tabel_nilai = tabel[2]
const keterangan_nilai = tabel_nilai.querySelector('td[colspan="13"]')

const nilai_kumulasi = tabel_nilai.querySelectorAll('td.ce.emph')

const nilai_ip = {}
for (let i = 0; i < nilai_kumulasi.length/3; i++){
    nilai_ip[i+1] = nilai_kumulasi[i*3].innerText
}

// Buat Element Stats Box dari Data Mahasiswa dan IP Semester

const statsbox = document.createElement('div')
statsbox.classList.add('stats-box')
statsbox.innerHTML =`
    <h5> ${data_penting.nama} </h5>
    <div>
        <p>NPM</p><p class='r-stat'>${data_penting.npm}</p>
    </div>
    <div>
        <p>Angkatan</p><p class='r-stat'>${data_penting.angkatan}</p>
    </div>
    <div>
        <p>Program Studi</p><p class='r-stat'>${data_penting.studi}</p>
    </div>
    <div>
        <p>SKS Lulus</p><p class='r-stat'>${data_penting.total_sks}</p>
    </div>
    <div class='ipk-container' style="border-bottom:0">
        <span class='ipk'><p>IPK</p><p>${data_penting.ipk}</p></span>
    </div>
`

// Tambahkan Judul SIAK-NG yang lebih keren

const title = document.createElement('h1')
title.innerHTML = '<i>SIAK-NG</i>'

// Benerin Pas Foto

const gambarProfil = document.querySelector('#t_o #t_m .w0 .w1 #m_b #m_b1 #ti_m #ti_m1 .imgsh-box .imgsh-in img')
let profilGanti = gambarProfil.cloneNode(true)
profilGanti.setAttribute('onmouseover', null)
profilGanti.setAttribute('onmouseout', null)
profilGanti.setAttribute('src', chrome.runtime.getURL('profile.png') )
profilGanti.style.width = 'unset';
document.querySelector('#t_o #t_m .w0 .w1 #m_b #m_b1 #ti_m #ti_m1 .imgsh-box .imgsh-in').appendChild(profilGanti)
const profilGantiClone = profilGanti.cloneNode(true)
profilGanti.parentNode.replaceChild(profilGantiClone, profilGanti)
profilGanti = profilGantiClone
const containerProfil = document.querySelector('#t_o #t_m .w0 .w1 #m_b #m_b1 #ti_m #ti_m1 .imgsh-box')


// Menambahkan Tampilan Atas Folder
const small_nav_dir = {
    "AKADEMIS": `
        <li><a href="https://academic.ui.ac.id/main/Academic/Summary">Ringkasan</a></li>
        <li><a href="https://academic.ui.ac.id/main/Academic/HistoryByTerm">Riwayat</a></li>
        <li><a href="https://academic.ui.ac.id/main/Academic/Payment">Pembayaran</a></li>
        <li><a href="https://academic.ui.ac.id/main/Academic/StatusList">Status Akademis</a></li>
    `,
    "KALENDER AKADEMIK": `<li><a href="https://academic.ui.ac.id/main/CalendarUI/Index">Kalender Akademik</a></li>`,
    "MATA KULIAH SPESIAL": `
    <li><a href="https://academic.ui.ac.id/main/CourseGuidance/IndexStudent">Bimbingan</a></li>
    <li><a href="https://academic.ui.ac.id/main/FinalProject/StudentEdit">Tugas Akhir</a></li>
    `,
    "IRS": `
        <li><a href="https://academic.ui.ac.id/main/CoursePlan/CoursePlanViewSummary">Lihat IRS</a></li>
        <li><a href="https://academic.ui.ac.id/main/CoursePlan/CoursePlanEdit">Isi/Ubah IRS</a></li>
        <li><a href="https://academic.ui.ac.id/main/CoursePlan/CoursePlanAdd">Add IRS</a></li>
        <li><a href="https://academic.ui.ac.id/main/CoursePlan/CoursePlanDrop">Drop IRS</a></li>
    `,
    "PERKULIAHAN": `
        <li><a href="https://academic.ui.ac.id/main/Class/SAP4Student">Rencana Perkuliahan</a></li>
        <li><a href="https://academic.ui.ac.id/main/Student/LeaveApplication">Pengajuan Cuti</a></li>
    `,
    "MAHASISWA": `
        <li><a href="https://academic.ui.ac.id/main/Student/IDMView">Lihat IDM</a></li>
        <li><a href="https://academic.ui.ac.id/main/Student/IDMEdit">Ubah IDM</a></li>
        <li><a href="https://academic.ui.ac.id/main/Student/IndexDokumen">Dokumen</a></li>
    `,
    "JADWAL": `
        <li><a href="https://academic.ui.ac.id/main/Schedule/Index">Jadwal Kuliah</a></li>
        <li><a href="https://academic.ui.ac.id/main/Schedule/IndexOthers">Jadwal Kuliah Lengkap</a></li>
        <li><a href="https://academic.ui.ac.id/main/Examination/Index">Jadwal Ujian</a></li>
        <li><a href="https://academic.ui.ac.id/main/SpecialCourse/StudentListGuidance">Jadwal Sidang</a></li>
    `
}

const smallNav = document.createElement('ul')
smallNav.classList.add('small-nav')
smallNav.innerHTML = small_nav_dir['AKADEMIS']
smallNav.firstElementChild.classList.add('current')


// Menambahkan Tampilan Samping Folder

const bigNav = document.createElement('ul')
bigNav.classList.add('big-nav')
bigNav.innerHTML = `
<li class="big-nav-up">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
<path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 
14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/>
</svg>
</li>
<li class='current-nav'>AKADEMIS</li>
<li class="big-nav-down">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
<path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 
64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
</svg>
</li>
`

const navigations = ['AKADEMIS', 'KALENDER AKADEMIK', 'MATA KULIAH SPESIAL', 'IRS', 'PERKULIAHAN', 'MAHASISWA', 'JADWAL']

const updateSmallNav = (currBigNav) => {
    if (currBigNav == 'AKADEMIS') {
        smallNav.firstElementChild.classList.add('current')
    }
}

const handleBigNavUp = () => {
    const currentNav = document.querySelector('.current-nav').innerText
    let index = navigations.indexOf(currentNav)+1
    if (index == navigations.length) {
        index = 0
    }
    document.querySelector('.current-nav').innerText = navigations[index]
    smallNav.innerHTML = small_nav_dir[navigations[index]]
    updateSmallNav(navigations[index])
}
const handleBigNavDown = () => {
    const currentNav = document.querySelector('.current-nav').innerText
    let index = navigations.indexOf(currentNav)-1
    if (index == -1) {
        index = navigations.length-1
    }
    document.querySelector('.current-nav').innerText = navigations[index]
    smallNav.innerHTML = small_nav_dir[navigations[index]]
    updateSmallNav(navigations[index])
}
