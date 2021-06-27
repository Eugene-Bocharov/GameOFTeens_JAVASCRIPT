<<<<<<< HEAD
const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz {
  constructor(type, questions, results) {
    //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
    this.type = type;

    //Массив с вопросами
    this.questions = questions;

    //Массив с возможными результатами
    this.results = results;

    //Количество набранных очков
    this.score = 0;

    //Номер результата из массива
    this.result = 0;

    //Номер текущего вопроса
    this.current = 0;
  }

  Click(index) {
    //Добавляем очки
    let value = this.questions[this.current].Click(index);
    this.score += value;

    let correct = -1;

    //Если было добавлено хотя одно очко, то считаем, что ответ верный
    if (value >= 1) {
      correct = index;
    } else {
      //Иначе ищем, какой ответ может быть правильным
      for (let i = 0; i < this.questions[this.current].answers.length; i++) {
        if (this.questions[this.current].answers[i].value >= 1) {
          correct = i;
          break;
        }
      }
    }

    this.Next();

    return correct;
  }

  //Переход к следующему вопросу
  Next() {
    this.current++;

    if (this.current >= this.questions.length) {
      this.End();
    }
  }

  //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
  End() {
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].Check(this.score)) {
        this.result = i;
      }
    }
  }
}

//Класс, представляющий вопрос
class Question {
  constructor(text, answers) {
    this.text = text;
    this.answers = answers;
  }

  Click(index) {
    return this.answers[index].value;
  }
}

//Класс, представляющий ответ
class Answer {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }
}

//Класс, представляющий результат
class Result {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }

  //Этот метод проверяет, достаточно ли очков набрал пользователь
  Check(value) {
    if (this.value <= value) {
      return true;
    } else {
      return false;
    }
  }
}

//Массив с результатами
const results = [
  new Result(
    "Схоже цей напрямок тобі не по душі. Обирай іншу категорію і спробуй свої сили в чомусь новому",
    0
  ),

  new Result(
    "Ти майже впорався. Відчуваєш це твоє? Обирай цей курс! Маєш сумніви - спробуй інший напрямок",
    8
  ),
  new Result(
    "Ти попав в яблучко - цей напрямок ідеально підходить для тебе",
    10
  ),
];

//Массив с вопросами
const questions = [
  new Question("Ключове слово this це…", [
    new Answer("Об’єкт, який є поточним контекстом виконання функції", 1),
    new Answer("Об’єкт, в якому була створена функція", 0),
    new Answer("Лексичне оточення , в якому була створена функція", 0),
    new Answer("Лексичне оточення, в якому викликається функція", 0),
  ]),

  new Question("Функція зворотного виклику це…", [
    new Answer("Функція, що викликається в тілі іншої функції", 0),
    new Answer(
      "Функція, яка була передана в іншу функцію як аргумент та викликана в ній",
      1
    ),
    new Answer("Функція, яка повертається при виклику  іншої функції", 0),
    new Answer("Немає правильної відповіді", 0),
  ]),

  new Question("Що call метод приймає в якості аргументів?", [
    new Answer("Об’єкт", 0),
    new Answer("Об’єкт і масив аргументів для функції", 0),
    new Answer("Список аргументів для функції", 0),
    new Answer("Об’єкт і список аргументів для функції", 1),
  ]),

  new Question("Які аргументи приймає метод apply()?", [
    new Answer("Об’єкт і список аргументів для функції", 0),
    new Answer("Список аргументів для функції", 0),
    new Answer("Об’єкт і масив аргументів для функції", 1),
    new Answer("Об’єкт", 0),
  ]),

  new Question("Що таке стек викликів в JavaScript?", [
    new Answer("Конструкція яка викликає функції", 0),
    new Answer(
      "Конструкція яка зберігає записи і управляє послідовністю викликів функції",
      1
    ),
    new Answer(
      "Конструкція яка зберігає список параметрів функції під час її виклику",
      0
    ),
    new Answer("Немає правильної відповіді", 0),
  ]),
  new Question("В якому форматі записується властивість об’єкта?", [
    new Answer("Ключ: значення", 1),
    new Answer("Властивість = Ключ: значення", 0),
    new Answer("Значення:  ключ", 0),
    new Answer("Немає правильної відповіді", 0),
  ]),
  new Question("Ключі властивостей це завжди …", [
    new Answer("Число", 0),
    new Answer("Рядок", 1),
    new Answer("Буль", 0),
    new Answer("Довільний тип", 0),
  ]),
  new Question("Який ключ об’єкта записаний з помилкою?", [
    new Answer("‘#125_part_||’", 0),
    new Answer("7js", 1),
    new Answer("_id", 0),
    new Answer("$$_$$", 0),
  ]),
  new Question("Для перебору властивостей об’єкта використовується…", [
    new Answer("For…each", 0),
    new Answer("For…in", 1),
    new Answer("For…of", 0),
    new Answer("For…out", 0),
  ]),

  new Question("Як отримати список всіх ключів об’єкта obj?", [
    new Answer("Object.keys(obj)", 1),
    new Answer("Object.keys", 0),
    new Answer("Obj.keys", 0),
    new Answer("Obj.keys()", 0),
  ]),
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update() {
  //Проверяем, есть ли ещё вопросы
  if (quiz.current < quiz.questions.length) {
    //Если есть, меняем вопрос в заголовке
    headElem.innerHTML = quiz.questions[quiz.current].text;

    //Удаляем старые варианты ответов
    buttonsElem.innerHTML = "";

    //Создаём кнопки для новых вариантов ответов
    for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
      let btn = document.createElement("button");
      btn.className = "button";

      btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

      btn.setAttribute("index", i);

      buttonsElem.appendChild(btn);
    }

    //Выводим номер текущего вопроса
    pagesElem.innerHTML = quiz.current + 1 + " / " + quiz.questions.length;

    //Вызываем функцию, которая прикрепит события к новым кнопкам
    Init();
  } else {
    //Если это конец, то выводим результат
    buttonsElem.innerHTML = "";
    headElem.innerHTML = quiz.results[quiz.result].text;
    pagesElem.innerHTML = "Очки: " + quiz.score;
  }
}

function Init() {
  //Находим все кнопки
  let btns = document.getElementsByClassName("button");

  for (let i = 0; i < btns.length; i++) {
    //Прикрепляем событие для каждой отдельной кнопки
    //При нажатии на кнопку будет вызываться функция Click()
    btns[i].addEventListener("click", function (e) {
      Click(e.target.getAttribute("index"));
    });
  }
}

function Click(index) {
  //Получаем номер правильного ответа
  let correct = quiz.Click(index);

  //Находим все кнопки
  let btns = document.getElementsByClassName("button");

  //Делаем кнопки серыми
  for (let i = 0; i < btns.length; i++) {
    btns[i].className = "button button_passive";
  }

  //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
  if (quiz.type == 1) {
    if (correct >= 0) {
      btns[correct].className = "button button_correct";
    }

    if (index != correct) {
      btns[index].className = "button button_wrong";
    }
  } else {
    //Иначе просто подсвечиваем зелёным ответ пользователя
    btns[index].className = "button button_correct";
  }

  //Ждём секунду и обновляем тест
  setTimeout(Update, 1000);
}
=======
const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz {
  constructor(type, questions, results) {
    //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
    this.type = type;

    //Массив с вопросами
    this.questions = questions;

    //Массив с возможными результатами
    this.results = results;

    //Количество набранных очков
    this.score = 0;

    //Номер результата из массива
    this.result = 0;

    //Номер текущего вопроса
    this.current = 0;
  }

  Click(index) {
    //Добавляем очки
    let value = this.questions[this.current].Click(index);
    this.score += value;

    let correct = -1;

    //Если было добавлено хотя одно очко, то считаем, что ответ верный
    if (value >= 1) {
      correct = index;
    } else {
      //Иначе ищем, какой ответ может быть правильным
      for (let i = 0; i < this.questions[this.current].answers.length; i++) {
        if (this.questions[this.current].answers[i].value >= 1) {
          correct = i;
          break;
        }
      }
    }

    this.Next();

    return correct;
  }

  //Переход к следующему вопросу
  Next() {
    this.current++;

    if (this.current >= this.questions.length) {
      this.End();
    }
  }

  //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
  End() {
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].Check(this.score)) {
        this.result = i;
      }
    }
  }
}

//Класс, представляющий вопрос
class Question {
  constructor(text, answers) {
    this.text = text;
    this.answers = answers;
  }

  Click(index) {
    return this.answers[index].value;
  }
}

//Класс, представляющий ответ
class Answer {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }
}

//Класс, представляющий результат
class Result {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }

  //Этот метод проверяет, достаточно ли очков набрал пользователь
  Check(value) {
    if (this.value <= value) {
      return true;
    } else {
      return false;
    }
  }
}

//Массив с результатами
const results = [
  new Result(
    "Схоже цей напрямок тобі не по душі. Обирай іншу категорію і спробуй свої сили в чомусь новому",
    0
  ),

  new Result(
    "Ти майже впорався. Відчуваєш це твоє? Обирай цей курс! Маєш сумніви - спробуй інший напрямок",
    8
  ),
  new Result(
    "Ти попав в яблучко - цей напрямок ідеально підходить для тебе",
    10
  ),
];

//Массив с вопросами
const questions = [
  new Question("Ключове слово this це…", [
    new Answer("Об’єкт, який є поточним контекстом виконання функції", 1),
    new Answer("Об’єкт, в якому була створена функція", 0),
    new Answer("Лексичне оточення , в якому була створена функція", 0),
    new Answer("Лексичне оточення, в якому викликається функція", 0),
  ]),

  new Question("Функція зворотного виклику це…", [
    new Answer("Функція, що викликається в тілі іншої функції", 0),
    new Answer(
      "Функція, яка була передана в іншу функцію як аргумент та викликана в ній",
      1
    ),
    new Answer("Функція, яка повертається при виклику  іншої функції", 0),
    new Answer("Немає правильної відповіді", 0),
  ]),

  new Question("Що call метод приймає в якості аргументів?", [
    new Answer("Об’єкт", 0),
    new Answer("Об’єкт і масив аргументів для функції", 0),
    new Answer("Список аргументів для функції", 0),
    new Answer("Об’єкт і список аргументів для функції", 1),
  ]),

  new Question("Які аргументи приймає метод apply()?", [
    new Answer("Об’єкт і список аргументів для функції", 0),
    new Answer("Список аргументів для функції", 0),
    new Answer("Об’єкт і масив аргументів для функції", 1),
    new Answer("Об’єкт", 0),
  ]),

  new Question("Що таке стек викликів в JavaScript?", [
    new Answer("Конструкція яка викликає функції", 0),
    new Answer(
      "Конструкція яка зберігає записи і управляє послідовністю викликів функції",
      1
    ),
    new Answer(
      "Конструкція яка зберігає список параметрів функції під час її виклику",
      0
    ),
    new Answer("Немає правильної відповіді", 0),
  ]),
  new Question("В якому форматі записується властивість об’єкта?", [
    new Answer("Ключ: значення", 1),
    new Answer("Властивість = Ключ: значення", 0),
    new Answer("Значення:  ключ", 0),
    new Answer("Немає правильної відповіді", 0),
  ]),
  new Question("Ключі властивостей це завжди …", [
    new Answer("Число", 0),
    new Answer("Рядок", 1),
    new Answer("Буль", 0),
    new Answer("Довільний тип", 0),
  ]),
  new Question("Який ключ об’єкта записаний з помилкою?", [
    new Answer("‘#125_part_||’", 0),
    new Answer("7js", 1),
    new Answer("_id", 0),
    new Answer("$$_$$", 0),
  ]),
  new Question("Для перебору властивостей об’єкта використовується…", [
    new Answer("For…each", 0),
    new Answer("For…in", 1),
    new Answer("For…of", 0),
    new Answer("For…out", 0),
  ]),

  new Question("Як отримати список всіх ключів об’єкта obj?", [
    new Answer("Object.keys(obj)", 1),
    new Answer("Object.keys", 0),
    new Answer("Obj.keys", 0),
    new Answer("Obj.keys()", 0),
  ]),
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update() {
  //Проверяем, есть ли ещё вопросы
  if (quiz.current < quiz.questions.length) {
    //Если есть, меняем вопрос в заголовке
    headElem.innerHTML = quiz.questions[quiz.current].text;

    //Удаляем старые варианты ответов
    buttonsElem.innerHTML = "";

    //Создаём кнопки для новых вариантов ответов
    for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
      let btn = document.createElement("button");
      btn.className = "button";

      btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

      btn.setAttribute("index", i);

      buttonsElem.appendChild(btn);
    }

    //Выводим номер текущего вопроса
    pagesElem.innerHTML = quiz.current + 1 + " / " + quiz.questions.length;

    //Вызываем функцию, которая прикрепит события к новым кнопкам
    Init();
  } else {
    //Если это конец, то выводим результат
    buttonsElem.innerHTML = "";
    headElem.innerHTML = quiz.results[quiz.result].text;
    pagesElem.innerHTML = "Очки: " + quiz.score;
  }
}

function Init() {
  //Находим все кнопки
  let btns = document.getElementsByClassName("button");

  for (let i = 0; i < btns.length; i++) {
    //Прикрепляем событие для каждой отдельной кнопки
    //При нажатии на кнопку будет вызываться функция Click()
    btns[i].addEventListener("click", function (e) {
      Click(e.target.getAttribute("index"));
    });
  }
}

function Click(index) {
  //Получаем номер правильного ответа
  let correct = quiz.Click(index);

  //Находим все кнопки
  let btns = document.getElementsByClassName("button");

  //Делаем кнопки серыми
  for (let i = 0; i < btns.length; i++) {
    btns[i].className = "button button_passive";
  }

  //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
  if (quiz.type == 1) {
    if (correct >= 0) {
      btns[correct].className = "button button_correct";
    }

    if (index != correct) {
      btns[index].className = "button button_wrong";
    }
  } else {
    //Иначе просто подсвечиваем зелёным ответ пользователя
    btns[index].className = "button button_correct";
  }

  //Ждём секунду и обновляем тест
  setTimeout(Update, 1000);
}
>>>>>>> ce4c4898b6a2d6e26634a90eb095d5466d7b69a2
