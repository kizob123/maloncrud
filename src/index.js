let album = []
$(function () {
    $(".login").on('click',function(e){
    
    $('.log-modal').modal('show')
    })
    $(".register").on('click', function (e) {
        
        $('.reg-modal').modal('show')
    })
   
    $('.modal-close').on('click', function (e) {
        $('.modal').modal('hide')
    })
    $('.close').on('click', function (e) {
        $('.modal').modal('hide')
    })
    
    $('#comment-form').on('submit', async function (e) {
        e.preventDefault()
        console.log(e.currentTarget)
        const formData = new FormData(e.currentTarget)
        console.log(formData);
        const objFormData = Object.fromEntries(formData.entries())
        console.log(objFormData);

        const jsonFormData = JSON.stringify(objFormData)
        const res = await fetch(`https://jsonplaceholder.typicode.com/comments`, {
            method: 'POST',
            body: jsonFormData,
            mode: "cors",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        if (!res.ok) {
            const err = await res.text()
            throw new Error(err)
        }
        res.json().then(
            data => {
                console.log(data);
                
                $('.cm-modal').modal('hide')
                $('.info-modal').modal('show').find('.info-success').text('comment entered')
            }
        )
    })
    
     $('#login-form').on('submit', async function (e) {
         e.preventDefault()
         console.log(e.currentTarget)
         const formData = new FormData(e.currentTarget)
         const objFormData = Object.fromEntries(formData.entries())
         
         const jsonFormData = JSON.stringify(objFormData)
         const res = await fetch(`https://jsonplaceholder.typicode.com/users?email=${objFormData['email ']}&username=${objFormData['username ']}`, {
             method: 'GET',
             headers: {
                 'Content-type': 'application/json; charset=UTF-8',
             },
         })

         if (!res.ok) {
             const err = await res.text()
             throw new Error(err)
         }
        res.json().then(
            data => {
                console.log(data);
                let n = Math.ceil(Math.random() * 14)
                $('.pr_p').attr('src', `./img/Imgs/img${n}.png`)
                $('.login,.register').css('display','none')
                $('.sign-o').css('display', 'block')
                $('.pr_name').css('display', 'block').text(data[0].name)
                $('.log-modal').modal('hide')
            }
        )
     })
    $('#user-form').on('submit', async function (e) {
        e.preventDefault()
        console.log(e.currentTarget)
        const formData = new FormData(e.currentTarget)
        const objFormData = Object.fromEntries(formData.entries())
        const jsonFormData = JSON.stringify(objFormData)
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: jsonFormData,
            mode:"cors",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                
            },
        })

        if (!res.ok) {
            const err = await res.text()
            throw new Error(err)
        }
         res.json().then(
             data=>{
                 let n=Math.ceil(Math.random()*14)
                 $('.pr_p').attr('src',`./img/Imgs/img${n}.png`)
                 $('.login,.register').css('display', 'none')
                 $('.sign-o').css('display', 'block')
                 $('.pr_name').css('display', 'block')
                 $('.reg-modal').modal('hide')
             }
         )
    })
    

})



let fetch_album = async function (id) {
    let fs=null
    if(id!=='')
    fs =await fetch(`http://jsonplaceholder.typicode.com/users/1/albums?id=${id}`)
    else
    fs = await fetch(`http://jsonplaceholder.typicode.com/users/1/albums`)
    let rs = await fs.json().then(data=>{
        let album_holder = document.querySelector('.album-number-holder')
        data.forEach(element => {
            let single_album = document.createElement('a')
            console.log(window.innerWidth);
            single_album.setAttribute('class', 'album-n btn btn-secondary btn-md fw-bold mt-1')
            single_album.setAttribute('role', 'button')
            single_album.setAttribute('href', '#')
            single_album.setAttribute('value', element.id)
            single_album.addEventListener('click',function(e){
                let n = $(this).attr('value')
                document.querySelector('.folder-photo-album').innerHTML = ""
                fetch_album(n)
            })
            if (window.innerWidth>800)
            single_album.innerText = 'album ' + element.id;
            else{
            document.querySelector('.album-top').setAttribute('style','display:block')
            single_album.innerText = element.id;
        }
            album_holder.appendChild(single_album)
            fetch_posts(element.id)
        });
        
     })
 
}
let fetch_comments= async function () {

    let fs = await fetch("http://jsonplaceholder.typicode.com/users/1/post")
    let rs = await fs.json().then(data => {
        let album_holder = document.querySelector('.folder-photo-album')
        data.forEach(element => {
            let single_album = document.createElement('div')
            single_album.setAttribute('class', 'btn btn-secondary btn-md fw-bold mt-1')
            single_album.setAttribute('role', 'button')
            single_album.innerText = 'album ' + element.id;
            album_holder.appendChild(single_album)
        });

    })

}
let fetch_photos = async function (id) {

    let fs = await fetch(`http://jsonplaceholder.typicode.com/photos/${id}`)
    let rs = await fs.json().then(data => {
        let album_holder = document.querySelector('.folder-photo-album')
        data.forEach(element => {
            let single_album = document.createElement('div')
            single_album.setAttribute('class', 'btn btn-secondary btn-md fw-bold mt-1')
            single_album.setAttribute('role', 'button')
            single_album.innerText = 'album ' + element.id;
            album_holder.appendChild(single_album)
        });

    })

}

let fetch_posts = async function (id) {
    let posts_holder = document.querySelector('.folder-photo-album')
    let post_holder = document.createElement('div')
    post_holder.setAttribute('class', 'card')
    let img = document.createElement('img')
    let fs_img = await fetch(`http://jsonplaceholder.typicode.com/photos/${id}`)
    let rs_img = await fs_img.json().then(data=>{
        
        img.setAttribute('class','card-img-top')
        let n = Math.ceil(Math.random() * 14)+1
        img.setAttribute('src', `./img/Imgs/img${n}.png`)
        post_holder.appendChild(img)
    })
    let fs_p = await fetch(`http://jsonplaceholder.typicode.com/posts/${id}`)
    let rs_p = await fs_p.json().then(data => {
       
        
        
        
        let post_ = document.createElement('div')
        post_.setAttribute('class','card-body')
        
            let single_post_title = document.createElement('div')
            single_post_title.setAttribute('class', 'card-title fw-bold fs-13')
            single_post_title.innerText=data.title
            let single_post = document.createElement('p')
            single_post.setAttribute('class', 'card-text post-box')
            single_post.innerText=data.body
            let comment_btn = document.createElement('a')
            comment_btn.setAttribute('class','btn btn-primary fs-9 cmm')
            
            comment_btn.setAttribute('href', '#')
            comment_btn.innerText = 'Comment'
            comment_btn.addEventListener('click',function(e){
                $('.cm-modal').modal('show').find('.card-title').text(data.title)
                console.log(img.getAttribute('src'));
                $('.cm-modal').find('.card-img-top').attr("src",img.getAttribute('src'))
                $('.cm-modal').find('.card-text').text(data.body)
                
                $('.cm-modal').find('.id').val(data.id)
                console.log(data.id);
            })
            post_.appendChild(single_post_title)
            post_.appendChild(document.createElement('hr'))
            post_.appendChild(single_post)
            post_.appendChild(comment_btn)
            
            post_holder.appendChild(post_)
            posts_holder.appendChild(post_holder)
        

    })

}

window.onload=function(){
    fetch_album('')
    
}