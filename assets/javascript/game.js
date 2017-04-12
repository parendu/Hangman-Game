 (function() {
        "use strict";
        var availableLetters, songs, animal, guessInput, guess, lettersGuessed, lettersMatched, output, man, letters, tries, currentSinger, numLettersMatched, messages, wins, losses;

        function setup() {
            /* start configuration optsions */
            availableLetters = "abcdefghijklmnopqrstuvwxyz";
            tries = 5;
            wins = 0;
            losses = 0;
            animal = ["cat", "dog", "cow", "reindeer"];
            songs = [{
                    filename: "abc.mp3",
                    singer: "abc",
                    album: "Album_nice"
                }, {
                    filename: "def1.mp3",
                    singer: "ladygaga",
                    album: "Album_latest"
                }, {
                    filename: "def2.mp3",
                    singer: "jackson",
                    album: "Album_new"
                }, {
                    filename: "def3.mp3",
                    singer: "britney",
                    album: "Album_old"
                }
                // and so on...
            ];
            messages = {
                win: 'You win!',
                lose: 'Game over!',
                guessed: ' already guessed, please try again...',
                validLetter: 'Please enter a letter from A-Z'
            };
            /* end config options */

            lettersGuessed = lettersMatched = '';
            numLettersMatched = 0;

            /* choose a singer */
            // currentSinger = animal[Math.floor(Math.random() * animal.length)];

            var randomIndex = Math.floor(Math.random() * songs.length);
            var song = songs[randomIndex];
            document.querySelector("source").src = song.filename;
            //document.getElementById("songSingerDisplay").textContent = song.singer;
            //document.getElementById("songAlbum").textContent = song.album;


            currentSinger = song.singer;
            console.log("song: " + song.filename);
            console.log("singer: " + song.singer);
            console.log("singer type: " + typeof currentSinger);



            /* make #man and #output blank, create vars for later access */
            output = document.getElementById("output");
            man = document.getElementById("man");
            guessInput = document.getElementById("letter");

            man.innerHTML = 'You have ' + tries + ' lives remaining';
            output.innerHTML = '';

            document.getElementById("letters").value = '';

            /* set up display of letters in current word */
            letters = document.getElementById("letters");
            letters.innerHTML = '<li class="current-word"></li>';

            var letter, i;
            for (i = 0; i < currentSinger.length; i++) {
                letter = '<li class="letter letter' + currentSinger.charAt(i).toUpperCase() + '">' + currentSinger.charAt(i).toUpperCase() + '</li>';
                letters.insertAdjacentHTML('beforeend', letter);
                console.log(letter);
            }

        } // setup function closing

        function startOver() {
            /* start configuration optsions */
            availableLetters = "abcdefghijklmnopqrstuvwxyz";
            tries = 5;
            //wins = 0;
            //losses = 0;
            animal = ["cat", "dog", "cow", "reindeer"];
            messages = {
                win: 'You win $5000!',
                lose: 'hmm..Try again!',
                guessed: ' already guessed, please try again...',
                validLetter: 'Please enter a letter from A-Z'
            };
            /* end config options */

            lettersGuessed = lettersMatched = '';
            numLettersMatched = 0;

            /* choose a singer */
            //currentSinger = animal[Math.floor(Math.random() * animal.length)];

            var randomIndex = Math.floor(Math.random() * songs.length);
            var song = songs[randomIndex];
            document.querySelector("source").src = song.filename;
            //document.getElementById("songSinger").textContent = song.singer;
            //document.getElementById("songAlbumDisplay").textContent = song.album;


            currentSinger = song.singer;

            console.log("guessed singer " + currentSinger);



            /* make #man and #output blank, create vars for later access */
            output = document.getElementById("output");
            man = document.getElementById("man");
            guessInput = document.getElementById("letter");

            man.innerHTML = 'You have ' + tries + ' lives remaining';
            output.innerHTML = '';

            document.getElementById("letters").value = '';

            /* set up display of letters in current word */
            letters = document.getElementById("letters");
            letters.innerHTML = '<li class="current-word"></li>';

            var letter, i;
            for (i = 0; i < currentSinger.length; i++) {
                letter = '<li class="letter letter' + currentSinger.charAt(i).toUpperCase() + '">' + currentSinger.charAt(i).toUpperCase() + '</li>';
                letters.insertAdjacentHTML('beforeend', letter);
                console.log("display letter: " + letter);
            }

        }
        /* Continue game after win or loss, also display message */
        function gameOver(win) {
            if (win) {
                output.innerHTML = messages.win;
                output.classList.add('win');
                wins++;
                document.getElementById("wins").innerHTML = (wins);
                //startOver();

            } else {
                output.innerHTML = messages.lose;
                output.classList.add('error');
                losses++;
                document.getElementById("losses").innerHTML = (losses);
                console.log("losses: " + losses);
               // document.getElementById("songSinger").innerHTML = (currentSinger);
                //startOver();
            }
            startOver();
        }

        /* Provide hint */
        function giveHint() {
            document.getElementById("songAlbumDisplay").innerHTML = song.album;
        }
        /* Start game - should ideally check for existing functions attached to window.onload */
        window.onload = setup();

        /* buttons */

        document.getElementById("restart").onclick = setup;


        document.onkeyup = function(e) { //1 open
            guess = String.fromCharCode(event.keyCode).toLowerCase();
            console.log("press letter: " + guess);
            //guess = guessInput.value;
            /* does guess have a value? if yes continue, if no, error */
            if (guess) { //2 open
                /* is guess a valid letter? if so carry on, else error */

                if (availableLetters.indexOf(guess) > -1) { //3rd open

                    /* has it been guessed (missed or matched) already? if so, abandon & add notice */


                    if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) { //4 open
                        output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                        output.classList.add("warning");
                    } //4 close

                    /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
                    else if (currentSinger.indexOf(guess) > -1) { //5 open
                        var lettersToShow;
                        lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());
                        console.log("lettersToShow: " + lettersToShow);

                        for (var i = 0; i < lettersToShow.length; i++) { //6 open
                            lettersToShow[i].classList.add("correct");
                        } //6 close

                        /* check to see if letter appears multiple times */
                        for (var j = 0; j < currentSinger.length; j++) { //7 open
                            if (currentSinger.charAt(j) === guess) { //8 open
                                numLettersMatched += 1;
                            } //8 close
                        } // 7 close

                        lettersMatched += guess;
                        if (numLettersMatched === currentSinger.length) { //9 open
                            gameOver(true);

                        } //9 close

                    } // elseif closing                                               5 close
                    else { //10 open
                        lettersGuessed += guess;
                        tries--;
                        man.innerHTML = 'You have ' + tries + ' lives remaining';
                        if (tries === 0) gameOver();
                        document.getElementById("tries").innerHTML = (tries);

                    } //10 close

                } // valid letter or not                                       3rd close                                       
                /* not a valid letter, error */
                else { //11 open
                    output.classList.add('error');
                    output.innerHTML = messages.validLetter;
                } //11 close

            } //2 close
            else { //12 open               

                output.classList.add('error');
                output.innerHTML = messages.validLetter;
            } //12 close

            return false;

        }; //function onkeyup                                                    //  1 close main guess closing
    }()); //main function 1st line