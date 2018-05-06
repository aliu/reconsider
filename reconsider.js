function pop (){
  var my_div = document.createElement('div');
  my_div.id = 'popup';
  document.body.appendChild(my_div);
  var text = document.createTextNode('Reconsider:')
  var title = document.createElement('h2');
  title.id = 'title_text';
  title.appendChild(text);
  my_div.appendChild(title);
  var close = document.createElement('BUTTON');
  close.id = 'close';
  close.onclick = function(){
    my_div.style.display = "none";
  };
  var close_text = document.createTextNode('x');
  close.appendChild(close_text);
  my_div.appendChild(close);
  var reminder = document.createTextNode('Are you sure you wanna say this?');
  var p = document.createElement('p');
  p.id = 'warning';
  p.appendChild(reminder);
  my_div.appendChild(p);
}



function reconsider(text, callback) {
  analyze(text)
    .then(res => res.json())
    .then(data => {
      for (sentence of data.sentences) {
        if (sentence.sentiment.score <= -0.4 && sentence.sentiment.magnitude >= 0.4) {
          callback();
          return;
        }
      }
    });
}

function analyze(text) {
  return fetch('https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyBu7B2xRdd3jFoA1sh4qI0ULkkhthvQPEs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      document: {
        content: text,
        type: 'PLAIN_TEXT'
      }
    }),
  });
}
