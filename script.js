function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = ""; // Clear previous result

  if (!word) {
    resultDiv.innerHTML = "<p class='error'>Please enter a word.</p>";
    return;
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found.");
      }
      return response.json();
    })
    .then(data => {
      const entry = data[0];
      const phonetics = entry.phonetics.find(p => p.audio) || {};
      const meanings = entry.meanings;

      let html = `
        <h2>${entry.word}</h2>
        ${phonetics.text ? `<p><strong>Phonetics:</strong> ${phonetics.text}</p>` : ""}
        ${phonetics.audio ? `<audio controls src="${phonetics.audio}"></audio>` : ""}
        <h3>Definitions:</h3>
      `;

      meanings.forEach(meaning => {
        html += `<p><strong>${meaning.partOfSpeech}</strong></p>`;

        meaning.definitions.slice(0, 3).forEach((def, i) => {
          html += `
            <div class="definition-block">
              <p><strong>${i + 1}.</strong> ${def.definition}</p>
              ${def.example ? `<p><em>Example:</em> "${def.example}"</p>` : ""}
            </div>
          `;
        });
      });

      resultDiv.innerHTML = html;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
    });
}

