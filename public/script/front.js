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

