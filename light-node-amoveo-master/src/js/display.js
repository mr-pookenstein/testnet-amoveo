

function stablecoin_UI() {
//we need a list of all the possible elements to set display to none for

    //accounts stuff
  document.getElementById("account_settings").style.display = "none";
  document.getElementById("load_private_key").style.display = "none";
  document.getElementById("file_loader").style.display = "none";
  document.getElementById("save_button").style.display = "none";
  document.getElementById("save_button2").style.display = "none";
  document.getElementById("return_balance").style.display = "none";
  document.getElementById("spend_info").style.display = "none";
  document.getElementById("info_input").style.display = "none";
  document.getElementById("spend_amount_3").style.display = "none";
  document.getElementById("spend_button_1").style.display = "none";
  document.getElementById("spend_addr").style.display = "none";

  //channel stuff
  document.getElementById("sync_button").style.display = "none";
  document.getElementById("save_button111").style.display = "none";
  document.getElementById("loadbutton111").style.display = "none";
  document.getElementById("channel_title111").style.display = "none";
  document.getElementById("channel_name").style.display = "none";
  document.getElementById("refresh_button").style.display = "none";
  document.getElementById("refresh_button2").style.display = "none";

};

function channel_settings_UI() {



    //stablecoin market stuff
    document.getElementById("display_title").after(document.getElementById("stablecoin_market"));
    document.getElementById("display_title").after(document.getElementById("stablecoin_market"));

    document.getElementById("stablecoin_market").style.color = "black";
    document.getElementById("stablecoin_market").style.fontSize = "18px";
    document.getElementById("stablecoin_market").appendChild(br());
    document.getElementById("stablecoin_market").appendChild(document.getElementById("tvDisplay"));
  

    //document.getElementById("tvDisplay").appendChild(document.createElement("br");
  //  document.getElementById("tvDisplay").appendChild(br());
    document.getElementById("tvDisplay").style.fontSize = "16px";
    document.getElementById("tvDisplay").style.fontWeight = "normal";


//document.getElementById("stablecoin_market").style.top = "100px";
//console.log("success");

}
