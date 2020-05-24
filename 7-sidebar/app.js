document.querySelector('.sidebar-toggle').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('show-sidebar');
})

document.querySelector('.close-btn').onclick = () => {
    document.querySelector('.sidebar').classList.remove('show-sidebar');
}