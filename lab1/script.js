const dialog = document.getElementsByTagName('dialog')[0]
const button = document.querySelector('.hotel-right > button')

button.addEventListener('click', () => {
    dialog.showModal()
})
