import './inject.scss'
import 'jquery'

console.log('hello world');
console.log('hello world');

// $('body').add('div').addClass('log out')

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

// Border gak penting

const border1 = document.querySelector('#t_o #t_m .w0 .w1 div[style="border-top:2px solid gold;border-bottom:1px solid #C90"]')
const border2 = document.querySelector('#t_o #t_m .w0 .w1 #m_b #m_b1 div[style="border-bottom:1px solid #DDD"]')
const border3 = document.querySelector('#t_o #t_m .w0 .w1 div[style="clear:both;border-bottom:1px solid #DDD"]')
border1.style.display = 'none';
border2.style.display = 'none';
border3.style.display = 'none';

const statsbox = document.createElement('div')
statsbox.classList.add('stats-box')
statsbox.innerHTML =`
    <h5> ${data_penting.nama} </h5>
    <div>
        <p>NPM</p><p>${data_penting.npm}</p>
    </div>
    <div>
        <p>Angkatan</p><p>${data_penting.angkatan}</p>
    </div>
    <div>
        <p>Program Studi</p><p>${data_penting.studi}</p>
    </div>
    <div>
        <p>SKS Lulus</p><p>${data_penting.total_sks}</p>
    </div>
    <div class='ipk-container' style="border-bottom:0">
        <span class='ipk'><p>IPK</p><p>${data_penting.ipk}</p></span>
    </div>

`

const folderParent = document.querySelector('#t_o #t_m .w0 .w1 #m_b #m_b1 #ti_m #ti_m1')
folderParent.appendChild(statsbox)

const parentContainer = document.querySelector('#t_o #t_m .w0 .w1 #m_b #m_b1 #ti_m')
const title = document.createElement('h1')
title.innerHTML = '<i>SIAK-NG</i>'
parentContainer.appendChild(title)

// Gambar muka gw buat apa di zoom in dan zoom out

const gambarProfil = folderParent.querySelector('.imgsh-box .imgsh-in img')
gambarProfil.setAttribute('onmouseover', null)
gambarProfil.setAttribute('onmouseout', null)
gambarProfil.setAttribute('src', '../aether.webp')
gambarProfil.style.width = 'unset';
const containerProfil = folderParent.querySelector('.imgsh-box')
containerProfil.style.margin = 0;
containerProfil.style.float = 'none';

const upFolder = document.createElement('ul')
upFolder.classList.add('small-nav')
upFolder.innerHTML = `
<li class='current'><a href="https://academic.ui.ac.id/main/Academic/Summary">Ringkasan</a></li>
<li><a href="https://academic.ui.ac.id/main/Academic/HistoryByTerm">Riwayat</a></li>
<li><a href="https://academic.ui.ac.id/main/Academic/Payment">Pembayaran</a></li>
<li><a href="https://academic.ui.ac.id/main/Academic/StatusList">Status Akademis</a></li>
<li>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
<path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 
224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
</svg>
</li>
`

const folder = document.querySelector('#t_o #t_m .w0 .w1 #m_b #m_b1')
folder.appendChild(upFolder)
