var itemsList = document.querySelector('.plates'),
    addItems = document.querySelector('.add-items'),
    items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(event) {
    event.preventDefault();
    var text = (this.querySelector('[name=item]')).value,
        item = {
            text: text,
            done: false
        };

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset(); //resets the input field
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map(function (plate, i) {
        //label's for input's id
        let plateChecked = plate.done ? 'checked' : '';
        return `
            <li>
                <input class="item" type='checkbox' data-index=${i} id='item${i}' ${plateChecked}>
                <label for="item${i}">${plate.text}</label>
                <span class="delete-item" data-index=${i}>&times;</span>
            </li>
         `
    }).join('');
}

function mainEvent(event) {
    if(event.target.classList.contains('delete-item')){
    	deleteItem(event.target)
    }
    else if(event.target.classList.contains('item')){
    	toggleDone(event.target)
    }
}

function toggleDone(element) {
	var indexElement = element.dataset.index; //event.target = input.target
    items[indexElement].done = !items[indexElement].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function deleteItem(element) {
    var indexElement = element.dataset.index;
    items.splice(indexElement, 1);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

populateList(items, itemsList);

addItems.addEventListener('submit', addItem);

itemsList.addEventListener('click', mainEvent);