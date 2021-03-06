const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;
		this.questions = questions;
		this.results = results;
		this.score = 0;
		this.result = 0;
		this.current = 0;
	}

	Click(index)
	{

		let value = this.questions[this.current].Click(index);
		this.score += value;
		let correct = -1;
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}
		this.Next();

		return correct;
	}
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}
const results = 
[
	new Result("Схоже цей напрямок тобі не по душі. Обирай іншу категорію і спробуй свої сили в чомусь новому", 0),

	new Result("Ти майже впорався. Відчуваєш це твоє? Обирай цей курс! Маєш сумніви - спробуй інший напрямок", 8,),
	new Result("Ти попав в яблучко - цей напрямок ідеально підходить для тебе", 10),
];
const questions = 
[
	new Question("Розшифруйте абревіатуру HTML", 
	[
		new Answer("HyperText Markup Language", 1),
		new Answer("HeadText Modulation Language", 0),
		new Answer("HeadingText Mode Language", 0),
		new Answer("Hello, Text Mode Language", 0)
	]),
	new Question("За що відповідає тег h1", 
	[
		new Answer("За додавання картинки на сайт", 0),
		new Answer("За створення найголовнішого заголовка сайту", 1),
		new Answer("За створення упорядкованого списку з елементами", 0),
		new Answer("Створює посилання на щось", 0)
	]),
	new Question("За що відповідає атрибут alt тега img", 
	[
		new Answer("Додає картинку на сайт", 0),
		new Answer("Дає можливість прописати СSS стилі для тега img у HTML файлі", 0),
		new Answer("Створює посилання на картинку", 0),
		new Answer("За підпис, що пояснює значення картинки img", 1),
	]),
	new Question("Де треба розміщувати тег title", 
	[
		new Answer("У тезі head", 1),
		new Answer("У тезі body", 0),
		new Answer("У тезі footer", 0),
		new Answer("У тезі main", 0)
	]),
	new Question("Яку роль виконує !DOCTYPE", 
	[
		new Answer("Він призначений для вказівки типу поточного документа HTML або XHTML", 1),
		new Answer("Це відкриваючий тег, який використовується для оголошення заголовків", 0),
		new Answer("Це елемент, який говорить браузеру про те, що ця сторінка головніша, ніж інші;", 0),
		new Answer("Цей тег налаштовує Visual Studio Code редактор для роботи з JS файлом у HTML файлі", 0)
	]),
	new Question("Чи існує у тега input закриваючий тег в синтаксисі HTML", 
	[
		new Answer("Так", 0),
		new Answer("Ні", 1),
		new Answer("Такого тега в стандарті HTML не існує", 0),
		new Answer("Немає правильної відповіді", 0)
	]),
	new Question("Де потрібно ставити крапку коли хочеш написати стилі до якогось класу?", 
	[
		new Answer("Перед назвою класа", 1),
		new Answer("Після назви класу", 0),
		new Answer("ЇЇ не потрібно ставити", 0),
		new Answer("Немає правильної відповіді", 0)
	]),
	new Question("Що змінює правила розрахунку розмірів content-area", 
	[
		new Answer("display: inline-block", 1),
		new Answer("box-sizing: content-box|border-box", 0),
		new Answer("display: block", 0),
		new Answer("display: inline", 0)
	]),
	new Question("Скільки осей є у flex контейнерів", 
	[
		new Answer("1", 1),
		new Answer("2", 0),
		new Answer("3", 0),
		new Answer("У flex немає осей", 0)
	]),
	new Question("Яке значення властивості transform відповідає за поворот елемента", 
	[
		new Answer("Scale", 0),
		new Answer("Skew", 0),
		new Answer("Rotate", 1),
		new Answer("translate", 0)
	])
];
const quiz = new Quiz(1, questions, results);
Update();
function Update()
{
	if(quiz.current < quiz.questions.length) 
	{
		headElem.innerHTML = quiz.questions[quiz.current].text;
		buttonsElem.innerHTML = "";
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";
			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;
			btn.setAttribute("index", i);
			buttonsElem.appendChild(btn);
		}
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;
		Init();
	}
	else
	{
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}
function Init()
{
	let btns = document.getElementsByClassName("button");
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}
function Click(index) 
{
	let correct = quiz.Click(index);
	let btns = document.getElementsByClassName("button");
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}
	setTimeout(Update, 1000);
}