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
        // console.log(element.cover_i);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
         <div class="card">
                        <img id="cover-image" src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt="NO Image">
                        <div class="card-body">
                            <h6 class="card-title">${element.title}</h6>
                            <p id="author">${element.author_name?.[0]}</p>
                            <small>${element.first_publish_year}</small>
                        </div>
                    </div>
        `;
        booklist.appendChild(div);
    });
}

