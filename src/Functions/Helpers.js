const shuffle = array => {

  var i = 0,
      j = 0,
      temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {

    j = Math.floor(Math.random() * (i + 1));

    temp = array[i];

    array[i] = array[j];

    array[j] = temp;

  }

  return array;

};

const prettify = () => {

  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;

  script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);

}

export { shuffle, prettify };