/*
入力されたタイプを取得
*/
function getInputType() {
    let inputType = [];
    const typeList = document.getElementsByName('type');
  
    for (let i = 0; i < typeList.length; i++) {
      if (typeList[i].checked) {
        inputType.push(typeList[i].id);
        typeList[i].checked = false;
      }
    }
  
    //document.getElementById("inputType").innerHTML = inputType;
  
    judgeType(trueType, inputType);
  }
  
/*
入力されたタイプを答え合わせ
*/
function judgeType(type, inputType){
    console.log(type, inputType);
    let point = 0

    //タイプ数1、入力数1のとき
    if (type.length===1 && inputType.length===1) {
        if (type[0] === inputType[0]) {
        point = 5
        message = 'せいかい！'
        } else {
        point = 0
        message = 'ざんねん...'
        }
    }

    //タイプ数1、入力数2のとき
    if (type.length===1 && inputType.length===2) {
        if (type[0] === inputType[0] || type[0] === inputType[1]) {
        point = 3
        message = 'おしい！'
        } else {
        point = 0
        message = 'ざんねん...'
        }
    }

    //タイプ数2、入力数1のとき
    if (type.length===2 && inputType.length===1) {
        if (type[0] === inputType[0] || type[1] === inputType[0]) {
        point = 2
        message = 'おしい！'
        } else {
        point = 0
        message = 'ざんねん...'
        }
    }

    //タイプ数2、入力数2のとき
    if (type.length===2 && inputType.length===2) {
        if (type[0] === inputType[0] && type[1] === inputType[1]) {
        point = 5
        message = 'せいかい！'
        } else if (type[0] === inputType[1] && type[1] === inputType[0]) {
        point = 5
        message = 'せいかい！'
        } else if (type[0] === inputType[0] || type[0] === inputType[1] || type[1] === inputType[0] || type[1] === inputType[1]) {
        point = 3
        message = 'おしい！'
        } else {
        point = 0
        message = 'ざんねん...'
        }
    }

    
    console.log(point+'point')
    document.getElementById('point').innerHTML = point+'point'
    document.getElementById('result').innerHTML = message

}