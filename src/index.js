let album = []
let fetch_album = async function () {
 
    let fs =await fetch("http://jsonplaceholder.typicode.com/users/1/albums")
    let rs = await fs.json().then(data=>{
        let album_holder = document.querySelector('.album-number-holder')
        data.forEach(element => {
            let single_album = document.createElement('a')
            single_album.setAttribute('class', 'btn btn-secondary btn-md fw-bold mt-1')
            single_album.setAttribute('role', 'button')
            single_album.innerText = 'album ' + element.id;
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
    let fs_img = await fetch(`http://jsonplaceholder.typicode.com/photos/${id}`)
    let rs_img = await fs_img.json().then(data=>{
        let img = document.createElement('img')
        img.setAttribute('class','card-img-top')
        img.setAttribute('src',''+data.url)
        post_holder.appendChild(img)
    })
    let fs_p = await fetch(`http://jsonplaceholder.typicode.com/posts/${id}`)
    let rs_p = await fs_p.json().then(data => {
       
        
        
        
        let post_ = document.createElement('card-body')
        
            let single_post_title = document.createElement('div')
            single_post_title.setAttribute('class', 'card-title fw-bold fs-13')
            single_post_title.innerText=data.title
            let single_post = document.createElement('p')
            single_post.setAttribute('class', 'card-text')
            single_post.innerText=data.body
            let comment_btn = document.createElement('a')
            comment_btn.setAttribute('class','btn btn-primary fs-9')
            comment_btn.innerText = 'Comment'
            post_.appendChild(single_post_title)
            post_.appendChild(document.createElement('hr'))
            post_.appendChild(single_post)
            post_.appendChild(comment_btn)
            
            post_holder.appendChild(post_)
            posts_holder.appendChild(post_holder)
        

    })

}

window.onload=function(){
    fetch_album()
    
}