{   
    
    //To create new promises for each url
    function getSuperHerosById(url){
        return new Promise((resolve, reject) =>{
            fetch(url)
            .then((response => response.json()))
            .then((data) => {
                resolve(data);
            })
        })
    }
    //Showing favourite superheroes by generating promises in a loop and 
    //then rendering the result after  all those promises get over
    function showFavouriteSuperHeros(){
        $('.all-img-container').empty();
        let allUrlRequests=[];
        let superHeroUrls = [];
        for(eachID of Common.favListID){
            superHeroUrls.push(`https://superheroapi.com/api.php/1571199179705402/${eachID}`)
        }
        superHeroUrls.forEach(
            (userUrl) => {
                allUrlRequests.push(getSuperHerosById(userUrl));
            }
        )
        Promise.all(allUrlRequests).then((allSuperHeroes) =>{
            // console.log(allSuperHeroes);
            Common.showSuperHeroes(allSuperHeroes);
        })
        dynamicEventSetter();
        return;
    }

    showFavouriteSuperHeros();

}