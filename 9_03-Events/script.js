let boxColor = "black";
let boxCount = 0;

window.addEventListener("DOMContentLoaded", () => {
    let colorForm = document.getElementById("color-form");
    let formInput = document.getElementById("color-input");
    let newBox = document.getElementById("new-box-button");
    let boxContainer = document.getElementById("box-container");

    colorForm.addEventListener("submit", function () {
        SubmitForm(event, formInput);
    });

    newBox.addEventListener("click", function () {
        CreateBox(boxContainer);
    });

    document.addEventListener("keypress", function (event) {
        if (event.target.id == "color-input")
            return;

        if (event.key == "n" || event.key == "N")
            CreateBox(boxContainer);
    });

    document.addEventListener("dblclick", function (event) {
        if (event.target.classList.contains("box"))
            event.target.remove();
    });

    document.addEventListener("mouseover", function (event) {
        if (event.target.classList.contains("box"))
            event.target.textContent = 'x: ' + event.pageX + ', y: ' + event.pageY;
    });

    document.addEventListener("mouseout", function (event) {
        if (event.target.classList.contains("box"))
            event.target.textContent = 'Box ' + event.target.getAttribute("data-box-id");
    });
});

function SubmitForm(event, formInput) {
    event.preventDefault();
    boxColor = formInput.value.trim();
    formInput.value = '';

    let boxes = document.querySelectorAll(".box");

    for (b of boxes)
        b.style.backgroundColor = boxColor;
}

function CreateBox(boxContainer) {
    let box = document.createElement("div");

    box.setAttribute("data-box-id", boxCount.toString());
    box.textContent = 'Box ' + boxCount;
    box.className = "box";
    box.style.backgroundColor = boxColor;
    boxContainer.appendChild(box);

    boxCount++;
}