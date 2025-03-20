async function getNews(search) {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    let getDiv = document.getElementById('getDiv');
    getDiv.innerHTML = "<p class='text-white' id='loadingMessage'>Loading news...</p>"; 
    
    let apiKey = "d21bbe62427440ccbb197533a1f70ac3";
    let url = `https://newsapi.org/v2/everything?q=${search}&from=${year-month-day}&sortBy=publishedAt&apiKey=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);

        if (data.status === "error") {
            getDiv.innerHTML = `<p class='text-white'>Error: ${data.message}</p>`;
            return;
        }

        if (!data.articles || data.articles.length === 0) {
            getDiv.innerHTML = "<p class='text-white'>No news found!</p>";
            return;
        }

        getDiv.innerHTML = "";

        data.articles.forEach(article => {
            let imageUrl = article.urlToImage ? article.urlToImage : 'path/to/default/image.jpg';
            getDiv.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <img src="${imageUrl}" class="card-img-top" alt="News Image">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <a href="${article.url}" target="_blank" class="btn btn-dark">Read More</a>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error fetching news:", error);
        getDiv.innerHTML = "<p class='text-white'>Error fetching news. Please try again later.</p>";
    }
}

document.querySelector("#search").addEventListener("click", (e) => {
    e.preventDefault();
    let search = document.getElementById("news").value.trim();
    if (search === "") {
        alert("Please enter a search term.");
        return;
    }
    localStorage.setItem("search", search);
    getNews(search);
});

window.addEventListener("DOMContentLoaded", () => {
    let search = localStorage.getItem("search");
    if (search) {
        document.getElementById("news").value = search;
        getNews(search);
    }
});
