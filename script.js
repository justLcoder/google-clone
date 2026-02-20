const input = document.querySelector('input[name="q"]');
const suggestionsBox = document.querySelector(".suggestions");
const wrapper = document.querySelector(".search-wrapper");
const form = document.querySelector("form");


const suggestionsData = [
    "openai",
    "openai chatgpt",
    "javascript tutorial",
    "javascript array methods",
    "flexbox guide",
    "css grid layout",
    "web development roadmap",
    "react tutorial",
    "node js express",
    "html semantic tags"
];

let currentIndex = -1;

function renderSuggestions(list) {
    suggestionsBox.innerHTML = "";
    currentIndex = -1;

    if (list.length === 0) {
        closeSuggestions();
        return;
    }

    list.slice(0, 8).forEach(item => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.textContent = item;

        div.addEventListener("click", () => {
            console.log("clicked suggestion");
            input.value = item;
            closeSuggestions();
            form.requestSubmit();
            
        });

        suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display = "block";
    wrapper.classList.add("active");
}

function closeSuggestions() {
    suggestionsBox.style.display = "none";
    wrapper.classList.remove("active");
}

input.addEventListener("focus", () => {
    if (!input.value.trim()) {
        renderSuggestions(suggestionsData);
    }
});

input.addEventListener("input", () => {
    const value = input.value.toLowerCase().trim();

    if (!value) {
        renderSuggestions(suggestionsData);
        return;
    }

    const filtered = suggestionsData.filter(item =>
        item.toLowerCase().includes(value)
    );

    renderSuggestions(filtered);
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrapper")) {
        closeSuggestions();
    }
});