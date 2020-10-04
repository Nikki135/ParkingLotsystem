var firebaseConfig = {
    apiKey: "AIzaSyA6v92YWL7m0bPpQbp7HcaEG5Av5D9dWQk",
    authDomain: "parkinglotsystem-7635b.firebaseapp.com",
    databaseURL: "https://parkinglotsystem-7635b.firebaseio.com",
    projectId: "parkinglotsystem-7635b",
    storageBucket: "parkinglotsystem-7635b.appspot.com",
    messagingSenderId: "35424595048",
    appId: "1:35424595048:web:5ca0a8defabe03296e9fdd",
    measurementId: "G-638NM3Z4W2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  $("#btn-veh").click(function(){
      console.log("Insideeee");
    window.alert("Insideeee");
      var regno = $("#regno").val();
      var vehtype = $("#vehtype").val();
      var username = $("#username").val();
      var mobile = $("#mobile").val();
    // var count;
    // if(count )
        var dataref = firebase.database();

    var layers = prompt("Please enter number of layers in the parking lot","10");
    var rows = prompt("Please enter number of rows per layer","20");
    
if (layers != null && rows != null) {
    alert("A parking lot has " + layers + " layers and" + rows +"rows per layer" );//taking the number of rows and columns
}else{

}

      if(regno !=null && vehtype != null){
        console.log("okayyyyy",regno,vehtype);
        var vehicledata =
        {
            "Username": username,
            "Registration Number": regno,
            "Vehicle Type" : vehtype,
            "Phone number" : mobile,
            "Level" : 0,
            "Row" : 0
        };
        console.log('reg no',regno);
        // allocateslot(regno,layers,rows);
        allocateparkingslot(regno,vehtype,layers,rows);
        dataref.ref('/vehicles/'+ regno).set(vehicledata, function(){
            if(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message:"+errorMessage);
            }
            else{
                window.alert("Inserted to firebase db");
            }
        });
        
      }
      else{
          window.alert("Please fill in details");
      }
  });

//   function gettingdata(){
//       console.log('Insideee get function');
//     var db = firebase.database();
//     var ref = db.ref('/vehicles/');
//     ref.on("value", function(snapshot) {
//       console.log(snapshot.val());
//       var newPost = snapshot.val();
//     }, function (errorObject) {
//       console.log("The read failed: " + errorObject.code);
//     });
//   }

  function allocateslot(regno,layers,rows){
      window.alert("inside allocating slot");
      var l =0;
      var r=0;
     
    var bcount =0;
    var mcount = 0;
    var ccount = 0;
    var db = firebase.database();
    var ref = db.ref('/vehicles/');
    var inparr = new Array();
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("child_added", function(snapshot) {
    //   console.log(snapshot.val());
      var newPost = snapshot.val();

    if(newPost['Vehicle Type']== "Bus"){
        bcount = bcount + 1;
        // console.log("Number of busses so far" + bcount);
    }
    else if(newPost['Vehicle Type']== "Car"){
        ccount = ccount + 1;
    }
    else{
        mcount = mcount + 1;
    }
     inparr[0]= regno;
     inparr[1]= bcount;
     inparr[2]= ccount;
     inparr[3]=mcount;
     inparr[4]= layers;
     inparr[5]= rows;
     inparr[6]=vehtype;
    // console.log("Array consisting of all elements", inparr);
   
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    
    console.log("Array consisting of all elements-OUTSIDE FUNCTION", inparr);
        // allocateparkingslot(inparr);
     
}


  function allocateparkingslot(regno,vehtype,layers,rows){
      console.log("Iside parking lot for bus");
   
     var i;
     var j;
     var l= Number(layers);
     var r = Number(rows);

    if (localStorage.getItem("parking slots") == null) {
     var arr = new Array(l); // create an empty array of length n
for (var i = 0; i < l; i++) {
  arr[i] = new Array(r); // make each element an array
}
    }
    else{
        var user = JSON.parse(localStorage.getItem("parking slots"));
        // var filuser= JSON.parse(localStorage.getItem("parking slots"));
        console.log("local storaeg 1" + user[1]);
        console.log("local storaeg " + user[1]);
        // console.log("stringified" + filuser);
        var arr = new Array(l); // create an empty array of length n
        for (var i = 0; i < l; i++) {
          arr[i] = new Array(r); // make each element an array
        }
  
        for (var i = 0; i < l; i++){
      
   arr[i] = user[i].slice();
    
          }
    // }
    console.log("Copied Array"+arr);
  }
// let arr = Array(layers).fill().map(() => Array(rows));
var n = r/2;
var n1 = Math.ceil(n);
var n2 = 5+n1;
console.log(arr);
    Loop1:
    for(i=0;i<l;i++){
        if(vehtype == "Bus"){
            for(j=0;j<5;j++){
               //A Bus can only ocupy any of the five spaces in a row.Here, I assumed the first 5 rows are dedicated to parking a bus alone.
                if(arr[i][j] == null || arr[i][j] == " "){
                arr[i][j]= regno;
                console.log("inside bus parking",i,j);
                window.alert("your parking slot is:" + " "+"Level-" + i +","+"Row" + j);
                localStorage.setItem("parking slots",JSON.stringify(arr));
             
                firebase.database().ref('/vehicles/' + regno).update({"Level" : i});
                firebase.database().ref('/vehicles/' + regno).update({"Row" : j});
                // firebase.database().ref('/vehicles/' + regno +'/Row').update(j);
                //   break;
                  break Loop1;
                }
             }
            //  break;
         }
         else if(vehtype == "Motorcycle"){
           console.log("motorcycle");
          for(j=0;j<r;j++){
               //A motorcycle can be parked in any of the existing spaces. So no particular boundaries
            if(arr[i][j] == null || arr[i][j] == " "){
            arr[i][j]= regno;
            console.log("inside motorcycle parking",i,j);
            window.alert("your parking slot is:" + " "+"Level-" + i +","+"Row" + j);
            localStorage.setItem("parking slots",JSON.stringify(arr));
            
            firebase.database().ref('/vehicles/').child(regno).update({"Level" : i});
            firebase.database().ref('/vehicles/').child(regno).update({"Row" : j});
            // firebase.database().ref('/vehicles/' + regno +'/Row').update(j);
            //   break;
              break Loop1;
            }
         }
         }
        else {  //A car can occupy any of the Small compact/large spots which are rows-5
          for(j=5;j<r;j++){
               
            if(arr[i][j] == null || arr[i][j] == " "){
            arr[i][j]= regno;
            console.log("inside car parking",i,j);
            localStorage.setItem("parking slots",JSON.stringify(arr));
            window.alert("your parking slot is:" + " "+"Level-" + i +","+"Row" + j);
          
            firebase.database().ref('/vehicles/').child(regno).update({"Level" : i});
            firebase.database().ref('/vehicles/').child(regno).update({"Row" : j});
            // firebase.database().ref('/vehicles/' + regno +'/Row').update(j);
            //   break;
              break Loop1;
            }
         }
         }
  
          }
        //   console.log(arr); 
  }
