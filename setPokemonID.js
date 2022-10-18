//pokeAPIから取得したタイプを保存するグローバル変数
let trueType = [];

window.addEventListener('load', function() {
  doGet();
});

/*
リロード時に実行する関数
*/
function doGet() {
  //全国図鑑番号
  const pokemonId = setPokemonId();
  getPokemonNameJa(pokemonId);
  getPokemonInfo(pokemonId);
}

/*
表示するポケモンIDを設定
*/
function setPokemonId() {

  let pokemonId;

  //地域指定を取得
  region = getInputRegion();

  //ランダム指定を取得
  let randomCheckbox = document.getElementById('selectRandomId');

  if (randomCheckbox.checked) {

    //ランダムの場合、地域指定を考慮してIDを生成
    if (region === 'All') {
      min = 1;
      max = 905;
    }else if (region === 'Kanto') {
      min = 1;
      max = 151;
    } else if (region === 'Johto') {
      min = 152;
      max = 251;
    } else if (region === 'Hoenn') {
      min = 252;
      max = 386;
    } else if (region === 'Sinnoh') {
      min = 387;
      max = 493;
    } else if (region === 'Unova') {
      min = 494;
      max = 649;
    } else if (region === 'Kalos') {
      min = 650;
      max = 721;
    } else if (region === 'Alola') {
      min = 722;
      max = 807;
    } else if (region === 'Galar') {
      min = 810;
      max = 898;
    } else if (region === 'Hisui') {
      min = 899;
      max = 905;
    } else {
      min = 1;
      max = 905;
    }

    pokemonId = getRandomIntInclusive(min, max);
    
  } else {
    //ランダムでない場合は入力された指定IDを取得
    pokemonId = document.getElementById('inputPokemonId').value;
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
ランダムチェックの状態に合わせて指定ID入力欄、エリア指定ボタンをグレーアウト
*/
function changeRandomCheck(){
  let randomCheckbox = document.getElementById('selectRandomId');
  let regionRadiobutton = document.getElementsByName('region');
  let inputPokemonId = document.getElementById("inputPokemonId");
  let randomStatus = true;

  if (randomCheckbox.checked) {
    inputPokemonId.disabled = true;
    randomStatus = true;
    regionRadiobutton.forEach(i => {
      i.disabled = false;
    });

  } else {
    inputPokemonId.disabled = false;
    randomStatus = false;
    regionRadiobutton.forEach(i => {
      i.disabled = true;
    });
  }
}