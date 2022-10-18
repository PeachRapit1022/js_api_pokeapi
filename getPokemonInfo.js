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
  
      //画像表示
      document.getElementById('pokemonImg')
      .src = json.sprites.other['official-artwork'].front_default;
  
      //タイプ数取得
      const typeNumber = json.types.length;
      document.getElementById('typeNumber')
      .innerHTML = typeNumber;
  
      //タイプ取得、保存
      trueType = [];
      for (let i = 0; i < typeNumber; i++) {
        trueType.push(json.types[i].type.name);
        document.getElementById('type')
        .innerHTML = trueType.join();
      }
    });
}
  
/*
pokeAPIより情報取得その2(日本語ポケモン名)
*/
function getPokemonNameJa(id) {
  var url = "https://pokeapi.co/api/v2/pokemon-species/"+id; //日本語名取得URL
  fetch(url)
  .then(function (data) {
    return data.json();
  })
  .then(function (json) {
    console.log(id, json.names[0].name);
    
    //日本語名取得
    document.getElementById('name')
    .innerHTML = json.names[0].name;
  });
}