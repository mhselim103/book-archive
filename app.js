const input = document.getElementById('text-input');
const booklist = document.getElementById('book-list')
const totalResult = document.getElementById('search-result');
const errorDiv = document.getElementById('error')
const loadApi = () => {
    const inputValue = input.value;
    // error 
    if (inputValue === "") {
        booklist.innerHTML = '';
        totalResult.innerText = '';
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }
    // clear 
    errorDiv.innerText = "";
    booklist.innerHTML = '';
    totalResult.innerText = '';
    toggleSpinner('block');
    // call api 
    const url = `https://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            errorHandling(data)
            loadBooks(data.docs)
        })
};
// error handling 
const errorHandling = data => {
    if (data.numFound === 0 || data.message === "Not Found") {
        errorDiv.innerText = "NO Result Found";
        input.value = '';
        return;
    }
    else {
        input.value = '';
        totalResult.innerText = `Results found:${data.numFound}`
    }
};
// showing books function 
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
                            <h6>Publisher: ${element.publisher?.[0]} </h6>
                            <h5>Author:${element.author_name?.[0]}</h5>
                        </div>
                    </div>
        `;
        booklist.appendChild(div);
    });
    toggleSpinner('none');
};
// spinner function 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};

