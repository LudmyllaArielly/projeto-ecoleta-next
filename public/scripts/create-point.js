   
function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() )
    .then(states => {

        for( const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUfs()

function getCities(event){
    const citiesSelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
   
    const ufValue = event.target.value
    
   // citiesSelect.disable = true
   const indexOfSelectState = event.target.selectedIndex
   stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
   
    citiesSelect.innerHTML = "<option value>Seleciona a Cidade</option>"   /*limpou o campo*/ 
    citiesSelect.disable = true; /*bloqueo o campo*/ 

    fetch(url)
    .then(res => res.json() )
    .then(cities => {
     
        for( const city of cities ){
            citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citiesSelect.disable = false;
    })
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) 


    //Itens de coleta
    // pega todos lo
const itemsToCollect = document.querySelectorAll(".itens-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}

const collectedItemns = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem (event){
    const itemLi = event.target

// adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    
// verificar se existe items selecionados, se sim pegar os items selecionados
 
const alreadySelected = selectedItems.findIndex(item => {
     const itemFound =  item == itemId
     return itemFound
})


// se ja existe selecionado
   if(alreadySelected >= 0 ){
    //tirar da selecao
    const filteredItems = selectedItems.filter( item => {
       const itemIsDiferent = item != itemId
        return itemIsDiferent
     })
     selectedItems = filteredItems
    }
    else{
        // se nao estiver selecionado adicionar a selecao
        selectedItems.push(itemId)
     
    }
//atualizar o campo escondido com os itens selecionados
         collectedItemns.value = selectedItems
}