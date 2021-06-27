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
  new Question("Що спільного у всіх елементів масиву?", [
    new Answer("їх назви", 0),
    new Answer("Їх адреса в пам'яті", 0),
    new Answer("Їх тип даних", 1),
    new Answer("їх розмір", 0),
  ]),

  new Question("Що таке клас в Java?", [
    new Answer(
      "Рівень складності програми. Всі оператори діляться на класи в залежності від складності їх використання",
      0
    ),
    new Answer(
      "Базовий елемент об'єктно-орієнтованого програмування в мові Java",
      1
    ),
    new Answer("Просто одне з можливих назв змінної", 0),
    new Answer("Таке поняття є тільки в C ++, в Java такого поняття немає", 0),
  ]),

  new Question("Як оголосити клас в коді?", [
    new Answer("class MyClass {}", 1),
    new Answer("new class MyClass {}", 0),
    new Answer("select * from class MyClass {}", 0),
    new Answer("MyClass extends class {}", 0),
  ]),

  new Question("Для чого використовується оператор NEW?", [
    new Answer("Для створення нової змінної", 0),
    new Answer("Для оголошення нового класу", 0),
    new Answer("Для створення екземпляра класу", 1),
    new Answer("Немає правильної відповіді", 0),
  ]),

  new Question("Що означає ключове слово extends ?", [
    new Answer("Що даний клас успадковується від іншого.", 1),
    new Answer("Що два класу роблять одне і те ж.", 0),
    new Answer(
      "Що це додатковий модуль класу, який розширює його властивості.",
      0
    ),
    new Answer("Що це найбільший клас в програмі", 0),
  ]),
  new Question("Що означає перевантаження методу в Java (overload).", [
    new Answer("Зміна поведінки методу класу щодо батьківського", 0),
    new Answer("Зміна поведінки методу класу щодо дочірнього.", 0),
    new Answer(
      "Кілька методів з однаковою назвою, але різним набором параметрів",
      1
    ),
    new Answer("Кілька різних класів з однаковим методом", 0),
  ]),
  new Question("Що означає перевизначення методу в Java (override).", [
    new Answer("Зміна поведінки методу класу щодо батьківського", 1),
    new Answer("Зміна поведінки методу класу щодо дочірнього", 0),
    new Answer(
      "Кілька методів з однаковою назвою, але різним набором параметрів.",
      0
    ),
    new Answer("Кілька різних класів з однаковим методом", 0),
  ]),
  new Question(
    "Чим відрізняються static-метод класу від звичайного методу класу.",
    [
      new Answer(
        "Поведінка звичайного методу класу можна змінити в класі-спадкоємця, а поведінка static-методу можна.",
        0
      ),
      new Answer(
        "Звичайний метод класу можна перевизначити, а static-метод не можна.",
        0
      ),
      new Answer(
        "Звичайний метод класу працює від об'єкта класу, а static-метод від всього класу.",
        1
      ),
      new Answer(
        "a.	Static-метод класу можна викликати тільки всередині класу, а звичайний - в будь-якій частині коду.",
        0
      ),
    ]
  ),
  new Question("Як викликати static-метод всередині звичайного?", [
    new Answer(
      "Ніяк, static-метод можна викликати тільки від об'єкта класу",
      0
    ),
    new Answer("Можна, треба перед цим перевантажити звичайний метод класу", 0),
    new Answer("Можна, треба перед цим перевизначити звичайний метод класу", 0),
    new Answer("Можна, нічого додатково робити не треба", 1),
  ]),

  new Question("Як викликати звичайний метод класу всередині static-методу?", [
    new Answer("Ніяк, static-метод не працює з об'єктом класу", 1),
    new Answer("Можна, треба перед цим перевантажити звичайний метод класу", 0),
    new Answer("Можна, нічого додатково робити не треба", 0),
    new Answer("Можна, треба перед цим перевизначити звичайний метод класу", 0),
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
