// Hilangkan Fungsi Tombol

document.querySelector('.big-nav-up').removeEventListener('click', handleBigNavUp)
document.querySelector('.big-nav-down').removeEventListener('click', handleBigNavDown)

// Hapus Elemen yang ditambah

statsbox.remove()
title.remove()
smallNav.remove()
bigNav.remove()

// Kembalikan Elemen yang disembunyikan

containerProfil.setAttribute('style', "float:left;margin-top:25px;background-image:url(/main-www/modpub/Academic/dropshadow.png)")
gambarProfil.style.display = 'block'
profilGanti.style.display = 'none'