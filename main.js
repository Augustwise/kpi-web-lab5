(function () {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g',
    'д': 'd', 'е': 'e', 'є': 'ie', 'ж': 'zh', 'з': 'z',
    'и': 'y', 'і': 'i', 'ї': 'i', 'й': 'i', 'к': 'k',
    'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
    'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
    'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ь': '', 'ю': 'iu', 'я': 'ia', '’': '', "'": ''
  };

  // letters at the beginning of a word
  const startMap = {
    'є': 'ye', 'ю': 'yu', 'я': 'ya', 'ї': 'yi', 'й': 'y'
  };

  function isWordStart(text, i) {
    if (i === 0) return true;
    const prev = text[i - 1];
    // If previous char is a letter or digit or apostrophe, it's not a start
    return !(/[A-Za-zА-Яа-яЁёЄєІіЇїЙйҐґ0-9’']/).test(prev);
  }

  function capitalizeLatin(s) {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function transliterate(text) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const lower = ch.toLowerCase();

      if (isWordStart(text, i) && lower === 'з' && (text[i + 1] || '').toLowerCase() === 'г') {
        const out = 'zgh';
        result += (ch === ch.toUpperCase()) ? capitalizeLatin(out) : out;
        i += 1;
        continue;
      }

      // Word-start specific letters
      let out = null;
      if (isWordStart(text, i) && startMap[lower]) {
        out = startMap[lower];
      } else if (map.hasOwnProperty(lower)) {
        out = map[lower];
      } else {
        out = ch; // characters like spaces, punctuation, latin letters, numbers
      }

      if (ch !== lower && ch === ch.toUpperCase()) {
        out = capitalizeLatin(out);
      }

      result += out;
    }
    return result;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('ukr');
    const output = document.getElementById('latin');
    if (!input || !output) return;

    function update() {
      output.value = transliterate(input.value);
    }

    input.addEventListener('input', update);
    update();
  });
})();