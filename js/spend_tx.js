spend_1();
function spend_1() {


    var div = document.createElement("div");
    document.body.appendChild(div);
    div.appendChild(document.createElement("br"));
    div.setAttribute("id","div4");


    var load_text2 = document.createTextNode("Load Private Key: ");



    var spend_amount = document.createElement("INPUT");
    spend_amount.setAttribute("type", "text");
    spend_amount.setAttribute("id", "spend_amount_3");

    //spend_amount.id = "spend_amount";
    var spend_amount_info = document.createElement("h8");
    spend_amount_info.innerHTML = "Amount: ";
    spend_amount_info.setAttribute("id", "spend_info");

    var spend_address = document.createElement("INPUT");
    spend_address.setAttribute("type", "text");
    spend_address.setAttribute("id", "spend_addr");
    //spend_address.id = "spend_address";
    var input_info = document.createElement("h8");
    input_info.innerHTML = "Address: ";

    input_info.setAttribute("id", "info_input");

    var raw_tx = document.createElement("h8");
    var mode;
    spend_button = button_maker2("Send", function(){
	mode = "sign";
	spend_tokens();
    });
    spend_button.setAttribute("id","spend_button_1")
//    raw_button = button_maker2("print unsigned transaction to screen", function(){
//	mode = "raw";
//	spend_tokens();
//    });
    var error_msg = document.createElement("div");
    error_msg.setAttribute("id", "div5");

    //div.appendChild(load_text2);

    var load_text2 = document.createElement('span');
    load_text2.textContent = 'Send VEO: ';

//    var load_text = document.createTextNode("Load Private Key: ");
    load_text2.setAttribute("id", "load_private_key");

    div.appendChild(load_text2);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    div.appendChild(spend_amount_info);
    div.appendChild(spend_amount);
    div.appendChild(document.createElement("br"));
    div.appendChild(input_info);
    div.appendChild(spend_address);
    div.appendChild(document.createElement("br"));
    div.appendChild(spend_button);
  //  div.appendChild(raw_button);
  //  div.appendChild(calculate_max_send_button);
    div.appendChild(error_msg);
    div.appendChild(document.createElement("br"));
//    div.appendChild(raw_tx);
    var fee;
    function spend_tokens() {
        //spend_address = document.getElementById("spend_address");
        var to0 = spend_address.value.trim();
	var to = parse_address(to0);
        var amount = Math.floor(parseFloat(spend_amount.value, 10) * token_units());

	if (to == 0) {
	    error_msg.innerHTML = "Badly formatted address";
	} else {
	    error_msg.innerHTML = "";
        //spend_amount = document.getElementById("spend_amount");
            var from = keys.pub();
	    fee_checker(to, function (Fee) {
		fee = Fee;
		variable_public_get(["create_account_tx", amount, Fee, from, to], spend_tokens2);
	    }, function (Fee) {
		fee = Fee;
		variable_public_get(["spend_tx", amount, Fee, from, to], spend_tokens2);
	    });
	}
    }
    function fee_checker(address, Callback1, Callback2) {
	variable_public_get(["account", address],
			    function(result) {
			       if (result == "empty") {
				   merkle.request_proof("governance", 14, function(gov_fee) {
				       var fee = tree_number_to_value(gov_fee[2]) + 50;
				       Callback1(fee);
				   });
			       } else {
				   merkle.request_proof("governance", 15, function(gov_fee) {
				       var fee = tree_number_to_value(gov_fee[2]) + 50;
				       Callback2(fee);
				   });
			       }});
    }
    function spend_tokens2(tx) {
        var amount = Math.floor(parseFloat(spend_amount.value, 10) * token_units());
        var amount0 = tx[5];
        var to = spend_address.value.trim();
        var to0 = tx[4];
        var fee0 = tx[3];
        if (!(amount == amount0)) {
            console.log("amounts");
            console.log(amount);
            console.log(amount0);
            console.log(tx[2]);
            console.log("abort: server changed the amount.");
        } else if (!(to == to0)) {
            console.log("abort: server changed who we are sending money to.");
        } else if (!(fee == fee0)) {
	    console.log("fees");
	    console.log(fee);
	    console.log(fee0);
	    console.log(JSON.stringify(tx));
            console.log("abort: server changed the fee.");
        } else {
            console.log(JSON.stringify(tx));
	    if (mode == "sign") {
		var stx = keys.sign(tx);
		console.log(JSON.stringify(stx));
		console.log("pubkey is ");
		console.log(to);
		console.log(keys.pub());
		variable_public_get(["txs", [-6, stx]], function(x) {
		    console.log(x);
		    var msg = ((amount/token_units()).toString()).concat(" VEO successfully sent. txid =  ").concat(x);
		    error_msg.innerHTML = msg;
		});
	    } else if (mode == "raw") {
		raw_tx.innerHTML = JSON.stringify(tx);
	    }
        }
        spend_amount.value = "";
    }
}
