var emp_id = document.getElementById('emp_id');
var emp_name = document.getElementById('employe_name');
var emp_age = document.getElementById('employe_age');
var emp_gender = document.getElementById('employe_gender');

var e_id = document.getElementById('e_id');
var e_name = document.getElementById('e_name');
var e_age = document.getElementById('e_age');
var e_gender = document.getElementById('e_gender');


var employe_id;
var employe_name;
var employe_age;
var employe_gender;

var DataEmploye;

var DataEmployeArray = [];


//Close the Update Form page
function CancelPage() {
  event.preventDefault();
  // document.getElementById('body').style.display='block'
  document.getElementById('update_form').style.display = 'none';
  document.getElementById('upid_error').innerHTML = '';
  document.getElementById('upname_error').innerHTML = '';
  document.getElementById('upage_error').innerHTML = '';
  document.getElementById('upgender_error').innerHTML = '';

}


// Verifying The employe id exist or not
function VerifyId(DataEmploye) {
  let isvalid = true
  var i = 0;
  for (i = 0; i <= DataEmployeArray.length - 1; i++) {
    if (employe_id == DataEmployeArray[i].ID) {
      isvalid = false;
    }
  }
  return isvalid

}


// function to add data to table
function AddDataToTable(DataEmploye) {

  //Verifying the ID
  if (VerifyId(DataEmploye)) {
    DataEmployeArray.push(DataEmploye);



    const tableBody = document.querySelector('#datatable');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employe_id}</td>
      <td>${employe_name}</td>
      <td>${employe_age}</td>
      <td>${employe_gender}</td>
      <td>${'<button id="edit_employe" onclick="return UpdateDetails()"><img src="edit.png"></button><button id=delete_employe><img src="delete.png"></button>'}</td>
    `;
    tableBody.appendChild(row);
  } else {
    document.getElementById("id_error").innerHTML = "ID aleready used";
  }
}


// First calling function
function validate() {


  event.preventDefault();
  employe_id = emp_id.value.trim();
  employe_name = emp_name.value.trim();
  employe_age = emp_age.value.trim();
  employe_gender = emp_gender.value;


  DataEmploye = {
    ID: employe_id,
    name: employe_name,
    age: employe_age,
    gender: employe_gender,
  };


  var isvalid = true
  // validate name
  if (/^[A-z]+$/.test(employe_name) == false) {
    document.getElementById('name_error').innerHTML = 'Contains Alphabet only';
    isvalid = false
  } else {
    document.getElementById('name_error').innerHTML = '';
  }

  // validate ID
  let num = /^[0-9]+$/
  if (num.test(employe_id)) {
    document.getElementById('id_error').innerHTML = '';
  } else {
    document.getElementById('id_error').innerHTML = 'Enter a correct ID';
    isvalid = false

  }

  // validate age

  if (num.test(employe_age) && employe_age >= 18 && employe_age <= 60) {
    document.getElementById('age_error').innerHTML = '';
  } else {
    document.getElementById('age_error').innerHTML = 'Enter a correct Age';
    isvalid = false
  }

  //Validate Gender
  if (employe_gender == '') {
    document.getElementById('gender_error').innerHTML = 'Please select gender';
    isvalid = false
  } else {
    document.getElementById('gender_error').innerHTML = '';
  }

  if (isvalid == true) {
    AddDataToTable(DataEmploye);
  }

  // to delete the data
  var i;
  var delBtn = document.querySelectorAll('#delete_employe');
  for (i = 0; i < delBtn.length; i++) {
    delBtn[i].onclick = function () {
      var tr = this.parentElement.parentElement;
      tr.remove();
    }
  }



  // to edit the data
  var edtBtn = document.querySelectorAll('#edit_employe');
  var updBtn = document.querySelector('#update_button');

  for (i = 0; i < edtBtn.length; i++) {
    edtBtn[i].onclick = function () {
    
      document.getElementById("update_form").style.display = 'block';
      var tr = this.parentElement.parentElement;
      var td = tr.getElementsByTagName('TD');
      var ID = td[0].innerHTML;
      var name = td[1].innerHTML;
      var age = td[2].innerHTML;
      var gender = td[3].innerHTML;
      e_name.value = name;
      e_id.value = ID;
      e_age.value = age;
      e_gender.value = gender;


      updBtn.onclick = function () {
        event.preventDefault();
        let sameID = true
        if (ID == e_id.value) {
          sameID = false
        }
        let value = CheckUpdatedData(sameID);
        if (value == true) {
          td[0].innerHTML = e_id.value;
          td[1].innerHTML = e_name.value;
          td[2].innerHTML = e_age.value;
          td[3].innerHTML = e_gender.value;

          changeValueInArray(ID);
        };


      }


    }
  }

}
function changeValueInArray(refid) {
  var i;
  for (i = 0; i < DataEmployeArray.length - 1; i++) {
    console.log(DataEmployeArray[i].ID)
    if (refid == DataEmployeArray[i].ID) {
      DataEmployeArray[i].ID = e_id.value;
      DataEmployeArray[i].name = e_name.value;
      DataEmployeArray[i].age = e_age;
      DataEmployeArray[i].gender = e_gender;

    }
  }

}


function CheckUpdatedData(sameID) {
  let isvalid = true

  if (!/^[A-z]+$/.test(e_name.value)) {
    document.getElementById('upname_error').innerHTML = 'Contains Alphabet Only';
    isvalid = false
  } else {
    document.getElementById('upname_error').innerHTML = '';
  }

  // validate ID
  let num = /^[0-9]+$/
  if (num.test(e_id.value)) {
    var i = 0;
    for (i = 0; i <= DataEmployeArray.length - 1; i++) {
      if (e_id.value == DataEmployeArray[i].ID && sameID) {
        document.getElementById('upid_error').innerHTML = 'ID already Used';
        isvalid = false;
        break
      }
      else {
        document.getElementById('upid_error').innerHTML = '';
      }
    }
    console.log(isvalid);

  } else {
    document.getElementById('upid_error').innerHTML = 'Contains Numeric Value Only';
    isvalid = false

  }

  // validate age
  if (num.test(e_age.value) && e_age.value >= 18 && e_age.value <= 60) {
    document.getElementById('upage_error').innerHTML = '';
  } else {
    document.getElementById('upage_error').innerHTML = 'Enter correct age';
    isvalid = false
  }

  //Validate Gender
  if (e_gender.value == '') {
    document.getElementById('upgender_error').innerHTML = 'Please select gender';
    isvalid = false
  } else {
    document.getElementById('upgender_error').innerHTML = '';
  }
  return isvalid;
}
