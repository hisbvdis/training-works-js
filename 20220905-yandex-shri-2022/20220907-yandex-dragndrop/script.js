import "./engine.js";

// =================================================================
// НАЧАЛО
// =================================================================
let drago;
let lower;
let tagsDropzone;
let lettersDropzone;
let activeDropzone;

document.addEventListener("dragstart", drago_Dragstart_Handler);

// =================================================================
// ФУНКЦИИ
// =================================================================
function prepareToDrag(evt) {
  drago = evt.target;
  lettersDropzone = document.querySelector(".Letters");
  tagsDropzone = document.querySelector(".Tags");

  lettersDropzone.classList.add("Letters_dropzone");
  if (drago.matches(".Letter .Tag")) {
    tagsDropzone.classList.add("Tags_dropzone");
  }

  // Добавить Drago класс перемещения
  drago.classList.add("Tag_dragged");

  // Добавить обработчики, определяющие перемещение над "зонами сброса"
  lettersDropzone.addEventListener("dragover", letters_Dragover_Handler);
  lettersDropzone.addEventListener("dragleave", letters_Dragleave_Handler);

  tagsDropzone.addEventListener("dragover", tags_Dragover_Handler);
  tagsDropzone.addEventListener("dragleave", tags_Dragleave_Handler);

  drago.addEventListener("dragend", drago_Dragend_Handler);
  document.addEventListener("drop", drago_Drop_Handler);
}

function dragEnd() {
  lettersDropzone.classList.remove("Letters_dropzone");
  tagsDropzone.classList.remove("Tags_dropzone");
  drago.classList.remove("Tag_dragged");
  activeDropzone.classList.remove("Letter_dragovered");
  tagsDropzone.classList.remove("Tags_dragovered");
}

// =================================================================
// ОБРАБОТЧИКИ
// =================================================================
// Потянули Drago
//    =>  Начать перемещение
function drago_Dragstart_Handler(evt) {
  if (!evt.target.closest(".Tag")) return;

  prepareToDrag(evt);
}

// Перемещение Drago над "зоной сброса"
function letters_Dragover_Handler(evt) {
  const dropzone = evt.target.closest(".Letter");
  activeDropzone = dropzone;
  if (!dropzone) return;

  const letterTags = Array.from(dropzone.querySelectorAll(".Tag"));
  if (letterTags.some((tag) => tag.textContent === drago.textContent)) return;

  dropzone.classList.add("Letter_dragovered");

  // Позволить сброс (меняется курсор и разрешает событие "drop")
  evt.preventDefault();
}

function letters_Dragleave_Handler(evt) {
  const dropzone = evt.target.closest(".Letter");
  if (!dropzone) return;

  dropzone.classList.remove("Letter_dragovered");
}

function letters_Dragend_Handler(evt) {
  console.log(evt.target);
}

function tags_Dragover_Handler(evt) {
  activeDropzone = tagsDropzone;

  if (drago.matches(".Letter .Tag")) {
    tagsDropzone.classList.add("Tags_dragovered");
  }

  // Позволить сброс (меняется курсор и разрешает событие "drop")
  evt.preventDefault();
}

function tags_Dragleave_Handler(evt) {
  tagsDropzone.classList.remove("Tags_dragovered");
}

function drago_Dragend_Handler(evt) {
  dragEnd();
}

function drago_Drop_Handler(evt) {
  if (drago.matches(".Tags .Tag") && evt.target.matches(".Letter")) {
    const clone = drago.cloneNode(true);
    clone.classList.remove("Tag_dragged");
    evt.target.append(clone);
    return;
  }

  if (drago.matches(".Letters .Tag") && evt.target.matches(".Letter")) {
    evt.target.append(drago);
  }

  if (drago.matches(".Letters .Tag") && evt.target.matches(".Tags")) {
    drago.remove();
  }

  dragEnd();
}
