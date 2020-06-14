{   
    Common.dynamicEventSetter();
    let favListID = Common.getCookie();
    //To display all the fetched images
    function showSuperHeroes(superHeroList){
        $('.all-img-container').empty();
        for(each of superHeroList){
            let newCard=newCardDom(each);
            // console.log(newCard[0].id);
            if(favListID.includes(newCard[0].id)){
                newCard[0].children[0].style.color = 'red';
            }
            $('.all-img-container').append(newCard);
        }
        dynamicEventSetter();
        return;
    }
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
        for(eachID of favListID){
            superHeroUrls.push(`https://superheroapi.com/api.php/1571199179705402/${eachID}`)
        }
        superHeroUrls.forEach(
            (userUrl) => {
                allUrlRequests.push(getSuperHerosById(userUrl));
            }
        )
        Promise.all(allUrlRequests).then((allSuperHeroes) =>{
            // console.log(allSuperHeroes);
            showSuperHeroes(allSuperHeroes);
        })
        Common.dynamicEventSetter();
        return;
    }

    showFavouriteSuperHeros();

}