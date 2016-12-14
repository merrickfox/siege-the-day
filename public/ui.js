var layers = [
  {
    visible: true,
    data: []
  },
  {
    visible: true,
    data: []
  },
  {
    visible: true,
    data: []
  },
];

var users = [];
var username;

var currentLayer = 0;
var currentMapLevel = 0;

function toggleLayer(idx) {
  layers[idx].visible = !layers[idx].visible
  calculateDisplayed();
}

function setCurrent(idx) {
  currentLayer = idx;
}

function setLevel(level) {
  currentMapLevel = level;
  canvas.setBackgroundImage("./maps/bank/" + level + ".jpg", canvas.renderAll.bind(canvas), {
    backgroundImageStretch: false
  });

  calculateDisplayed();
}

function calculateDisplayed (level) {
  var canvasObjects = canvas._objects;
  _.forEach(canvasObjects, function (obj) {
    var objLayer = obj.layer;
    if (obj.map_level === currentMapLevel && layers[objLayer].visible) {
      obj.visible = true;
    } else {
      obj.visible = false;
    }
  })
  canvas.renderAll();
}

var mapInfo = {
  bank: {
    levels: 4
  }
}
var map = mapInfo.bank;

function submitUsername() {
  username = $('.username-field').val();
  $('.username-modal').fadeOut(500);
  $('.veil').fadeOut(500);
  joinRoom();
}

function populateUserList() {
  var color = '#'; // hexadecimal starting symbol
  var letters = ['2f71d4','5f2fd4','d42fc0','d42f4d','2f97d4','2fd488','9cd42f','d49a2f', 'd42f2f']; //Set your colors here
  var userEl = [];
  $.each(users, function(index, value) {
    var col = color + letters[Math.floor(Math.random() * letters.length)];
    userEl.push($('<div />', {
      'text': value,
      'class': 'user',
      'style': 'background-color: ' + col
    }))

  });
  $('.users-container').empty().append(userEl);
}

document.addEventListener("DOMContentLoaded", function() {
  populateUserList();

  $('.username-field').keyup(function() {
   var value = $(this).val();
   if (value.length > 0) {
    $('#username-button').attr("disabled", false);
   } else {
    $('#username-button').attr("disabled", true);
   }
  });
})
