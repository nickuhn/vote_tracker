$(function () {
  var kittens = [];

  function Kitten(path) {
    this.source = path;
    this.votes = Math.floor(Math.random() * 1000);
  }

  var chooseRandomPics = function() {
    var index = Math.floor(Math.random() * kittens.length);
    return kittens[index].source;
  };

  for (var i = 1; i < 15; i++) {
    kittens.push(new Kitten('contestants/' + i + '.jpg'));
  }

  $('.voteable').on('click', function(){
    var displayVotes = 0;
    var hateVotes = 0;
    var catOneId = $(this).children().attr('src');
    var catTwoId = $(this).siblings().children().attr('src');
    for (var i = 0; i < kittens.length; i++) {
      if (kittens[i].source == catTwoId) {
        hateVotes = kittens[i].votes;
      }
    }
    for (var j = 0; j < kittens.length; j++) {
      if (kittens[j].source == catOneId) {
        kittens[j].votes ++;
        displayVotes = kittens[j].votes;
      }
    }
    $(this).find('p').text('Happy and cuddled');
    $(this).siblings().find('p').text('So sad and lonely.');
    $(this).find('img').css({'border': '15px solid #CC4452'});
    $(this).siblings().find('img').css({'border': '15px solid #F9E4AD'});
    $(this).append('<h3 id="cat-love">I have ' + displayVotes + ' vote(s). I feel so loved.</h3>');
    $(this).siblings('div').append('<h3 id="cat-hate"> You may not love me, but ' + hateVotes + ' people with better taste do!');
    $('.new-cat-button').fadeIn(500);
  });

  $('.new-cat-button').on('click', function(){
    $('.new-cat-button').hide();
    $('#cat-love').remove();
    $('#cat-hate').remove();
    $('img').css({'border': '15px solid #F9E4AD'});
    $('.voteable').on('click');
    var pickCat1 = chooseRandomPics();
    var pickCat2 = chooseRandomPics();
    while(pickCat1 == pickCat2){
      pickCat2 = chooseRandomPics();
    }
    $('.cat1').attr('src', pickCat1);
    $('.cat2').attr('src', pickCat2);
    $('.cat-caption').text('Click to vote for me!');
  });

});
