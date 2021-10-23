





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
       return `<a href="/blogs/delete/${blogId}"><i class="fas fa-trash"></i></a>
       <a href="/blogs/edit/${blogId}"><i class="fas fa-edit"></i></a>`
     }
     return ``
   }


    fetch('http://localhost:3000/blogs/getAll')
    .then(data => data.json())
    .then(data => {
      const {blogs,user} = data
      if(blogs.length){
        const blogsPage = document.querySelector('#blogsPage')
        const html = blogs.map((blog,index)=> {
          if(index< 20 ){
            return `<div class="col-4">
            <div class="card" >
            <span class="inner_action">
            ${Equal(blog.userId,user._id,blog._id)}
            </span>
         <div class="card-image">
         <img src="uploads/${blog.image}"  alt="...">
         </div>
         <div class="card-body">
           <h5 class="card-title">${blog.title}</h5>
           <p class="card-text">${blog.info}</p>
           <div class="card_action">
           <a href="/blogs/view/${blog._id}">More</a>
           
           </div>
           
           <span class="blogDate">${blog.date}</span>
         </div>
       </div>
          </div>`
          }
          return ''
        }).join('')
  
        const pages = document.querySelector('.pagination');
        const blogNum = Math.ceil(blogs.length / 20)
        let arr =[]
        let y = 0
        for(x=1;x<=blogNum;x++){
          arr.push(`<span class="pages" data-page="${y}" >${x}</span>`)
          y += 20
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
              return current <= index && index< current + 20
            }) 
            const blogsPage = document.querySelector('#blogsPage')
            const html = currentArr.map(blog=> {
              return `<div class="col-4">
            <div class="card" >
         <img src="uploads/${blog.image}" class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">${blog.title}</h5>
           <p class="card-text">${blog.info}</p>
           <a href="/blogs/view/${blog._id}">View</a>
           <a id="blog-delete" href="/blogs/delete/${blog._id}">Delete</a>
           <a id="blog-edit" href="/blogs/edit/${blog._id}">Edit</a>
           <span class="blogDate">${blog.date}</span>
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