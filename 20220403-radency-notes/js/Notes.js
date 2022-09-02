import { notes, categories, months } from "./data.js";
import Categories from "./Categories.js";

const { changeCat, renderCategories } = Categories();
const notesList = document.querySelector("[data-js='notesList']")
const archiveList = document.querySelector("[data-js='archiveList']")


const Notes = () => {
  const createEl = (data) => {
    const noteTemplate = document.querySelector("#note-template");
    const note = noteTemplate.content.cloneNode(true);

    const icon = note.querySelector("[data-js='noteIcon']");
    const categoryIcon = categories.list.find(cat => cat.id === data.category).id;
    icon.className = `table__icon  table__icon--${categoryIcon}`;

    const name = note.querySelector("[data-js='noteName']");
    const nameText = data.name;
    name.textContent = (nameText.length > 17) ? nameText.slice(0, 17) + "..." : nameText;
    
    const date = note.querySelector("[data-js='noteDate']");
    date.textContent = data.date;

    const category = note.querySelector("[data-js='noteCat']");
    const categoryName = categories.list.find(cat => cat.id === data.category).name;
    category.textContent = categoryName;

    const content = note.querySelector("[data-js='noteContent']");
    const contentText = data.content;
    content.textContent = (contentText.length > 17) ? contentText.slice(0, 17) + "..." : contentText;

    const dates = note.querySelector("[data-js='noteDates']");
    dates.textContent = data.dates;
    
    const tr = note.querySelector("[data-js='tr']");
    tr.dataset.isArchived = data.isArchived;
    tr.dataset.id = data.id;

    return note;
  }

  const renderNotes = () => {
    notesList.innerHTML = "";
    archiveList.innerHTML = "";
    const newList = categories.list.map(cat => ({...cat, active: 0, archived: 0}));
    categories.list = newList;

    notes.list
      .filter(note => note.isArchived === "false")
      .map(note => {
        changeCat("increase", "active", note.category);
        return createEl(note);
      })
      .map(note => notesList.append(note));
    
    notes.list
      .filter(note => note.isArchived === "true")
      .map(note => {
        changeCat("increase", "archived", note.category);
        return createEl(note);
      })
      .map(note => archiveList.append(note));
  }

  const addNote = (evt) => {
    evt.preventDefault();
    const elems = evt.target.elements;

    const id = notes.maxIndex + 1;
    const name = elems.name.value || "Empty note";
    const now = new Date();
    const date = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    const category = elems.category.value || "task";
    const content = elems.content.value;
    const matches = content.match(/\d{1,2}\/\d{1,2}\/\d{4}/g);
    const dates = matches ? matches.join(",") : "";
    const isArchived = elems.isArchived.value;
    
    notes.list.push({id, name, date, category, content, dates, isArchived});
    notes.maxIndex = id;
    
    renderNotes();
  }

  const changeNote = (evt) => {
    evt.preventDefault();
    const elems = evt.target.elements;

    const id = Number(elems.id.value);
    const name = elems.name.value;
    const now = new Date();
    const date = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    const category = elems.category.value;
    const content = elems.content.value;
    const matches = content.match(/\d{1,2}\/\d{1,2}\/\d{4}/g);
    const dates = matches ? matches.join(",") : "";
    const isArchived = elems.isArchived.value;

    const newList = notes.list.map(note => {
      if (note.id === Number(id)) return {id, name, date, category, content, dates, isArchived}
      return note;
    })
    notes.list = [...newList];

    renderNotes();
  }


  const getNoteData = (id) => {
    return notes.list.find(note => note.id === id);
  };


  const removeNote = (id) => {
    const newList = notes.list.filter(note => note.id !== id);
    notes.list = [...newList];
    renderNotes();
  }


  const archiveNote = (id) => {
    const newList = notes.list.map(note => {
      if (note.id === Number(id)) {
        return {...note, isArchived: "true"}
      } else {
        return note;
      }
    })
    notes.list = [...newList];
    renderNotes();
  }


  const unArchiveNote = (id) => {
    const newList = notes.list.map(note => {
      if (note.id === Number(id)) {
        return {...note, isArchived: "false"}
      } else {
        return note;
      }
    })

    notes.list = [...newList];

    renderNotes();
  }


  renderNotes();
  return {addNote, changeNote, getNoteData, removeNote, archiveNote, unArchiveNote};
}


export default Notes;