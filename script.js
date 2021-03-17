




$(document).ready(function() {
    var questions = [
        {
            question: "Commonly used data types DO NOT include:",
            choices: ["strings", "booleans", "alerts", "numbers"],
            answer: "alerts",
        },
        {
            question: "Which of these is not a way to save a variable",
            choices: ["vet", "var", "let", "const"],
            answer: "vet",
        },
        {
            question: "What is the element used – and hidden – in code that explains things and makes the content more readable in Javascript?",
            choices: ["Quotations", "Notes", "Comments", "Comparisons"],
            answer: "Comments",
        },
        {
            question: "Where do we link the script tag on our HTML page?",
            choices: ["Script Tag?", "In the CSS stylesheet.", "Top area-ish", "At the bottom"],
            answer: "At the bottom",
        },
        {
            question: "What is the air speed velocity of an unladen swallow",
            choices: ["34 MPH", "African or European?", "I don't know, aaaaahhhhhgggggg", "13 MPH"],
            answer: "African or European?",
        },
    ]
    
    //Initial Variables
    
    var score = 0;
    var currentQuestion = 0
    var counter = 75;
    var interval;
    
    function validateAnswer(selected){
        if (questions[currentQuestion].answer === questions[currentQuestion].choices[selected]){
            rightAnswer()
        } else {
            wrongAnswer()
        }
    }
    
    function rightAnswer(){
        score++
        currentQuestion++
        if (currentQuestion > questions.length -1){
            gameOver()
        } else {
            populateNewQuestion()  
        }
        
    }
    
    function wrongAnswer(){
        counter -= 10
        $('#time').text(counter);
    }

    function gameOver(){
        $('#quizdiv').addClass("hidden");
        $('#submitHighScoreForm').removeClass("hidden");
        clearInterval(interval);
    }
    
    function populateNewQuestion(){
        $('#question').text(questions[currentQuestion].question);
            $('#answer1').text(questions[currentQuestion].choices[0]); 
            $('#answer2').text(questions[currentQuestion].choices[1]); 
            $('#answer3').text(questions[currentQuestion].choices[2]);
            $('#answer4').text(questions[currentQuestion].choices[3]);
    }

    function goToHighScores(){
        $('#quizdiv').addClass("hidden");
        $('#start-quiz').removeClass("hidden");
        $('#submitHighScoreForm').addClass("hidden");
        $('#highScoresButton').removeClass("hidden");
        $('#highScorePage').removeClass("hidden");
        var highScoreArray = JSON.parse(localStorage.getItem("highscore"))
        if (!highScoreArray){
            highScoreArray = []
        }
        $("#leaderBoard").empty()
        
        for (var i = 0; i < highScoreArray.length; i++) {
             $("#leaderBoard").append('<li>' + highScoreArray[i].initials + ' - ' + highScoreArray[i].score + '</li>');
}
        
    }




    $('#start-quiz').click(function(){
        currentQuestion = 0
        counter = 75
        score = 0
        $('#quizdiv').removeClass("hidden");
        $('#start-quiz').addClass("hidden");
        $('#highScoresButton').addClass("hidden");
        $('#highScorePage').addClass("hidden");
        populateNewQuestion()

         interval = setInterval(function() {
            counter--;
            // Display 'counter' wherever you want to display it.
            if (counter <= 0) {
                     clearInterval(interval);
                     gameOver()
                return;
            }else{
                $('#time').text(counter);
              console.log("Timer --> " + counter);
            }
        }, 1000);




    })
    $('#answer1').click(function(){
        validateAnswer(0)
    })
    $('#answer2').click(function(){
        validateAnswer(1)
    })
    $('#answer3').click(function(){
        validateAnswer(2)
    })
    $('#answer4').click(function(){
        validateAnswer(3)
    })
    $('#highScoresSubmit').click(function(){
        
        var highScoreObj = {
            initials: $('#initials').val(), score: score
        
        }
        var highScoreArray = JSON.parse(localStorage.getItem("highscore"))
        if (!highScoreArray){
            highScoreArray = []
        }

        highScoreArray.push(highScoreObj)
        localStorage.setItem('highscore', JSON.stringify(highScoreArray))
        goToHighScores()
    })
    $('#highScoresButton').click(function(){
        goToHighScores()
    })    
})







