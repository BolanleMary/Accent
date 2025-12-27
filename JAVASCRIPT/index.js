


// for dropdown menu
// const selected = document.querySelector(".selected");
// const options = document.querySelector(".options");

// selected.addEventListener("click", () => {
//     options.style.display =
//         options.style.display === "block" ? "none" : "block";
// });

// document.querySelectorAll(".option").forEach(option => {
//     option.addEventListener("click", () => {
//         selected.innerHTML = option.innerHTML;
//         options.style.display = "none";
//     });
// });

// const selected = document.querySelector(".selected");
// const optionsContainer = document.querySelector(".options");
// const optionsList = document.querySelectorAll(".option");

// // Toggle dropdown on click
// selected.addEventListener("click", (e) => {
//   e.stopPropagation(); // ✅ stop the event from reaching the document
//   optionsContainer.style.display =
//     optionsContainer.style.display === "block" ? "none" : "block";
// });

// // Handle option click
// optionsList.forEach(option => {
//   option.addEventListener("click", (e) => {
//     e.stopPropagation(); // ✅ stop the event from reaching the document
//     selected.innerHTML = option.innerHTML; // show selected item
//     optionsContainer.style.display = "none";
//   });
// });

// // Close dropdown when clicking outside
// document.addEventListener("click", function() {
//   optionsContainer.style.display = "none";
// });


const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options");

// Toggle dropdown on selected button click
selected.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent the document listener from firing
  optionsContainer.classList.toggle("show");
});

// Event delegation: listen for clicks on options
optionsContainer.addEventListener("click", (e) => {
  const option = e.target.closest(".option"); // find the clicked option
  if (!option) return; // ignore clicks outside options

  selected.innerHTML = option.innerHTML; // update selected
  optionsContainer.classList.remove("show"); // close dropdown
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  optionsContainer.classList.remove("show");
});


