const sentences = [
`What are we eating today?   
我们今天吃什么?      
pŠto jedemo danas? 
Wat eten we vandaag?
هناكل ايه النهاردة؟
Anong kakainin natin ngayon? 
Qu'est-ce qu'on mange aujourd'hui ? 
Τι τρώμε σήμερα?
 आज हम क्या खा रहे हैं? 
 Cad a bheas muid ag ithe inniu?
Cosa mangiamo oggi 
Weh wi a eat today? 
今日は何を食べますか？
Tutakula nini leo?
Apa kita makan hari ini?
¿Qué comemos hoy?
Co jemy dzisiaj?
O que vamos comer hoje?
Что мы едим сегодня?
วันนี้เรากินอะไร?
Bu gün ne yiyoruz?
Що ми їмо сьогодні?`
];

// Paso 1: Dividir el texto en frases individuales por salto de línea
const phrases = sentences[0]
    .split('\n') // separa por saltos de línea
    .map(str => str.trim()) // elimina espacios sobrantes
    .filter(Boolean); // elimina líneas vacías

// Paso 2: Unir las frases con varios espacios (puedes ajustar la cantidad)
const finalSentence = phrases.join('     '); // 5 espacios

function displaySingleSentence() {
    const divSentences = document.getElementById('tongue_transitions');

    const divSentenceWrapper = document.createElement("div");
    divSentenceWrapper.classList.add('sentence-wrapper');

    const paraSentence = document.createElement("p");
    paraSentence.classList.add('items');
    paraSentence.innerText = finalSentence;

    divSentenceWrapper.appendChild(paraSentence);
    divSentences.appendChild(divSentenceWrapper);
}

// Mostrar la frase
displaySingleSentence();
