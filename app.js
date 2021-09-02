const input = document.getElementById('text-input');
const button = document.getElementById('button');
const booklist = document.getElementById('book-list')
const totalResult = document.getElementById('search-result');
const errorDiv = document.getElementById('error')
button.addEventListener('click', function () {
    const inputValue = input.value;
    // error 
    if (inputValue === "") {
        booklist.innerHTML = '';
        totalResult.innerText = '';
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }
    // clear 
    booklist.innerHTML = '';
    totalResult.innerText = '';
    // call api 
    const url = `http://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // error handling 
            if (data.numFound === 0 || data.message === "Not Found") {
                errorDiv.innerText = "NO Result Found";
                input.value = '';
                return;
            }
            else {
                errorDiv.innerText = "";
                input.value = '';
                totalResult.innerText = `Results found:${data.numFound}`
            }
            
            loadBooks(data.docs)
        })
})
const loadBooks = books => {
    
    books.forEach(element => {
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

