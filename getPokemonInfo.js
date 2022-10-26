/*
pokeAPIより情報取得
*/
function getPokemonInfo(id) {
    const url = 'https://pokeapi.co/api/v2/pokemon/'+id; //情報取得URL
    fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (json) {
  
      //タイプ数取得、表示
      const typeNumber = json.types.length;
      document.getElementById('typeNumber')
      .innerHTML = `タイプ数 : ${typeNumber}`;
  
      //タイプ取得、保存
      let type = [];
      for (let i = 0; i < typeNumber; i++) {
        type.push(json.types[i].type.name);
      }
      //ポケモンID表示
      document.getElementById('pokemonId')
      .innerHTML = `No.${id}`;

      //画像表示
      document.getElementById('pokemonImg')
      .src = json.sprites.other['official-artwork'].front_default;
      trueType = type;
      console.log(id, type.join())
    });
}
  
/*
pokeAPIより情報取得その2(日本語ポケモン名、世代)
*/
function getPokemonNameJa(id) {
  const url = "https://pokeapi.co/api/v2/pokemon-species/"+id; //日本語名取得URL
  fetch(url)
  .then(function (data) {
    return data.json();
  })
  .then(function (json) {
    let nameJa = json.names[0].name
    let gen = json.generation.name
    
    //日本語名表示
    document.getElementById('name')
    .innerHTML = nameJa;

    //世代表示
    let region
    if (gen === 'generation-i') {
      region = 'カントー地方'
    } else if (gen === 'generation-ii') {
      region = 'ジョウト地方'
    } else if (gen === 'generation-iii') {
      region = 'ホウエン地方'
    } else if (gen === 'generation-iv') {
      region = 'シンオウ地方'
    } else if (gen === 'generation-v') {
      region = 'イッシュ地方'
    } else if (gen === 'generation-vi') {
      region = 'カロス地方'
    } else if (gen === 'generation-vii') {
      region = 'アローラ地方'
    } else if (gen === 'generation-viii') {
      region = 'ガラル地方/ヒスイ地方'
    } else if (gen === 'generation-iv') {
      region = 'パルデア地方'
    } else {
      region = '地方定義なし'
    }
    document.getElementById('region')
    .innerHTML = region;


    console.log(id, nameJa, gen);
  });
}