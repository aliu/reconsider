function reconsider(text) {
  analyze(text)
    .then(res => res.json())
    .then(data => alert(JSON.stringify(data)));
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
