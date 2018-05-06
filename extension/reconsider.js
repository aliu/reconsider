function reconsider(text) {
  return analyze(text)
    .then(res => res.json())
    .then(data => {
      for (sentence of data.sentences) {
        if (sentence.sentiment.score <= -0.5 && sentence.sentiment.magnitude >= 0.5) {
          return Promise.resolve(true);
        }
      }
      return Promise.resolve(false);
    })
    .catch(error => Promise.reject(error));
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
