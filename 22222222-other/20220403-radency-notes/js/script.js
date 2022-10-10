import { closeModal, openModal } from "../lib/modal/modal.js";
import Notes from "./Notes.js";

const createBtn = document.querySelector("[data-js='createBtn']");
const modal = document.querySelector("#modal");
const form = modal.querySelector("[data-js='form']");

const {addNote, changeNote, getNoteData, removeNote, archiveNote, unArchiveNote} = Notes();


const addNote_Handler = (evt) => {
  addNote(evt);
  closeModal(modal);
}

const createBtn_Click_Handler = (evt) => {
  evt.preventDefault();
  openModal(modal, {
    openActions: () => form.addEventListener("submit", addNote_Handler),
    closeActions: () => form.removeEventListener("submit", addNote_Handler),
  })
}

const editBtn_onDocument_Click_Handler = (evt) => {
  if (!evt.target.closest("[data-js='editBtn']")) return;
  evt.preventDefault();

  const noteId = evt.target.closest("[data-js='tr']").dataset.id;
  
  openEditModal(Number(noteId));
}

const changeNote_Handler = (evt) => {
  changeNote(evt);
  closeModal(modal);
}

const openEditModal = (noteId) => {
  openModal(modal, {
    openActions: () => form.addEventListener("submit", changeNote_Handler),
    closeActions: () => form.removeEventListener("submit", changeNote_Handler),
  })
  
  const noteObj = getNoteData(noteId);
  
  
  form.id.value = noteObj.id;
  form.name.value = noteObj.name;
  form.date.value = noteObj.date;
  form.category.value = noteObj.category;
  form.content.value = noteObj.content;
  form.isArchived.value = noteObj.isArchived;
}

const removeBtn_onDocument_Click_Handler = (evt) => {
  if (!evt.target.closest("[data-js='removeBtn']")) return;
  evt.preventDefault();

  const noteId = evt.target.closest("[data-js='tr']").dataset.id;

  removeNote(Number(noteId));
}

const archiveBtn_onDocument_Click_Handler = (evt)  => {
  if (!evt.target.closest("[data-js='archiveBtn']")) return;
  evt.preventDefault();

  const note = evt.target.closest("[data-js='tr']");
  const noteId = evt.target.closest("[data-js='tr']").dataset.id;

  if (note.dataset.isArchived === "true") {
    unArchiveNote(Number(noteId));
  } else {
    archiveNote(Number(noteId));
  }
}

createBtn.addEventListener("click", createBtn_Click_Handler);
document.addEventListener("click", editBtn_onDocument_Click_Handler);
document.addEventListener("click", removeBtn_onDocument_Click_Handler);
document.addEventListener("click", archiveBtn_onDocument_Click_Handler);