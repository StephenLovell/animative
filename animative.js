// get points of polygons using regex
const getCoordinates = (polygon) => {
  return polygon.getAttribute("points");
};

const createPolygonPointsObject = (polygons) => {
  const polygonsArray = [];

  polygons.forEach((polygon, i) => {
    const coordinates = getCoordinates(polygon);

    polygonsArray.push({
      fill: polygon.getAttribute("fill"),
      points: coordinates,
    });
  });

  return polygonsArray;
}

function getSequenceLength(sequenceContainer) {
  var length = document.querySelector(sequenceContainer).querySelectorAll("svg").length;
  return length;
}

function numsToWords(n){

  //Only works for numbers between 0 and 999999
    var num = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
    var tens = "twenty thirty forty fifty sixty seventy eighty ninety".split(" ");

    if (n < 20) return num[n];
    var digit = n%10;
    if (n < 100) return tens[~~(n/10)-2] + (digit? "-" + num[digit]: "");
    if (n < 1000) return num[~~(n/100)] +" hundred" + (n%100 == 0? "": " " + numsToWords(n%100));
    return numsToWords(~~(n/1000)) + " thousand" + (n%1000 != 0? " " + numsToWords(n%1000): "");
}

function animate(fromSVG,toSVG,iterator) {

  var polygons = document.querySelector(toSVG).querySelectorAll("polygon");

    timeline.reverse();
    timeline = anime.timeline({
        // autoplay: false,
        direction: 'normal',
        loop: false,
        complete: function(anim) {
          console.log(i);
        },
      });

  toPolygonArray = createPolygonPointsObject(polygons);

  toPolygonArray.forEach(function(polygon, i) {

    var el = document.querySelector(fromSVG).querySelectorAll("polygon")[i];

    timeline.add({
      targets: el,
      points: [
        { value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369'},
        { value: polygon.points }
        ],
      fill: [
        { value: polygon.fill },
        ],
      easing: 'easeInOutQuad',
      duration: 2000,
      offset: 1000 + 10 * i,
    });
  });
}

function updateFrame(direction,iterator,length) {

  if(length == undefined) {
    var sequenceLength = getSequenceLength("#sequence");
    length = sequenceLength;
  }

  if(iterator == undefined) {
    iterator = i;
  }

  if (iterator == length){
    console.log('reached the last frame | '+iterator+' |');
  }

  if (direction == 'next') {
    // cycle forward
    if (iterator > 1 && iterator < length) {

      var previousFrame = '#'+numsToWords(iterator - 1);
      var startFrame = '#'+numsToWords(iterator);
      var endFrame = '#'+numsToWords(iterator + 1);

      timeline.restart();

      i++;
      animate(startFrame,endFrame);
      document.querySelector(previousFrame).classList.add("hidden");
      document.querySelector(startFrame).classList.remove("hidden");
      document.querySelector(endFrame).classList.add("hidden");

      console.log(startFrame + ' to ' + endFrame);
    }
    // handles the first frame allows you to turn around
    if (iterator == 1 && iterator < length) {

      var previousFrame = '#'+numsToWords(iterator - 1);
      var startFrame = '#'+numsToWords(iterator);
      var endFrame = '#'+numsToWords(iterator + 1);
      timeline.restart();
      i++;
      animate(startFrame,endFrame);
      document.querySelector(endFrame).classList.add("hidden");
      document.querySelector(startFrame).classList.remove("hidden");

      //ensures you aren't querying nothing if your on the first frame
      if(document.querySelector(previousFrame)) {
        document.querySelector(previousFrame).classList.add("hidden");
      }

      console.log(startFrame + ' to ' + endFrame);
    }
  }

  if (direction == 'prev') {
    //cycle backwards
    if (iterator > 1 && iterator < length) {

      var previousFrame = '#'+numsToWords(iterator + 1);
      var startFrame = '#'+numsToWords(iterator);
      var endFrame = '#'+numsToWords(iterator - 1);
      timeline.restart();

      i--;
      animate(startFrame,endFrame);
      document.querySelector(endFrame).classList.add("hidden");
      document.querySelector(previousFrame).classList.add("hidden");
      document.querySelector(startFrame).classList.remove("hidden");

      console.log(startFrame + ' to ' + endFrame);
      console.log("new round begins");
    }
    // handles the last frame allows you to turn around
    if (iterator == length) {
      console.log('end of the road go back');

      var startFrame = '#'+numsToWords(iterator);
      var endFrame = '#'+numsToWords(iterator - 1);
      timeline.restart();
      i--;

      animate(startFrame,endFrame);
      document.querySelector(endFrame).classList.add("hidden");
      document.querySelector(startFrame).classList.remove("hidden");

      console.log(startFrame + ' to ' + endFrame);
      console.log('last is playing')

    }
  }
}

function initSequence() {
  //run initial animation
  animate("#one","#two");

}

////////////////////////////////////

//start iterator at
var i = 1;
var sequenceLength = getSequenceLength("#sequence");
var timeline = anime.timeline({
  autoplay: false,
  direction: 'normal',
  loop: false,
  complete: function(anim) {
    console.log(i);
  },
});

// initSequence();

document.querySelector('#two-controls .next').onclick = function() {

  timeline.play();
  updateFrame('next');

};

document.querySelector('#two-controls .prev').onclick = function() {

  timeline.play();
  updateFrame('prev');

};
