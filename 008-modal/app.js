document.querySelector('.modal-btn').addEventListener('click', () => {
    document.querySelector('.modal-overlay').classList.add('open-modal');
})

document.querySelector('.close-btn').onclick = () => {
    document.querySelector('.modal-overlay').classList.remove('open-modal');
}