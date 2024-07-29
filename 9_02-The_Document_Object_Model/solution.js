document.addEventListener("DOMContentLoaded", function () {
    //Task 1
    document.getElementById("task1").innerText = "Changed using 'innerText'.";
    //Task 2
    document.getElementById("task2").innerHTML = '<button>This Is A Button</button>';
    //Task 3
    document.body.style.backgroundColor = '#232323';
    //Task 4
    document.querySelectorAll(".item").forEach(item => {
        item.style.border = "thin dotted red";
    });
    //Task 5
    document.getElementById("task5").href = "https://www.springboard.com/";
    //Task 6
    document.getElementById("task6").value = "DOM Master";
    //Task 7
    document.getElementById("task7").classList.add("new-class");
    //Task 8
    var task8Button = document.createElement("button");
    task8Button.innerText = "Task 8 Button";
    document.getElementById("task8").appendChild(task8Button);
    //Task 9
    var task9 = document.getElementById("task9");
    task9.parentNode.removeChild(task9);
});