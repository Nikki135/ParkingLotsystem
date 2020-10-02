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


  $("#btn-search").click(function(){
    console.log("Insideeee");
    window.alert("Insideeee");
    var regno = $("#regi-num").val();
    var db = firebase.database();
    var ref = db.ref('/vehicles/');
    console.log("yaaay");
    ref.child(regno).on("value", function(snapshot) {
        console.log("chal raha h");
          console.log(snapshot.val());
          console.log(snapshot.child("Row").val());
          var rowinf = snapshot.child("Row").val();
          var levelinf = snapshot.child("Level").val();
          document.getElementById("demo").innerHTML = "Your car is parked on Level" + " " +levelinf+" " + "and in row" + " " +rowinf;
          document.getElementById("demo2").innerHTML = ("*The row numbering starts from left to right");
          window.alert("Your car is parked on Level" + " " +levelinf+" " + "and in row" + " " +rowinf);

        //   var newPost = snapshot.val();
    
        //   console.log("reg nos"+ newPost['Registration Number']);
        //   console.log("reg nos vehicle type"+ newPost['Vehicle Type']);
        //   console.log("Level of vehicle "+ newPost['Level']);
        //   console.log("Row of vehicle type"+ newPost['Row']);
       
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
  });

  function getvehiclecount(){
    var db = firebase.database();
    var ref = db.ref('/vehicles/');
    var inparr = new Array();
    var bcount =0;
    var mcount = 0;
    var ccount = 0;
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("child_added", function(snapshot) {
      console.log(snapshot.val());
      var newPost = snapshot.val();
      console.log("reg nos"+ newPost['Registration Number']);
       console.log("reg nos vehicle type"+ newPost['Vehicle Type']);
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
    
    inparr[0]= bcount;
    inparr[1]= ccount;
    inparr[2]= mcount;

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    console.log("Array consisting of all elements", inparr[0]);
    document.getElementById("veh").innerHTML = "The number of Motorcycles so far:" + " " + inparr[2]; 
    document.getElementById("veh1").innerHTML = "The number of Cars so far:" + " " + inparr[1]; 
    document.getElementById("veh2").innerHTML = "The number of Buses so far:" + " " + inparr[0]; 
  }