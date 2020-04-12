(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
  
    function RemoteDataStore(url) {  
        if (!url) {
        throw new Error('No remote URL supplied.');
        }

        this.serverUrl = url;
        // Your web app's Firebase configuration
        var firebaseConfig = {
        apiKey: "AIzaSyDIeLhOzbFDwv00Lr9bZioppS3LdDtnHjE",
        authDomain: "coffeerun-40edf.firebaseapp.com",
        databaseURL: "https://coffeerun-40edf.firebaseio.com",
        projectId: "coffeerun-40edf",
        storageBucket: "coffeerun-40edf.appspot.com",
        messagingSenderId: "816320380057",
        appId: "1:816320380057:web:87497e317e069b15084c08"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        //reference to database
        this.database = firebase.firestore();

    }

    RemoteDataStore.prototype.add = function (key,val) {
        let db = this.database.collection("coffeeOrders");
        console.log(db);
        db.add({
            coffee: val.coffee,
            email: val.emailAddress,
            flavor: val.flavor,
            size: val.size,
            strength: val.strength
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });




        $.post(this.serverUrl, val, function (serverResponse) {
            console.log(serverResponse);
            
        });
    };

    RemoteDataStore.prototype.getAll = function (cb) {
        $.get(this.serverUrl, function (serverResponse) {
            console.log(serverResponse);
            cb(serverResponse);
        });
    };

    RemoteDataStore.prototype.get = function (key, cb) {
        $.get(this.serverUrl + '/' + key, function (serverResponse) {
            console.log(serverResponse);
            cb(serverResponse);
        });
    };

    RemoteDataStore.prototype.remove = function (key) {
        $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE'
        });
    };
  
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
  
  })(window);