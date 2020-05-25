const elements = {
    photo: document.querySelector('img'),
    name: document.querySelector('.name'),
    title: document.querySelector('.title'),
    review: document.querySelector('.review'),
    left: document.querySelector('.prev-btn'),
    right: document.querySelector('.next-btn')
}

class Person {
    constructor(photo, name, title, review) {
        this.photo = photo;
        this.name = name;
        this.title = title;
        this.review = review;
    }
}

const people = [
    new Person("images/lickitung.jpg","Lickitung", "Food taster", "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic veritatis at inventore, soluta ab laudantium earum consequuntur adipisci. Suscipit incidunt doloremque in velit fugit veniam. Provident, sint! Dolorem, sequi possimus?"),
    new Person("images/no-face.png","No-Face", "Hungry spirit", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, architecto in adipisci repudiandae nemo, itaque, beatae cupiditate numquam eligendi animi repellendus aperiam consequatur reiciendis. Quisquam quibusdam ab iste modi incidunt?"),
    new Person("images/kirby.png","Kirby", "Pink alien", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa architecto, ad aspernatur aliquid esse! Fugiat, aliquam eos. Necessitatibus tempore quam voluptatem aut saepe rem animi dolorem neque itaque. Id?"),
    new Person("images/cookie-monster.jpg","Cookie Monster", "He want cookie", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque tempora tempore, maxime ea laborum enim dolorum eos ex a animi, reprehenderit deserunt, in eius quisquam. Suscipit iste similique minima porro!")
]

let index = 0;

const display = () => {
    elements.photo.src = people[index].photo;
    elements.name.textContent = people[index].name;
    elements.title.textContent = people[index].title;
    elements.review.textContent = people[index].review;
}

display();

elements.left.onclick = () => {
    index--;
    if (index < 0) index = people.length - 1;
    display();
}

elements.right.onclick = () => {
    index++;
    if (index === people.length) index = 0;
    display();
}