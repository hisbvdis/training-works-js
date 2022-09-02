import DOU_2021_JUNE_RAW from './2021_june_raw.js';
import CSS_COLOR_NAMES from './css_colors.js';

// TODO

// ============================================================================
// 1. Вивести в консоль (за спаданням) середню зарплату FE розробників
//    за містами у форматі
// ```
//     Average salary of FE developers in city_1 is salary_1$
//     Average salary of FE developers in city_2 is salary_2$
//     etc.
// ```
// ============================================================================
// const devArray = DOU_2021_JUNE_RAW.slice(0, 50);

// Группировка зарплат по городам
const answersByCity = DOU_2021_JUNE_RAW
  // Выбрать только специализацию "Front-End"
  .filter( answer => answer[10] === "Front-end")

  // Сгруппировать ответы по городам и суммировать зарплаты
  .reduce((allAnswers, currentAnswer) => {
    const answers = {...allAnswers};
    const currentCity = currentAnswer[2];

    if (currentCity in answers) {
      answers[currentCity].salary = answers[currentCity].salary + Number(currentAnswer[38]);
      answers[currentCity].count = answers[currentCity].count + 1;
    } else {
      answers[currentCity] = {
        salary: Number(currentAnswer[38]),
        count: 1,
      }
    }
    return answers;
  }, {})

const result = Object.entries(answersByCity)
  .map(([city, {salary, count}]) => {
    const average = Math.floor(salary / count);
    return [city, {salary, count, avarage: average}];
  })
  .sort((a, b) => b[1].avarage - a[1].avarage)
  .map(([city, {salary, count}]) => {
    let avarage = Math.floor(salary / count);

    return `Average salary of FE developers in ${city} is ${avarage}$`;
  })
  .join("\n")

console.log( result );



// ============================================================================
// 2. Відобразити на графіку засобами canvas (за спаданням) в яких
//    містах проживають респонденти опитування, що працюють FE розробниками.
// ============================================================================
const totalAnswers = Object.entries(answersByCity)
  .reduce((sum, currentAnswer) => sum + currentAnswer[1].count, 0);

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const centerX = 230;
const centerY = 300;
const radius = 200;
let startAngle = 0;
let angle = 0;
let endAngle = 0;
let startListX = 600;
let startListY = 50;

Object.entries(answersByCity)
  .sort((a, b) => b[1].count - a[1].count)
  .forEach((value, index) => {
    const cityName = value[0];
    let percent = value[1].count * 100 / totalAnswers

    percent = Math.round(percent * 100) / 100;
    angle = percent * 360 / 100;
    angle = Math.round(angle * 100) / 100;
    endAngle = startAngle + angle;
    
    // Сегмент диаграммы
    ctx.fillStyle = CSS_COLOR_NAMES[index];
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, Math.PI/180*startAngle, Math.PI/180*endAngle);
    ctx.closePath();
    ctx.fill();

    // Запись в легенде
    ctx.beginPath();
    ctx.fillStyle = CSS_COLOR_NAMES[index];
    ctx.fillRect(startListX, startListY, 15, 15);
    ctx.fillStyle = "#000";
    ctx.font = "12px sans-serif"
    ctx.textBaseline = "middle";
    ctx.fillText(`${cityName} (${percent}%)`, startListX + 30, startListY + 10);
    ctx.closePath();

    startAngle = startAngle + angle;
    startListY = startListY + 20;
  })