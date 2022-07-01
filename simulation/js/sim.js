resetAll();
function resetSim(){
  document.querySelectorAll('label.switch input').forEach(function(e){
    e.checked = false;
  });
  evaluatesim();
}
function resetTable(){
  let list = document.querySelector('div.ttable tbody').children;
  while(list.length > 0){
    list[0].remove();
  }
}
function resetAll(){
  resetTable();
  resetSim();
}
function decoder3_8(inputs){
  let ans = 0;
  let pow = 1;
  inputs.forEach(function(e){
    ans = ans + pow*e;
    pow = pow * 2;
  })
  return ans;
}
function evaluatesim(){
  let vars = [
    'x', 'x0', 'x1', 'x2',
    'y', 'y0', 'y1', 'y2',
    'z', 'z0', 'z1', 'z2',
    'w', 'w0', 'w1', 'w2', 'w3'
    ];
  let obj = {};
  let inputs = ['z', 'y', 'x'];
  let dec1 = [];
  let dec2 = [];
  vars.forEach(function(e){
    obj[e] = document.querySelector("label."+e+" input").checked + 0;
  })
  inputs.forEach(function(e){
    obj[e] = obj[e] & (!obj[e+"0"]);
    dec1.push(obj[e] & (!obj[e+"1"]));
    dec2.push(obj[e] & (!obj[e+"2"]));
  })
  dec1 = decoder3_8(dec1);
  dec2 = decoder3_8(dec2);
  obj['w'] = obj['w'] & (!obj['w0']);
  if(obj['w1']){
    obj['w1'] = 0;
  } else if(obj['w3']){
    obj['w1'] = 1;
  } else{
    obj['w1'] = !obj['w'] + 0;
  }
  if(obj['w2']){
    obj['w2'] = 0;
  } else{
    obj['w2'] = obj['w'];
  }
  let outputs = [];
  if(obj['w1']){
    outputs.push(dec1);
  }
  if(obj['w2']){
    outputs.push(dec2+8);
  }
  let Dlist = document.querySelectorAll("span.bulb");
  Dlist.forEach(function(e){
    e.classList.remove("glow");
  })
  outputs.forEach(function(e){
    if(!document.querySelector("label.d"+e+" input").checked){
        Dlist[e].classList.add("glow");
    }
  })
}
function add(){
  let row = document.createElement("tr");
  let inps = ['w', 'x', 'y', 'z'];
  let cell;
  let val = 0;
  let pow = 8;
  let num;
  inps.forEach(function (e){
    cell = document.createElement("td");
    num = document.querySelector('label.'+e+' input').checked + 0;
    val = val + pow*num;
    pow = pow/2;
    cell.innerText = num;
    row.appendChild(cell);
  })
  cell = document.createElement("td");
  cell.innerText = "D" + val;
  row.appendChild(cell);
  cell = document.createElement("td");
  let faulty = [];
  document.querySelectorAll('.glow').forEach(function (e){
    faulty.push(e.parentElement.parentElement.querySelector('label.switch').classList[1].toUpperCase());
  })
  cell.innerText = faulty.join(', ');
  if(cell.innerText == ''){
    cell.innerText = "-";
  }
  if(faulty.length != 1 || parseInt(faulty[0].substr(1)) != val){
    cell.classList.add('danger');
  }
  row.appendChild(cell);
  document.querySelector('div.ttable tbody').appendChild(row);
}
document.querySelectorAll('label.switch input').forEach(function(e){
	e.addEventListener("change", evaluatesim);
})