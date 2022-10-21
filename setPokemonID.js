//pokeAPIから取得したタイプを保存するグローバル変数
let trueType = [];

window.addEventListener('load', function() {
  doGet();
});

/*
リロード時に実行する関数
*/
function doGet() {
  trueType = []
  //全国図鑑番号
  const pokemonId = setPokemonId();
  getPokemonInfo(pokemonId);
  getPokemonNameJa(pokemonId);
}

/*
表示するポケモンIDを設定
*/
function setPokemonId() {

  let pokemonId;

  //地域指定を取得
  let inputRegion = getInputRegion();

  //ランダム指定を取得
  let randomCheckbox = document.getElementById('selectRandomMode');
  let eeveeCheckbox = document.getElementById('selecEeveeMode');

  if (randomCheckbox.checked) {

    //ランダムの場合、地域指定を考慮してIDを生成
    if (inputRegion === 'All') {
      min = 1;
      max = 905;
    } else if (inputRegion === 'Kanto') {
      min = 1;
      max = 151;
    } else if (inputRegion === 'Johto') {
      min = 152;
      max = 251;
    } else if (inputRegion === 'Hoenn') {
      min = 252;
      max = 386;
    } else if (inputRegion === 'Sinnoh') {
      min = 387;
      max = 493;
    } else if (inputRegion === 'Unova') {
      min = 494;
      max = 649;
    } else if (inputRegion === 'Kalos') {
      min = 650;
      max = 721;
    } else if (inputRegion === 'Alola') {
      min = 722;
      max = 807;
    } else if (inputRegion === 'Galar') {
      min = 810;
      max = 898;
    } else if (inputRegion === 'Hisui') {
      min = 899;
      max = 905;
    } else {
      min = 1;
      max = 905;
    }

    pokemonId = getRandomIntInclusive(min, max);
    
  } else if(eeveeCheckbox.checked) {
    const eevee = [133, 134, 135, 136, 196, 197, 470, 471, 700]
    pokemonId = eevee[Math.floor(Math.random() * eevee.length)];
  } else {
    //ランダムでない場合は入力された指定IDを取得
    const inputId = document.getElementById('inputPokemonId');
    pokemonId = inputId.value;
    //入力欄をクリア
    inputId.value = '';
  }

  //決定されたIDを返却
  return pokemonId;
}

/*
最小値と最大値を含むランダム整数を生成
*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/*
入力された地域を取得
*/
function getInputRegion() {
  const typeList = document.getElementsByName('region');
  let inputRegion;

  for (let i = 0; i < typeList.length; i++) {
    if (typeList[i].checked) {
      inputRegion = typeList[i].id;
    }
  }
  console.log(`地域指定:${inputRegion}`);
  return inputRegion;
}

/*
ランダムモードの状態に合わせて指定ID入力欄、エリア指定ボタンをグレーアウト
*/
function changeRandomMode(){
  let randomCheckbox = document.getElementById('selectRandomMode');
  let eeveeCheckbox = document.getElementById('selecEeveeMode');
  let regionRadiobutton = document.getElementsByName('region');
  let inputPokemonId = document.getElementById("inputPokemonId");
  let randomStatus = true;
  let eeveeStatus = true;

  if (randomCheckbox.checked) {
    eeveeCheckbox.checked = false;
    inputPokemonId.disabled = true;
    inputPokemonId.value = '';
    randomStatus = true;
    eeveeStatus = false;
    regionRadiobutton.forEach(i => {
      i.disabled = false;
    });

  } else {
    inputPokemonId.disabled = false;
    randomStatus = false;
    eeveeStatus = false;
    regionRadiobutton.forEach(i => {
      i.disabled = true;
    });
  }
}

/*
イーブイモードの状態に合わせて指定ID入力欄、エリア指定ボタンをグレーアウト
*/
function changeEeveeMode(){
  let randomCheckbox = document.getElementById('selectRandomMode');
  let eeveeCheckbox = document.getElementById('selecEeveeMode');
  let regionRadiobutton = document.getElementsByName('region');
  let inputPokemonId = document.getElementById("inputPokemonId");
  let randomStatus = true;

  if (eeveeCheckbox.checked) {
    randomCheckbox.checked = false;
    inputPokemonId.disabled = true;
    inputPokemonId.value = '';
    eeveeStatus = true;
    randomStatus = false;
    regionRadiobutton.forEach(i => {
      i.disabled = true;
    });

  } else {
    inputPokemonId.disabled = false;
    eeveeStatus = false;
    randomStatus = false;
    regionRadiobutton.forEach(i => {
      i.disabled = true;
    });
  }
}