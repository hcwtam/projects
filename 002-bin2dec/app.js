const elements = {
    input: document.querySelector('input'),
    binary: document.querySelector('.binary'),
    decimal: document.querySelector('.decimal'),
    notify: document.querySelector('.notify')
}


function bin2dec(bin) {
    let arr = bin.split('').reverse();
    let dec = 0;
    for (let i = 0; i < bin.length; i++) {
        if (arr[i]  ==='0' || arr[i] === '1')
        dec += parseInt(arr[i]) * 2 ** i;
        else return;
    }
    return dec;
}

function display() {
    elements.input.addEventListener('input', ()=> {
        notify(elements.input.value);
        displayBin(elements.input.value);
        dec = bin2dec(elements.input.value);
        displayDec(dec);
    });
}

function displayBin(bin) {
    if (elements.input.value === '' || !(elements.input.value.includes("0") || elements.input.value.includes("1"))) {
        elements.binary.textContent = '';
    } else {
        elements.binary.textContent = bin;
    }
}

function displayDec(dec) {
    if (elements.input.value === '' || !(elements.input.value.includes("0") || elements.input.value.includes("1"))) {
        elements.decimal.textContent = '';
    } else {
        elements.decimal.textContent = dec;
    }
}

function notify(input) {
    if (!(elements.input.value.includes("0") || elements.input.value.includes("1"))) {
        elements.notify.textContent = '* Only 0 or 1 can be entered.';
    } else {
        elements.notify.textContent = ' ';
    }
}

display();