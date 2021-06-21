import blockchainCreatorForm from './blockchainCreatorForm.js';
import {User} from './user.js';
import fetchingBlockchain from './blockchainCreatorForm.js';

export class Blockchain
{
    constructor(id, name, maxUserCount, reward, imgUrl){
        this.id = id;
        this.name = name;
        this.maxUserCount = maxUserCount;
        this.currentUserNumber=0;
        this.reward = reward;
        this.imgUrl = imgUrl;
        this.containter = null;
        this.users = [];
        this.userdraw = null;
    }

    drawAddUserForm(host, hostUserDraw, countLbl){
        this.userdraw = hostUserDraw;
        const addUserFormDiv = document.createElement("div");
        host.appendChild(addUserFormDiv);
        addUserFormDiv.classList.add("addUserFormDiv");

        const usernameLbl = document.createElement("label");
        usernameLbl.innerHTML="Username:"
        addUserFormDiv.appendChild(usernameLbl);

        const usernameInput = document.createElement("input");
        addUserFormDiv.appendChild(usernameInput);

        const startTokenBalanceLbl = document.createElement("label");
        startTokenBalanceLbl.innerHTML = "Starting token Balance:";
        addUserFormDiv.appendChild(startTokenBalanceLbl);

        const startTokenBalanceInput = document.createElement("input");
        startTokenBalanceInput.type = "number";
        addUserFormDiv.appendChild(startTokenBalanceInput);

        const moneyBalanceLbl = document.createElement("label");
        moneyBalanceLbl.innerHTML = "Money Balance($):";
        addUserFormDiv.appendChild(moneyBalanceLbl);

        const moneyBalanceInput = document.createElement("input");
        moneyBalanceInput.type = "number";
        addUserFormDiv.appendChild(moneyBalanceInput);

        const rigCostLbl = document.createElement("label");
        rigCostLbl.innerHTML = "Rig cost(more than 100$):";
        addUserFormDiv.appendChild(rigCostLbl);

        const rigCostInput = document.createElement("input");
        rigCostInput.type = "number";
        addUserFormDiv.appendChild(rigCostInput);

        const miningProgramLbl = document.createElement("label");
        miningProgramLbl.innerHTML = "Mining program:";
        addUserFormDiv.appendChild(miningProgramLbl);

        const miningProgramDropDown = document.createElement("select");
        addUserFormDiv.appendChild(miningProgramDropDown);
        let programs = ["Cudo Miner", "Hashing24", "Kryptex"];
        programs.forEach(el => {
            let opt = document.createElement("option");
            opt.innerHTML = el;
            miningProgramDropDown.appendChild(opt);
        })

        const addUserBtn = document.createElement("button");
        addUserBtn.innerHTML = "Add User!";
        addUserFormDiv.appendChild(addUserBtn);

        addUserBtn.addEventListener("click", ()=>{
            this.postUser(addUserBtn, usernameInput, startTokenBalanceInput, moneyBalanceInput, rigCostInput,miningProgramDropDown, hostUserDraw, countLbl);
        })
    }

    postUser(addUserBtn, usernameInput, startBalanceInput, moneyBalanceInput, rigCostInput,  miningProgramDropDown,hostUserDraw, countLbl){
        if(usernameInput.value.length > 3 && parseInt(startBalanceInput.value) >=0 && parseInt(rigCostInput.value) >= 100 && parseInt(moneyBalanceInput.value) >0 && this.users.length < this.maxUserCount ){
            let userInstance = new User(0, usernameInput.value, startBalanceInput.value, moneyBalanceInput.value, rigCostInput.value, miningProgramDropDown.value);
            this.users.push(userInstance);
            this.drawAllUsers(hostUserDraw);
            fetch(`https://localhost:5001/AddUser/${this.id}`,{
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
                    username:usernameInput.value,
                    tokenBalance:startBalanceInput.value,
                    moneyBalance:moneyBalanceInput.value,
                    rigCost:rigCostInput.value,
                    miningProgram:miningProgramDropDown.value
                    }) 
            }).then(res=>{
                if(res.ok)
                {
                   
                }
            })
        }else{
            alert("Wrong inputs or maximum number in the network reached!");
        }
    }

    drawGenerateBlockForm(host){
        const generateBlockDiv = document.createElement("div");
        host.appendChild(generateBlockDiv);
        generateBlockDiv.classList.add("generateBlockDiv");

        const whoCompletedIdLbl = document.createElement("label");
        whoCompletedIdLbl.innerHTML = "User  who completed the block:";
        generateBlockDiv.appendChild(whoCompletedIdLbl);

        const whoCompletedInput = document.createElement("input");
        generateBlockDiv.appendChild(whoCompletedInput);

        const generateBlockBtn = document.createElement("button");
        generateBlockBtn.innerHTML = "Generate Block!";
        generateBlockDiv.appendChild(generateBlockBtn);

        generateBlockBtn.addEventListener("click", ()=>{this.generateBlock(whoCompletedInput.value);})
    }

    generateBlock(userWhoCompleted){
        const user = this.users.filter(el => el.username === userWhoCompleted);
        if(!user[0])
            {
                alert("Korisnik ne postoji!");
                return;
            }
        fetch(`https://localhost:5001/AddBlock/${this.id}/${user[0].id}`, {
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
                reward:this.reward
        }) 
        })
        .then(res => {
            if(res.ok)
            {
               this.updateUser(user[0]);
            }
              
        })
        .catch(()=> alert("Korisnik ne postoji!"))
        

    }

    updateUser(user){
        fetch(`https://localhost:5001/UpdateUser`,{ //updating user
                    method: 'PUT', 
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({
                        id:user.id,
                        username:user.username,
                        tokenBalance:user.tokenBalance+this.reward,
                        moneyBalance:user.moneyBalance+(this.reward*100),
                        rigCost:user.rigCost,
                        miningProgram:user.miningProgram,
                        BlockchainID:this.id
                    })
                })
                .then(res =>{
                   
                })
    }


    drawAllUsers(host){
        let divClear = host;
        while(divClear.firstChild){ 
            divClear.removeChild(divClear.firstChild) //cistim div od prethodnih crtanja, da ne bi crtalo user-e eksponencijalno
        }
        console.log(this.users);
        this.users.forEach((el) => {
           el.drawUser(host, this.users);
        })

    }

    drawBlockchain(host){
        const blockchainDiv = document.createElement("div");
        blockchainDiv.classList.add("blockchainDiv");
        host.appendChild(blockchainDiv);

        const blockchainInfoDiv = document.createElement("div");
        blockchainInfoDiv.classList.add("blockchainInfoDiv");
        blockchainDiv.appendChild(blockchainInfoDiv);

        const blockchainNamePicDiv = document.createElement("div");
        blockchainNamePicDiv.classList.add("blockchainNameAndPicDiv");
        blockchainInfoDiv.appendChild(blockchainNamePicDiv);

        const blockchainNameLbl = document.createElement("h2");
        blockchainNameLbl.innerHTML = `${this.name}`;
        blockchainNamePicDiv.appendChild(blockchainNameLbl);

        //const picture = document.createElement("img");
        //picture.classList.add("blockchainPicture");
        //picture.src = this.imgUrl;
        //blockchainNamePicDiv.appendChild(picture);

        const userCounterLbl = document.createElement("h2");
        userCounterLbl.innerHTML=`Current number of users: ${this.currentUserNumber}, Max: ${this.maxUserCount}`;
        blockchainInfoDiv.appendChild(userCounterLbl);

        const rewardPerBlock = document.createElement("h2");
        rewardPerBlock.innerHTML = `Reward per block: ${this.reward} tokens`;
        blockchainInfoDiv.appendChild(rewardPerBlock);

        const blockchainContentDiv = document.createElement("div");
        blockchainContentDiv.classList.add("blockchainContentDiv");
        blockchainDiv.appendChild(blockchainContentDiv);

        const blockchainFormsDiv = document.createElement("div");
        blockchainFormsDiv.classList.add("blockchainInputFormsDiv");
        blockchainContentDiv.appendChild(blockchainFormsDiv);

        const userListDiv = document.createElement("div");
        userListDiv.classList.add("userListDiv");
        blockchainContentDiv.appendChild(userListDiv);

        this.drawAddUserForm(blockchainFormsDiv, userListDiv, userCounterLbl);
        this.drawGenerateBlockForm(blockchainFormsDiv);
        //this.drawAllUsers(userListDiv);
    }
}