const socket=io();
let namee;
var chats=document.querySelector(".chat");
var count=document.querySelector(".countlist")
var list=document.querySelector(".userlist")
var msg_send=document.querySelector(".imgg")
var user_msg=document.querySelector("#msg")

do{
    namee=prompt("enter your name")
}while(!namee)



socket.emit('newuserjoin',namee);

socket.on('userconnect',(socketname)=>{
    userjoinleft(socketname,'joined');
})


socket.on('userdisconnect',(user)=>{
    userjoinleft(user,'left');
})





function userjoinleft(nam,status){
    let diva=document.createElement("div");
    diva.classList.add('userjoin');
    let content=`<p><b>${nam}</b> ${status} the chat</p>`;
    diva.innerHTML=content;
    chats.appendChild(diva);
    scroll();
}


socket.on('user_list',(users)=>{
    list.innerHTML=""
    user_arr=Object.values(users)
    for(i=0;i<user_arr.length;i++){
        let p=document.createElement("p");
        p.innerHTML=user_arr[i]
        list.appendChild(p)
    }
    count.innerHTML=user_arr.length
})

msg_send.addEventListener('click',()=>{
    let data={
        user:namee,
        msg:user_msg.value
    };
    if(user_msg.value!=''){
        appendmessage(data,'outgoing')
        
        socket.emit('message',data)
        user_msg.value=""
    }

});

function appendmessage(data,status){
    let div=document.createElement('div')
    div.classList.add('message',status)
    let content=`
        <h5>${data.user}</h5>
        <p>${data.msg}</p>
    `;
    div.innerHTML=content
    chats.appendChild(div)
    scroll()
}

socket.on("messagee",(data)=>{
    appendmessage(data,"incoming");
    
})

function scroll(){
    chats.scrollTop=chats.scrollHeight;
}