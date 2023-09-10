document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '7eff0beaa71c4fd584b09cf9a125138e';

    const translateButton = document.getElementById('translate-button');
    translateButton.addEventListener('click', translateText);

    function translateText() {
        const sourceText = document.getElementById('source-text').value;
        const targetLanguage = document.getElementById('target-language').value;

        fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=${targetLanguage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': apiKey,
                'Ocp-Apim-Subscription-Region': 'centralindia'
            },
            body: JSON.stringify([{ 'text': sourceText }])
        })
        .then(response => response.json())
        .then(data => {
            const translatedText = data[0].translations[0].text;
            document.getElementById('translated-text').value = translatedText;
        })
        .catch(error => {
            console.error('Translation error:', error);
        });
    }
});
