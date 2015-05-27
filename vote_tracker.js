$(function () {
  var kittens = [];
  var voteSubmitted = false;

  function Kitten(path) {
    this.source = path;
    this.votes = 0;
  }

  //AJAX request that is used to build the kitten array.
  $.ajax({'url': 'https://api.imgur.com/3/album/antzU.json',
    'beforeSend': function(xhr) {
      xhr.setRequestHeader('Authorization', 'Client-ID 6324b24166570d9');
    },
    success: function(data){
      for (var i = 0; i < data.data.images.length; i++) {
        kittens.push(new Kitten(data.data.images[i].link));
      }
    }
  });

  var chooseRandomPics = function() {
    var index = Math.floor(Math.random() * kittens.length);
    return kittens[index].source;
  };

  //Take in vote by clicking on picture, add vote to object value
  //Update DOM with new text based on vote and highlight winning pic
  $('.voteable').on('click', function(){
    if (!voteSubmitted) {
      kittens = JSON.parse(localStorage.getItem('kittens'));
      voteSubmitted = true;
      var displayVotes = 0;
      var hateVotes = 0;
      var $this = $(this);
      var $siblings = $this.siblings();
      var catOneId = $this.children().attr('src');
      var catTwoId = $siblings.children().attr('src');
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
      $this.find('p').text('Happy and cuddled');
      $siblings.find('p').text('So sad and lonely.');
      $this.find('img').css({'border': '15px solid #CC4452'});
      $siblings.find('img').css({'border': '15px solid #F9E4AD'});
      $this.append('<h3 id="cat-love">I have ' + displayVotes + ' vote(s). I feel so loved.</h3>');
      $this.siblings('div').append('<h3 id="cat-hate"> You may not love me, but ' + hateVotes + ' people with better taste do!');
      $('.new-cat-button').fadeIn(750);
      localStorage.setItem('kittens', JSON.stringify(kittens));
    }
  });

  //Clear DOM changes made by voting and chooses two more random cats.
  $('.new-cat-button').on('click', function(){
    $(this).hide();
    $('#cat-love, #cat-hate').remove();
    $('img').css({'border': '15px solid #F9E4AD'});
    $('.cat-caption').text('Click to vote for me!');
    voteSubmitted = false;

    var pickCat1 = chooseRandomPics();
    var pickCat2 = chooseRandomPics();
    while(pickCat1 == pickCat2){
      pickCat2 = chooseRandomPics();
    }
    $('.cat1').attr('src', pickCat1).hide().fadeIn(400);
    $('.cat2').attr('src', pickCat2).hide().fadeIn(400);
  });
});
