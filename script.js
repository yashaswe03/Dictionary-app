// script.js
function searchWord() {
  const word = document.getElementById('wordInput').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(data => {
      const definition = data[0].meanings[0].definitions[0].definition;
      const partOfSpeech = data[0].meanings[0].partOfSpeech;
      const phonetic = data[0].phonetic || "";

      resultDiv.innerHTML = `
        <h2>${data[0].word} ${phonetic}</h2>
        <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
        <p><strong>Definition:</strong> ${definition}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}
