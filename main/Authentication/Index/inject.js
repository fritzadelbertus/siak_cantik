
const loginForm = document.querySelector('form')
const loginClone = loginForm.cloneNode(true)
loginClone.style.display = ''
loginClone.classList.add('.login-form')

const loginBox = document.createElement('div')
loginBox.classList.add('login-box')
loginBox.innerHTML = '<h5>LOGIN</h5>'
loginBox.appendChild(loginClone)

const contactBox = document.createElement('div')
contactBox.classList.add('contact-box')
contactBox.innerHTML = `
    <div>
        <h5>Pembayaran</h5>
        <div>
            <div>
                <p>
                    Direktorat Keuangan UIGedung Rektorat Lantai 4, Kampus UI Depok
                </p>
                <p class='phone'>
                    <span>(62) (21) 78841818</span>
                    <span>(62) (21) 7867222</span> 
                </p>
            </div>
        </div>
    </div>
    <div>
        <h5>Pelayanan Akun</h5>
        <div>
            <div>
                <p>
                    Gedung Perpustakaan Lama lantai 2 Berdampingan dengan ITTC Kampus UI Depok
                </p>
                <p class='phone'>
                    <span>(62) (21) 7875963</span>
                    <span><a href="http://dsti.ui.ac.id">  http://dsti.ui.ac.id </a></span> 
                </p>
            </div>
            <div>
                <p>
                    Gedung DSTI Lantai 1 Dekat Fasilkom/MTI Kampus UI Salemba
                </p>
                <p class='phone'>
                    <span>(62) (21) 31930308</span>\
                </p>
            </div>
        </div>
    </div>
`
contactBox.style.display = 'none'


document.querySelector('#content').appendChild(loginBox)
document.querySelector('#content').appendChild(contactBox)

const tabButtons = document.querySelectorAll('.file-nav li')

const switchFileAuth = (curr) => {
    if (curr == 'Login') {
        document.querySelector('.login-box').style.display = ''
        document.querySelector('.contact-box').style.display = 'none'
        tabButtons[0].classList.add('active')
        tabButtons[1].classList.remove('active')
    } else {
        document.querySelector('.login-box').style.display = 'none'
        document.querySelector('.contact-box').style.display = ''
        tabButtons[1].classList.add('active')
        tabButtons[0].classList.remove('active')
        
    }
}

tabButtons[0].addEventListener('click', () => { switchFileAuth('Login') })
tabButtons[1].addEventListener('click', () => { switchFileAuth('Kontak') })

