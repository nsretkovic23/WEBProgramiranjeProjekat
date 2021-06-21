import {fetchingBlockchain} from './blockchainCreatorForm.js'

export class User{

    constructor(id, username, tokenBalance, moneyBalance, rigCost, miningProgram){
        this.id = id;
        this.username=username;
        this.tokenBalance = tokenBalance;
        this.moneyBalance = moneyBalance;
        this.rigCost=rigCost;
        this.panel = null;
        this.blockchainRef = null;
        this.miningProgram=miningProgram;
        this.completedBlocks=[];
        this.color = this.determineColor();
    }

    determineColor(){
        if(this.rigCost > 2000 || this.miningProgram === "Kryptex" )
            return "green";
        else if(this.rigCost > 1000 || this.miningProgram === "Hashing24")
            return "tomato";
        else
            return "black";
    }

    drawCommands(host){
        const commandsDiv = document.createElement("div");
        commandsDiv.classList.add("userCommandsDiv");
        host.appendChild(commandsDiv);

        const deleteUserBtn = document.createElement("button");
        deleteUserBtn.innerHTML = "Delete";
        commandsDiv.appendChild(deleteUserBtn);

        deleteUserBtn.addEventListener("click", ()=>{
           // const parent = this.panel.parentNode;
           // parent.removeChild(this.panel);
           this.deleteUser(host);
        });
        
    }

    drawDetails(host){
        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("userDetailsDiv");
        host.appendChild(detailsDiv);

        const usernameLbl = document.createElement("label");
        usernameLbl.innerHTML=`Username:${this.username}`;
        detailsDiv.appendChild(usernameLbl);

        const balanceLbl = document.createElement("label");
        balanceLbl.innerHTML = `Token Balance: ${this.tokenBalance}`;
        detailsDiv.appendChild(balanceLbl);

        const moneyBalanceLbl = document.createElement("label");
        moneyBalanceLbl.innerHTML = `Money Balance: ${this.moneyBalance}`;
        detailsDiv.appendChild(moneyBalanceLbl);

        const rigCostLbl = document.createElement("label");
        rigCostLbl.innerHTML = `Rig Cost: ${this.rigCost}`;
        detailsDiv.appendChild(rigCostLbl);

        const miningProgramLbl = document.createElement("label");
        miningProgramLbl.innerHTML = `Mining program: ${this.miningProgram}`;
        detailsDiv.appendChild(miningProgramLbl);

        const completedBlockLbl = document.createElement("label");
        completedBlockLbl.innerHTML = `Completed blocks number: ${this.completedBlocks.length}`;
        detailsDiv.appendChild(completedBlockLbl);
    }

    drawUser(host, blockchainUsers){
        this.panel=document.createElement("div");
        this.panel = host;

        this.blockchainRef = blockchainUsers;

        const userMainDiv = document.createElement("div");
        userMainDiv.classList.add("userMainDiv");
        host.appendChild(userMainDiv);
        userMainDiv.style.backgroundColor = this.color;

        this.drawCommands(userMainDiv);
        this.drawDetails(userMainDiv);
    }

    deleteUser(host){
      fetch(`https://localhost:5001/DeleteUser/${this.id}`, {method:'DELETE'})
      .then(res => fetchingBlockchain())
    }

}