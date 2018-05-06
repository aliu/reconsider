var allow = false;

document.body.onkeydown = function(e) {
  try {
    var message = e.target.firstChild.firstChild.innerText;
    var element = e.target.parentElement.parentElement.parentElement;
    element.classList.add('tooltip');
    if (e.key === 'Enter' && !e.flag) {
      e.preventDefault();
      e.stopPropagation();
      reconsider(message).then((wait) => {
        if (wait && !allow) {
          element.classList.add('animation');
          setTimeout(() => {
            element.classList.remove('animation');
            allow = true;
          }, 5000);
        } else {
          e.flag = true;
          allow = false;
          e.target.dispatchEvent(e);
        }
      }).catch(error => console.log(error));
    }
  } catch (error) {
    e.preventDefault();
    e.stopPropagation();
    console.log(error);
  }
};
