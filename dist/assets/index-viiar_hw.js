(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const s=[`What are we eating today?   
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
Що ми їмо сьогодні?`],c=s[0].split(`
`).map(i=>i.trim()).filter(Boolean),d=c.join("     ");function u(){const i=document.getElementById("tongue_transitions"),n=document.createElement("div");n.classList.add("sentence-wrapper");const o=document.createElement("p");o.classList.add("items"),o.innerText=d,n.appendChild(o),i.appendChild(n)}u();
