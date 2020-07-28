const word = document.querySelector("#word");
const wrongLetters = document.querySelector("#wrong-letters");
const playBtn = document.querySelector("#play-button");
const popup = document.querySelector("#popup-container");
const notification = document.querySelector("#notification-container");
const finalMessage = document.querySelector("#final-message");

const figureParts = document.querySelectorAll(".figure-part");
// create random words
const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWords = words[Math.floor(Math.random() * words.length)];
// console.log(selectedWords);

let correctLetter = [];
let wrongLetter = [];

function displayWords() {

    // selectedWords.split('').map((curr) => correctLetter.includes(curr) ? console.log(curr) : console.log('no'));

    word.innerHTML = ` ${selectedWords.split('').map((curr)=> `<span class="letter">
    ${correctLetter.includes(curr) ? curr: ''}
    </span>`).join('')}`
    // gives us line elemenet
    //    console.log(word.innerText);
    // convert new line to single line globally
    const innerWord = word.innerText.replace(/\n/g, '');
    if (innerWord === selectedWords) {
        finalMessage.textContent = 'Congratulations! You won! 😃';
        popup.style.display = "flex";
    }




}

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');

    }, 2000)
}

function updateWrongLettersEl() {
    wrongLetters.innerHTML = `
    ${wrongLetter.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetter.map((curr)=> `<span>${curr}</span>`)}
    `;

    figureParts.forEach((curr, index) => {
        const errors = wrongLetter.length;
        // total six index
        // 0 <1
        // 1 <2 
        // 2< 3
        if (index < errors) {
            curr.style.display = 'block';
        } else {
            curr.style.display = "none";
        }

    });

    // Check if lost
    if (wrongLetter.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        popup.style.display = 'flex';
    }

}
window.addEventListener('keyup', (e) => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWords.includes(letter)) {
            // no in correct letter
            if (!correctLetter.includes(letter)) {
                correctLetter.push(letter);
                displayWords();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetter.includes(letter)) {
                wrongLetter.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }


    }

})

playBtn.addEventListener('click', (e) => {
    window.location.reload();
    // correctLetter.splice(0);
    // wrongLetter.splice(0);


})

displayWords();
// let name = "hanan";
// let arr = name.split('');
// console.log(arr);
// let o = arr.join('');
// console.log(o);