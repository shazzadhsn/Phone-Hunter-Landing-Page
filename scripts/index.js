const getPhonesData = async(searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const jsonData = await res.json();
    const phones = jsonData.data;
    displayCards(phones, isShowAll);
}

// display cards
const displayCards = (phones, isShowAll) => {
    const cardSection = document.getElementById("card-section");
    cardSection.textContent = "";

    const showAllBtn = document.getElementById("show-all-button");
    console.log(phones.length);
    if(phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove("hidden");
    } else {
        showAllBtn.classList.add("hidden");
    }

    if(!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach((phone) => {
        const singleCard = document.createElement("div");
        singleCard.classList = `single-card w-10/12 mx-auto my-10 p-5 border border-black rounded-xl`;
        singleCard.innerHTML = `
            <div class="card-container-box mx-auto text-center">
                <img class="phone-img text-center block mx-auto" src="${phone.image}" alt="">
                <h3 id="phone-name" class="single-phone-name text-xl font-bold my-3">${phone.phone_name}</h3>
                <p id="phone-description" class="single-phone-description">There are many variations of passages of available, but the majority have suffered</p>
                <button id="show-details-btn" class="btn btn-primary bg-[#0D6EFD] border-none shadow-none text-white my-5">Show Details</button>
            </div>
        `;
        cardSection.appendChild(singleCard);
    })
}

// handle search btn
const handleSearchBtn = (isShowAll) => {
    const searchBar = document.getElementById("search-bar");
    const searchText = searchBar.value;
    getPhonesData(searchText, isShowAll);
}

const handleShowAllBtn = () => {
    const isShowAll = true;
    handleSearchBtn(isShowAll)
}