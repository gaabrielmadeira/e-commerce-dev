let cartCount = 0;

let valueCount = 0;

function createCards (list){
    let listCardsSection = document.getElementsByClassName("list-cards")[0];
        listCardsSection.innerHTML = "";

        for(let i = 0; i < list.length; i++){
    
        let liItens = document.createElement("li");
        liItens.id = `i-${list[i].id}`;
        liItens.className = "list-itens"

        let imgItens = document.createElement("img");
        imgItens.className = "img-itens";
        imgItens.src = `${list[i].img}`; 
    
        let spanItem = document.createElement("span");
        spanItem.className = "span-product";
        spanItem.innerHTML = `${list[i].tag}`;
    
        let titleItem = document.createElement("h3");
        titleItem.className = "title-card";
        titleItem.innerHTML = `${list[i].nameItem}`; 
    
        let paragraphItem = document.createElement("p");
        paragraphItem.className = "paragraph-description";
        paragraphItem.innerHTML = `${list[i].description}`;
    
        let spanValue = document.createElement("span");
        spanValue.className = "value-span";
        spanValue.innerHTML = `R$ ${list[i].value.toFixed(2)}`;
    
        let addButton = document.createElement("button");
        addButton.className = "add-button";
        addButton.innerHTML = `${list[i].addCart}`;
        addButton.dataset.id = list[i].id;
    

        addButton.addEventListener("click", function(e){

            let idElement = e.target.dataset.id;
            let id = Number(idElement);
            
    
            cartCount ++;
            document.getElementById("amount-cart").innerHTML = `${cartCount}`;

            let product = searchProduct(id);
            
            let elementCart = creatCartCard(product);

            valueCount += product.value;
            document.getElementById("total-value").innerHTML = `R$ ${valueCount.toFixed(2)}`;

            cartEmptyOrCartitens()
            
            document.getElementsByClassName("cart-list")[0].appendChild(elementCart);   
            
        })  

        
        
        liItens.append(imgItens, spanItem, titleItem, paragraphItem, spanValue, addButton)
    
        listCardsSection.appendChild(liItens);
        
    }
}

const creatCardsProducts = createCards(data);
createCards(data);


function searchProduct(id){
    for(let i = 0; i < data.length; i++){
        if(data[i].id == id){
            return data[i];
        }
    }
}

function creatCartCard(obj){
    
    let liCart = document.createElement("li");
    liCart.id = `p-${obj.id}`;
    liCart.className = "product-list";
    
    let divImg = document.createElement("div");
    divImg.className = "div-img";
    
    let imgCart = document.createElement("img");
    imgCart.src = `${obj.img}`;
    imgCart.className = "prod-img"
   
    let divDetails = document.createElement("div");
    divDetails.className = "list-details"
    
    let titleCart = document.createElement("h4");
    titleCart.innerHTML = `${obj.nameItem}`;
    titleCart.className = "product-title"
    
    let spanCart = document.createElement("span");
    spanCart.innerHTML = `R$ ${obj.value.toFixed(2)}`;
    spanCart.className = "product-value"
    
    let removeBtt = document.createElement("button");

    removeBtt.id = `item-${obj.id}`; 
    removeBtt.className = "remove-button";
    removeBtt.innerHTML = "Remover do carrinho"
    removeBtt.addEventListener("click", function(event){
         
        let listPath = event.composedPath();
        listPath[2].remove();
        
        cartCount --;
        document.getElementById("amount-cart").innerHTML = `${cartCount}`;

        cartEmptyOrCartitens()

        valueCount -= obj.value
        document.getElementById("total-value").innerHTML = `${valueCount.toFixed(2)}`;
        
    })

    divImg.appendChild(imgCart);
    divDetails.append(titleCart, spanCart, removeBtt);
    liCart.append(divImg, divDetails);
    
    return liCart;

}
       

function cartEmptyOrCartitens(){
    let cartEmpty = document.querySelector(".cart-empty");
    let cartProducts = document.querySelector(".cart-products");
    let amountCart = document.getElementById("amount-cart").innerHTML = `${cartCount}`;
    
    if(amountCart > "0"){
        cartProducts.style.display = "block";
        cartEmpty.style.display = "none";
    }else{
        cartProducts.style.display = "none";
        cartEmpty.style.display = "flex";
    }
}

function removeSpecialChar(str){
    let specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`´{|}~";
    let strResult = "";
    for(let i =0; i < str.length; i++){
        if(!specialChars.includes(str[i].toLowerCase())){
            strResult += str[i];
        }
    }
    return strResult;
}

function tagToLowerCase(list){
    let arrTagLowerCase = [];
    for (let i = 0; i < list.length; i++) {
         list[i].tag.map(function(elem) {
         arrTagLowerCase.push(elem.toLowerCase());        
    });
}
return arrTagLowerCase;
}

const lowerCaseTag = tagToLowerCase(data);


function filterTshirts(list){
    let arrTshirts = [];
    for(let i = 0; i < list.length; i++){
        if(list[i].tag == "Camisetas"){
            arrTshirts.push(list[i])
        }
    }
    return createCards(arrTshirts);
}

function filterAcessories(list){
    let arrAcessories = [];
    for(let i = 0; i < list.length; i++){
        if(list[i].tag == "Acessórios"){
            arrAcessories.push(list[i])
        }
    }
    return createCards(arrAcessories);
}

function filterSearch(list) {
    let notFound = document.querySelector(".not-found");
    let mainCards = document.querySelector(".main-cards");
    let searchValue = document.querySelector(".search-input");
    let searchText = searchValue.value;
    let isSearchEmpty = searchText === "";
    let searchFilter = [];
    for (let i = 0; i < list.length; i++) {
        if (removeSpecialChar(lowerCaseTag[i]).includes(removeSpecialChar(searchText)) || removeSpecialChar(list[i].nameItem).toLowerCase().includes(removeSpecialChar(searchText))) {
            searchFilter.push(list[i]);
            isSearchEmpty = false;
        }
    }
    if (isSearchEmpty) {
        createCards(data);
        notFound.style.display = "none";
     } else if (searchFilter.length === 0) {
        mainCards.style.display = "none";
        notFound.style.display = "flex";
    } else {
        createCards(searchFilter);
        mainCards.style.display = "block";
        notFound.style.display = "none";
    }
}
   

document.querySelector(".search-button").addEventListener("click", function(e){
    filterSearch(data); 
})

document.querySelector("#tshirts").addEventListener("click", function(e){
    filterTshirts(data);
})

document.querySelector("#acessories").addEventListener("click", function(e){
    filterAcessories(data);
})

document.querySelector("#all").addEventListener("click", function(e){
    createCards(data);
})








  
    








    

