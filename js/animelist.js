const list = 'https://api.jikan.moe/v3/search/anime?q=Sawashiro&limit=6'
const details = 'https://api.jikan.moe/v3/anime'

const listRoot = document.querySelector('#items-list')
const itemListTemplate = document.querySelector('#list-item')
const itemDetailsTemplate = document.querySelector('#item-details')

function clearList() {
  listRoot.textContent = ''
}

function reloadList() {
  document.querySelector('.item-details__back').removeEventListener('click', reloadList)
  clearList()
  getList()
}

function getList() {
  fetch(list)
    .then(response => response.json())
    .then(data => {
      data.results.forEach((item) => {
        const clonedTemplate = document.importNode(itemListTemplate.content, true)

        clonedTemplate.querySelector('.row-list-item').setAttribute('data-id', item.mal_id)
        clonedTemplate.querySelector('img').src = item.image_url
        clonedTemplate.querySelector('h3').innerText = item.title
        clonedTemplate.querySelector('p').innerText = item.synopsis
        clonedTemplate.querySelector('span').innerText = item.type

        listRoot.appendChild(clonedTemplate)
      });
    })
}

function getDetails() {
  event.stopPropagation()

  if (event.target.closest('.row-list-item') != null) {
    const dataId = event.target.closest('.row-list-item').getAttribute('data-id')
    const url = `${details}/${dataId}`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const clonedTemplate = document.importNode(itemDetailsTemplate.content, true)

        clonedTemplate.querySelector('img').src = data.image_url
        clonedTemplate.querySelector('h3').innerText = data.title
        clonedTemplate.querySelector('p').innerText = data.synopsis
        clonedTemplate.querySelector('.item-details__back').addEventListener('click', reloadList)

        clearList()
        listRoot.appendChild(clonedTemplate)
      })
  }
}

listRoot.addEventListener('click', getDetails)
window.addEventListener('load', getList)