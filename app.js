const input = document.getElementById('text-input');
const button = document.getElementById('button');
const booklist = document.getElementById('book-list')
button.addEventListener('click', function () {
    const inputValue = input.value;
    console.log(inputValue);
    const url = `http://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => title(data));
})
const title = bookTitle => {
    const docs = bookTitle.docs;
    console.log(docs);
    docs.forEach(element => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
         <div class="card">
                        <img id="cover-image" src="searchImage(${element.cover_i})" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h6 class="card-title"></h6>
                            <p id="author">Author</p>
                            <small>first published:1996</small>
                        </div>
                    </div>
        `;
        booklist.appendChild(div);
    });
}
const searchImage = imageId => {
    const url = `https://covers.openlibrary.org/b/id/${imageId}-M.jpg`
    fetch(url)
    .then(res=> res.json())
    .then(data =>console.log(data))
}