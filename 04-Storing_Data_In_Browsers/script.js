document.addEventListener("DOMContentLoaded", function () {
	const noteContainer = document.getElementById("note-container");
	const newNoteButton = document.getElementById("new-note-button");
	const colorForm = document.getElementById("color-form");
	const colorInput = document.getElementById("color-input");

	let noteColor = localStorage.getItem("noteColor") || 0; // Stores the selected note color from the form.
	let noteIdCounter = localStorage.getItem("noteIdCounter") || 0; // Counter for assigning unique IDs to new notes.

	function loadNotes() {
		let notes = localStorage.getItem("notes");
		if (notes == null) {
			notes = [];
		} else {
			notes = JSON.parse(notes);
		}
		return notes;
	}

	function appendNotes() {
		let notes = loadNotes();

		for (n of notes) {
			let note = document.createElement("textarea");
			note.setAttribute("data-note-id", n.id.toString());
			note.value = n.content;
			note.className = "note";
			note.style.backgroundColor = noteColor;
			noteContainer.appendChild(note);
		}
	}

	function saveNotes(notes) {
		localStorage.setItem("notes", JSON.stringify(notes));
	}

	appendNotes();

	function addNewNote() {
		const id = noteIdCounter;
		const content = `Note ${id}`;

		const note = document.createElement("textarea");
		note.setAttribute("data-note-id", id.toString()); // Stores the note ID to its data attribute.
		note.value = content; // Sets the note ID as value.
		note.className = "note"; // Sets a CSS class.
		note.style.backgroundColor = noteColor; // Sets the note's background color using the last selected note color.
		noteContainer.appendChild(note); // Appends it to the note container element as its child.

		noteIdCounter++; // Increments the counter since the ID is used for this note.

		let notes = loadNotes();
		notes.push({ id, content });
		saveNotes(notes);
		localStorage.setItem("noteIdCounter", noteIdCounter.toString());
	}

	colorForm.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevents the default event.

		const newColor = colorInput.value.trim();  // Removes whitespaces.

		const notes = document.querySelectorAll(".note");
		for (const note of notes) {
			note.style.backgroundColor = newColor;
		}

		colorInput.value = ""; // Clears the color input field after from submission.

		noteColor = newColor; // Updates the stored note color with the new selection.

		localStorage.setItem("noteColor", noteColor);
	});

	newNoteButton.addEventListener("click", function () {
		addNewNote();
	});

	document.addEventListener("dblclick", function (event) {
		if (event.target.classList.contains("note")) {
			event.target.remove(); // Removes the clicked note.

			let id = Number(event.target.getAttribute("data-note-id"));
			let notes = loadNotes();
			for (let n = 0; n < notes.length; n++) {
				if (notes[n].id == id)
					notes.splice(n, 1);
			}
			saveNotes(notes);
		}
	});

	noteContainer.addEventListener("blur", function (event) {
		if (event.target.classList.contains("note")) {
			let id = Number(event.target.getAttribute("data-note-id"));
			let notes = loadNotes();

			for (let n = 0; n < notes.length; n++) {
				if (notes[n].id == id)
					notes[n].content = event.target.value;
			}
			saveNotes(notes);
		}
	}, true);

	window.addEventListener("keydown", function (event) {
		/* Ignores key presses made for color and note content inputs. */
		if (event.target.id === "color-input" || event.target.type === "textarea") {
			return;
		}

		/* Adds a new note when the "n" key is pressed. */
		if (event.key === "n" || event.key === "N") {
			addNewNote(); // Adds a new note.
		}
	});
});
