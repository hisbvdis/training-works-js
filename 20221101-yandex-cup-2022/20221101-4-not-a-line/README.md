# Ни строчки

Задача с Yandex Cup 2022

**Результат:** Ошибка во время исполнения (0 баллов из 20)

## Условие
Получилось! Координаты шаттла установлены, самое время узнать, что это за место. Добравшись до пункта назначения, ты заходишь в огромный пустой космопорт, в центре которого стоит главный компьютер. В нем наверняка должна быть вся информация о технологиях, которые успели создать наши однопланетяне.

Компьютер удалось включить, но все данные на нем зашифрованы. Зайдя в программный код, ты понимаешь, что местный язык программирования не умеет работать со строками, а значит, нужно написать функцию для декодирования

**Задача**
Вам нужно написать функцию в виде CommonJS модуля, которая на вход принимает массив чисел (примитив Number) и возвращает строку.

Сигнатура
`function(numbers: Number[]): string`

Пример оформления задачи
```javascript
module.exports = function(numbers) {
  // code
};
```

**Условия**
- Ваше устройство вывода не исправно и умеет выводить только цифры, латинские буквы, пробел и символ нижнего подчеркивания
- Нельзя использовать кавычки (литеральные и шаблонные строки) – ', ", `
- Нельзя использовать и создавать объекты String() и Symbol()
- Функция на вход принимает массив чисел вида [17,40,47,47,50,62,34,36,12,56,51,62,2,0,2,2]
- Функция должна возвращать сообщение одной последовательностью символов
- Неизвестные символы программа должна заменять на _
- Решение оформлено в виде CommonJS модуля

**Алфавит:**
Сообщения, которые удалось расшифровать. Пока полный алфавит не известен.
`[14,12,22,10,28,38,53,44,51,55,62,2,0,1,5] === 'ECMAScript 2015'`

**Примеры:**
*Пример 1*
```javascript
const numbers = [17,40,47,47,50,62,34,36,12,56,51,62,2,0,2,2];
// Hello YaCup 2022
```

*Пример 2*

```javascript
const numbers = [17,40,47,47,50,62,32,50,53,47,39,-1];
// Hello World_
```
