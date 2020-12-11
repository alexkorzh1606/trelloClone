let inputTitle = document.querySelector('.input_title')
let inputText = document.querySelector('.input_text')
let inputRecipient = document.querySelector('.input_recipient')
let inputButton = document.querySelector('.input_button')
let cards = document.querySelectorAll('.card')
let cardTitle = document.querySelector('.card_title')
let cardText = document.querySelector('.card_text')
let cardRecipient = document.querySelector('.card_recipient')
let inbox = document.querySelector('.inbox')

let cardsElements = Array.from(cards);

for (let i = 0; i<cardsElements.length; i++) { 
    let card = cardsElements[i];
    card.draggable = true;

    card.onmousedown = function(event) {

    let shiftX = event.clientX - card.getBoundingClientRect().left;
    let shiftY = event.clientY - card.getBoundingClientRect().top;
  
    card.style.position = 'absolute';
    card.style.zIndex = 1000;
    document.body.append(card);
  
    moveAt(event.pageX, event.pageY);
  
    function moveAt(pageX, pageY) {
      card.style.left = pageX - shiftX + 'px';
      card.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    card.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      card.onmouseup = null;
    };
  
  };
  
  card.ondragstart = function() {
    return false;
  };
}
class Task {
        constructor(title, text, recipient) {
        this.title = title;
        this.text = text;
        this.recipient = recipient;
    }
}

function addTask() {
    let newTask = new Task(inputTitle.value, inputText.value, inputRecipient.value);
    const newTaskToJSON = JSON.stringify(newTask);
    localStorage.setItem(String(Date.now()), newTaskToJSON);
    GenerateDom(newTask);
}

function GenerateDom(obj) {
    let {title, text, recipient} = obj;
    inbox.insertAdjacentHTML(
        "beforeend",
        `
              <div class="card"> 
                <h4 class="card_title">${title}</h4>
                <p class="card_text">${text}</p>
                <p class="card_recipient">${recipient}</p>
              </div>
          `
      );
}

inputButton.onclick = addTask;
document.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
      addTask();
    }
});

function draw_on_load() {
    for (let i = 0; i < localStorage.length; i++) {
      let lk_key = localStorage.key(i);
      let content = localStorage.getItem(lk_key);
      let todo = JSON.parse(content);
      GenerateDom(todo);
    }
  }
  draw_on_load();
