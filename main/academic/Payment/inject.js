const data = document.querySelector('.box').children[0]
const user = document.querySelector('#ti_m1').querySelector('h3').innerText.split('-')

let dataPembayaran = []
for (let i = 1; i < data.children.length; i++) {
    dataPembayaran.push({
        periode: data.children[i].children[0].innerText,
        total: data.children[i].children[5].innerText,
        sisa: data.children[i].children[7].innerText,
        status: data.children[i].children[8].innerText
    })
}

const tabelPembayaran = document.createElement('div')
tabelPembayaran.classList.add('tabel-bayar')
tabelPembayaran.innerHTML = `
    <div>
        <h5>PEMBAYARAN</h5>
        <h6>${user[1]} - ${user[0]}</h6>
    </div>
    <div class="header-tabel">
        <p>Periode</p>
        <p>Total</p>
        <p class='right'>Status</p>
    </div>
`

const tabelBody = document.createElement('div')
tabelBody.classList.add('data-tabel')

const statusToCurrency = (e,i) => e.target.innerText = dataPembayaran[i].sisa
const currencyToStatus = (e,i) => e.target.innerText = dataPembayaran[i].status

let dpbox
for (let i = 0; i < dataPembayaran.length; i++) {
    dpbox = document.createElement('div')
    dpbox.classList.add(`${i%2 ? 'even': 'odd'}`)
    dpbox.innerHTML = `
        <p>${dataPembayaran[i].periode}</p>
        <p>${dataPembayaran[i].total}</p>
        <p class='status'>${dataPembayaran[i].status}</p>
    `
    tabelBody.appendChild(dpbox)
    dpbox.querySelector('.status').addEventListener('mouseover', (e) => { statusToCurrency(e,i) })
    dpbox.querySelector('.status').addEventListener('mouseout', (e) => { currencyToStatus(e,i) })
}

tabelPembayaran.appendChild(tabelBody)



document.querySelector('#content').appendChild(tabelPembayaran)