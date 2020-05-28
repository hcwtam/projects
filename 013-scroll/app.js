// Set date
const date = document.querySelector('#date');
date.innerHTML = new Date().getFullYear();

// Close links
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click',()=> {
    const linksHeight = links.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }
})

// fixed navbar
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
window.addEventListener('scroll',()=>{
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    const lastPageHeight = document.querySelector('#tours').getBoundingClientRect().height;
    if(scrollHeight > navHeight) {
        navbar.classList.add('fixed-nav');
    } else {
        navbar.classList.remove('fixed-nav');
    }

    if (scrollHeight > lastPageHeight) {
        topLink.classList.add('show-link');
    } else {
        topLink.classList.remove('show-link');
    }
})

// smooth scroll
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link)=>{
    link.addEventListener('click',(e)=>{
        // prevent default
        e.preventDefault();
        // navigate to specific spot
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        // calculate the heights
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains('fixed-nav');
        let position = element.offsetTop - navHeight - 20;

        if (!fixedNav) {
            position -= navHeight;
        }

        if(navHeight > 82) {
            position += containerHeight;
        }
        window.scrollTo({
            left: 0, 
            top: position
        });
        linksContainer.style.height = 0;
    });
});