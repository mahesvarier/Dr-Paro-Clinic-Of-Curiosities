document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submit-btn");
    const nextButton = document.getElementById("next-btn");
    const resultDiv = document.getElementById("result");
    const questionContainer = document.getElementById("question-container");
    let currentQuestionIndex = 0;
    // Define an array to keep track of shown question indices
    const shownQuestionIndices = [];
    let questionCounter = 0;
    const questions = shuffleArray(getQuestions());
    if (!questions) return;

    gifsCorrect = ['https://giphy.com/embed/orUBPAFddnyo5HhQNC', 'https://giphy.com/embed/9Ai5dIk8xvBm0', 'https://giphy.com/embed/12EGL6Lj9e1AuQ', 'https://giphy.com/embed/cMq7gwTNX4jTO', 'https://giphy.com/embed/y9PHMVW6j0CB2', 'https://giphy.com/embed/J0a9SREMHkBAA', 'https://giphy.com/embed/Rs7iE0xMIwLzJ9cdX3', 'https://giphy.com/embed/L0O3TQpp0WnSXmxV8p'];
    gifsWrong = ['https://giphy.com/embed/hPPx8yk3Bmqys', 'https://giphy.com/embed/3orif5JHN2ymsSryRq', 'https://giphy.com/embed/ywV7YEcRbKI3WX05q1', 'https://giphy.com/embed/XazTKKTogKXQI', 'https://giphy.com/embed/12gzyin737yluE', 'https://giphy.com/embed/2OP9jbHFlFPW', 'https://giphy.com/embed/iHskdY9SMLFZuQ2u5c', 'https://giphy.com/embed/fAnRd2Vexak0mnqYYq', 'https://giphy.com/embed/wn3hk5esy9OkKSVxPW'];
    displayRandomQuestion(currentQuestionIndex);

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    submitButton.addEventListener("click", function () {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) {
            displayResult("Please select an answer before submitting.", "#ff4747");
            return;
        }

        const answerValue = selectedAnswer.value;
        const correctAnswer = questions[currentQuestionIndex].answer;
        const isCorrect = answerValue === correctAnswer;

        const funnyMessages = isCorrect
            ? [
                "Correct! You have a 'prescribed' sense of humor!",
                "Well done! Your humor is 'diagnostically' funny!",
                "That's right! You're 'surgically' precise with your jokes!",
                "Correct! You must have a 'healthy' sense of humor!",
                "You nailed it! Your humor is 'therapeutically' good!",
                "Great job! You're 'certified' in comedy!",
                "Correct! You've passed the 'laughter check-up'!",
                "You're on fire! Your humor is 'clinically' proven!"
            ]
            : [
                "Oops, that's not quite right. Maybe you need a 'second opinion' on your answer.",
                "Hmmm, incorrect. Looks like your answer needs a 'diagnostic review'.",
                "Incorrect! You're 'prescribed' to pick a different option.",
                "Nope, that's not the 'diagnosis' we were looking for.",
                "Incorrect, but don't worry, even the best doctors 'misdiagnose' sometimes.",
                "Oopsie daisy, that's not the right answer. 'Consultation' is recommended.",
                "Close, but not quite. Your answer is 'overruled' by the medical board!",
                "Incorrect, but don't 'discharge' your humor yet. Keep guessing!"
            ];

        const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
        displayResult(randomMessage, isCorrect ? "#00a300" : "#ff4747");

        var gif = document.getElementById("gif");
        console.log(gif);
        var gifIframe = gif.querySelector("iframe");
        console.log(gifIframe);

        if (isCorrect) {
            nextButton.style.display = "block";
            submitButton.style.display = "none";
            gif.style.display = "block";
            gifIframe.src = gifsCorrect[Math.floor(Math.random() * gifsCorrect.length)]
        } else if (!isCorrect) {
            gif.style.display = "block";
            gifIframe.src = gifsWrong[Math.floor(Math.random() * gifsWrong.length)]
        }
        else {
            gif.style.display = "none";
        }
    });


    nextButton.addEventListener("click", function () {
        gif.style.display = "none";

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayRandomQuestion(currentQuestionIndex);
            displayResult("", "");
            submitButton.style.display = "block";
            nextButton.style.display = "none";
        } else {
            questionContainer.innerHTML = "Congratulations! You've completed the quiz.";
            displayResult("", "");
            nextButton.style.display = "none";
            submitButton.style.display = "none";
        }
    });

    function displayResult(message, color) {
        resultDiv.textContent = message;
        resultDiv.style.color = color;
    }

    function getRandomQuestionIndex() {
        // Generate a random index that hasn't been shown yet
        const remainingIndices = questions.filter((_, index) => !shownQuestionIndices.includes(index));
        if (remainingIndices.length === 0) {
            // All questions have been shown, reset the array
            shownQuestionIndices.length = 0;
        }
        const randomIndex = Math.floor(Math.random() * remainingIndices.length);
        return randomIndex;
    }

    function displayRandomQuestion() {
        // Get a random index for the next question
        const index = getRandomQuestionIndex();
        if (index !== undefined) {
            debugger;
            const question = questions[index];
            const options = question.options.map((option, idx) => `
            <label>
                <input type="radio" name="answer" value="${String.fromCharCode(97 + idx)}"> ${option}
            </label>
        `).join('');

            if (questionCounter != 1) questionCounter++;
            questionContainer.innerHTML = `
            <p class="question-counter">Question ${questionCounter}/${questions.length}</p>
            <p class="legal-question">${question.question}</p>
            <div class="options-container">${options}</div>
        `;

            // Add the index to the shown question indices
            shownQuestionIndices.push(index);
        }
    }

    // Call displayRandomQuestion to show the first question
    displayRandomQuestion();


    function getQuestions() {
        var questions = [
            {
                "question": "Why did the doctor carry a red pen?",
                "options": ["To draw blood!", "For emergency prescriptions!", "To correct the heartbeats!", "To highlight medical errors!"],
                "answer": "a"
            },
            {
                "question": "What do you call a doctor who fixes websites?",
                "options": ["A 'web surgeon'!", "A 'tech doc'!", "A 'site physician'!", "A 'digital healer'!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor join a band?",
                "options": ["To cure the 'blues'!", "To play 'sick' beats!", "To be the 'heartbeat' of the group!", "To diagnose 'music fever'!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite instrument?",
                "options": ["A 'thermometer' flute!", "A 'stethoscope' guitar!", "A 'syringe' saxophone!", "A 'scalpel' violin!"],
                "answer": "b"
            },
            {
                "question": "How do doctors keep their breath fresh?",
                "options": ["With 'anesthesia' mints!", "With 'minty' prescriptions!", "By brushing with 'medicinal' toothpaste!", "By 'surgical' mouthwash!"],
                "answer": "d"
            },
            {
                "question": "Why did the doctor bring a ladder to the hospital?",
                "options": ["To reach 'new heights' in treatment!", "For 'high-risk' surgeries!", "To climb 'patient care' levels!", "To 'elevate' their practice!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite game?",
                "options": ["'Operation' for steady hands!", "'Diagnosis' for quick thinking!", "'Check-up' for careful analysis!", "'Bandage' for speedy recovery!"],
                "answer": "a"
            },
            {
                "question": "Why do doctors love art?",
                "options": ["For 'patient' drawing!", "To create 'health' masterpieces!", "To 'paint' a picture of health!", "To express 'medical' creativity!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite type of music?",
                "options": ["'Rhythm and bruise'!", "'Patient beats'!", "'Healing harmonies'!", "'Prescription pop'!"],
                "answer": "a"
            },
            {
                "question": "How do doctors stay fit?",
                "options": ["With 'cardio' exercises!", "By 'operating' on their muscles!", "With 'healthy' routines!", "By 'medically' approved workouts!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor go to the beach?",
                "options": ["For a 'vitamin sea' boost!", "To 'diagnose' the waves!", "To 'prescribe' some sunshine!", "For 'therapeutic' sandcastles!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite vegetable?",
                "options": ["A 'heart' of palm!", "A 'carrot' for vision!", "A 'spinach' for strength!", "A 'broccoli' for bones!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor bring a map?",
                "options": ["To find the 'artery'!", "To locate 'patient' care!", "To navigate 'medical' issues!", "To explore 'health' territories!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite dance move?",
                "options": ["The 'stethoscope' shuffle!", "The 'scalpel' slide!", "The 'heartbeat' hop!", "The 'prescription' pirouette!"],
                "answer": "c"
            },
            {
                "question": "Why do doctors make good DJs?",
                "options": ["They know how to 'mix' treatments!", "They can 'spin' good vibes!", "They keep the 'beat' alive!", "They have a 'healthy' playlist!"],
                "answer": "a"
            },
            {
                "question": "How do doctors stay organized?",
                "options": ["With 'prescription' planners!", "By using 'medical' charts!", "With 'clinical' schedules!", "By 'doctoring' their time!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor go to school?",
                "options": ["For a 'degree' in patience!", "To learn 'new' treatments!", "For 'medical' education!", "To 'diagnose' learning!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite fruit?",
                "options": ["A 'healthy' apple!", "A 'citrus' cure!", "A 'banana' for energy!", "A 'berry' for antioxidants!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor take up gardening?",
                "options": ["To grow 'medicinal' herbs!", "To 'cultivate' health!", "For 'therapeutic' relaxation!", "To 'prescribe' fresh vegetables!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite dessert?",
                "options": ["'Jello' for all ages!", "'Healthy' fruit salad!", "'Yogurt' for digestion!", "'Ice cream' for sore throats!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor become a chef?",
                "options": ["To 'prescribe' delicious meals!", "To 'diagnose' food flavors!", "For 'healthy' cooking!", "To create 'nutritious' dishes!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite color?",
                "options": ["'Red' for blood!", "'Blue' for scrubs!", "'Green' for surgery!", "'White' for coats!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor get a dog?",
                "options": ["For 'pawsitive' vibes!", "To 'diagnose' pet health!", "For 'therapeutic' companionship!", "To 'prescribe' walks!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite holiday?",
                "options": ["'Health' Day!", "'National' Nurses Week!", "'World' Health Day!", "'Doctor's' Appreciation Day!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor join a gym?",
                "options": ["For 'cardio' health!", "To 'muscle' up!", "For 'stress' relief!", "To 'prescribe' fitness!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite drink?",
                "options": ["'Green' juice!", "'Vitamin' water!", "'Herbal' tea!", "'Prescription' smoothies!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor become an astronaut?",
                "options": ["To 'explore' new health frontiers!", "For 'zero-gravity' medicine!", "To 'diagnose' space sickness!", "To 'prescribe' moon vitamins!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite TV show?",
                "options": ["'Health' Heroes!", "'Medical' Mysteries!", "'Surgical' Secrets!", "'Diagnosis' Detectives!"],
                "answer": "d"
            },
            {
                "question": "Why did the doctor bring an umbrella?",
                "options": ["For 'rainy' diagnoses!", "To 'shield' from patient sneezes!", "To stay 'dry' during rounds!", "For 'emergency' cover!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite type of joke?",
                "options": ["'Sick' humor!", "'Healthy' puns!", "'Medical' one-liners!", "'Prescription' laughs!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor wear sunglasses?",
                "options": ["To see patients in a better light!", "To avoid 'glare' from X-rays!", "For 'cool' diagnostics!", "To 'shade' eyes from bright screens!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite candy?",
                "options": ["'Jaw'breakers!", "'Lollipop' prescriptions!", "'Gummy' vitamins!", "'Medical' chocolates!"],
                "answer": "c"
            },
            {
                "question": "Why did the doctor bring a flashlight?",
                "options": ["For 'in-depth' examinations!", "To see in 'dark' alleys!", "For 'light-hearted' moments!", "To 'brighten' patient spirits!"],
                "answer": "d"
            },
            {
                "question": "What's a doctor's favorite animal?",
                "options": ["A 'nurse' shark!", "A 'lab' retriever!", "A 'heart' worm!", "A 'medic' cat!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor carry a red pen?",
                "options": ["To draw blood!", "For emergency prescriptions!", "To correct the heartbeats!", "To highlight medical errors!"],
                "answer": "a"
            },
            {
                "question": "What do you call a doctor who fixes websites?",
                "options": ["A 'web surgeon'!", "A 'tech doc'!", "A 'site physician'!", "A 'digital healer'!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor join a band?",
                "options": ["To cure the 'blues'!", "To play 'sick' beats!", "To be the 'heartbeat' of the group!", "To diagnose 'music fever'!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite instrument?",
                "options": ["A 'thermometer' flute!", "A 'stethoscope' guitar!", "A 'syringe' saxophone!", "A 'scalpel' violin!"],
                "answer": "b"
            },
            {
                "question": "How do doctors keep their breath fresh?",
                "options": ["With 'anesthesia' mints!", "With 'minty' prescriptions!", "By brushing with 'medicinal' toothpaste!", "By 'surgical' mouthwash!"],
                "answer": "d"
            },
            {
                "question": "Why did the doctor bring a ladder to the hospital?",
                "options": ["To reach 'new heights' in treatment!", "For 'high-risk' surgeries!", "To climb 'patient care' levels!", "To 'elevate' their practice!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite game?",
                "options": ["'Operation' for steady hands!", "'Diagnosis' for quick thinking!", "'Check-up' for careful analysis!", "'Bandage' for speedy recovery!"],
                "answer": "a"
            },
            {
                "question": "Why do doctors love art?",
                "options": ["For 'patient' drawing!", "To create 'health' masterpieces!", "To 'paint' a picture of health!", "To express 'medical' creativity!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite type of music?",
                "options": ["'Rhythm and bruise'!", "'Patient beats'!", "'Healing harmonies'!", "'Prescription pop'!"],
                "answer": "a"
            },
            {
                "question": "How do doctors stay fit?",
                "options": ["With 'cardio' exercises!", "By 'operating' on their muscles!", "With 'healthy' routines!", "By 'medically' approved workouts!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor go to the beach?",
                "options": ["For a 'vitamin sea' boost!", "To 'diagnose' the waves!", "To 'prescribe' some sunshine!", "For 'therapeutic' sandcastles!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite vegetable?",
                "options": ["A 'heart' of palm!", "A 'carrot' for vision!", "A 'spinach' for strength!", "A 'broccoli' for bones!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor bring a map?",
                "options": ["To find the 'artery'!", "To locate 'patient' care!", "To navigate 'medical' issues!", "To explore 'health' territories!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite dance move?",
                "options": ["The 'stethoscope' shuffle!", "The 'scalpel' slide!", "The 'heartbeat' hop!", "The 'prescription' pirouette!"],
                "answer": "c"
            },
            {
                "question": "Why do doctors make good DJs?",
                "options": ["They know how to 'mix' treatments!", "They can 'spin' good vibes!", "They keep the 'beat' alive!", "They have a 'healthy' playlist!"],
                "answer": "a"
            },
            {
                "question": "How do doctors stay organized?",
                "options": ["With 'prescription' planners!", "By using 'medical' charts!", "With 'clinical' schedules!", "By 'doctoring' their time!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor go to school?",
                "options": ["For a 'degree' in patience!", "To learn 'new' treatments!", "For 'medical' education!", "To 'diagnose' learning!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite fruit?",
                "options": ["A 'healthy' apple!", "A 'citrus' cure!", "A 'banana' for energy!", "A 'berry' for antioxidants!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor take up gardening?",
                "options": ["To grow 'medicinal' herbs!", "To 'cultivate' health!", "For 'therapeutic' relaxation!", "To 'prescribe' fresh vegetables!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite dessert?",
                "options": ["'Jello' for all ages!", "'Healthy' fruit salad!", "'Yogurt' for digestion!", "'Ice cream' for sore throats!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor become a chef?",
                "options": ["To 'prescribe' delicious meals!", "To 'diagnose' food flavors!", "For 'healthy' cooking!", "To create 'nutritious' dishes!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite color?",
                "options": ["'Red' for blood!", "'Blue' for scrubs!", "'Green' for surgery!", "'White' for coats!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor get a dog?",
                "options": ["For 'pawsitive' vibes!", "To 'diagnose' pet health!", "For 'therapeutic' companionship!", "To 'prescribe' walks!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite holiday?",
                "options": ["'Health' Day!", "'National' Nurses Week!", "'World' Health Day!", "'Doctor's' Appreciation Day!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor join a gym?",
                "options": ["For 'cardio' health!", "To 'muscle' up!", "For 'stress' relief!", "To 'prescribe' fitness!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite drink?",
                "options": ["'Green' juice!", "'Vitamin' water!", "'Herbal' tea!", "'Prescription' smoothies!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor become an astronaut?",
                "options": ["To 'explore' new health frontiers!", "For 'zero-gravity' medicine!", "To 'diagnose' space sickness!", "To 'prescribe' moon vitamins!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite TV show?",
                "options": ["'Health' Heroes!", "'Medical' Mysteries!", "'Surgical' Secrets!", "'Diagnosis' Detectives!"],
                "answer": "d"
            },
            {
                "question": "Why did the doctor bring an umbrella?",
                "options": ["For 'rainy' diagnoses!", "To 'shield' from patient sneezes!", "To stay 'dry' during rounds!", "For 'emergency' cover!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite type of joke?",
                "options": ["'Sick' humor!", "'Healthy' puns!", "'Medical' one-liners!", "'Prescription' laughs!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor wear sunglasses?",
                "options": ["To see patients in a better light!", "To avoid 'glare' from X-rays!", "For 'cool' diagnostics!", "To 'shade' eyes from bright screens!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite candy?",
                "options": ["'Jaw'breakers!", "'Lollipop' prescriptions!", "'Gummy' vitamins!", "'Medical' chocolates!"],
                "answer": "c"
            },
            {
                "question": "Why did the doctor bring a flashlight?",
                "options": ["For 'in-depth' examinations!", "To see in 'dark' alleys!", "For 'light-hearted' moments!", "To 'brighten' patient spirits!"],
                "answer": "d"
            },
            {
                "question": "What's a doctor's favorite animal?",
                "options": ["A 'nurse' shark!", "A 'lab' retriever!", "A 'heart' worm!", "A 'medic' cat!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor bring a suitcase?",
                "options": ["To carry his 'case' load!", "For 'travel' prescriptions!", "To pack 'healthy' snacks!", "For 'emergency' vacations!"],
                "answer": "a"
            },
            {
                "question": "What do you call a doctor who fixes broken hearts?",
                "options": ["A 'cardiologist'!", "A 'heart' mender!", "A 'love' doctor!", "A 'pulse' fixer!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor become an artist?",
                "options": ["To 'draw' patients in!", "To 'paint' diagnoses!", "For 'creative' treatments!", "To 'color' health!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite season?",
                "options": ["'Flu' season!", "'Spring' into health!", "'Winter' wellness!", "'Summer' vitality!"],
                "answer": "a"
            },
            {
                "question": "Why do doctors make good comedians?",
                "options": ["They have 'patient' jokes!", "They 'diagnose' humor!", "They know 'sick' humor!", "They 'prescribe' laughter!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite place to relax?",
                "options": ["The 'clinic' lounge!", "A 'hospital' bed!", "The 'doctor's' den!", "A 'wellness' retreat!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor become a referee?",
                "options": ["To 'call' shots!", "For 'fair' diagnoses!", "To 'whistle' at sickness!", "To 'judge' health!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite hobby?",
                "options": ["'Diagnosing' issues!", "'Treating' patients!", "'Researching' health!", "'Prescribing' hobbies!"],
                "answer": "d"
            },
            {
                "question": "Why did the doctor buy a new car?",
                "options": ["To make 'house' calls!", "For 'emergency' rides!", "To 'drive' health!", "For 'quick' diagnoses!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite sport?",
                "options": ["'Surgical' precision!", "'Diagnostic' darts!", "'Healthy' hurdles!", "'Prescription' polo!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor become a teacher?",
                "options": ["To 'educate' patients!", "For 'learning' health!", "To 'lecture' on wellness!", "To 'diagnose' students!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite flower?",
                "options": ["A 'rose' for heart!", "A 'lily' for peace!", "A 'daisy' for wellness!", "A 'tulip' for color!"],
                "answer": "d"
            },
            {
                "question": "Why did the doctor go to the library?",
                "options": ["For 'medical' books!", "To 'study' health!", "For 'quiet' diagnostics!", "To 'read' prescriptions!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite ice cream flavor?",
                "options": ["'Healthy' vanilla!", "'Medicinal' mint!", "'Surgical' strawberry!", "'Prescriptive' pistachio!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor join the circus?",
                "options": ["To 'balance' health!", "For 'circus' medicine!", "To 'diagnose' clowns!", "For 'healing' tricks!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite toy?",
                "options": ["A 'stethoscope' doll!", "'Surgical' blocks!", "'Medical' cars!", "'Diagnostic' puzzles!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor buy a bicycle?",
                "options": ["For 'cardio' fitness!", "To 'cycle' health!", "For 'speedy' rounds!", "To 'balance' patients!"],
                "answer": "b"
            },
            {
                "question": "What's a doctor's favorite type of weather?",
                "options": ["'Sunny' wellness!", "'Rainy' diagnoses!", "'Cloudy' comfort!", "'Windy' recovery!"],
                "answer": "c"
            },
            {
                "question": "Why did the doctor get a pet fish?",
                "options": ["For 'calm' diagnostics!", "To 'prescribe' swims!", "For 'aquatic' therapy!", "To 'study' health!"],
                "answer": "d"
            },
            {
                "question": "What's a doctor's favorite board game?",
                "options": ["'Operation'!", "'Diagnosis' chess!", "'Medical' monopoly!", "'Prescription' poker!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor start a podcast?",
                "options": ["To 'broadcast' health!", "For 'sound' advice!", "To 'diagnose' online!", "For 'listening' prescriptions!"],
                "answer": "b"
            },
            {
                "question": "What's a doctor's favorite type of movie?",
                "options": ["A 'healthy' documentary!", "'Medical' drama!", "'Surgical' thriller!", "'Prescription' comedy!"],
                "answer": "c"
            },
            {
                "question": "Why did the doctor buy a camera?",
                "options": ["To 'capture' health!", "For 'diagnostic' photos!", "To 'record' patient progress!", "For 'medical' memories!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite fabric?",
                "options": ["'Surgical' silk!", "'Medical' cotton!", "'Health' polyester!", "'Diagnostic' denim!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor get a haircut?",
                "options": ["For 'clean' diagnostics!", "To 'cut' sickness!", "For 'hygiene' health!", "To 'trim' appointments!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite dessert topping?",
                "options": ["'Healthy' berries!", "'Medical' sprinkles!", "'Surgical' syrup!", "'Prescription' nuts!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor go hiking?",
                "options": ["For 'cardio' benefits!", "To 'climb' wellness!", "For 'fresh' air!", "To 'prescribe' nature!"],
                "answer": "b"
            },
            {
                "question": "What's a doctor's favorite gadget?",
                "options": ["A 'stethoscope'!", "A 'diagnostic' tool!", "A 'health' monitor!", "A 'medical' device!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor play the piano?",
                "options": ["For 'musical' health!", "To 'prescribe' tunes!", "For 'therapeutic' keys!", "To 'diagnose' harmony!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite vehicle?",
                "options": ["An 'ambulance'!", "A 'health' car!", "A 'medical' bike!", "A 'diagnostic' van!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor bring a calendar?",
                "options": ["For 'scheduled' appointments!", "To 'diagnose' dates!", "To 'mark' wellness!", "For 'prescriptive' days!"],
                "answer": "d"
            },
            {
                "question": "What's a doctor's favorite accessory?",
                "options": ["A 'watch' for time!", "'Medical' gloves!", "'Diagnostic' glasses!", "'Health' mask!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor go skydiving?",
                "options": ["For 'adrenaline' rush!", "To 'diagnose' heights!", "For 'extreme' wellness!", "To 'prescribe' thrills!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite dance?",
                "options": ["The 'stethoscope' shuffle!", "'Surgical' slide!", "'Diagnostic' dance!", "'Medical' mambo!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor get a tattoo?",
                "options": ["For 'artistic' expression!", "To 'ink' health!", "For 'medical' symbols!", "To 'diagnose' beauty!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite sandwich?",
                "options": ["A 'healthy' wrap!", "A 'medical' sub!", "A 'diagnostic' deli!", "A 'prescriptive' panini!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor go fishing?",
                "options": ["To 'catch' wellness!", "For 'calm' diagnostics!", "To 'reel in' health!", "For 'therapeutic' relaxation!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite instrument?",
                "options": ["A 'thermometer'!", "'Medical' saxophone!", "'Diagnostic' guitar!", "'Health' violin!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor visit a museum?",
                "options": ["For 'historical' health!", "To 'diagnose' art!", "For 'educational' wellness!", "To 'study' exhibitions!"],
                "answer": "b"
            },
            {
                "question": "What's a doctor's favorite fruit?",
                "options": ["An 'apple' a day!", "'Medical' mango!", "'Diagnostic' dates!", "'Health' banana!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor start gardening?",
                "options": ["To 'grow' health!", "For 'plant' therapy!", "To 'harvest' wellness!", "For 'botanical' diagnostics!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite pet?",
                "options": ["A 'therapeutic' dog!", "'Medical' cat!", "'Diagnostic' bird!", "'Health' fish!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor buy new shoes?",
                "options": ["For 'walking' therapy!", "To 'step' into health!", "For 'medical' comfort!", "To 'run' diagnostics!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite drink?",
                "options": ["'Healthy' water!", "'Medical' tea!", "'Diagnostic' coffee!", "'Prescription' juice!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor go to a comedy show?",
                "options": ["For 'laughter' therapy!", "To 'diagnose' humor!", "For 'funny' prescriptions!", "To 'study' jokes!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite animal?",
                "options": ["A 'therapy' dog!", "'Medical' monkey!", "'Diagnostic' dolphin!", "'Health' horse!"],
                "answer": "c"
            },
            {
                "question": "Why did the doctor take up knitting?",
                "options": ["To 'weave' health!", "For 'therapeutic' stitching!", "To 'craft' wellness!", "For 'diagnostic' patterns!"],
                "answer": "b"
            },
            {
                "question": "What's a doctor's favorite tree?",
                "options": ["A 'healthy' oak!", "'Medical' maple!", "'Diagnostic' pine!", "'Wellness' willow!"],
                "answer": "d"
            },
            {
                "question": "Why did the doctor write a book?",
                "options": ["To 'record' diagnoses!", "For 'medical' stories!", "To 'share' health tips!", "For 'therapeutic' writing!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite subject?",
                "options": ["'Biology' of health!", "'Medical' science!", "'Diagnostic' math!", "'Health' history!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor start cooking?",
                "options": ["For 'nutritional' therapy!", "To 'cook' health!", "For 'delicious' diagnostics!", "To 'prescribe' meals!"],
                "answer": "b"
            },
            {
                "question": "What's a doctor's favorite vacation spot?",
                "options": ["A 'healing' spa!", "'Medical' retreat!", "'Wellness' resort!", "'Therapeutic' beach!"],
                "answer": "c"
            },
            {
                "question": "Why did the doctor take singing lessons?",
                "options": ["For 'vocal' therapy!", "To 'diagnose' notes!", "For 'musical' health!", "To 'prescribe' songs!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite number?",
                "options": ["'One' for health!", "'Two' for balance!", "'Three' for wellness!", "'Four' for diagnostics!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor become a photographer?",
                "options": ["To 'capture' health!", "For 'diagnostic' shots!", "To 'picture' wellness!", "For 'prescriptive' images!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite candy?",
                "options": ["'Healthy' honey!", "'Medical' mints!", "'Diagnostic' drops!", "'Therapeutic' taffy!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor become a chef?",
                "options": ["For 'nutritious' meals!", "To 'cook' wellness!", "For 'prescriptive' recipes!", "To 'diagnose' dishes!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite book genre?",
                "options": ["'Medical' mysteries!", "'Health' histories!", "'Diagnostic' thrillers!", "'Therapeutic' tales!"],
                "answer": "c"
            },
            {
                "question": "Why did the doctor get a new computer?",
                "options": ["For 'digital' health!", "To 'type' prescriptions!", "For 'diagnostic' software!", "To 'research' wellness!"],
                "answer": "b"
            },
            {
                "question": "What's a doctor's favorite kind of joke?",
                "options": ["A 'healthy' pun!", "'Medical' humor!", "'Diagnostic' wit!", "'Therapeutic' chuckles!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor join a gym?",
                "options": ["For 'exercise' therapy!", "To 'prescribe' fitness!", "For 'cardio' health!", "To 'diagnose' workouts!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite time of day?",
                "options": ["'Morning' rounds!", "'Noon' diagnoses!", "'Evening' checkups!", "'Night' prescriptions!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor buy a boat?",
                "options": ["For 'water' therapy!", "To 'sail' wellness!", "For 'marine' diagnostics!", "To 'prescribe' calm!"],
                "answer": "b"
            },
            {
                "question": "What's a doctor's favorite part of the body?",
                "options": ["The 'heart' of health!", "The 'brain' of wellness!", "The 'lungs' of life!", "The 'bones' of strength!"],
                "answer": "c"
            },
            {
                "question": "Why did the doctor go skiing?",
                "options": ["For 'snow' therapy!", "To 'diagnose' slopes!", "For 'mountain' health!", "To 'prescribe' fun!"],
                "answer": "d"
            },
            {
                "question": "What's a doctor's favorite type of vacation?",
                "options": ["A 'healing' retreat!", "'Medical' adventures!", "'Wellness' trips!", "'Therapeutic' tours!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor start running?",
                "options": ["For 'cardio' health!", "To 'chase' wellness!", "For 'exercise' therapy!", "To 'prescribe' movement!"],
                "answer": "b"
            },
            {
                "question": "What's a doctor's favorite way to relax?",
                "options": ["A 'massage' session!", "'Medical' mindfulness!", "'Therapeutic' rest!", "'Wellness' retreat!"],
                "answer": "c"
            },
            {
                "question": "Why did the doctor become a writer?",
                "options": ["To 'record' health!", "For 'medical' stories!", "To 'diagnose' with words!", "For 'therapeutic' writing!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite type of art?",
                "options": ["'Medical' illustrations!", "'Diagnostic' paintings!", "'Health' sculptures!", "'Therapeutic' sketches!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor buy a telescope?",
                "options": ["To 'study' stars!", "For 'diagnostic' stargazing!", "To 'prescribe' the cosmos!", "For 'astronomical' health!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite breakfast?",
                "options": ["'Healthy' oatmeal!", "'Medical' eggs!", "'Diagnostic' toast!", "'Therapeutic' smoothies!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor take up painting?",
                "options": ["For 'art' therapy!", "To 'color' health!", "For 'creative' diagnostics!", "To 'prescribe' art!"],
                "answer": "b"
            },
            {
                "question": "What's a doctor's favorite pizza topping?",
                "options": ["'Healthy' veggies!", "'Medical' mushrooms!", "'Diagnostic' cheese!", "'Therapeutic' pepperoni!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor get a pet bird?",
                "options": ["For 'feathery' therapy!", "To 'chirp' health!", "For 'avian' diagnostics!", "To 'prescribe' peace!"],
                "answer": "d"
            },
            {
                "question": "What's a doctor's favorite soup?",
                "options": ["'Healthy' chicken!", "'Medical' mushroom!", "'Diagnostic' vegetable!", "'Therapeutic' tomato!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor join a choir?",
                "options": ["For 'musical' health!", "To 'diagnose' harmony!", "For 'vocal' therapy!", "To 'prescribe' songs!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite plant?",
                "options": ["'Healing' aloe!", "'Medical' mint!", "'Diagnostic' dandelion!", "'Therapeutic' thyme!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor buy new glasses?",
                "options": ["For 'clear' diagnoses!", "To 'see' health!", "For 'optical' wellness!", "To 'prescribe' vision!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite scent?",
                "options": ["'Fresh' mint!", "'Medical' lavender!", "'Diagnostic' eucalyptus!", "'Therapeutic' rosemary!"],
                "answer": "c"
            },
            {
                "question": "Why did the doctor take up yoga?",
                "options": ["For 'flexible' health!", "To 'diagnose' poses!", "For 'mind-body' wellness!", "To 'prescribe' peace!"],
                "answer": "c"
            }
        ]


        return questions;
    }
});
