export const notes = {
  list: [
    {
      id: 1,
      name: "Shopping list",
      date: "April 20, 2021",
      category: "task",
      content: "Tomatoes, bread, milk, cow, cats, dogs",
      dates: "",
      isArchived: "false",
    },
    {
      id: 2,
      name: "The theory of evolution",
      date: "April 27, 2021",
      category: "thought",
      content: "The evolution is very long text here",
      dates: "",
      isArchived: "false",
    },
    {
      id: 3,
      name: "New Feature",
      date: "May 05, 2021",
      category: "idea",
      content: "Implementing new feature is very hard to me at 3/5/2021 and 5/5/2021",
      dates: "3/5/2021, 5/5/2021",
      isArchived: "false",
    },
    {
      id: 4,
      name: "William Gaddis",
      date: "May 07, 2021",
      category: "quote",
      content: "Power doesn`t collective mind, because it is power",
      dates: "",
      isArchived: "false",
    },
    {
      id: 5,
      name: "Books",
      date: "May 15, 2021",
      category: "task",
      content: "The lean startup — very lean, because salary is very small mf",
      dates: "",
      isArchived: "false",
    },
  ],
  maxIndex: 5,
}

export const categories = {
  list: [
    {
      id: "task",
      name: "Task",
      icon: "cart",
      active: 0,
      archived: 0,
    },
    {
      id: "thought",
      name: "Random Thought",
      icon: "mind",
      active: 0,
      archived: 0,
    },
    {
      id: "idea",
      name: "Ideas",
      icon: "bulb",
      active: 0,
      archived: 0,
    },
    {
      id: "quote",
      name: "Quote",
      icon: "quotes",
      active: 0,
      archived: 0,
    },
  ]
}

export const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
}