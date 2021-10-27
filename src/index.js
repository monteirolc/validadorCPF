const valueInput = document.querySelector('.inputCPF')
const btnValidar = document.querySelector('.verificarCPF')
const h3 = document.querySelector('.resposta')

//Constructor function
function CPF(numeroCpf) {
  try {
    this.numeroCpf = numeroCpf
  } catch (e) {
    alert('Não é um cpf')
  }
  this.cpfLimpo = 0
}
//Prototipe by constructor function
CPF.prototype.cleanCpf = nCPF => {
  return (this.cpfLimpo = Array.from(nCPF.replace(/\D+/g, '')))
}

//Realiza a conta de verificação dos ultimos numeros
function numeros(cpfArrayNineNumber, aux) {
  let temp = cpfArrayNineNumber
    .map(valor => {
      let a = Number(valor) * aux
      aux--
      return a
    })
    .reduce((acumulador, valor) => {
      return (acumulador += valor)
    }, 0)
  return 11 - (temp % 11)
}

function cpfValido(valor1, original) {
  // console.log('valor1: ', valor1, '  original: ', original)
  let temp = valor1
  let temp1 = numeros(temp, 10)
  temp.push(temp1.toString())
  temp1 = numeros(temp, 11)
  temp.push(temp1.toString())
  temp = JSON.stringify(temp)
  original = JSON.stringify(original)
  if (temp === original) return true
  else return false
}

btnValidar.addEventListener('click', e => initProcess())
valueInput.addEventListener('keypress', e => {
  if (e.key == 'Enter') initProcess()
})

function initProcess() {
  const cpf1 = new CPF(valueInput.value)
  valueInput.value = ''
  let temp = cpf1.numeroCpf
  temp = cpf1.cleanCpf(temp)
  let temp1 = new Array(...temp)
  temp.pop()
  temp.pop()
  console.log('original')
  console.log(temp1.length)
  console.log(temp1)
  console.log('reduzido')
  console.log(temp.length)
  console.log(temp)

  if (temp1.length > 11 || temp.length > 9) {
    alert('Error')
  } else {
    const validação = cpfValido(temp, temp1)
    if (validação) {
      h3.innerText = 'CPF válido'
      h3.style.color = 'rgb(15, 70, 15)'
    } else {
      h3.innerText = 'CPF inválido'
      h3.style.color = 'red'
    }
  }
}
// p.classList.remove('invalid')
