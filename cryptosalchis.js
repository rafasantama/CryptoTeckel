var salchi_data;
var salchi_jumping=false;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    setTimeout(() => {
        document.getElementById("contador").style = "display:none";
        document.getElementById("Progress").style = "display:none";
        document.getElementById("Distribution").style = "display:none";
        Swal.fire({
            title: '<strong style="font-size:20px">Instalar:<u> Explorador Blockchain</u></strong>',
            icon: 'info',
            html: 'Para acceder a los datos del contrato inteligente, debes instalar un <b>explorador Blockchain</b>, de lo contratrio no podras acceder a los datos. <br> ',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: '<a target="_blank" href="https://metamask.io/"><i class="fa fa-thumbs-up"></i> Ir a MetaMask</a>',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down'
        })
    }, 3000);
}
window.ethereum.enable();
web3.eth.defaultAccount = web3.eth.coinbase;
var sale_abi = web3.eth.contract([{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"createRandomSalchi","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"salchis","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"dna","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]);

var salchiAddress = '0x841dC2967ae04725aa1243aa4673ef9220210a22';
var SalchiFactory = sale_abi.at(salchiAddress);
// Here's how we would access our contract:

// some sort of event listener to take the text input:
function crear_salchi(){
  var name = document.getElementById("nameInput").value;
  // Call our contract's `createRandomSalchi` function:
  SalchiFactory.createRandomSalchi(name,(error)=>{
    if(!error){
        Swal.fire({
            title: '<strong style="font-size:20px">Instalar:<u> Explorador Blockchain</u></strong>',
            icon: 'success',
            text: 'Criptosalchicreado exitosamente',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: '<a target="_blank" href="https://metamask.io/"><i class="fa fa-thumbs-up"></i> Ir a MetaMask</a>',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down'
        })
    }
    else {
        Swal.fire({
            title: '<strong style="font-size:20px">Instalar:<u> Explorador Blockchain</u></strong>',
            icon: 'fail',
            text: 'Error al crear Salchi',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: '<a target="_blank" href="https://metamask.io/"><i class="fa fa-thumbs-up"></i> Ir a MetaMask</a>',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down'
        })
    }
  })
}

function consultar_salchi(){
    var id_input = document.getElementById("idInput").value;
    // Call our contract's `createRandomSalchi` function:
    SalchiFactory.salchis(id_input,(error, res)=>{
        if(res){
            console.log("res:"+res);
            salchi_data=res;
            generateSalchi(id_input,salchi_data[0],salchi_data[1])
        }
        else if (error){
            console.log("error:"+error);
        }
    })
  }

function jump_salchi(){
  if (!salchi_jumping){
    document.getElementById("jumpButton").innerHTML="PARAR";
    document.getElementById("leg1").classList.add("jump_leg");
    document.getElementById("leg2").classList.add("jump_leg");
    document.getElementById("leg3").classList.add("jump_leg");
    document.getElementById("leg4").classList.add("jump_leg");
    document.getElementById("patron1").classList.add("jump_patron");
    document.getElementById("patron2").classList.add("jump_patron");
    document.getElementById("patron3").classList.add("jump_patron");
    document.getElementById("patron4").classList.add("jump_patron");
    document.getElementById("dog").classList.add("jump");
    document.getElementById("obstacle-pole").style="display:true;"
    document.getElementById("floor").style="display:true;"
    salchi_jumping=true;
  }
  else{
    document.getElementById("jumpButton").innerHTML="SALTAR";
    document.getElementById("leg1").classList.remove("jump_leg");
    document.getElementById("leg2").classList.remove("jump_leg");
    document.getElementById("leg3").classList.remove("jump_leg");
    document.getElementById("leg4").classList.remove("jump_leg");
    document.getElementById("patron1").classList.remove("jump_patron");
    document.getElementById("patron2").classList.remove("jump_patron");
    document.getElementById("patron3").classList.remove("jump_patron");
    document.getElementById("patron4").classList.remove("jump_patron");
    document.getElementById("dog").classList.remove("jump");
    document.getElementById("obstacle-pole").style="display:none;"
    document.getElementById("floor").style="display:none;"
    salchi_jumping=false;
  }
}
// take the Salchi dna, and update our image
function generateSalchi(id, name, dna) {
  let dnaStr = String(dna)
  // pad DNA with leading zeroes if it's less than 16 characters
  while (dnaStr.length < 16)
    dnaStr = "0" + dnaStr

  let salchiDetails = {
    // first 2 digits make up the head. We have 7 possible heads, so % 7
    // to get a number 0 - 6, then add 1 to make it 1 - 7. Then we have 7
    // image files named "head1.png" through "head7.png" we load based on
    // this number:
    mainColor: dnaStr.substring(0, 2) % 7 + 1,
    // 2nd 2 digits make up the eyes, 11 variations:
    tipeChoice: dnaStr.substring(2, 4) % 4 + 1,
    // 6 variations of shirts:
    paternChoice: dnaStr.substring(4, 6) % 2 + 1,
    // last 6 digits control color. Updated using CSS filter: hue-rotate
    // which has 360 degrees:
    spotColorChoice: dnaStr.substring(4, 6) % 4 + 1,
    eyeColorChoice: dnaStr.substring(4, 6) % 5 + 1,
    salchiName: name,
    salchiDescription: "A Level 1 CryptoSalchi",
  }
  console.log("salchiDetails:"+salchiDetails.mainColor);
  if (salchiDetails.mainColor==1){
    document.getElementById("body").style="background-color:#D2691E;"
    document.getElementById("dog").style="background-color:#D2691E;"
    document.getElementById("leg1").style="background-color:#D2691E;"
    document.getElementById("leg2").style="background-color:#D2691E;"
    document.getElementById("leg3").style="background-color:#D2691E;"
    document.getElementById("leg4").style="background-color:#D2691E;"
    document.getElementById("tail").style="border-bottom: 100px solid #D2691E;"
  }
  else if (salchiDetails.mainColor==2){
    document.getElementById("body").style="background-color:#FFFDD0;"
    document.getElementById("dog").style="background-color:#FFFDD0;"
    document.getElementById("leg1").style="background-color:#FFFDD0;"
    document.getElementById("leg2").style="background-color:#FFFDD0;"
    document.getElementById("leg3").style="background-color:#FFFDD0;"
    document.getElementById("leg4").style="background-color:#FFFDD0;"
    document.getElementById("tail").style="border-bottom: 100px solid #FFFDD0;"
  }
  else if (salchiDetails.mainColor==3){
    document.getElementById("body").style="background-color:#000000;"
    document.getElementById("dog").style="background-color:#000000;"
    document.getElementById("leg1").style="background-color:#000000;"
    document.getElementById("leg2").style="background-color:#000000;"
    document.getElementById("leg3").style="background-color:#000000;"
    document.getElementById("leg4").style="background-color:#000000;"
    document.getElementById("tail").style="border-bottom: 100px solid #000000;"
  }
  else if (salchiDetails.mainColor==4){
    document.getElementById("body").style="background-color:#45322E;"
    document.getElementById("dog").style="background-color:#45322E;"
    document.getElementById("leg1").style="background-color:#45322E;"
    document.getElementById("leg2").style="background-color:#45322E;"
    document.getElementById("leg3").style="background-color:#45322E;"
    document.getElementById("leg4").style="background-color:#45322E;"
    document.getElementById("tail").style="border-bottom: 100px solid #45322E;"
  }
  else if (salchiDetails.mainColor==5){
    document.getElementById("body").style="background-color:#FCF8F6;"
    document.getElementById("dog").style="background-color:#FCF8F6;"
    document.getElementById("leg1").style="background-color:#FCF8F6;"
    document.getElementById("leg2").style="background-color:#FCF8F6;"
    document.getElementById("leg3").style="background-color:#FCF8F6;"
    document.getElementById("leg4").style="background-color:#FCF8F6;"
    document.getElementById("tail").style="border-bottom: 100px solid #FCF8F6;"
  }
  else if (salchiDetails.mainColor==6){
    document.getElementById("body").style="background-color:#D3D3D3;"
    document.getElementById("dog").style="background-color:#D3D3D3;"
    document.getElementById("leg1").style="background-color:#D3D3D3;"
    document.getElementById("leg2").style="background-color:#D3D3D3;"
    document.getElementById("leg3").style="background-color:#D3D3D3;"
    document.getElementById("leg4").style="background-color:#D3D3D3;"
    document.getElementById("tail").style="border-bottom: 100px solid #D3D3D3;"
  }
  else if (salchiDetails.mainColor==7){
    document.getElementById("body").style="background-color:##8F361F;"
    document.getElementById("dog").style="background-color:##8F361F;"
    document.getElementById("leg1").style="background-color:##8F361F;"
    document.getElementById("leg2").style="background-color:##8F361F;"
    document.getElementById("leg3").style="background-color:##8F361F;"
    document.getElementById("leg4").style="background-color:##8F361F;"
    document.getElementById("tail").style="border-bottom: 100px solid ##8F361F;"
  }
    if (salchiDetails.tipeChoice==1){ //Liso
        document.getElementById("face-spot").style="opacity:0;";
        document.getElementById("spot").style="opacity:0;";
        document.getElementById("spot-chest").style="opacity:0;";
        document.getElementById("spot1").style="opacity:0;";
        document.getElementById("spot2").style="opacity:0;";
        document.getElementById("spot3").style="opacity:0;";
        document.getElementById("spot4").style="opacity:0;";
        document.getElementById("spot5").style="opacity:0;";
    }
    else if (salchiDetails.tipeChoice==2){
        document.getElementById("face-spot").style="opacity:0;";
        document.getElementById("spot").style="opacity:0;";
        document.getElementById("spot-chest").style="opacity:0;";
        document.getElementById("spot1").style="opacity:0.8;";
        document.getElementById("spot2").style="opacity:0.8;";
        document.getElementById("spot3").style="opacity:0.8;";
        document.getElementById("spot4").style="opacity:0.8;";
        document.getElementById("spot5").style="opacity:0.8;";
    }
    else if (salchiDetails.tipeChoice==3){
        document.getElementById("face-spot").style="opacity:0.8;";
        document.getElementById("spot").style="opacity:0.8;";
        document.getElementById("spot-chest").style="opacity:0.8;";
        document.getElementById("spot1").style="opacity:0;";
        document.getElementById("spot2").style="opacity:0;";
        document.getElementById("spot3").style="opacity:0;";
        document.getElementById("spot4").style="opacity:0;";
        document.getElementById("spot5").style="opacity:0;";
    }
    else if (salchiDetails.tipeChoice==4){
        document.getElementById("face-spot").style="opacity:0.8;";
        document.getElementById("spot").style="opacity:0.8;";
        document.getElementById("spot-chest").style="opacity:0.8;";
        document.getElementById("spot1").style="opacity:0.8;";
        document.getElementById("spot2").style="opacity:0.8;";
        document.getElementById("spot3").style="opacity:0.8;";
        document.getElementById("spot4").style="opacity:0.8;";
        document.getElementById("spot5").style="opacity:0.8;";
    }
  return salchiDetails
}