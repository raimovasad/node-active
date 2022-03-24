



 document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
 M.Sidenav.init(elems, {});
});

  window.addEventListener('load', function (e) {
    const toDate = function(date){
      return new Intl.DateTimeFormat('RU-ru',{
        minute:'2-digit',
        hour: '2-digit',
        day:'2-digit',
        month:'short',
      }).format(date.textContent)
    }
   const blogDate = document.querySelectorAll('.blogDate')
   blogDate.forEach(c=>{
     c.textContent = toDate(c.textContent)


     
   })
   const loader = `<div class="loader">
   <div class="loader-inner">
     <div class="loader-line-wrap">
       <div class="loader-line"></div>
     </div>
     <div class="loader-line-wrap">
       <div class="loader-line"></div>
     </div>
     <div class="loader-line-wrap">
       <div class="loader-line"></div>
     </div>
     <div class="loader-line-wrap">
       <div class="loader-line"></div>
     </div>
     <div class="loader-line-wrap">
       <div class="loader-line"></div>
     </div>
   </div>
 </div>`;

   blogsPage.innerHTML= loader

   function Equal(userId,currentUser,blogId){
     if(userId.toString() === currentUser.toString()){
       return ` <a id="blog-delete" href="/blogs/delete/${blogId}">Delete</a>
          <a id="blog-edit" href="/blogs/edit/${blogId}">Edit</a>`
     }
     return ``
   }


    fetch('/blogs/getAll')
    .then(data => data.json())
    .then(data => {
      const {blogs,user} = data
      if(blogs.length){
        const blogsPage = document.querySelector('#blogsPage')
        const html = blogs.map((blog,index)=> {
          if(index< 5 ){
            return `
          <div class="col s12 ">
          <h2 class="header">${blog.title}</h2>
          <div class="card horizontal">
            <div class="card-image">
              <img src="uploads/${blog.image}">
            </div>
            <div class="card-stacked">
        <div class="card-content">
          <p>${blog.info}</p>
        </div>
        <div class="card-action">
          <a href="/blogs/view/${blog._id}">More</a>
           ${Equal(blog.userId,user._id,blog._id)}
          </div>
         </div>
        </div>
       </div>
          `
          }
          return ''
        }).join('')
  
        const pages = document.querySelector('.pagination');
        const blogNum = Math.ceil(blogs.length / 5)
        let arr =[]
        let y = 0
        for(x=1; x<=blogNum; x++){
          arr.push(`<span class="pages" data-page="${y}" >${x}</span>`)
          y += 5
        }
        setTimeout(()=>{
          pages.innerHTML = arr.join('')
  
        blogsPage.innerHTML =html
        const blogDate = document.querySelectorAll('.blogDate')
        blogDate.forEach(c=>{
          c.textContent = toDate(c.textContent)
        })



  
          pages.querySelectorAll('.pages').forEach(page=>{
            page.addEventListener("click",function (e){  
            let current = e.target.dataset.page

            let currentArr = blogs.filter((blog,index)=>{
              return current <= index && index < current + 5
            }) 
            const blogsPage = document.querySelector('#blogsPage')
            const html = currentArr.map(blog=> {
              return `<div class="col s12">
          <h2 class="header">${blog.title}</h2>
          <div class="card horizontal">
            <div class="card-image">
              <img src="uploads/${blog.image}">
            </div>
            <div class="card-stacked">
        <div class="card-content">
          <p>${blog.info}</p>
        </div>
        <div class="card-action">
          <a href="/blogs/view/${blog._id}">More</a>
          <a id="blog-delete" href="/blogs/delete/${blog._id}">Delete</a>
          <a id="blog-edit" href="/blogs/edit/${blog._id}">Edit</a>
          </div>
         </div>
        </div>
       </div>`
            }).join('')
            const loader = `<div class="loader">
            <div class="loader-inner">
              <div class="loader-line-wrap">
                <div class="loader-line"></div>
              </div>
              <div class="loader-line-wrap">
                <div class="loader-line"></div>
              </div>
              <div class="loader-line-wrap">
                <div class="loader-line"></div>
              </div>
              <div class="loader-line-wrap">
                <div class="loader-line"></div>
              </div>
              <div class="loader-line-wrap">
                <div class="loader-line"></div>
              </div>
            </div>
          </div>`;
    
            blogsPage.innerHTML= loader
            setTimeout(()=>{
              blogsPage.innerHTML= html
              const blogDate = document.querySelectorAll('.blogDate')
              blogDate.forEach(c=>{
                c.textContent = toDate(c.textContent)
              })
            },200)
           
    
            })
           })

        },300)
       

        

      }
      

        

    })

    






  

  });