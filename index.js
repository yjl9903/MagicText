function magic(
  dom,
  { text = undefined, interval = 200, event = undefined } = {}
) {
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const chTable = lowerCase + upperCase;

  const fullText = text ? text : dom.innerText;
  let curStr = '';
  let stop = true;

  const rePaint = () => {
    let s = curStr;
    for (let i = s.length; i < fullText.length; i++) {
      s += chTable[Math.floor(Math.random() * chTable.length)];
    }
    dom.innerText = s;
    if (!stop) {
      requestAnimationFrame(rePaint);
    }
  };

  const fn = () => {
    if (!stop) return;
    dom.innerText = '';
    curStr = '';
    stop = false;

    requestAnimationFrame(rePaint);

    for (let i = 0; i < fullText.length; i++) {
      setTimeout(() => {
        curStr += fullText[i];
      }, interval * (i + 1));
    }

    setTimeout(() => (stop = true), interval * (fullText.length + 1));
  };

  if (event) {
    dom.addEventListener(event, fn);
  }
  return fn;
}

window.magic = magic;
