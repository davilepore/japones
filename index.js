let pecas = document.querySelectorAll(".peca")
let telaFinal = document.querySelector(".tela-final");
let telaPrincipal = document.querySelector("#tela-principal")
let telaInicial = document.querySelector("#tela-inicial")
let telaLogin = document.querySelector(".login")
let placar = document.querySelector(".placar")
let total = 0;
let numUramakis = 0;
let numSashimis = 0;
let numJoes = 0;
let numHots = 0;
let numHarumakis = 0;
let numTemakis = 0;
let numNigiris = 0;
let numEntradas =  0

pecas.forEach((peca) => {
    let botoesMais = peca.querySelector(".botoesmais")
    let botoesMenos = peca.querySelector(".botoesmenos")
    let qtd = peca.querySelector("span")



    botoesMais.addEventListener('click', (event) => {
        total++;
        qtd.innerHTML = Number(qtd.innerHTML) + 1;
        let idBotao = event.target.id;

        switch (idBotao) {
            case 'botao-mais-uramaki':
                numUramakis++;
                break;
            case 'botao-mais-sashimi':
                numSashimis++;
                break;
            case 'botao-mais-joe':
                numJoes++;
                break;
            case 'botao-mais-hot':
                numHots++;
                break;
            case 'botao-mais-harumaki':
                numHarumakis++;
                break;
            case 'botao-mais-temaki':
                numTemakis++;
                break;
            case 'botao-mais-nigiri':
                numNigiris++;
                break;
            case 'botao-mais-entradas':
                numEntradas++;
                break;

        }

    })

    botoesMenos.addEventListener('click', (event) => {
        let valor = Number(qtd.innerHTML);
        if (valor > 0) {
            total--;
            qtd.innerHTML = valor - 1;
        }
        let idBotao = event.target.id;

        switch (idBotao) {
            case 'botao-menos-uramaki':
                numUramakis++;
                break;
            case 'botao-menos-sashimi':
                numSashimis++;
                break;
            case 'botao-menos-joe':
                numJoes++;
                break;
            case 'botao-menos-hot':
                numHots++;
                break;
            case 'botao-menos-harumaki':
                numHarumakis++;
                break;
            case 'botao-menos-temaki':
                numTemakis++;
                break;
            case 'botao-menos-nigiri':
                numNigiris++;
                break;
            case 'botao-mais-entradas':
                numEntradas++;
                break;
        }
    })

})

const somar = () => {
    let valorPecas = document.querySelectorAll(".peca span")
    let soma = 0

    valorPecas.forEach((valor) => {
        soma += Number(valor.textContent);
    })

}
const comecar = () => {


    telaInicial.classList.add("none");
    telaPrincipal.classList.remove("none")
}

document.querySelector("#botao-comecar").addEventListener('click', comecar);

const atribuirValores = () => {
    let spanUramakis = document.querySelector("#total-uramaki")
    let spanSashimis = document.querySelector("#total-sashimi")
    let spanJoes = document.querySelector("#total-joe")
    let spanHots = document.querySelector("#total-hot")
    let spanHarumakis = document.querySelector("#total-harumaki")
    let spanTemakis = document.querySelector("#total-temaki")
    let spanNigiris = document.querySelector("#total-nigiri")
    let spanTotal = document.querySelector("#total-pecas")
    let spanEntradas = document.querySelector("#total-entradas")

    spanUramakis.innerHTML = numHarumakis;
    spanSashimis.innerHTML = numSashimis;
    spanJoes.innerHTML = numJoes
    spanHots.innerHTML = numHots
    spanHarumakis.innerHTML = numHarumakis
    spanTemakis.innerHTML = numTemakis
    spanNigiris.innerHTML = numNigiris
    spanEntradas.innerHTML = numEntradas
    spanTotal.innerHTML = total
}

const finalizar = () => {

    somar()
    atribuirValores()
}

document.querySelector("#btn-registrar").addEventListener('click', function () {
    if (document.querySelector("#nomeUsuario").value !== '') {
        telaFinal.classList.remove("none")
        telaLogin.classList.add("none")
        telaPrincipal.classList.add("none")
    }
})

document.querySelector("#verRanking").addEventListener("click", function(){
    telaFinal.classList.add("none")
    placar.classList.remove("none")
})

document.querySelector("#verRanking2").addEventListener("click", function(){
    telaInicial.classList.add("none")
    placar.classList.remove("none")
})

document.querySelector("#botao-finalizar").addEventListener('click', function () {
    telaLogin.classList.remove("none")
    telaPrincipal.classList.add("none")
    finalizar()
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from
    "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getDocs, doc, getDoc } from
    "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { query, orderBy } from
    "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDPVrttQQaNwsHLbViglrEwQBKmjZet4HE",
    authDomain: "japones-f9fb1.firebaseapp.com",
    projectId: "japones-f9fb1",
    storageBucket: "japones-f9fb1.firebasestorage.app",
    messagingSenderId: "551925307358",
    appId: "1:551925307358:web:6dcf3c24b1a8767ba8ef4f",
    measurementId: "G-JGVBZEC4V5"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = getFirestore(app);


async function salvarLogin(nome) {
    try {
        await addDoc(collection(db, "usuarios"), {
            nome: nome,
            data: new Date(),
            total: total
        });

        console.log("Nome salvo com sucesso!");
        exibirRanking();
    } catch (erro) {
        console.error("Erro ao salvar:", erro);
    }
}


function registrar() {
    let nome = document.querySelector("#nomeUsuario").value;

    if (nome.length < 2) {
        alert("Digite um nome válido!");
        return;
    }

    salvarLogin(nome);
}

document.querySelector("#btn-registrar").addEventListener("click", registrar);



async function exibirRanking() {
    const box = document.querySelector(".placar");
    while (box.firstChild) {
        box.removeChild(box.firstChild);
    }

    const titulo = document.createElement("h3");
    titulo.textContent = "Ranking";
    box.appendChild(titulo);

  

    const q = query(
        collection(db, "usuarios"),
        orderBy("total", "desc")
    );

    const snapshot = await getDocs(q);

    let pos = 1;

    snapshot.forEach(doc => {
        const dados = doc.data();
        const div = document.createElement("div");
        const h2lugar = document.createElement("p")
        const h2nome = document.createElement("p")
        const h2total = document.createElement("p")

        h2lugar.textContent = `${pos}º Lugar`;
        h2nome.textContent = `${dados.nome}`
        h2total.textContent = `${dados.total} peças`

        div.appendChild(h2lugar)
        div.appendChild(h2nome)
        div.appendChild(h2total)
        div.setAttribute('class', 'divs-placar')
        

        box.insertBefore(div, null); 

        pos++;
    });
}


exibirRanking();




