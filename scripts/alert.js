const  btn =  document.querySelector('.arrow-back');
const alert_box = document.querySelector('.alert-box');


btn.addEventListener('click', (event)=>{
    console.log(1312);
    alert_box.classList.toggle('alert_box_active');
})

