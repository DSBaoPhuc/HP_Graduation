
$(document).ready(function () {
    setTimeout(function () {
        $(".spinner").fadeOut();
        $("#preloader").delay(350).fadeOut("slow");
        $("body").delay(350).css({ overflow: "visible" });
    }, 600);
});

function start() {
    const btnYes = document.querySelector(".btn--yes");
    const btnNo = document.querySelector(".btn--no");

    const popup = document.querySelector(".modal");
    const overlay = document.querySelector(".modal__overlay");
    const btnClose = document.querySelector(".btn-close");

    const headerModal = document.querySelector(".heading-name");
    const descriptionModal = document.querySelector(".message");

    // Question elements
    const questionScreen = document.querySelector("#question-screen");
    const questionTitle = document.querySelector("#question-title");
    const questionDescription = document.querySelector("#question-description");
    const questionText = document.querySelector("#question-text");

    const answerInput = document.querySelector("#answer-input");
    const answerSubmit = document.querySelector("#answer-submit");
    const answerError = document.querySelector("#answer-error");

    // Main invitation elements
    const header = document.querySelector(".header");
    const content = document.querySelector(".content");

    // Hide invitation screen initially
    header.style.display = "none";
    content.style.display = "none";

    // Display question screen
    questionScreen.style.display = "flex";

    // Set question content
    questionTitle.innerHTML = CONFIGDATA.questionTitle;
    questionDescription.innerHTML = CONFIGDATA.questionDescription;
    questionText.innerHTML = CONFIGDATA.question;

    answerInput.placeholder = CONFIGDATA.inputPlaceholder;
    answerSubmit.innerHTML = CONFIGDATA.submitButton;

    // Music
    const music = document.querySelector(".music");

    music.volume = 1;

    // Typewriter effect for descriptionModar
    function typeWriterEffect(element, text, speed = 35) {
        element.innerHTML = "";

        let index = 0;

        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;

                setTimeout(type, speed);
            }
        }

        type();
    }

    // Verify answer
    function checkAnswer() {
        const userAnswer = answerInput.value.trim();

        if (userAnswer === CONFIGDATA.correctAnswer) {

            // Hide question screen
            questionScreen.style.display = "none";

            // Show graduation invitation
            header.style.display = "block";
            content.style.display = "block";

            // Play music after user interaction
            music.play().catch(function (error) {
                console.log("Music playback:", error);
            });

            // Clear error
            answerError.innerHTML = "";

            popup.classList.add("show");

            // Start typing description AFTER correct answer
            typeWriterEffect(
                descriptionModal,
                CONFIGDATA.descriptionModar,
                35
            );

        } else {

            // Display error message
            answerError.innerHTML = CONFIGDATA.errorMessage;

            answerInput.value = "";
            answerInput.focus();
        }
    }

    // Click submit button
    answerSubmit.addEventListener("click", checkAnswer);

    // Press Enter to submit
    answerInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    

    // Set invitation content
    document.querySelector(".header").innerHTML = `
        <h1 class="header-name">
            ${CONFIGDATA.titleHeader}
            <i class="ti-heart"></i>
        </h1>

    `;

    headerModal.innerHTML = `
        ${CONFIGDATA.titleModar}
        <i class="ti-heart"></i>
    `;

    // descriptionModal.innerHTML = CONFIGDATA.descriptionModar;

    // Display description gradually
    // typeWriterEffect(
    //     descriptionModal,
    //     CONFIGDATA.descriptionModar,
    //     35
    // );

    // Close modal
    btnClose.onclick = function () {
        popup.classList.remove("show");
    };

}

start();
