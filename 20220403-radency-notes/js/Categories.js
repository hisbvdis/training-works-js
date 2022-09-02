import { categories } from "./data.js";

const statList = document.querySelector("[data-js='statList']")


const Categories = () => {
  const createEl = (data) => {
    const categoryTemplate = document.querySelector("#category-template");
    const category = categoryTemplate.content.cloneNode(true);

    const icon = category.querySelector("[data-js='catIcon']");
    icon.className = `table__icon  table__icon--${data.id}`;

    const name = category.querySelector("[data-js='catName']");
    name.textContent = data.name;

    const active = category.querySelector("[data-js='active']");
    active.textContent = data.active;

    const archived = category.querySelector("[data-js='archived']");
    archived.textContent = data.archived;

    return category;
  }

  const renderCategories = () => {
    statList.innerHTML = "";

    categories.list
    .map(cat => createEl(cat))
    .map(cat => statList.append(cat));
  }

  const changeCategory = (mode, type, id) => {
    if (mode === "increase") {
      const newList = categories.list.map(cat => (cat.id === id) ? {...cat, [type]: cat[type] + 1} : cat);
      categories.list = [...newList];
    } else {
      const newList = categories.list.map(cat => (cat.id === id) ? {...cat, [type]: cat[type] - 1} : cat);
      categories.list = [...newList];
    }

    renderCategories();
  }

  const addCategoriesToModalSelect = () => {
    const select = document.querySelector("[data-js='categorySelect']");
    categories.list
      .map(cat => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;
        return option;
      })
      .map(option => select.append(option))
  }

  renderCategories();
  addCategoriesToModalSelect();
  return {changeCat: changeCategory, renderCategories};
}


export default Categories;