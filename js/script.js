(function() {
  var questions = [{
    question: "No episódio em que Chris adota um cachorro para proteger sua casa de roubo, qual foi o nome do cão?",
    choices: [' Rex', ' Junior', ' Francisco', ' Neguinho'],
    correctAnswer: 3
	 }, {
    question: "No episódio em que Chris quer ser DJ e pega emprestado o disco do James Brown de Rochelle, o que acontece ao objeto?",
    choices: [' Ele quebra o disco', ' Ele risca o disco', ' Ele grava outra música por cima do original', ' Ele perde o disco'],
    correctAnswer: 1
	 }, {
    question: "Com qual tipo de roupa Greg costuma dormir?",
    choices: [' Pijama', ' De cueca', ' Sem camisa', ' Fantasias'],
    correctAnswer: 3
	 }, {
    question: "Qual é o objeto que Julius troca por tickets, e ao encostar o carro em frente a casa, o objetos é roubado?",
    choices: [' Um barco', ' Geladeira', ' Piscina', ' Poltrona'],
    correctAnswer: 0
	 }, {
    question: "Qual é o apelido que o Chris recebe ao fazer parte de um grupo de jovens infratores que não frequentam a escola?",
    choices: [' Maninho', ' Suco de Fruta', ' Carinha que mora logo ali', ' Martin Luther King'],
    correctAnswer: 1
	}, {
    question: "No episódio em que Chris precisa passar na prova de álgebra, quem o ensina?",
    choices: [' Rochelle', ' Senhorita Morello', ' Maxine', ' Greg'],
    correctAnswer: 2
	}, {
    question: "No episódio da poliomelite, qual foi o único personagem da familia Rock que não pegou a doença?",
    choices: [' Drew', ' Tonya', ' Rochelle', ' Julius'],
    correctAnswer: 1
	}, {
    question: "Qual é o nome do perfume que o Chris dá a Rochelle no dia das mães e a faz ter uma reação alérgica?",
    choices: [' Puro Shampoo', ' Puro Mandoo', ' Puro Voodoo', ' Puro Vizu'],
    correctAnswer: 2
	}, {
    question: "No episódio em que Chris tem um mal comportamento no restaurante para impressionar a Tasha e grita com Rochelle, o que acontece?",
    choices: [' Rochelle dá um chute no traseiro dele', ' Rochelle tenta afogar ele no aquário', ' Rochelle lança-o pela janela', ' Rochelle vai embora e o deixa para trás'],
    correctAnswer: 0
	}, {
    question: "No episódio em que Rochelle quer ser uma modelo de cabelo, qual é o nome do Penteado que Vanessa faz nela?",
    choices: [' O Maremoto', ' A Tremedeira', ' O Tsunami', ' A Erupção'],
    correctAnswer: 2
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Marque uma das opções para ir para a próxima pergunta!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Pergunta ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Você acertou ' + numCorrect + ' das ' +
                 questions.length + ' perguntas!!!');
    return score;
  }
})();