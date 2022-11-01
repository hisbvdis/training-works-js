# Время анализировать

Задача с Yandex Cup 2022

Результат — Частичное решение (26 баллов из 60)

## Условие
Перед тем как отправиться в далекий город за запчастями, нужно хотя бы узнать, в каком времени ты находишься. Ты отсоединяешь от хронопорта ноутбук и подключаешь к нему спектроанализатор. По экрану плывут длинные отчеты с химическими формулами, быстро уползая далеко вверх, а тачпад, как назло, не отвечает: работают только кнопки мыши.

Придется разработать встраиваемый на страницу скрипт, который сделает взаимодействие со страницей подобно тачскрину, но вместо пальца будет мышь. Можно не тратить время скролл с помощью колеса мышки и сэкономить заряд батареи — его осталось 94%.

Мы отказываемся от скролла с помощью колеса мышки: теперь он должен работать через перетаскивание мышью по обеим осям одновременно (аналогично мобильным devtools'ам – нажали, потащили, отпустили). Направление перетаскивания противоположно направлению скролла (если тащим мышку вверх, значит скроллим вниз).

Но кроме скролла ещё должно меняться поведение псевдоклассов `:hover` и `:active`. Теперь они должны вести себя следующим образом:

- при наведении курсора на элемент ничего не происходит
- при касании элемента (`touchstart`), он считается `:hover` и `:active` спустя 250мс
- при движении пальца (`touchmove`) элемент теряет состояние `:active`, но остаётся в `:hover`
- при завершении касания (`touchend`) элемент так же теряет `:active`, но остаётся в `:hover`
- если совершить касание за пределами элемента, который уже находится в `:hover`, то он теряет это состояние

К этому поведению так же применимо всплытие событий.

Ваш скрипт будет подключен к странице с заранее подготовленными HTML-разметкой и стилями. Будут скроллящийся блок и стили, определённые для `:hover` и `:active` состояний, которые должны работать согласно описанию выше.

**Примечания**
Решение должно содержать только код на JS (оборачивать в тег <script> не нужно).