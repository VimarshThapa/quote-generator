const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById("loader");

var counter = 0;

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Get Quore from API
async function getQuote(){
    showLoadingSpinner()
    const proxyUrl = 'https://tranquil-headland-71295.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        
        if (!data.quoteAuthor) {
            quoteAuthor.innerText = "Unkown";
        }
        else{
            quoteAuthor.innerText = data.quoteAuthor;
        }

        // reduce font size for large quotes
        if (data.quoteText.length > 120){
            quoteText.classList.add("long-quote");
        }
        else{
            quoteText.classList.remove("long-quote");
        }

        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();

    }
    catch(error){
        if (counter < 7){
            getQuote();
            counter = counter + 1;
        }
        else{
            alert("Something is wrong with this page. Please try again later.")
        }
    }

    

}

function tweetCode() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank')
}


newQuoteBtn.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetCode)

// On Load
getQuote();