//Save Contact
var saveBtn = document.getElementById("biolink_block_id_163");
saveBtn.addEventListener("click", function () {
  // Get the contact information from the website
  var contact = {
    name: "Sang Nguyen",
    phone: "84978901916",
    email: "sang.ecom@hotmail.com"
  };
  // create a vcard file
  var vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:" + contact.name + "\nTEL;TYPE=work,voice:" + contact.phone + "\nEMAIL:" + contact.email + "\nEND:VCARD";
  var blob = new Blob([vcard], { type: "text/vcard" });
  var url = URL.createObjectURL(blob);
  saveBtn.href = url;
  saveBtn.download = contact.name + ".vcf";
});

///////////////////////////////////////
