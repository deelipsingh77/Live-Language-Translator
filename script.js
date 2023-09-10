document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '7eff0beaa71c4fd584b09cf9a125138e';
    const sourceText = document.getElementById('source-text');
    const targetText = document.getElementById('translated-text');
    const sourceLanguage = document.getElementById('source-language');
    const targetLanguage = document.getElementById('target-language');
    const swapButton = document.getElementById('swap-button');

    function translateText() {
        fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${sourceLanguage.value}&to=${targetLanguage.value}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': apiKey,
                'Ocp-Apim-Subscription-Region': 'centralindia'
            },
            body: JSON.stringify([{ 'text': sourceText.value }])
        })
        .then(response => response.json())
        .then(data => {
            const translatedText = data[0].translations[0].text;
            targetText.value = translatedText;
        })
        .catch(error => {
            console.error('Translation error:', error);
        });
    }

    sourceText.addEventListener('input', translateText);
    swapButton.addEventListener('click', () => {
        const tempValue = sourceLanguage.value;
        sourceLanguage.value = targetLanguage.value;
        targetLanguage.value = tempValue;

        const tempText = sourceText.value;
        sourceText.value = targetText.value;
        targetText.value = tempText;

        translateText();
    });
});
