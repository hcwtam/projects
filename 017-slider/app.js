const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');

slides.forEach((slide, i)=> {
    slide.style.left = `${i * 100}%`;
})

let counter = 0;
nextBtn.addEventListener('click', ()=>{
    counter++;
    carousel();
})

prevBtn.addEventListener('click',()=>{
    counter--;
    carousel();
})

function carousel() {
    if (counter < 0) counter = slides.length - 1;
    if (counter === slides.length) counter = 0;

    slides.forEach(slide => slide.style.transform = `translateX(-${counter * 100}%)`)
}