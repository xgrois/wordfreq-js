// HTML elements for interaction
const textareaEl = document.querySelector(".textarea");
const wordListEl = document.querySelector(".word-list");

// Set some defaults

// Some text for regex testing
textareaEl.value = "";

// Run solver every time some keyboard key is pressed
textareaEl.addEventListener("input", solve);

function solve() {
	// Clean results in UI
	wordListEl.innerHTML = "";

	// Split words based on specific punctuation chars
	words = tokenize();

	// Create the word count list
	if (!(words.length === 1 && words[0] === "")) {
		// Create the HasMap for unique words with their repetitions
		let ht = new Map();

		words.forEach((w) => {
			wlc = w.toLowerCase();
			if (!ht.has(wlc)) {
				ht.set(wlc, 1);
			} else {
				ht.set(wlc, ht.get(wlc) + 1);
			}
		});

		// Update UI
		updateUI(ht);
	}
}

function tokenize() {
	let words = textareaEl.value;
	words = words.replace(/(?:[?\¿\!\¡,;.])/g, " "); // replace punctuation and other characters by space
	words = words.replace(/\s{2,}/g, " "); // replace extra spaces between words by single space
	words = words.trim(); // remove initial and end extra spaces of the full text
	return words.split(" ");
}

function updateUI(ht) {
	ht.forEach((v, k, m) => {
		var li = document.createElement("li");
		var p1 = document.createElement("p");
		var p2 = document.createElement("p");
		var hr = document.createElement("hr");

		p1.innerHTML = k;
		p2.innerHTML = v;

		li.appendChild(p1);
		li.appendChild(p2);

		li.style.display = "flex";
		li.style.gap = "1rem";
		li.style.justifyContent = "space-between";

		p1.style.fontStyle = "italic";
		p1.style.color = "var(--bg-orange)";
		p2.style.color = "var(--bg-red)";

		wordListEl.appendChild(li);
		wordListEl.appendChild(hr);
	});
}

function clearInput() {
	// Clean input
	textareaEl.value = "";

	// Update results
	solve();
}
