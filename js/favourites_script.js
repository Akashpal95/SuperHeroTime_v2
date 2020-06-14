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
        Common.dynamicEventSetter();
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
        return;
    }

    //Template for image card dom
    let newCardDom=function(superHero)
    {
        return $(`<div class="img-card" id="${superHero.id}">
        <i class="fas fa-heart favrt-icon"></i>
        <a href="details.html?id=${superHero.id}"><img class="superhero-img" src="${superHero.image['url']}" onerror="this.onerror=null;this.src='error.jpg';"></a>
        <p class="superhero-name">${superHero.name}</p>
        <p class="real-name">${superHero.biography['full-name']}</p>
            </div>`)
    }

    showFavouriteSuperHeros();

}