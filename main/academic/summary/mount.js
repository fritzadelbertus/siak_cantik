// Tambahkan Elemen yang Bagus

document.querySelector('#t_o #t_m .w0 .w1 #m_b #m_b1 #ti_m #ti_m1').appendChild(statsbox)
document.querySelector('#t_o #t_m .w0 .w1 #m_b #m_b1 #ti_m').appendChild(title)

document.querySelector('#t_o #t_m .w0 .w1 #m_b').appendChild(smallNav)
document.querySelector('#t_o #t_m .w0 .w1 #m_b #m_b1').appendChild(bigNav)

// Tambahkan Fungsi Tombol

document.querySelector('.big-nav-up').addEventListener('click', handleBigNavUp)
document.querySelector('.big-nav-down').addEventListener('click', handleBigNavDown)

// Hapus Element yang Jelek

gambarProfil.style.display = 'none'
profilGanti.style.display = 'block'
containerProfil.style.margin = 0;
containerProfil.style.float = 'none';
containerProfil.style["background-image"] = 'unset';
