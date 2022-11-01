//pokeAPIから取得したタイプを保存するグローバル変数
let trueType = [];
//ひとつ前のIDを保存する変数
let pastPokemonId = 0;

window.addEventListener('load', function() {
  doGet();
});

/*
リロード時に実行する関数
*/
function doGet() {
  trueType = []

  //タイプ選択ボタン初期化
  const typeList = document.getElementsByName('type');  
  for (let i = 0; i < typeList.length; i++) {
    if (typeList[i].checked) {
      typeList[i].checked = false;
    }
  }

  //ID選択モードを取得
  const inputMode = document.getElementById('inputMode').elements['inputMode'].value;

  //全国図鑑番号を取得
  let pokemonId = setPokemonId(inputMode);

  //手動入力時以外は重複再試行
  if (inputMode!=='manual' && pokemonId === pastPokemonId) {
    console.log('重複再試行')
    pokemonId = setPokemonId(inputMode);
  }

  //pokeAPIより情報取得
  getPokemonInfo(pokemonId);
  getPokemonNameJa(pokemonId);

  //今回のIDを保存
  pastPokemonId = pokemonId;
}

/*
表示するポケモンIDを設定
*/
function setPokemonId(inputMode) {
  let pokemonId;

  //地域指定を取得
  let inputRegion = getInputRegion();

  //モードごとに分岐
  if (inputMode === 'random') {

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
    
  } else if (inputMode === 'eevee') {
    //イーブイモード
    const eevee = [133, 134, 135, 136, 196, 197, 470, 471, 700];
    pokemonId = eevee[Math.floor(Math.random() * eevee.length)];

  } else if (inputMode === 'manual') {
    //マニュアルモード
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
  const regionList = document.getElementsByName('region');
  let inputRegion;

  for (let i = 0; i < regionList.length; i++) {
    if (regionList[i].checked) {
      inputRegion = regionList[i].id;
    }
  }
  console.log(`地域指定:${inputRegion}`);
  return inputRegion;
}

/*
入力モード選択
*/
function changeInputMode(){
  const regionRadiobutton = document.getElementsByName('region');
  const inputPokemonId = document.getElementById("inputPokemonId");
  const inputMode = document.getElementById('inputMode').elements['inputMode'].value;

  console.log(`モード変更:${inputMode}`);

  if (inputMode === 'random') {
    inputPokemonId.disabled = true;
    inputPokemonId.value = '';
    regionRadiobutton.forEach(i => {
      i.disabled = false;
    });

  } else if (inputMode === 'eevee') {
    inputPokemonId.disabled = true;
    inputPokemonId.value = '';
    regionRadiobutton.forEach(i => {
      i.disabled = true;
    });
  } else if (inputMode === 'manual') {
    inputPokemonId.disabled = false;
    inputPokemonId.value = '';
    regionRadiobutton.forEach(i => {
      i.disabled = true;
    });
  }
}