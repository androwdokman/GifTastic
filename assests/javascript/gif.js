$(document).ready(function() {

    var topics = ['skate', 'dogs', 'music', 'food', 'anime', 'video games', 'funny'];
    var stillImgUrl = '';
    var animatedImgURL = '';
    var gifCondition = '';
    var still = '';
    var animateUrl = '';
    var createBtn = function() {
        $('#btn-section').empty();

        for (var i = 0; i < topics.length; i++) {
            var newBtn = $('<button>');
            newBtn.attr('data-name', topics[i]);
            newBtn.attr('class', 'gif btn-success');
            newBtn.text(topics[i]);
            $('#btn-section').append(newBtn);
            console.log(i);

        }

    }


    var sumbit = function() {
        $('sumbit-btn').on('click', function(event) {
            event.preventDefault();
            var inputval = $('userinput').val();
            topics.push(inputval);
            createBtn();
            console.log(inputval);
            console.log(topics);

        });
    }

    var displayGif = function() {
        var btnVal = $(this).data('name');
        var apiKey = 'dc6zaTOxFJmzC';
        var apiUrl = 'http://api.giphy.com/v1/gifs/search?q=' + btnVal + '&api_key=' + apiKey;
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).done(function(response) {
            $('.gifSection').empty();
            for (var i = 0; i < 7; i++) {

                stillImgURL = response['data'][i]['images']['fixed_height_still']['url'];
                animatedImgURL = response['data'][i]['images']['fixed_height']['url'];

                var newImg = $('<img>');

                newImg.attr('data-still', stillImgUrl);
                newImg.attr('data-animate', animatedImgURL);
                newImg.attr('src', stillImgUrl);
                newImg.attr('data-type', 'still');
                newImg.addClass('gifImage');

                $('.gifSection').append(newImg);
            }
            console.log('The button value is = ' + btnVal);
            console.log('Still image Url =' + stillImgUrl);
            console.log('Still image Url =' + animatedImgURL);
        });
    }
    var gifAnimate = function() {

        gifCondition = $(this).data('type');

        stillUrl = $(this).data('still');

        animateUrl = $(this).data('animate');

        if (gifCondition === 'still') {

            $(this).attr('src', animateUrl);

            $(this).data('type', 'animate');

            console.log(gifCondition);


        } else if (gifCondition === 'animate') {

            $(this).attr('src', stillUrl);
            $(this).data('type', 'still');

            console.log(true);



        }

    }


    createBtn();
    sumbit();
    $(document).on('click', 'gif', displayGif);
    $(document).on('click', 'gifImage', gifAnimate);
});