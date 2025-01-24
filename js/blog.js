

function main(){
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(json => console.log(json
        
    ));
}

class blog{
    constructor( title, text){
    this.title = title;
    this.text = text;
    }
}