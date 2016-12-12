function start () {
  var id = Math.random().toString(36).substring(7);
  console.log(id);
  $.ajax({
    type: "POST",
    url: '/api/strat',
    data: {
      id: id,
      map: 'some map'
    },
    success: function (data) {
      window.location.href = '/' + id;
    },
    dataType: 'json'
  });
}
