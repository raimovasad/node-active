   $(document).ready(function () {
    const $regLink = $('.reg_link')
    const $logLink = $('.log_link')
    const $loginForm =$('#loginbox');
    const $registerForm = $('#registerbox');

    $regLink.click(function(){
        $loginForm.fadeOut(400)
        $registerForm.fadeIn(400)
   }); 

   $logLink.click(function(){
    $registerForm.fadeOut(600)
        $loginForm.fadeIn(600)
   }); 

   





}) 
const arrow = document.querySelectorAll('.nav-links .arrow');
const sidebar = document.querySelector('#sidebar');
const menuBtn = document.querySelector('.home-content .bx.bx-menu');

arrow.forEach(c=>{
    c.addEventListener('click',function(e){
        e.preventDefault()
        let arrowParent = e.target.parentElement.parentElement
        arrowParent.classList.toggle('showMenu')
    })
})

sidebar.addEventListener('mouseout',function(){
    if(!sidebar.classList.contains('close')){
        this.classList.add('close')
    }
})
sidebar.addEventListener('mouseover',function(){
    if(sidebar.classList.contains('close')){
        this.classList.remove('close')
    }
})

menuBtn.addEventListener('click', function (e) {
    sidebar.classList.toggle('close')
});