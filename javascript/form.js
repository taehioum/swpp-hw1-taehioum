class Form {
  constructor(
    email,
    password,
    password_confirmation,
    phone_number,
    fname,
    lname,
    age,
    birth_month,
    birth_day, birth_year) {

    this.email = email;
    this.password = password;
    this.password_confirmation = password_confirmation;
    this.phone_number = phone_number;
    this.fname = fname;
    this.lname = lname;
    this.age = age;
    this.birth_month = birth_month;
    this.birth_day = birth_day;
    this.birth_year = birth_year;

    this.field_name = [
      "email", "password", "password-confirmation",
      "phone-number", "fname", "lname",
      "age", "birth-month", "birth-day", "birth-year"];

    this.validity = {};
    this.text_of_field = {
        [this.field_name[0]]: "Email",
        [this.field_name[1]]: "Password",
        [this.field_name[2]]: "Password Confirmation",
        [this.field_name[3]]: "Phone number",
        [this.field_name[4]]: "First Name",
        [this.field_name[5]]: "Last Name",
        [this.field_name[6]]: "Age",
        [this.field_name[7]]: "Month",
        [this.field_name[8]]: "Day",
        [this.field_name[9]]: "Year",
      };
    // Eww.
    this.rule_of_field = {
      [this.field_name[0]]: "characters other than @ or whitespace followed by an @ sign, followed by more characters (not '@', '.', or whitespace: co.kr is not allowed in this case), and then a \".\". After the \".\", you can only write 2 to 3 letters from a to z.",
      [this.field_name[1]]: "Must contain at least one number and one uppercase and one lowercase letter, and at least 8 or more characters.",
      [this.field_name[2]]: "Must match password.",
      [this.field_name[3]]: "nnn-nnnn-nnnn: three numbers, then \"-\", followed by four numbers and a \"-\", then four numbers.",
      [this.field_name[4]]: "Start with a capital letter, followed by one or more lowercase letters. Should only contain alphabets (A-Z, a-z)",
      [this.field_name[5]]: "Start with a capital letter, followed by one or more lowercase letters. Should only contain alphabets (A-Z, a-z)",
      [this.field_name[6]]: "Must be a number between 0 and 200 (inclusive).",
      [this.field_name[7]]: "Must be one of \"January\", \"February\", ..., \"December\"",
      [this.field_name[8]]: "Must be a number of one or two digits.",
      [this.field_name[9]]: "Must be a number between 1800 and 2018 (inclusive).",
      };
  }








  check(value, pattern) {
    // .match returns null if there is no match.
    if (value.match(pattern))
      return true;
    else
      return false;
  }
  check_email() {
    // user@domain.xxx (single ., single @)
    var email_rule = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.[a-zA-Z]{2,3})$/;
    return this.check(this.email, email_rule);
  }

  check_password() {
    // one upper, lower, number and more than 8(inclusive)
    var password_rule =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return this.check(this.password, password_rule);
  }  

  check_password_confirmation() {
    return this.password == this.password_confirmation
  }  

  check_phone_number() {
    // ###-####-####
    let phone_rule = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/
    return (this.check(this.phone_number, phone_rule))
  }  

  check_fname() {
    // Capital letter, 1 or more lower case
    let name_rule = /^[A-Z][a-z]+$/;
    return (this.check(this.fname, name_rule))
  }

  check_lname() {
    // Capital letter, 1 or more lower case
    let name_rule = /^[A-Z][a-z]+$/;
    return (this.check(this.lname, name_rule))
  }

  check_age() {
    var age = Number(this.age);
    return ((this.age!='') && (0 <= age) && (age <= 200))
  }

  check_month() {
    let month = ["January", "February", "March", "April",
                 "May", "June", "July", "August",
                 "September", "October", "November", "December"];

    return month.includes(this.birth_month)
  }

  check_day() {
    var day = Number(this.birth_day);
    // empty string evaluates to 0; so we have to test it as well.
    return (this.birth_day.length != 0 && (0 <= day) && (day <= 99))
  }

  check_year() {
    var year = Number(this.birth_year);
    return ((1800 <= year) && (year <= 2018))
  }

  // checks validity of all inputs in the form
  check_validity() {
    // NO.GA.DA.
    this.validity['email'] = this.check_email();
    this.validity['password'] = this.check_password();
    this.validity['password-confirmation'] = this.check_password_confirmation();
    this.validity['phone-number'] = this.check_phone_number();
    this.validity['fname'] = this.check_fname();
    this.validity['lname'] = this.check_lname();
    this.validity['age'] = this.check_age();
    this.validity['birth-month'] = this.check_month();
    this.validity['birth-day'] = this.check_day();
    this.validity['birth-year'] = this.check_year();
  }

  // based on validity, RESET or ADD X to innerHTML of each form
  update_label() {
    for (var key in this.validity) {
      if (!this.validity[key])
        // the label ids adds -label suffix to each name
        document.getElementById(key+'-label').innerHTML = "X";
      else
        document.getElementById(key+'-label').innerHTML = "";
    }
  }

  // based on validity, show rules for each form
  update_tooltip() {
    for (var key in this.validity) {
      if (!this.validity[key])
        document.forms["form"][key].title = this.rule_of_field[key];
      else
        document.forms["form"][key].title = "";
    }
  }

  result_msg() {
    let fail_msg = "You must correct:\n\n";
    let tmp = fail_msg;
    let success_msg = 'Successfully Submitted!';
    this.check_validity();

    for (var key in this.validity) {
      if (!this.validity[key])
        fail_msg += this.text_of_field[key] + '\n';
    }

    //smelly code, but simple. If fail_msg has changed,
    //it means one of the fields have failed validity check.
    if (tmp != fail_msg)
      return fail_msg;
    else
      return success_msg;
  }
}

var but = document.createElement('button');

but.innerHTML = "Check";

but.onclick = function() {
  //extract values from html
  var email = document.form.email.value;
  var password = document.forms["form"]["password"].value;
  var password_confirmation = document.forms["form"]["password-confirmation"].value;
  var phone_number = document.forms["form"]["phone-number"].value;
  var fname = document.forms["form"]["fname"].value;
  var lname = document.forms["form"]["lname"].value;
  var age = document.forms["form"]["age"].value;
  var birth_month = document.forms["form"]["birth-month"].value;
  var birth_day = document.forms["form"]["birth-day"].value;
  var birth_year = document.forms["form"]["birth-year"].value;

  var form = new Form(email, password, password_confirmation,
    phone_number, fname, lname, age,
    birth_month, birth_day, birth_year);


  // TODO: Fill the alert message according to the validation result by following the form in README.md.
  form.check_validity();
  form.update_label();
  form.update_tooltip();
  alert(form.result_msg());

  // Hint: you can set contents of elements by finding it with `document.getElementById`, and fixing the `innerHTML`.
  // Hint: modify 'title' attribute of each label to display your message
};
document.body.appendChild(but);
