const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');
//Get Quotes from API
let apiQuotes = [];
// Show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
// hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

function newQuote(){
    loading();
    //pick a random quote
    const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if author field is blank
    if(!quote.author){
        authorText.textContent='Unknown';
    }
    else{
        authorText.textContent=quote.author;
    }
    //check quote length 
    if(quote.text.length>110){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    //Set quote ,hide loader
    quoteText.textContent=quote.text;
    complete();
}
async function getQuotes() {
    loading();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error) {
        //Catch error here
    }
}
//Tweet Quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
//twitterBtn.addEventListener('click',tweetQuote);
//Onload
getQuotes();    
