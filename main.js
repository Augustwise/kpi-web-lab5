// Simple Ukrainian -> Latin transliteration (2010 rules, simplified)
(function () {
  // Mapping for general letters (non word-start cases)
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g',
    'д': 'd', 'е': 'e', 'є': 'ie', 'ж': 'zh', 'з': 'z',
    'и': 'y', 'і': 'i', 'ї': 'i', 'й': 'i', 'к': 'k',
    'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
    'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
    'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ь': '', 'ю': 'iu', 'я': 'ia', '’': '', "'": ''
  };

  // Mappings for letters at the beginning of a word
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

      // Handle special "зг" at word start -> "zgh" (optional rule)
      if (isWordStart(text, i) && lower === 'з' && (text[i + 1] || '').toLowerCase() === 'г') {
        const out = 'zgh';
        result += (ch === ch.toUpperCase()) ? capitalizeLatin(out) : out;
        i += 1; // skip next char 'г'
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

      // Preserve capitalization for single Ukrainian letters
      if (ch !== lower && ch === ch.toUpperCase()) {
        out = capitalizeLatin(out);
      }

      result += out;
    }
    return result;
  }

  // Hook up UI on the transliteration page
  document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('ukr');
    const output = document.getElementById('latin');
    if (!input || !output) return;

    function update() {
      output.value = transliterate(input.value);
    }

    input.addEventListener('input', update);
    update(); // initial fill
  });
})();