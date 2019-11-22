let emailId = 1;

class Email {

  constructor(address) {
    this.address = address;
    this.id = emailId;
    emailId++;
  }
}

class EmailList {

  constructor() {
    this.list = [];
  }

  validateEmail(value) {
    let regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    return regExp.test(value)
  }

  addEmail(value) {
    this.list.push(value);
  }

  deleteEmail(id) {
    this.list.splice(this.list.findIndex((item) => item.id = id), 1);
  }
}

let emailList = new EmailList();

function addEmail(value) {
  if (!value) {
    return;
  } else {
    if (!emailList.validateEmail(value)) {
      $('#invalidEmail').addClass('visibility');
    } else {
      if (emailList.list.find((item) => item.address === value)) {
        $('#duplicateEmail').addClass('visibility');
      } else {
        let newAddress = new Email(value);
        $('#input').val('');
        emailList.addEmail(newAddress);
        addEmailToGrid(newAddress);
        updateCounter()
      }
    }
  }
}

function addEmailToGrid(value) {
  let newItem = $('<div id=' + value.id + ' class="item_entered"></div>')
    .append('<div class="address">' + '<span class="circle"></span>' +
      '<span class="email">' + value.address + '</span>' +
      '</div>' + '<div class="remove">' +
      '<img src="./img/img_108659.png" onclick="removeEmail(' + value.id + ')">\n' + '</div>');
  $('#list').append(newItem);

}

function removeErr() {
  $('.error').removeClass('visibility');
}

function removeEmail(id) {
  console.log('id', id);
  emailList.deleteEmail(id);
  $('#' + id).remove();
  updateCounter()

}

function updateCounter() {
  $('#isEmpty').css(emailList.list.length ? { 'display': 'none' } : { 'display': 'block', 'padding-top': '15px' });
  $('#counter').text(emailList.list.length + ' items left')
}