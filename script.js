const toggleBtn = document.querySelector(".theme-toggle");

toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

const luckyBtn = document.getElementById("luckyBtn");
const searchInput = document.querySelector('input[name="q"]');

luckyBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();

    if (query !== "") {
        window.location.href = 
            `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=I`;
    }
});

const input = document.querySelector('input[name="q"]');
const suggestionsBox = document.querySelector(".suggestions");

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
        suggestionsBox.style.display = "none";
        input.classList.remove("active");
        return;
    }

    list.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.textContent = item;

        div.addEventListener("click", () => {
            input.value = item;
            closeSuggestions();
        });

        suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display = "block";
    input.classList.add("active");
}

function closeSuggestions() {
    suggestionsBox.style.display = "none";
    input.classList.remove("active");
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
    if (!e.target.closest(".search-area")) {
        closeSuggestions();
    }
});