// access key variable
const accessKey = "QlSgMeQuCzCszGzn1SPX6gLzGdBGqw7pUH1Zfje7keE"

const formEl1 = document.querySelector("form")
const inputEl1 = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")

let inputData = ""
let page = 1

async function searchImages(){
    inputData = inputEl1.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    // fetch from unsplash and convert to json
    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if(page === 1){
        searchResults.innerHTML = ""
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search-result")
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    })

    page++
    if(page > 1){
        showMore.style.display = "block"
    }
}

formEl1.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1
    searchImages()
})


showMore.addEventListener("click", () => {
    searchImages()
})


