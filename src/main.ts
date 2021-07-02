import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

// const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const alphabet = ['z', 'e', 'e', 's', 'a', 'r', ' ','c', 'i', 'p', 'h', 'e', 'r',];

let str = ``;
let pair:any = [];

alphabet.forEach(letter => {
  str += `<p class='text'>${letter}</p>`;
});

app.innerHTML = str;

const caesarCipher = (string: string, shift: number) => {
    // Alphabet
  const alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Encoded Text
  let encodedText: string = '';

  // Adjust Shift (Over 26 Characters)
  if (shift > 26) {
    // Assign Remainder As Shift
    shift = shift % 26;
  }

  // Iterate Over Data
  let i: number = 0;
  while (i < string.length) {
    // Valid Alphabet Characters
    if (alphabet.indexOf(string[i]) !== -1) {
      // Find Alphabet Index
      const alphabetIndex: number = alphabet.indexOf((string[i]).toUpperCase());

      // Alphabet Index Is In Alphabet Range
      if (alphabet[alphabetIndex + shift]) {
        // Append To String
        encodedText += alphabet[alphabetIndex + shift];
      }
      // Alphabet Index Out Of Range (Adjust Alphabet By 26 Characters)
      else {
        // Append To String
        encodedText += alphabet[alphabetIndex + shift - 26];
      }
    }
    // Special Characters
    else {
      // Append To String
      encodedText += string[i];

    }

    // Increase I
    i++;
  }

  return encodedText;
};

function action(caption:string) {
 
  setTimeout(() => {
    app.innerHTML = `<p id="hello">${caption}</p>`
    setTimeout(() => {
      document.getElementById('hello')?.classList.add('anime');
    }, 1000)
    setTimeout(() => {
      document.getElementById('hello')?.classList.add('move-25');
    }, 2000)
    setTimeout(() => {
      app.innerHTML += `<p class='input'><span id='enter-text'></span><span class="cursor">_</span></p>`;
    }, 3000)
  }, 3000)
}

let pTag = app.querySelectorAll('p');

pTag.forEach((p, index) => {
  setTimeout(() => {
    p.classList.add("anime");
  }, index * 100)
})

setTimeout(() => {
  pTag.forEach((p, index) => {
    setTimeout(() => {
      p.classList.remove("anime");
    }, index * 100)
  })
}, 1500)


action('Enter message 📜');

function capture(event: { which: any; keyCode: any; }) {
  var x = event.which || event.keyCode;
  document.querySelector('#enter-text')!.innerHTML += String.fromCharCode(x);
}

function backspace(event: { keyCode: any; }) {

  let text = document.querySelector('#enter-text')!.innerHTML;
  
  if ((event.keyCode === 8 || event.keyCode === 46) && text.length > 0) {
    document.querySelector('#enter-text')!.innerHTML = text.substr(0, text.length - 1)
  }

  if ((event.keyCode === 13) && text.length > 0) {
    pair.push(document.querySelector('#enter-text')!.innerHTML);
    console.log(pair);
    let arr = app.querySelectorAll('p');
    arr.forEach((p, index) => {
      setTimeout(() => {
        p.classList.add("move-100");
      }, index * 1000)
    })
    if(pair.length < 2){
      setTimeout(() => {
        action('Enter Key 🔐');
      }, 100)
    }
  }

  if(pair.length === 2){
    setTimeout(() => {
      let encode = caesarCipher(pair[0].toUpperCase(),parseInt(pair[1]));
      app.innerHTML = `<p class="text anime">Encrypted Message = </p><p class="text anime">${encode}</p>`
    }, 100)
  }

}

document.addEventListener('keypress', capture);
document.addEventListener('keydown', backspace);