( function() {
var allSuperHeroList = []
var onloadFlag = true;
var searchInput = document.getElementById('search');


Common.dynamicEventSetter();

//HTTP call to fetch superheroes by name from API
function fetchSuperHeroesByName(name){
    console.log('coming here');
    if(allSuperHeroList.length > 0 && name === "a"){
        // console.log('Inside');
        console.log(allSuperHeroList)
        Common.showSuperHeroes(allSuperHeroList);
        return;
    }
    // console.log("Fetching...");
    fetch(`https://superheroapi.com/api.php/1571199179705402/search/${name}`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            if(onloadFlag){
            allSuperHeroList = data.results;
            onloadFlag = false;
            }
            Common.showSuperHeroes( data.results);
            return;
        })
        .catch(function(){
            console.log('Error in fetching');
            $('.all-img-container').append($('<div class="no-result">No results to display</div>'))
            return;
        });
}

//Adding event listener On clicking search button
$('#search-button').click(function(e){
    let name = $('#search').val()
    if(name ===""){
        window.alert("Invalid Input");
        return;
    }
    e.preventDefault();
    fetchSuperHeroesByName(name);
});

// event listener ta check for changes in search box
function searchSuperHero(){
    let name = $('#search').val();
    if(name ===""){
        name='a';
    }
    fetchSuperHeroesByName(name);
}


 //When document load for first time
 window.onload = function(){
     fetchSuperHeroesByName('a'); 
     var tempfavListID = Common.getCookie();
     if(typeof(tempfavListID) == 'string'){
        Common.favListID = []
     }
    else{
        Common.favListID = tempfavListID
    }
     console.log(typeof(Common.favListID));
 }

searchInput.onkeyup = function(){
    // throttleFunction(searchSuperHero, 500);
    Common.debounceFunction(searchSuperHero, 500);
};
})();
