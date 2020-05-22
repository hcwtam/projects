const elements = {
    counter: document.querySelector('.counter'),
    reset: document.querySelector('.reset'),
    decrease: document.querySelector('.decrease'),
    increase: document.querySelector('.increase')
}

let i = [0];

const colorChange = ()=> {
    let number = parseInt(elements.counter.textContent);
    if (number < 0) elements.counter.style.color = "red";
    else if (number > 0) elements.counter.style.color = "green";
    else elements.counter.style.color = "white";
}

elements.increase.onclick = ()=> {
    i[0] = i[0] + 1;
    elements.counter.textContent = i[0];
    colorChange();
}

elements.decrease.onclick = ()=> {
    i[0] = i[0] - 1;
    elements.counter.textContent = i[0];
    colorChange();
}

elements.reset.onclick = ()=> {
    i[0] = 0;
    elements.counter.textContent = i[0];
    colorChange();
}