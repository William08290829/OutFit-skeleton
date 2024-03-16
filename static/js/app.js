// 'use strict';
// /**
//  * 
//  * @param {NodeList} elements 
//  * @param {string} eventType 
//  * @param {*} callback 
//  */

const fetchData = function (city, callback) {
    // 检查城市是否在允许的城市列表中
    const taiwanCities = [
        '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市',
        '基隆市', '新竹市', '嘉義市',
        '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣',
        '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣',
        '金門縣', '連江縣'
    ];
    
    if (taiwanCities.includes(city)) {
        // 如果城市在列表中，直接将城市传递给回调函数
        callback(city);
    } else {
        // 如果城市不在列表中，可以选择执行一些其他操作或者什么都不做
        // console.error(`City '${city}' is not allowed.`);
    }
}

const addEventOnElements = function (elements, eventType, callback) {
    for (const element of elements) element.addEventListener(eventType, callback);
}

const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const toggleSearch = () => searchView.classList.toggle("active");
addEventOnElements(searchTogglers, "click", toggleSearch);


// SEARCH INTEGRATION
const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeout = null;
const searchTimeoutDuration = 500;

searchField.addEventListener("input", function() {
    searchTimeout ?? clearTimeout(searchTimeout);

    if (!searchField.value) {
        searchResult.classList.remove("active");
        searchResult.innerHTML = "";
        searchField.classList.remove("searching");
    } else {
        searchField.classList.add("searching");
    }


    if(searchField.value) {
        searchTimeout = setTimeout(() => {
            fetchData(searchField.value, function (city) {
                searchField.classList.remove("searching");
                searchResult.classList.add("active");
                searchResult.innerHTML =`
                    <ul class="view-list" data-search-list></ul>
                `;


                const items = [];
                const searchItem = document.createElement("li");
                searchItem.classList.add("view-item");
                searchItem.innerHTML = `
                    <span class="m-icon">location_on</span>
                        <div>
                            <p class="item-title">${city}</p>
                            <p class="label-2 item-subtitle">台灣</p>
                        </div>

                        <a href="/weather?&city=${encodeURIComponent(city)}&date=d0" class="item-link has-state" data-search-toggler></a>
                `;

                searchResult.querySelector("[data-search-list]").appendChild(searchItem);
                items.push(searchItem.querySelector("[data-search-toggler]"));

            });
        }, searchTimeoutDuration);
    }

});



