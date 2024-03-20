let seuVotoPara = document.querySelector('.d1-1 span');
let cargo = document.querySelector('.d1-2 span');
let descricao = document.querySelector('.d1-4');
let aviso = document.querySelector('.d2');
let lateral = document.querySelector('.d1--right');
let numeros = document.querySelector('.d1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = []

function comecarEtapa() {
  let etapa = etapas[etapaAtual];

  let numeroHtml = '';
  
  votoBranco = false;
  numero = '';

  for(let i=0; i<etapa.numeros; i++) {
    if(i === 0) {
      numeroHtml += '<div class="numero pisca"></div>'
    } else {
      numeroHtml += '<div class="numero"></div>';
    }
  }

  seuVotoPara.style.display = 'none';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  lateral.innerHTML = '';
  numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item)=>{
    if(item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });

  if(candidato.length > 0) {
    candidato = candidato[0];

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';

    if(candidato.vice != null) {
      descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>Vice-Prefeito: ${candidato.vice}`;
    } else {
      descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
    }

    let fotosHtml = '';

    for(let i in candidato.fotos) {
      if(candidato.fotos[i].small) {
        fotosHtml += `<div class="d1--image small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
      } else {
        fotosHtml += `<div class="d1--image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
      }
    }

    lateral.innerHTML = fotosHtml;
  } else {
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso--numero-errado">NÚMERO ERRADO</div><div class="aviso--grande pisca">VOTO NULO</div>';
  }
}

function clicou(n) {
  let elNumero = document.querySelector('.numero.pisca');

  if(elNumero !== null) {
    elNumero.innerHTML = n;
    numero = `${numero}${n}`;

    elNumero.classList.remove('pisca');

    if(elNumero.nextElementSibling != null) {
      elNumero.nextElementSibling.classList.add('pisca');
    } else {
      atualizaInterface();
    }
  }
}

function branco(n) {
  if(numero === '') {
    votoBranco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
  } else {
    alert('Para votar em BRANCO o campo de voto deve estar vazio.\nAperte CORRIGE para apagar o campo de voto.')
  }
}

function corrige(n) {
  comecarEtapa();
}

function confirma() {
  let etapa = etapas[etapaAtual];

  let votoConfirmado = false;

  if(votoBranco === true) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco'
    })
    console.log('Confirmando voto em BRANCO!');
  } else if(numero.length === etapa.numeros) {
    votoConfirmado = true;
    
    candidato = etapa.candidatos.filter((item)=>{
      if(item.numero === numero) {
        return true;
      } else {
        return false;
      }
    });

    if(candidato.length > 0) {
      votos.push({
        etapa: etapas[etapaAtual].titulo,
        voto: numero
      })

      console.log('Confirmando voto VÁLIDO: ' + numero);
    } else {
      votos.push({
        etapa: etapas[etapaAtual].titulo,
        voto: 'nulo'
      })

      console.log('Confirmando voto NULO!');
    }
  }

  if(votoConfirmado) {
    etapaAtual++;
    if(etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
      document.querySelector('.tela').innerHTML = '<div class="aviso--gigante">FIM</div>';
      document.querySelector('audio').play();
      console.log(votos);
    }
  }
}

comecarEtapa();