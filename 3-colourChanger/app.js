const elements = {
    value: document.querySelector('.value'),
    btn: document.querySelector('.btn')
};

const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

const changeColor = function() {
    let arr = ['#'];
    for (let i = 0; i < 6; i++) {
        let digit = Math.floor(Math.random() * 16);
        if (i === 0) {
            arr.push(hex[digit].toUpperCase());
        } else
        arr.push(hex[digit]);
    }
    return arr.join('');
};

elements.btn.onclick = function change() {
    let newColor = changeColor();
    elements.value.textContent = newColor;
    document.body.style.backgroundColor = newColor;
}



