const scrollUp = () => {
  const scrollUp = document.getElementById("back-btn");
  const scrollY = window.pageYOffset;
  this.scrollY >= 250
    ? scrollUp.classList.add("show-back-btn")
    : scrollUp.classList.remove("show-back-btn");
};
window.addEventListener("scroll", scrollUp);
