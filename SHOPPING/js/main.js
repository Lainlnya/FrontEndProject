//Fetch the items from the JSON file
//loadItems는 fetch를 이용해 json파일의 데이터를 받아온 다음, 데이터가 성공적이면 json으로 변환하고,
//json안에 있는 items를 리턴한다.
function loadItems(){
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

function displayItems(items){
    const container = document.querySelector(".items");
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `
}
function onButtonClick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null){
        return;
    }
    displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items){
    const logo = document.querySelector(".logo");
    const btn_list = document.querySelector(".button_sec");
    logo.addEventListener("click", ()=>{
        displayItems(items);
    })
    btn_list.addEventListener("click", (e) => onButtonClick(e, items));
}


//main
loadItems()
.then(items => {
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log);