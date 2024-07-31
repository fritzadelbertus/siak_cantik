// GLOBALS 

const path_pattern = /https?:\/\/[\w+:.]+\/[\w]+\/([\w]+)\/([\w]+)/
const file_jadwal = [
    {
        name: 'Jadwal Kuliah',
        endpoint: 'Schedule/Index'
    },
    {
        name: 'Jadwal Kuliah Lengkap',
        endpoint: 'Schedule/IndexOthers'
    },
    {
        name: 'Jadwal Ujian',
        endpoint: 'Examination/Index'
    },
    {
        name: 'Jadwal Sidang',
        endpoint: 'SpecialCourse/StudentListGuidance'
    },
]
const GLOBAL = {
    NAVIGATION_LIST: ['AKADEMIS', 'KALENDER AKADEMIK', 'MATA KULIAH SPESIAL', 'IRS', 'MAHASISWA', 'JADWAL'],
    NAVIGATION_FOLDERS: ['Academic', 'CalendarUI', 'CourseGuidance', 'CoursePlan', 'Student', 'Schedule'],
    NAVIGATION_ROUTING: {
        'Academic': {
            name: 'AKADEMIS',
            files: [
                {
                    name: 'Ringkasan',
                    endpoint: 'Academic/Summary'
                },
                {
                    name: 'Riwayat',
                    endpoint: 'Academic/HistoryByTerm'
                },
                {
                    name: 'Pembayaran',
                    endpoint: 'Academic/Payment'
                },
                {
                    name: 'Status Akademis',
                    endpoint: 'Academic/StatusList'
                }
            ]
        },
        'CalendarUI': {
            name: 'KALENDER AKADEMIK',
            files: [
                {
                    name: 'Kalender Akademik',
                    endpoint: 'CalendarUI/Index'
                }
            ]
        },
        'CourseGuidance': {
            name: 'MATA KULIAH SPESIAL',
            files: [
                {
                    name: 'Bimbingan',
                    endpoint: 'CourseGuidance/IndexStudent'
                },
                {
                    name: 'Tugas Akhir',
                    endpoint: 'FinalProject/StudenEdit'
                }
            ]
        },
        'CoursePlan': {
            name: 'IRS',
            files: [
                {
                    name: 'Lihat IRS',
                    endpoint: 'CoursePlan/CoursePlanViewSummary'
                },
                {
                    name: 'Isi/Ubah IRS',
                    endpoint: 'CoursePlan/CoursePlanEdit'
                },
                {
                    name: 'Add IRS',
                    endpoint: 'CoursePlan/CoursePlanAdd'
                },
                {
                    name: 'Drop IRS',
                    endpoint: 'CoursePlan/CoursePlanDrop'
                }
            ]
        },
        'Student': {
            name: 'MAHASISWA',
            files: [
                {
                    name: 'Lihat IDM',
                    endpoint: 'Student/IDMView'
                },
                {
                    name: 'Ubah IDM',
                    endpoint: 'Student/IDMVEdit'
                },
                {
                    name: 'Dokumen',
                    endpoint: 'Student/IndexDokumen'
                }
            ]
        },
        'Schedule': {
            name: 'JADWAL',
            files: file_jadwal
        },
        'Examination': {
            name: 'JADWAL',
            files: file_jadwal
        },
        'SpecialCourse': {
            name: 'JADWAL',
            files: file_jadwal
        },
    },
    FOLDER_ENDPOINT: path_pattern.exec(document.URL)[1],
    FILE_ENDPOINT: path_pattern.exec(document.URL)[2]
}

let currentFolderNavIndex = GLOBAL.NAVIGATION_LIST.indexOf(GLOBAL.NAVIGATION_ROUTING[GLOBAL.FOLDER_ENDPOINT].name)
const folderName = (p) => {
    currentFolderNavIndex += p
    if (currentFolderNavIndex >= GLOBAL.NAVIGATION_LIST.length) {
        currentFolderNavIndex = 0
    } else if (currentFolderNavIndex == -1) {
        currentFolderNavIndex = GLOBAL.NAVIGATION_LIST.length-1
    }
    document.querySelector('.folder-nav .folder-name').innerText = GLOBAL.NAVIGATION_LIST[currentFolderNavIndex]
    const filenav = document.querySelector('.file-nav')
    filenav.innerHTML = ''
    const files = GLOBAL.NAVIGATION_ROUTING[GLOBAL.NAVIGATION_FOLDERS[currentFolderNavIndex]].files
    for (let i = 0; i < files.length; i++) {
        filenav.innerHTML += `
            <li class=${files[i].endpoint == `${GLOBAL.FOLDER_ENDPOINT}/${GLOBAL.FILE_ENDPOINT}` ? "active" : ""}>
                <a href="https://academic.ui.ac.id/main/${files[i].endpoint}">${files[i].name}</a>
            </li>
        `
    }
}

// MAIN COMPONENTS

const folder = document.createElement('div')
folder.id = 'folder'

const title = document.createElement('h1')
title.innerHTML = '<em>SIAK-NG</em>'

const foldernav = document.createElement('ul')
foldernav.classList.add('folder-nav')
foldernav.innerHTML =`
    <li>
        <svg class="next-folder" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 
            0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 
            0s12.5-32.8 0-45.3l-160-160z"/>
        </svg>
    </li>
    <li class="folder-name">${GLOBAL.NAVIGATION_ROUTING[GLOBAL.FOLDER_ENDPOINT].name}</li>
    <li>
        <svg class="prev-folder" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 
        370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 
        0 45.3l160 160z"/>
        </svg>
    </li>
`
foldernav.querySelector('.prev-folder').addEventListener('click', (e) => folderName(-1));
foldernav.querySelector('.next-folder').addEventListener('click', (e) => folderName(1));

const filenav = document.createElement('ul')
filenav.classList.add('file-nav')
const files = GLOBAL.NAVIGATION_ROUTING[GLOBAL.FOLDER_ENDPOINT].files

for (let i = 0; i < files.length; i++) {
    filenav.innerHTML += `
        <li class=${files[i].endpoint == GLOBAL.FOLDER_ENDPOINT+'/'+GLOBAL.FILE_ENDPOINT ? "active" : ""}>
            <a href="https://academic.ui.ac.id/main/${files[i].endpoint}">${files[i].name}</a>
        </li>
    `
}

const main_components = { folder, title, foldernav, filenav }


// APP CREATION

const body = document.querySelector('body')
const app = document.createElement('div')
app.id = 'app'

const folderLeft = document.createElement('div')
const contentBox = document.createElement('div')
contentBox.id = 'content'
folderLeft.appendChild(main_components.title)
folderLeft.appendChild(contentBox)

main_components.folder.appendChild(main_components.foldernav)
main_components.folder.appendChild(folderLeft)

const folderUp = document.createElement('div')
folderUp.classList.add('file-nav-container')
folderUp.appendChild(main_components.filenav)

app.appendChild(folderUp)
app.appendChild(main_components.folder)

for (let i = 0; i < body.children.length; i++) {
    body.children[i].style.display = 'none'
}

body.appendChild(app);

// LINK INJECTION

const link1 = document.createElement('link')
link1.setAttribute('rel', 'preconnect')
link1.setAttribute('href', 'https://fonts.googleapis.com')
const link2 = document.createElement('link')
link2.setAttribute('rel', 'preconnect')
link2.setAttribute('href', 'https://fonts.gstatic.com')
link2.setAttribute('crossorigin', 'anonymous')
const link3 = document.createElement('link')
link3.setAttribute('rel', 'stylesheet')
link3.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Rubik+Mono+One&display=swap')

document.head.appendChild (link1);
document.head.appendChild (link2);
document.head.appendChild (link3);

