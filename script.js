const accessKey = 'Enter API of Unsplash.';

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMorebtn = document.getElementById('show-more-btn');

let page;
let keyword = '';

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page == 1) {
        searchResult.innerHTML = '';
    }

    results.map((result) => {
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    showMorebtn.style.display = 'block';
}

showMorebtn.addEventListener('click', () => {
    page++;
    searchImages();
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});
