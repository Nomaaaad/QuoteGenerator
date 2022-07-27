let apiQuotes = [];

const quoteText = document.querySelector('.quote')
const quoteContainer = document.querySelector('.quote-container')
const quoteAuthor = document.querySelector('.quote-author')
const titleName = document.querySelector('.title-name')
const twitterBtn = document.querySelector('.twitter-button')
const newQuoteBtn = document.querySelector('.new-quote')
const loader = document.querySelector('.loader');


function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false
}

function newQuotes(){
    loading();
    quoteText.innerHTML = apiQuotes.quote;
    quoteAuthor.innerHTML = apiQuotes.character;
    titleName.innerHTML = apiQuotes.anime;
    if(apiQuotes.quote.length > 200){
        quoteText.classList.add('long-text')
    } else{
        quoteText.classList.remove('long-text')
    }
    complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://animechan.vercel.app/api/random';
        try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();
        newQuotes();
    } catch(error) {
        quoteText.innerHTML = "Sorry try after one hour";
        quoteAuthor.innerHTML = '';
        titleName.innerHTML = ''
        console.error(error)
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerHTML} - ${quoteAuthor.innerHTML}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuotes)
twitterBtn.addEventListener('click', tweetQuote)


// On Load
getQuotes();

