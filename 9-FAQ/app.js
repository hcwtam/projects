const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        // questions.forEach(item => {
            // if (item !== question) {
            //     item.classList.remove("show-text");
            // }
        // })
        question.classList.toggle("show-text");
    })
})