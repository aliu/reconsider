document.body.onkeydown = function(e) {
  try {
    var message = e.target.firstChild.firstChild.innerText;
    if (e.key === 'Enter' && !e.flag) {
      e.preventDefault();
      e.stopPropagation();
      reconsider(message).then((wait) => {
        if (wait) {
          console.log('Wait! Please reconsider sending this message!');
        } else {
          e.flag = true;
          e.target.dispatchEvent(e);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
