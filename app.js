const input = document.getElementById('text-input');
const button = document.getElementById('button');
const booklist = document.getElementById('book-list')
const totalResult = document.getElementById('search-result');
button.addEventListener('click', function () {
    const inputValue = input.value;
    console.log(inputValue);
    const url = `http://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => title(data));
})
const title = bookTitle => {
    totalResult.innerText = `Results found:${bookTitle.numFound}`
    const docs = bookTitle.docs;
    docs.forEach(element => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
         <div class="card text-center">
                        <img id="cover-image" src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt="NO Image">
                        <div class="card-body">
                            <h3 class="card-title">${element.title}</h3>
                            <h6>First Publish:${element.first_publish_year}</h6>
                            <h5 id="author">Author:${element.author_name?.[0]}</h5>
                        </div>
                    </div>
        `;
        booklist.appendChild(div);
    });
}

