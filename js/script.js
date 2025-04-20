let extensions = [
  {
    logo: "./assets/images/logo-devlens.svg",
    name: "DevLens",
    description: "Quickly inspect page layouts and visualize element boundaries.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-style-spy.svg",
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-speed-boost.svg",
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    isActive: false
  },
  {
    logo: "./assets/images/logo-json-wizard.svg",
    name: "JSONWizard",
    description: "Formats, validates, and prettifies JSON responses in-browser.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-tab-master-pro.svg",
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-viewport-buddy.svg",
    name: "ViewportBuddy",
    description: "Simulates various screen resolutions directly within the browser.",
    isActive: false
  },
  {
    logo: "./assets/images/logo-markup-notes.svg",
    name: "Markup Notes",
    description: "Enables annotation and notes directly onto webpages for collaborative debugging.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-grid-guides.svg",
    name: "GridGuides",
    description: "Overlay customizable grids and alignment guides on any webpage.",
    isActive: false
  },
  {
    logo: "./assets/images/logo-palette-picker.svg",
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-link-checker.svg",
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-dom-snapshot.svg",
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    isActive: false
  },
  {
    logo: "./assets/images/logo-console-plus.svg",
    name: "ConsolePlus",
    description: "Enhanced developer console with advanced filtering and logging.",
    isActive: true
  }
]

const parentExtensions = document.querySelector('.main-extensions')
const themeBtn = document.querySelector('.theme')
const iconTheme = document.querySelector('.icon-theme')
const pageTitle = document.querySelector('.page-title')
const mainTitle = document.querySelector('.main-title')
const filters = document.querySelectorAll('.filter')
const filterAll = document.querySelector('#filter-all')
const filterActive = document.querySelector('#filter-active')
const filterInactive = document.querySelector('#filter-inactive')


window.addEventListener('load', () => {
  createExtensions(extensions)
})

function createExtensions(extensionItems) {
  parentExtensions.innerHTML = ''
  extensionItems.map(data => {
    parentExtensions.insertAdjacentHTML('beforeend', `
      <div class="extension">
      <div class="extension-main">
      <img class="extension-img" src=${data.logo} alt="extension">
      <div class="">
      <h4 class="extension-title">${data.name}</h4>
      <p class="extension-description">${data.description}</p>
      </div>
      </div>
      <div class="extension-actions">
      <button onclick="handleRemove('${data.name}' , event)">Remove</button>
      <div id="toggleBtn" class="${data.isActive ? 'toggle-active' : 'toggle-inActive'}">
      <span class="${data.isActive ? 'circle-active' : 'circle-active circle-inActive'}" onclick="handleToggle('${data.name}' , event)"></span>
      </div>
      </div>
      </div>
      `)

  })

}

function handleToggle(name, event) {
  let indexObj = extensions.findIndex(obj => obj.name === name)
  let currentStatus = extensions[indexObj].isActive
  extensions[indexObj].isActive = !currentStatus

  if (!currentStatus) {
    event.target.className = 'circle-active'
    event.target.parentElement.className = 'toggle-active'
    iconTheme.src.includes("icon-sun.svg") ? event.target.parentElement.className = 'toggle-active' : event.target.parentElement.className = 'toggle-active toggle-active-light'
  } else {
    event.target.className = 'circle-inActive'
    event.target.parentElement.className = 'toggle-inActive'
    iconTheme.src.includes("icon-sun.svg") ? event.target.parentElement.className = 'toggle-inActive' : event.target.parentElement.className = 'toggle-inActive toggle-inActive-light'
  }
}

const chanageTheme = (theme) => {
  let isLight = theme === 'light'
  const extensionBox = document.querySelectorAll('.extension')
  const extensionTitle = document.querySelectorAll('.extension-title')
  const extensionDescription = document.querySelectorAll('.extension-description')
  const btns = document.querySelectorAll('button')
  const toggleBtn = document.querySelectorAll('#toggleBtn')


  document.body.className = isLight && 'body-light' 
  pageTitle.className = isLight ?'page-title page-title-light' : 'page-title'
  themeBtn.className = isLight ? 'theme theme-light' : 'theme'
  mainTitle.className = isLight ? 'main-title main-title-light' : 'main-title'

  extensionBox.forEach(item => {
    item.className = isLight ? 'extension extension-light' : 'extension'
  })
  
  extensionTitle.forEach(title => title.className = isLight ? 'extension-title extension-title-light' : 'extension-title')
  
  extensionDescription.forEach(des => des.className = isLight ? 'extension-description extension-description-light' : 'extension-description')
  
  btns.forEach(btn => {
    btn.className = isLight && 'button-light'
  })
  
  if (isLight) {
    filters.forEach(filter => {
      if (filter.classList.contains('filter-active')) filter.className = 'filter filter-light filter-light-active'
      else filter.className = 'filter filter-light'
    })
    toggleBtn.forEach(btn => btn.className.includes('toggle-active') ? btn.classList.add('toggle-active-light') : btn.classList.add('toggle-inActive-light'))

  } else {
    filters.forEach(filter => {
      if (filter.classList.contains('filter-light-active')) filter.className = 'filter filter-active'
      else filter.className = 'filter'
    })
    toggleBtn.forEach(btn => btn.className.includes('toggle-active') ? btn.className = 'toggle-active' : btn.className = 'toggle-inActive')
  }
}

themeBtn.addEventListener('click', () => {
  if (iconTheme.src.includes("icon-sun.svg")) {
    iconTheme.src = 'assets/images/icon-moon.svg'
    chanageTheme('light')
  } else {
    iconTheme.src = 'assets/images/icon-sun.svg'
    chanageTheme('dark')
  }
})

const handleUpdateActiveFilter = clickedFilter => {
  filters.forEach(f => f.classList.remove('filter-active', 'filter-light-active'))

  if (iconTheme.src.includes("icon-sun.svg")) {
    clickedFilter.classList.add('filter-active')
  } else {
    clickedFilter.classList.add('filter-light-active')
  }
}

filterActive.addEventListener('click', event => {
  let activeExtensions = extensions.filter(extension => extension.isActive === true)
  createExtensions(activeExtensions)
  chanageTheme(iconTheme.src.includes("icon-moon.svg") ? 'light' : 'dark')
  handleUpdateActiveFilter(event.target)
})

filterInactive.addEventListener('click', event => {
  let inactiveExtensions = extensions.filter(extension => extension.isActive === false)
  createExtensions(inactiveExtensions)
  chanageTheme(iconTheme.src.includes("icon-moon.svg") ? 'light' : 'dark')
  handleUpdateActiveFilter(event.target)
})

filterAll.addEventListener('click', event => {
  createExtensions(extensions)
  chanageTheme(iconTheme.src.includes("icon-moon.svg") ? 'light' : 'dark')
  handleUpdateActiveFilter(event.target)
})



const handleRemove = ((nameEx , event) => {
  extensions = extensions.filter(ex => ex.name !== nameEx)
  event.target.parentElement.parentElement.remove()
})


