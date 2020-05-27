class Item {
    constructor(id, title, category, price, img, desc) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.price = price;
        this.img = img;
        this.desc = desc;
    }
}

const menu = [
    new Item(1,"Sushi","lunch", 19.99,"images/sushi.jpg","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie libero eget ex mollis, id tincidunt lectus interdum. Vestibulum condimentum. "),
    new Item(2,"Sashimi","special", 19.99,"images/sashimi.jpg","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie volutpat feugiat. Morbi a diam massa. Praesent ut placerat odio."),
    new Item(3,"Unagi","lunch",19.99,"images/unagi.jpg","Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel soluta amet porro animi officiis minus omnis unde quaerat quo illo!"),
    new Item(4,"Tempura","lunch",19.99,"images/tempura.jpg","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia quae autem explicabo animi, earum eveniet accusamus consequatur voluptate itaque dicta."),
    new Item(5,"Soba","appetizers",19.99,"images/soba.jpg","Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, pariatur dolorem consectetur eum deleniti maiores quisquam blanditiis adipisci autem libero."),
    new Item(6,"Udon","appetizers",19.99,"images/udon.jpg","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum sit culpa error ad neque unde dicta a enim pariatur hic!"),
    new Item(7,"Onigiri","lunch",19.99,"images/onigiri.jpg","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste earum itaque fuga minima corrupti recusandae sed, repellat illum impedit beatae!"),
    new Item(8,"Yakitori","special",19.99,"images/yakitori.jpg","Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis soluta minima, quis qui quas consectetur quo hic temporibus beatae sequi."),
    new Item(9,"sukiyaki","main",19.99,"images/sukiyaki.jpg","Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo voluptate libero blanditiis voluptatibus ipsum tempore dolor non deserunt excepturi est."),
    new Item(10,"Teppanyaki","main",19.99,"images/teppanyaki.jpg","Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quis inventore dignissimos saepe minima molestiae modi laboriosam excepturi officiis rerum.")
]

const elements = {
    sectionCenter: document.querySelector('.section-center'),
    container: document.querySelector('.btn-container')
}

// Load buttons and items
window.addEventListener('load',()=> {
    displayMenuItems(menu);
    displayMenuButtons();
});

function displayMenuButtons() {

    // Find all categories in menu
    const categories = menu.reduce((acc,cur)=> {
        if (!acc.includes(cur.category)) acc.push(cur.category);
        return acc;
    },
    ["all"]).sort();

    // Create buttons of each category to a single HTML
    const categoryBtns = categories.map(category=> {
        return `<button class="filter-btn" type="button" data-id="${category}">${category}</button>`
    })
    .join('');

    elements.container.innerHTML = categoryBtns;

    // filter items
    const filterBtns = elements.container.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn=> {
        btn.addEventListener('click', e=> {
            const category = e.target.dataset.id;
            const menuCategory = menu.filter(menuItem=> menuItem.category === category);
            if (category === "all") displayMenuItems(menu);
            else displayMenuItems(menuCategory);
        })
    })
}

function displayMenuItems(menuItems) {
    let displayMenu = menuItems.map(item=> `
        <article class="menu-item">
          <img src=${item.img} class="photo" alt=${item.title} />
          <div class="item-info">
            <header>
              <h4>${item.title}</h4>
              <h4 class="price">$${item.price}</h4>
            </header>
            <p class="item-text">
              ${item.desc}
            </p>
          </div>
        </article>
    `)
    .join('');
    elements.sectionCenter.innerHTML = displayMenu;
}
