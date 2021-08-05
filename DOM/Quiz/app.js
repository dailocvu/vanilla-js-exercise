const correctAnswers = ["A", "B", "B", "A"];
const form = document.querySelector(".quiz-form");
const result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  let score = 0;
  const userAnswers = [
    form.q1.value,
    form.q2.value,
    form.q3.value,
    form.q4.value,
  ];
  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += 25;
    }
  });
  scrollTo(0, 0);
  result.querySelector("span").textContent = `${score}%`;
  result.classList.remove("d-none");
  let output = 0;
  //setInterval lặp lại sau liên tục sau 1 khoảng thời gian
  const timer = setInterval(() => {
    result.querySelector("span").textContent = `${output}%`;
    if (output === score) {
      clearInterval(timer);
    } else {
      output++;
    }
  }, 10);
  e.preventDefault();
});
