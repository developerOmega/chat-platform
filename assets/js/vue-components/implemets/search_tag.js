export default class SearchTag{
   
    constructor(dataValue, inputTags){
        this.publication_option = document.getElementById("contentTags");
        this.field = document.getElementById(inputTags);
        this.data = dataValue;
    }

    searchTags(options){
        if(this.field.value.match(/@[a-zA-Z0-9]+/)){
            let value = this.field.value.split("");
            value.shift();
            value = value.join("");
            
            for(let i = 0; i < this.data.length; i++){
                if(this.data[i].name.indexOf(value) > -1){
                    options[i].value = this.data[i].id;
                    options[i].innerHTML = "<img src= '" +this.data[i].photo + "' > " +  "<div> <p>" + this.data[i].name + "</p> <p>" +  this.data[i].type + "</p></div>";
                    this.publication_option.appendChild(options[i]);
                }else{
                    options[i].value = "";
                    options[i].innerHTML = "";
                }
            }
        }else{
            this.publication_option.innerHTML = "";
        }
    }

    tags(){
        let options = new Array();
        let self = this;
        for(let i = 0; i < this.data.length; i++){
            options[i] = document.createElement('div');
        }

        this.field.addEventListener('keyup',function(){
			self.searchTags(options);
		});
    }
}