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

      //ポケモンID表示
      document.getElementById('pokemonId')
      .innerHTML = `No.${id}`;

      //画像表示
      document.getElementById('pokemonImg')
      .src = json.sprites.other['official-artwork'].front_default;
  
      //タイプ数取得、表示
      const typeNumber = json.types.length;
      document.getElementById('typeNumber')
      .innerHTML = `タイプ数 : ${typeNumber}`;
  
      //タイプ取得、保存
      trueType = [];
      for (let i = 0; i < typeNumber; i++) {
        trueType.push(json.types[i].type.name);
      }
    });
}
  
/*
pokeAPIより情報取得その2(日本語ポケモン名)
*/
function getPokemonNameJa(id) {
  const url = "https://pokeapi.co/api/v2/pokemon-species/"+id; //日本語名取得URL
  fetch(url)
  .then(function (data) {
    return data.json();
  })
  .then(function (json) {
    let nameJa = json.names[0].name
    console.log(id, nameJa, trueType.join());
    
    //日本語名取得
    document.getElementById('name')
    .innerHTML = nameJa;
  });
}