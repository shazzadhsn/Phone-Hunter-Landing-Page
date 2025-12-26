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
                <button onclick="handleShowDetails('${phone.slug}')" id="show-details-btn" class="btn btn-primary bg-[#0D6EFD] border-none shadow-none text-white my-5">Show Details</button>
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

const handleShowDetails = async(id) => {
    show_detail_modal.showModal();
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phoneDetails = data.data;
    displayModalInfo(phoneDetails);
}

// display modal information
const displayModalInfo = (phoneDetails) => {
    const boxModal = document.getElementById("box-modal");
    boxModal.innerHTML = `
        <img id="modal-img" class="mx-auto" src="${phoneDetails.image}" alt="Modal Image">
        <h3 class="text-2xl font-bold text-center my-3">${phoneDetails.name}</h3>
        <p class="text-sm my-3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class="mt-2"><b>Storage:</b>: ${phoneDetails?.mainFeatures?.storage}</p>
        <p class="mt-2"><b>Display Size:</b>: ${phoneDetails?.mainFeatures?.displaySize}</p>
        <p class="mt-2"><b>Chipset:</b>: ${phoneDetails?.mainFeatures?.chipSet}</p>
        <p class="mt-2"><b>Memory:</b>: ${phoneDetails?.mainFeatures?.memory}</p>
        <p class="mt-2"><b>Slug:</b> ${phoneDetails.slug}</p>
        <p class="mt-2"><b>Release Date:</b> ${phoneDetails.releaseDate}</p>
        <p class="mt-2"><b>Brand Name:</b> ${phoneDetails.brand}</p>
        <p class="mt-2"><b>GPS:</b> ${phoneDetails.others.GPS}</p>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn">Close</button>
            </form>
        </div>
    `;
}