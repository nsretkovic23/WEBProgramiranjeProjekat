import { Blockchain } from "./blockchain.js";
import { User } from "./user.js";
import { Block } from "./block.js";

export default function blockchainCreatorForm(host){
    const mainDiv = document.createElement("div");
    document.body.appendChild(mainDiv);
    mainDiv.classList.add("blockchainFormMainDiv");

    const nameDiv = document.createElement("div"); //razlicite labele i inpute pakujem u div da bi se lepo wrap-ovale kod flex wrap-a
    mainDiv.appendChild(nameDiv);

    const nameLbl = document.createElement("label");
    nameDiv.appendChild(nameLbl);
    nameLbl.innerHTML = "Blockchain name:";

    const nameInput = document.createElement("input");
    nameDiv.appendChild(nameInput);

    const userCountDiv = document.createElement("div");
    mainDiv.appendChild(userCountDiv);

    const userCountLbl = document.createElement("label");
    userCountDiv.appendChild(userCountLbl);
    userCountLbl.innerHTML = "Max User number:";

    const userCountInput = document.createElement("input");
    userCountInput.type = "number";
    userCountDiv.appendChild(userCountInput);

    const rewardPerBlockDiv = document.createElement("div");
    mainDiv.appendChild(rewardPerBlockDiv);

    const rewardPerBlockLbl = document.createElement("label");
    rewardPerBlockDiv.appendChild(rewardPerBlockLbl);
    rewardPerBlockLbl.innerHTML = "Reward per block:";

    const rewardPerBlockInput = document.createElement("input");
    rewardPerBlockInput.type = "number";
    rewardPerBlockDiv.appendChild(rewardPerBlockInput);


    const imageUrlDiv = document.createElement("div");
    mainDiv.appendChild(imageUrlDiv);

    const imageUrlLbl = document.createElement("label");
    imageUrlDiv.appendChild(imageUrlLbl);
    imageUrlLbl.innerHTML = "Image url:";

    const imageUrlInput = document.createElement("input");
    imageUrlDiv.appendChild(imageUrlInput);

   

    const createButton = document.createElement("button");
    mainDiv.appendChild(createButton);
    createButton.innerHTML = "Create";

    createButton.addEventListener("click",() =>{
        //console.log(`ime:${nameInput.value} count:${userCountInput.value} reward:${rewardPerBlockInput.value} image:${imageUrlInput.value}`)
        if(nameInput.value.length > 3 && parseInt(userCountInput.value) >= 1 && parseInt(rewardPerBlockInput.value) > 0){
            //const blockchainInstance = new Blockchain(1, nameInput.value, parseInt(userCountInput.value), parseInt(rewardPerBlockInput.value), imageUrlInput.value );
            postBlockchain(nameInput.value, userCountInput.value, rewardPerBlockInput.value, imageUrlInput.value);
            nameInput.value='';
            userCountInput.value = '';
            rewardPerBlockInput.value='';
            imageUrlInput.value='';
        }else{
            alert("Wrong inputs!");
        }
    })

    const loadButton = document.createElement("button");
    mainDiv.appendChild(loadButton);
    loadButton.innerHTML = "Load";

    loadButton.addEventListener("click", fetchingBlockchain)

}

function postBlockchain(bcname, maxuser, reward, imgurl){
    fetch("https://localhost:5001/AddBlockchain", {
        method: 'POST', 
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify({
            name:bcname,
            maxUserNumber:maxuser,
            rewardValue:reward,
            imgUrl:imgurl
        }) 
      }).then(res => {
          if(res.ok)
            fetchingBlockchain();
      })
      .catch(err => alert("greska kod post metode"))
}

export function fetchingBlockchain(){
    clearCanvas();
    
    blockchainCreatorForm(document.body); 

    fetch("https://localhost:5001/GetAllBlockchains")
        .then(p=>p.json())
        .then(data => {
            data?.forEach(bc => {
                const blockchain = new Blockchain(bc.id, bc.name, bc.maxUserNumber, bc.rewardValue, bc.imgurl);
                blockchain.currentUserNumber=bc.users.length;
                blockchain.drawBlockchain(document.body);

                bc.users.forEach(el =>{
                    let user = new User(el.id, el.username, el.tokenBalance, el.moneyBalance, el.rigCost, el.miningProgram);
                    //user.completedBlocks = el.blocks.length;
                    if(el.blocks)
                        user.completedBlocks = el.blocks;
                    blockchain.users.push(user);
                })
                
                blockchain.drawAllUsers(blockchain.userdraw)}); //userListDiv
        })
}

function clearCanvas(){
    let divClear = document.body;
    while(divClear.firstChild) 
        divClear.removeChild(divClear.firstChild);
    
}

