class Form {
  successMessage = "Successfully Submitted!";
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

  }

  // user@domain.xxx (single ., single @)
  email_rule = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.[a-z]{2,3})$/;

  // Capital letter, 1 or more lower case
  name_rule = /^[A-Z][a-z]+$/;

  // one upper, lower, number and more than 8(inclusive)
  password_rule =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // ###-####-####
  phone_rule = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/

  monthes = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  check(value, pattern) {
    return value.match(pattern)
  }
  check_email() {
    return (this.email.match(this.email_rule))
  }

  check_password() {
    // one digit, one lowercase, one UPPERCASE, over 8 chars.
    if (this.password.match(this.password_rule))
      return true
    else
      return false
  }  

  check_password_confirmation() {
    return this.password == this.password_confirmation
  }  

  check_phone_number() {
    return (this.check(this.phone_number, this.phone_rule))
  }  

  check_fname() {
    return (this.check(this.fname, this.name_rule))
  }

  check_lname() {
    return (this.check(this.lname, this.name_rule))
  }

  check_age() {
    var age = Number(this.age);
    return ((this.age!='') && (0 <= age) && (age <= 200))
  }

  check_month() {
    return this.monthes.includes(this.birth_month)
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

  //checks validity of all input forms
  check_validity() {
    let fail_msg = "You must correct:\n\n";
    let tmp = fail_msg;
    let successMessage = 'Successfully Submitted!';

    // Yes, I know there is a better way; but lets try this first.
    if (!(this.check_email())) {
      // What should be done: Extract this from html
      fail_msg += "Email\n";
      document.getElementById("email-label").innerHTML += "X";
    }
    if (!(this.check_password())) {
      fail_msg += "Password\n";
      document.getElementById("password-label").innerHTML += "X";
    }
    if (!(this.check_password_confirmation())) {
      fail_msg += "Password Confirmation\n";
      document.getElementById("password-confirmation-label").innerHTML += "X";
    }
    if (!(this.check_phone_number())) {
      fail_msg += "Phone Number\n";
      document.getElementById("phone-number-label").innerHTML += "X";
    }
    if (!(this.check_fname())) {
      fail_msg += "First Name\n";
      document.getElementById("fname-label").innerHTML += "X";
    }
    if (!(this.check_lname())) {
      fail_msg += "Lirst Name\n";
      document.getElementById("lname-label").innerHTML += "X";
    }
    if (!(this.check_age())) {
      fail_msg += "Age\n";
      document.getElementById("age-label").innerHTML += "X";
    }
    if (!(this.check_month())) {
      fail_msg += "Month\n";
      document.getElementById("birth-month-label").innerHTML += "X";
    }
    if (!(this.check_day())) {
      fail_msg += "Day\n";
      document.getElementById("birth-day-label").innerHTML += "X";
    }
    if (!(this.check_year())) {
      fail_msg += "Year\n";
      document.getElementById("birth-year-label").innerHTML += "X";
    }

    if (fail_msg != tmp)
      return fail_msg;
    if (fail_msg == tmp)
      return successMessage;

  }




}

var but = document.createElement('button');

but.innerHTML = "Check";

but.onclick = function() {
  // TODO: Fill in the rest of the function. Use the Form class defined above
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
  alert(form.check_validity());

  // Hint: you can use the RegExp class for matching a string with the `test` method.
  // Hint: you can set contents of elements by finding it with `document.getElementById`, and fixing the `innerHTML`.
  // Hint: modify 'title' attribute of each label to display your message
  // Hint: Ask Google to do things you don't know yet! There should be others who have already done what you are to encounter.
};
document.body.appendChild(but);
