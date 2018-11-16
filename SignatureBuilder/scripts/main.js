var language;
var server = require("../server.js");

function setLangCom(lang, comp) {
  sessionStorage.setItem('language', lang);
  sessionStorage.setItem('company', comp);
  window.location = 'signature.html';
  return false;
}

function getLanguage() {
  var lang = sessionStorage.getItem('language');
  var comp = sessionStorage.getItem('company');
  //console.log(lang);
  var URL = 'data.json';
  $.ajax({
  url:  URL,
  dataType: 'json',
  async: false,
  dataType: 'json',
  success: function (payload) {
    var offices = payload[lang][comp].offices;
    var defOffice = payload[lang][comp].offices[0];
    var defPhone = payload[lang][comp].offices[0].phone;
    var defOfficePhone = payload[lang][comp].offices[0].officePhone;
    var defAddress = payload[lang][comp].offices[0].address;
    var social = payload[lang][comp].social;
    var disclaimer = payload[lang][comp].disclaimer;
    var gptw = payload[lang][comp].offices[0].gptw;
    $('#header').text(payload[lang].header);
    $('#office').text(payload[lang].office + ":");
    $('#nameLabel').text(payload[lang].name + ":");
    $('#positionLabel').text(payload[lang].position + ":");
    $('#phoneLabel').text(payload[lang].phone + ":");
    $('#addTwitter').text(payload[lang].addTwitter);
    $('#addLinkedin').text(payload[lang].addLinkedin);

    $('#logoWrap').append(`
      <p id="logo1"><img id="${[comp]}Logo1Src" src="${payload[lang][comp].logo1Src}"/></p>
      <h1 class="header"><a id="headerLink" href="${payload[lang].headerLink}">${payload[lang].header}</a></h1>
      `);

    $.each(offices, function(i, officeItem) {
      var officeName = officeItem.location;
      console.log(officeName);
      $('#location').append(`
          <option id="${officeItem.location}" value="${officeItem.location}">${officeItem.location}</option>
        `);
      if (offices.length < 2) {
        $('#multiOffice').hide();
      }
    });

    if (lang == "fr") {
      $('#nameInput').removeClass('fullInput');
      $('#nameInput').addClass('frFullInput');
    }

    printSections(comp);

    function printSections(comp) {
      if (comp == "resPublica") {
        inputPhone(defOffice);
        addCellInputDiv(defOffice);
        addFaxInputDiv(defOffice);
        inputTwitter();
        inputLinkedin();
        printName();
        printPosition();
        printCompanyName();
        printAddressDiv(defOffice);
        printAddress(defOffice);
        printPhoneDiv(defOffice);
        printPhone(defOffice);
        printCell();
        printFax();
        printLogo2();
        printWebsite();
        printPersonalSocial();
        printDisclaimer();

      } else if (comp == "national") {
        inputPhone(defOffice);
        addCellInputDiv(defOffice);
        addFaxInputDiv(defOffice);
        inputTwitter();
        inputLinkedin();
        printName();
        printPosition();
        printPhoneDiv(defOffice);
        printPhone(defOffice);
        printCell();
        printFax();
        printPersonalSocial();
        printLogo2();
        printAddressDiv(defOffice);
        printAddress(defOffice);
        printSocial();
        printWebsite();
        printDisclaimer();
        wrapBox();

      } else if (comp == "nationalEquicom"){
        inputPhone(defOffice);
        addCellInputDiv(defOffice);
        addFaxInputDiv(defOffice);
        inputTwitter();
        inputLinkedin();
        printName();
        printPosition();
        printCompanyName();
        printAddressDiv(defOffice);
        printAddress(defOffice);
        printPhoneDiv(defOffice);
        printPhone(defOffice);
        printCell();
        printFax();
        printWebsite();
        printLogo2();
        printSocial();
        printPersonalSocial();
        printDisclaimer();

      } else if (comp == "axon") {
        inputPhone(defOffice);
        addCellInputDiv(defOffice);
        printName();
        printPosition();
        printLogo2();
        printAddressDiv(defOffice);
        printAddress(defOffice);
        printPhoneDiv(defOffice);
        printPhone(defOffice);
        printCell();
        printWebsite();
        printSocial();
        printGptw(defOffice);
        printDisclaimer();
        printSocial();

      } else if (comp == "madano") {
        inputPhone(defOffice);
        addCellInputDiv(defOffice);
        printName();
        printPosition();
        printLogo2();
        printPhoneDiv(defOffice);
        printPhone(defOffice);
        printCell();
        printAddressDiv(defOffice);
        printAddress(defOffice);
        printWebsite();
        printSocial();
        printBadge(defOffice);
        printDisclaimer();
      }
    }

    //Print name input and calls name validation function
    $(document).on('keyup', '#nameInput', function(){
      var nameStr = $(this).val();
      $(".nameOut").text(nameStr);
    });

    $(document).on('focus', '#nameInput', function(){

      $('#nameInput').focusout(function(){

        if (!validateName()) {
          $('#nameCross').remove();
          $('#nameCheck').remove();
          $('#nameIn').append(`
            <span id="nameCross" class="crossMark">&#10007;</span>
            `);
        } else {
          $('#nameCross').remove();
          $('#nameCheck').remove();
          $('#nameIn').append(`
            <span id="nameCheck" class="checkMark">&#10003;</span>
            `);
        }
        $('#nameInput').focusin(function() {
          $('#nameCross').remove();
          $('#nameCheck').remove();
        });
      });
    });

    //Validate name input
    function validateName() {
        var nameVal = $.trim($('#nameInput').val());
        var validName = true;
        console.log("validateName started...");
        if (nameVal.length == 0) {
          validName = false;
        }
        return validName;
    }

    //Print position input and calls position validation function
    $(document).on('keyup', '#positionInput', function(){
      var positionStr = $(this).val();
      $(".positionOut").text(positionStr);
    });

    $(document).on('focus', '#positionInput', function(){

      $('#positionInput').focusout(function(){

        if (!validatePosition()) {
          $('#positionCross').remove();
          $('#positionCheck').remove();
          $('#positionIn').append(`
            <span id="positionCross" class="crossMark">&#10007;</span>
            `);
        } else {
          $('#positionCross').remove();
          $('#positionCheck').remove();
          $('#positionIn').append(`
            <span id="positionCheck" class="checkMark">&#10003;</span>
            `);
        }
        $('#positionInput').focusin(function() {
          $('#positionCross').remove();
          $('#positionCheck').remove();
        });
      });
    });

    //Validate position input
    function validatePosition() {
        var positionVal = $.trim($('#positionInput').val());
        var validPosition = true;
        console.log("validatePosition started...");
        if (positionVal.length == 0) {
          validPosition = false;
        }
        return validPosition;
    }


    function inputPhone(office) {
      var phone = office.phone;
      $('#inputSections').append(`
        <div id="phoneInput">
          <h3 id="phone">${payload[lang].phone}:</h3></div>
        </div>
      `);
      if (phone.type == "UK") {
        $('#phoneInput').append(`
          <span id="${comp}${office.location}PhoneInput" class="phoneInputSections">
          <input type="tel" id="${comp}${office.location}PhoneAInput" class="phoneAInput" maxlength="${phone.phoneA.length}" size="${phone.phoneA.length}" value="20">&nbsp;
          <input type="tel" id="${comp}${office.location}PhoneBInput" class="phoneBInput" maxlength="${phone.phoneB.length}" size="${phone.phoneB.length}">&nbsp;
          <input type="tel" id="${comp}${office.location}PhoneCInput" class="phoneCInput" maxlength="${phone.phoneC.length}" size="${phone.phoneC.length}">
          </span>
          `);
      } else if (phone.type == "CA") {
        $('#phoneInput').append(`
          <span id="${comp}${office.location}PhoneInput" class="phoneInputSections">
          <input type="tel" id="${comp}${office.location}PhoneAInput" class="phoneAInput" maxlength="${phone.phoneA.length}" size="${phone.phoneA.length}">
          <h4>-</h4>
          <input type="tel" id="${comp}${office.location}PhoneBInput" class="phoneBInput" maxlength="${phone.phoneB.length}" size="${phone.phoneB.length}">
          <h4>-</h4>
          <input type="tel" id="${comp}${office.location}PhoneCInput" class="phoneCInput" maxlength="${phone.phoneC.length}" size="${phone.phoneC.length}">&nbsp;
          </span>
          `);
      } else if (phone.type == "EU"){
        $('#phoneInput').append(`
          <span id="${comp}${office.location}PhoneInput" class="phoneInputSections">
          <input type="tel" id="${comp}${office.location}PhoneOpenInput" class="phoneOpenInput" maxlength="${phone.phoneOpen.length}" size="${phone.phoneOpen.length}">
          </span>
          `);
      }

      $(".phoneAInput").keyup(function (event) {
          if (this.value.length == phone.phoneA.length) {
            $('.phoneBInput').focus();
          }
      });

      $(".phoneBInput").keyup(function (event) {
          if (this.value.length == phone.phoneB.length) {
            $('.phoneCInput').focus();
          }
      });

      $(".phoneCInput").keyup(function (event) {
          if (this.value.length == phone.phoneC.length) {
            $('.phoneExtInput').focus();
          }
      });

      $(document).on('keyup', '.phoneAInput', function() {
          var pos = $(this).val();
          $("#phoneA").text(pos);
      });
      $(document).on('keyup', '.phoneBInput', function() {
          var pos = $(this).val();
          $("#phoneB").text(pos);
      });
      $(document).on('keyup', '.phoneCInput', function() {
          var pos = $(this).val();
          $("#phoneC").text(pos);
      });
      $(document).on('keyup', '.phoneExtInput', function() {
          var pos = $(this).val();
          $("#phoneExtNo").text(pos);
      });

      $(document).on('focus', '.phoneInputSections', function() {

        $('.phoneInputSections').focusout(function(){

          if (!validatePhone()) {
            $('#phoneCross').remove();
            $('#phoneCheck').remove();
            $('#phoneInput').append(`
              <span id="phoneCross" class="crossMark">&#10007;</span>
              `);
          } else {
            $('#phoneCross').remove();
            $('#phoneCheck').remove();
            $('#phoneInput').append(`
              <span id="phoneCheck" class="checkMark">&#10003;</span>
              `);
          }
          $('.phoneInputSections').focusin(function() {
            $('#phoneCross').remove();
            $('#phoneCheck').remove();
          });
        });
      });
    }

    //Validate phone input
    function validatePhone() {
        var selectedLocation = $('#location option:selected').val();
        var selectedOffice = $.grep(offices, function(selectedOffice){
          return selectedOffice.location === selectedLocation;
        })[0];
        var phone = selectedOffice.phone;
        var phoneAVal = $.trim($('.phoneAInput').val());
        var phoneBVal = $.trim($('.phoneBInput').val());
        var phoneCVal = $.trim($('.phoneCInput').val());
        var validPhone = true;
        console.log("validatePhone started...");
        if (phoneAVal.length < phone.phoneA.length || isNaN(phoneAVal) ||
            phoneBVal.length < phone.phoneB.length || isNaN(phoneBVal) ||
            phoneCVal.length < phone.phoneC.length || isNaN(phoneCVal)) {
          validPhone = false;
        }
        return validPhone;
    }


    //Add Cell input divs on the left sections
    function addCellInputDiv(office) {
      $('#inputSections').append(`
        <div id="addCell" class="addBtn"></div>
        `);
      inputCell(office);
    }
    //append cell inputs on the left sections
    function inputCell(office) {
      var cell = office.cell;
      if (cell.type == "CA") {
        $('#addCell').append(`
          <div id="addCellBtn">
            <span class="plusMinusSing">+</span>
            <span id="addCellText">${payload[lang].addCellText}</span>
          </div>
        `);
      } else {
        $('#addCell').append(`
          <div id="addCellBtn">
            <span class="plusMinusSing">+</span>
            <span id="addCellText">${payload[lang].addMobileText}</span>
          </div>
        `);
      }

    }

    //add and remove cell buttons
    $(document).on('click', '#addCellBtn', function() {
      var selectedLocation = $('#location option:selected').val();
      var selectedOffice = $.grep(offices, function(selectedOffice){
        return selectedOffice.location === selectedLocation;
      })[0];

      printAddedCell(selectedOffice);

      $('#addCell').html('');
      var cell = selectedOffice.cell;

        if (cell.type == "UK") {
          $('#addCell').append(`
            <span id="removeCellBtn" class="plusMinusSing">&#8722;</span>
            <span id="addCellContent" class="removeBtn">
              <h3 class="noMargin">${payload[lang].mobile}:</h3>
              <span id="cellInput" class="wrapper"></span>
            </span>
            `);
          $('#cellInput').append(`
            <span id="${comp}${office.location}CellInput" class="cellInputSections">
            <input type="tel" id="${comp}${office.location}CellAInput" class="cellAInput" maxlength="${cell.cellA.length}" size="${cell.cellA.length}" placeholder="7">&nbsp;
            <input type="tel" id="${comp}${office.location}CellBInput" class="cellBInput" maxlength="${cell.cellB.length}" size="${cell.cellB.length}">&nbsp;
            <input type="tel" id="${comp}${office.location}CellCInput" class="cellCInput" maxlength="${cell.cellC.length}" size="${cell.cellC.length}">
            </span>
            `);
        } else if (cell.type == "CA") {
          $('#addCell').append(`
            <span id="removeCellBtn" class="plusMinusSing">&#8722;</span>
            <span id="addCellContent" class="removeBtn">
              <h3 class="noMargin">${payload[lang].cell}:</h3>
              <span id="cellInput" class="wrapper"></span>
            </span>
            `);
          $('#cellInput').append(`
            <span id="${comp}${office.location}CellInput" class="cellInputSections">
            <input type="tel" id="${comp}${office.location}CellAInput" class="cellAInput" maxlength="${cell.cellA.length}" size="${cell.cellA.length}">
            <h4>-</h4>
            <input type="tel" id="${comp}${office.location}CellBInput" class="cellBInput" maxlength="${cell.cellB.length}" size="${cell.cellB.length}">
            <h4>-</h4>
            <input type="tel" id="${comp}${office.location}CellCInput" class="cellCInput" maxlength="${cell.cellC.length}" size="${cell.cellC.length}">&nbsp;
            </span>
            `);
        } else if (cell.type == "EU"){
          $('#addCell').append(`
            <span id="removeCellBtn" class="plusMinusSing">&#8722;</span>
            <span id="addCellContent" class="removeBtn">
              <h3 class="noMargin">Mobile:</h3>
              <span id="cellInput" class="wrapper"></span>
            </span>
            `);
          $('#cellInput').append(`
            <span id="${comp}${office.location}CellInput" class="cellInputSections">
            <input type="tel" id="${comp}${office.location}CellOpenInput" class="cellOpenInput" maxlength="${cell.cellOpen.length}" size="${cell.cellOpen.length}">
            </span>
            `);
        }

        $(".cellAInput").keyup(function (event) {
            if (this.value.length == cell.cellA.length) {
              $('.cellBInput').focus();
            }
        });

        $(".cellBInput").keyup(function (event) {
            if (this.value.length == cell.cellB.length) {
              $('.cellCInput').focus();
            }
        });

        $(document).on('keyup', '.cellAInput', function() {
            var pos = $(this).val();
            $("#cellA").text(pos);
        });
        $(document).on('keyup', '.cellBInput', function() {
            var pos = $(this).val();
            $("#cellB").text(pos);
        });
        $(document).on('keyup', '.cellCInput', function() {
            var pos = $(this).val();
            $("#cellC").text(pos);
        });

        $('#removeCellBtn').click(function() {
          $('#addCell').html('');
          $('#cellOut').html('');
          inputCell(selectedOffice);

        });

        $(document).on('focus', '.cellInputSections', function() {

          $('.cellInputSections').focusout(function(){

            if (!validateCell()) {
              $('#cellCross').remove();
              $('#cellCheck').remove();
              $('#cellInput').append(`
                <span id="cellCross" class="crossMark">&#10007;</span>
                `);
            } else {
              $('#cellCross').remove();
              $('#cellCheck').remove();
              $('#cellInput').append(`
                <span id="cellCheck" class="checkMark">&#10003;</span>
                `);
            }
            $('.cellInputSections').focusin(function() {
              $('#cellCross').remove();
              $('#cellCheck').remove();
            });
          });
        });
    });

    //Validate cell input
    function validateCell() {
      var selectedLocation = $('#location option:selected').val();
      var selectedOffice = $.grep(offices, function(selectedOffice){
        return selectedOffice.location === selectedLocation;
      })[0];
      var cell = selectedOffice.cell;
      var cellAVal = $.trim($('.cellAInput').val());
      var cellBVal = $.trim($('.cellBInput').val());
      var cellCVal = $.trim($('.cellCInput').val());
      var cellOpenVal = $.trim($('.cellOpenInput').val());
      var validCell = true;
      console.log("validateCell started...");
      if ($('#addCellContent').length > 0) {
        if (cell.type == "CA" || "UK") {
          if (cellAVal.length < cell.cellA.length || isNaN(cellAVal) ||
              cellBVal.length < cell.cellB.length || isNaN(cellBVal) ||
              cellCVal.length < cell.cellC.length || isNaN(cellCVal)) {
            validCell = false;
          }

        } else {
          if (cellOpenVal.length == 0 || isNaN(cellOpenVal)) {
            validCell = false;
          }
        }
      }
      return validCell;
    }

    function addFaxInputDiv(office) {
      $('#inputSections').append(`
        <div id="addFax" class="addBtn"></div>
        `);
      inputFax(office);
    }

    //append fax inputs on the left sections
    function inputFax() {
      $('#addFax').append(`
        <div id="addFaxBtn">
          <span class="plusMinusSing">+</span>
          <span id="addFaxText">${payload[lang].addFaxText}</span>
        </div>
      `);
    }

     //add and remove fax buttons
    $(document).on('click', '#addFaxBtn', function() {
      var selectedLocation = $('#location option:selected').val();
      var selectedOffice = $.grep(offices, function(selectedOffice){
        return selectedOffice.location === selectedLocation;
      })[0];

      printAddedFax(selectedOffice);

      $('#addFax').html('');
      var fax = selectedOffice.fax;

      $('#addFax').append(`
        <span id="removeFaxBtn" class="plusMinusSing">&#8722;</span>
        <span id="addFaxContent" class="removeBtn">
          <h3 class="noMargin">${payload[lang].fax}:</h3>
          <span id="faxInput" class="wrapper"></span>
        </span>
        `);

        if (fax.type == "UK") {
          $('#faxInput').append(`
            <span id="${comp}${office.location}FaxInput">
            <input type="tel" id="${comp}${office.location}FaxAInput" class="faxAInput" maxlength="${fax.faxA.length}" size="${fax.faxA.length}">${fax.faxA}&nbsp;
            <input type="tel" id="${comp}${office.location}FaxBInput" class="faxBInput" maxlength="${fax.faxB.length}" size="${fax.faxB.length}" placeholder="${fax.faxB}">&nbsp;
            <input type="tel" id="${comp}${office.location}FaxCInput" class="faxCInput" maxlength="${fax.faxC.length}" size="${fax.faxC.length}" placeholder="${fax.faxC}">
            </span>
            `);
        } else if (fax.type == "CA") {
          $('#faxInput').append(`
            <span id="${comp}${office.location}FaxInput">
            <input type="tel" id="${comp}${office.location}FaxAInput" class="faxAInput" maxlength="${fax.faxA.length}" size="${fax.faxA.length}" placeholder="${fax.faxA}">
            <h4>-</h4>
            <input type="tel" id="${comp}${office.location}FaxBInput" class="faxBInput" maxlength="${fax.faxB.length}" size="${fax.faxB.length}" placeholder="${fax.faxB}">
            <h4>-</h4>
            <input type="tel" id="${comp}${office.location}FaxCInput" class="faxCInput" maxlength="${fax.faxC.length}" size="${fax.faxC.length}" placeholder="${fax.faxC}">&nbsp;
            </span>
            `);
        }

        $(".faxAInput").keyup(function (event) {
            if (this.value.length == fax.faxA.length) {
              $('.faxBInput').focus();
            }
        });

        $(".faxBInput").keyup(function (event) {
            if (this.value.length == fax.faxB.length) {
              $('.faxCInput').focus();
            }
        });

        $(document).on('keyup', '.faxAInput', function() {
            var pos = $(this).val();
            $("#faxA").text(pos);
        });
        $(document).on('keyup', '.faxBInput', function() {
            var pos = $(this).val();
            $("#faxB").text(pos);
        });
        $(document).on('keyup', '.faxCInput', function() {
            var pos = $(this).val();
            $("#faxC").text(pos);
        });

        $('#removeFaxBtn').click(function() {
          $('#addFax').html('');
          $('#faxOut').html('');
          $('#addFax').append(`
            <div id="addFaxBtn">
              <span class="plusMinusSing">+</span>
              <span id="addFaxText">${payload[lang].addFaxText}</span></div>
            `);
        });

        $(document).on('focus', '.faxInputSections', function() {

          $('.faxInputSections').focusout(function(){

            if (!validateFax()) {
              $('#faxCross').remove();
              $('#faxCheck').remove();
              $('#faxInput').append(`
                <span id="faxCross" class="crossMark">&#10007;</span>
                `);
            } else {
              $('#faxCross').remove();
              $('#faxCheck').remove();
              $('#faxInput').append(`
                <span id="faxCheck" class="checkMark">&#10003;</span>
                `);
            }
            $('.faxInputSections').focusin(function() {
              $('#faxCross').remove();
              $('#faxCheck').remove();
            });
          });
        });
    });

    //Validate fax input
    function validateFax() {
      var selectedLocation = $('#location option:selected').val();
      var selectedOffice = $.grep(offices, function(selectedOffice){
        return selectedOffice.location === selectedLocation;
      })[0];
      var fax = selectedOffice.fax;
      var faxAVal = $.trim($('.faxAInput').val());
      var faxBVal = $.trim($('.faxBInput').val());
      var faxCVal = $.trim($('.faxCInput').val());
      var faxOpen = $.trim($('.faxOpenInput').val())
      var validFax = true;
      console.log("validateFax started...");
      if ($('#addFaxContent').length > 0) {
        if (fax.type == "CA" || "UK") {
          if (faxAVal.length < fax.faxA.length || isNaN(faxAVal) ||
              faxBVal.length < fax.faxB.length || isNaN(faxBVal) ||
              faxCVal.length < fax.faxC.length || isNaN(faxCVal)) {
            validFax = false;
          }

        } else {
          if (faxOpenVal.length == 0 || isNaN(faxOpenVal)) {
            validFax = false;
          }
        }
      }
      return validFax;
    }


    function inputTwitter() {
      $('#inputSections').append(`
        <div id="addTwitter" class="addBtn">
        <div id="addTwitterBtn">
          <span class="plusMinusSing">+</span>
          <span id="addTwitterText">${payload[lang].addTwitterText}</span></div>
        </div>
      `);
    }

    $(document).on('click', '#addTwitterBtn', function() {
      $('#twitterPop').addClass(lang+'TwitterPop');
      $( "#twitterPop").fadeIn();
      $('#addTwitter').html('');
      $('#addTwitter').append(`
        <span id="removeTwitterBtn" class="plusMinusSing">&#8722;</span>
        <span id="addTwitterContent" class="removeBtn">
          <h3 class="noMargin">Twitter:</h3>
          <span id="twitterIn" class="wrapper"></span>
        </span>
        `);

      $('#twitterIn').append(`
        <input id="${comp}TwitterInput" class="personalTwitterInput" size="33">&nbsp;
        `);

      $('.potentianlLastChild').remove();
      if ($(".personalFollow").length < 1) {
        $('#personalSocial').append(`
          <table id="personalSocialTable" class="socialTable">
            <tr id="${comp}PersonalSocialRow" class="personalSocialRow">
            <td id="${comp}FirstPersonalSocialCell" class="firstPersonalSocialCell noWrapCell" cellspacing="0" cellpadding="0">
              <span id="${comp}PersonalFollow" class="personalFollow">${payload[lang][comp].personalFollow}&nbsp;</span>
              <span id="${comp}PersonalTwitter" class="personalTwitter socialIcons">
                <a id="${comp}PersonalTwitterLink" class="PersonalTwitterLink" href="$" title="Personal Twitter" target="_blank">
                  <img id="${comp}PersonalTwitterSrc" class="$${comp}SocialIcons" src="${payload[lang][comp].social[0].src}" width="${payload[lang][comp].social[0].iconWidth}"/></a></span>
              </td><td class="potentianlLastChild" width="100%"></td>
            </tr>
          </table>
          `);
      } else {
        $('.personalTwitter').append(`
          <a id="${comp}PersonalTwitterLink" href="$" title="Personal Twitter" target="_blank">
            <img id="${comp}PersonalTwitterSrc" class="$${comp}SocialIcons" src="${payload[lang][comp].social[0].src}" width="${payload[lang][comp].social[0].iconWidth}"/>
          </a>
          `);
      }

      $('#removeTwitterBtn').click(function() {
        $('#addTwitter').html('');
        $('#addTwitter').append(`
          <div id="addTwitterBtn">
            <span class="plusMinusSing">+</span>
            <span id="addTwitterText">${payload[lang].addTwitterText}</span></div>
          </div>
        `);
        $('.personalTwitter').remove();
        if ($('#addLinkedinContent').length < 1) {
          $('#personalSocial').html('');
        }
      });
    });

    $(document).on('focus', '.personalTwitterInput', function(){

      $('.personalTwitterInput').focusout(function(){

        if (!validateTwitter()) {
          $('#twitterCross').remove();
          $('#twitterCheck').remove();
          $('#twitterIn').append(`
            <span id="twitterCross" class="crossMark">&#10007;</span>
            `);
        } else {
          var twitterVal = $.trim($('.personalTwitterInput').val());
          $('#twitterCross').remove();
          $('#twitterCheck').remove();
          $('#twitterIn').append(`
            <span id="twitterCheck" class="checkMark">&#10003;</span>
            `);
          $('.PersonalTwitterLink').attr('href', twitterVal);
        }
        $('.personalTwitterInput').focusin(function() {
          $('#twitterCross').remove();
          $('#twitterCheck').remove();
        });
      });
    });

    //Validate Twitter input
    function validateTwitter() {
        var twitterVal = $.trim($('.personalTwitterInput').val());
        var validTwitter = true;
        console.log("validateTwitter started...");
        if (($('.personalTwitterInput').length  > 0) && (!(twitterVal.match(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/)))) {
          validTwitter = false;
        }
        return validTwitter;
    }


      function inputLinkedin() {
        $('#inputSections').append(`
          <div id="addLinkedin" class="addBtn">
          <div id="addLinkedinBtn">
            <span class="plusMinusSing">+</span>
            <span id="addLinkedinText">${payload[lang].addLinkedinText}</span></div>
          </div>
        `);
      }

      $(document).on('click', '#addLinkedinBtn', function() {
        $('#linkedinPop').addClass(lang+'LinkedinPop');
        $( "#linkedinPop" ).fadeIn();
        $('#addLinkedin').html('');
        $('#addLinkedin').append(`
          <span id="removeLinkedinBtn" class="plusMinusSing">&#8722;</span>
          <span id="addLinkedinContent" class="removeBtn">
            <h3 class="noMargin">Linkedin:</h3>
            <span id="linkedinIn" class="wrapper"></span>
          </span>
          `);

        $('#linkedinIn').append(`
          <input id="${comp}LinkedinInput" class="personalLinkedinInput" size="33">&nbsp;
          `);

        $('.potentianlLastChild').remove();
        if ($(".personalFollow").length < 1) {
          $('#personalSocial').append(`
            <table id="personalSocialTable" cellspacing="0">
              <tr id="${comp}PersonalSocialRow" class="personalSocialRow">
                <td id="${comp}FirstPersonalSocialCell" class="firstPersonalSocialCell noWrapCell" cellspacing="0" cellpadding="0">
                  <span id="${comp}PersonalFollow" class="personalFollow">${payload[lang][comp].personalFollow}&nbsp;</span>
                  <span id="${comp}PersonalTwitter" class="personalTwitter socialIcons"></span>
                  <span id="${comp}PersonalLinkedin" class="personalLinkedin socialIcons">
                    <a id="${comp}PersonalLinkedinLink" href="$" title="Personal LinkedIn" target="_blank">
                      <img id="${comp}PersonalLinkedinSrc" class="$${comp}SocialIcons" src="${payload[lang][comp].social[1].src}" width="${payload[lang][comp].social[1].iconWidth}"/>&nbsp;</a></span>
                </td><td class="potentianlLastChild" width="100%"></td>
              </tr>
            </table>
            `);
        } else {
          $('.firstPersonalSocialCell').append(`
            <span id="${comp}PersonalLinkedin" class="personalLinkedin socialIcons">
              <a id="${comp}PersonalLinkedinLink" href="$" title="Personal LinkedIn" target="_blank">
                <img id="${comp}PersonalLinkedinSrc" class="$${comp}SocialIcons" src="${payload[lang][comp].social[1].src}" width="${payload[lang][comp].social[1].iconWidth}"/></a></span>
            </td><td class="potentianlLastChild" width="100%"></td>
            `);
        }

        $('#removeLinkedinBtn').click(function() {
          $('#addLinkedin').html('');
          $('#addLinkedin').append(`
            <div id="addLinkedinBtn">
              <span class="plusMinusSing">+</span>
              <span id="addLinkedinText">${payload[lang].addLinkedinText}</span></div>
            </div>
          `);
          $('.personalLinkedin').remove();
          if ($('#addTwitterContent').length < 1) {
            $('#personalSocial').html('');
          }
        });
      });

      $(document).on('focus', '.personalLinkedinInput', function(){

        $('.personalLinkedinInput').focusout(function(){

          if (!validateLinkedin()) {
            $('#linkedinCross').remove();
            $('#linkedinCheck').remove();
            $('#linkedinIn').append(`
              <span id="linkedinCross" class="crossMark">&#10007;</span>
              `);
          } else {
            var linkedinVal = $.trim($('.personalLinkedinInput').val());
            $('#linkedinCross').remove();
            $('#linkedinCheck').remove();
            $('#linkedinIn').append(`
              <span id="linkedinCheck" class="checkMark">&#10003;</span>
              `);
            $('.PersonalLinkedinLink').attr('href', linkedinVal);
          }
          $('.personalLinkedinInput').focusin(function() {
            $('#linkedinCross').remove();
            $('#linkedinCheck').remove();
          });
        });
      });

      //Validate Twitter input
      function validateLinkedin() {
          var linkedinVal = $.trim($('.personalLinkedinInput').val());
          var validLinkedin = true;
          console.log("validateLinkedin started...");
          if (($('.personalTwitterInput').length  > 0) && (!(linkedinVal.match(/http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z 0-9 _ -]\/?/)))) {
            validLinkedin = false;
          }
          return validLinkedin;
      }

      $( '#linkedinPop, #twitterPop' ).click(function() {
          $('.popup').fadeOut();
      });

    function printName() {
      $('#copyInner').append(`
        <div id="${comp}NameOut" class="nameOut">${payload[lang].firstName} ${payload[lang].lastName}</div>
        `);
    }


    function printPosition() {
      $('#copyInner').append(`
        <div id="${comp}PositionOut" class="positionOut">${payload[lang].position}</div>
        `);
    }


    function printCompanyName() {
      $('#copyInner').append(`
        <div id="${comp}CompanyName" class="companyName">${payload[lang][comp].companyName}</div>
        `);
    }


    function printAddressDiv() {
      $('#copyInner').append(`
        <div id="address"></div>
      `);
    }


    function printAddress(office) {
      var address = office.address;
      if(address.addressB){
        $('#address').append(`
          <div id=${comp}${office.location}Address">
            <div id="addressA">${address.addressA}</div>
            <div><span id="addressB">${address.addressB}</span>&nbsp;&nbsp;<span>${address.postalCode}</span></div>
          </div>
        `);
      } else if (address.addressA) {
        $('#address').append(`
          <div id=${comp}${office.location}Address>
            <div><span id="addressA">${address.addressA}</span>&nbsp;&nbsp;<span>${address.postalCode}</span></div>
          </div>
        `);
      }
      else {
        $('#address').html('');
      }
    }

    function printPhoneDiv() {
      $('#copyInner').append(`
        <div id="phoneDiv"></div>
      `);
    }

    function printPhone(office) {
      $('#phoneDiv').append(`
        <div id="phoneOut"></div>
      `);
      var officePhone = office.officePhone;
      var phone = office.phone;
      if (comp == "madano") {
        $('#phoneOut').append(`
          <div id="${comp}${office.location}OfficePhone" class="officePhoneOutSections"><strong>Office: </strong>+<span class="countryCode">${phone.countryCode}</span>
          (<span class="leading0">${officePhone.leading0}</span>)
          <span id="officePhoneA">${officePhone.officePhoneA}</span>
          <span id="officePhoneB">${officePhone.officePhoneB}</span>
          <span id="officePhoneC">${officePhone.officePhoneC}</span>
          </div>
          <div id="${comp}${office.location}Phone" class="phoneOutSections"><strong>DL: </strong>+<span class="countryCode">${phone.countryCode}</span>
          (<span class="leading0">${phone.leading0}</span>)
          <span id="phoneA">${phone.phoneA}</span>
          <span id="phoneB">${phone.phoneB}</span>
          <span id="phoneC">${phone.phoneC}</span>
          </div>
          `);

      } else if (phone.type == "UK") {
        $('#phoneOut').append(`
          <div id="${comp}${office.location}Phone" class="phoneOutSections">T: +<span class="countryCode">${phone.countryCode}</span>
          (<span class="leading0">${phone.leading0}</span>)
          <span id="phoneA">${phone.phoneA}</span>
          <span id="phoneB">${phone.phoneB}</span>
          <span id="phoneC">${phone.phoneC}</span>
          </div>
          `);
      } else if (phone.type == "CA") {
        $('#phoneOut').append(`
          <div id="${comp}${office.location}Phone" class="phoneOutSections">T <span id="phoneA">${phone.phoneA}</span>-<span id="phoneB">${phone.phoneB}</span>-<span id="phoneC">${phone.phoneC}</span></div>
          `);
      } else if (phone.type == "EU"){
        $('#phoneOut').append(`
          <div id="${comp}${office.location}Phone" class="phoneOutSections">T: +<span class="countryCode">${phone.countryCode}</span>
          (<span class="leading0">${phone.leading0}</span>)
          <span id="phoneA">${phone.phoneOpen}</span></div>
        `);
      }
    }

    //print cell on signature
    function printCell() {
      $('#phoneDiv').append(`
        <div id="cellOut"></div>
      `);
    }

    //append office's cell values to cellOut, after clicking on "Add cell Number"
    function printAddedCell(office) {
      console.log(office);
      var cell = office.cell;
      if (comp == "madano") {
        $('#cellOut').append(`
          <div id="${comp}${office.location}Cell" class="cellOutSections"><strong>Mobile: </strong>+<span class="countryCode">${cell.countryCode}</span>
          (<span class="leading0">${cell.leading0}</span>)
          <span id="cellA">${cell.cellA}</span>
          <span id="cellB">${cell.cellB}</span>
          <span id="cellC">${cell.cellC}</span>
          </div>
          `);

      } else if (cell.type == "UK") {
        $('#cellOut').append(`
          <div id="${comp}${office.location}Cell" class="cellOutSections">M: +<span class="countryCode">${cell.countryCode}</span>
          (<span class="leading0">${cell.leading0}</span>)
          <span id="cellA">${cell.cellA}</span>
          <span id="cellB">${cell.cellB}</span>
          <span id="cellC">${cell.cellC}</span>
          </div>
          `);
      } else if (cell.type == "CA") {
        $('#cellOut').append(`
          <div id="${comp}${office.location}Cell" class="cellOutSections">C <span id="cellA">${cell.cellA}</span>-<span id="cellB">${cell.cellB}</span>-<span id="cellC">${cell.cellC}</span></div>
          `);
      } else if (cell.type == "EU"){
        $('#cellOut').append(`
          <div id="${comp}${office.location}Cell" class="cellOutSections">M: +<span class="countryCode">${cell.countryCode}</span>
          (<span class="leading0">${cell.leading0}</span>)
          <span id="cellA">${cell.cellOpen}</span></div>
        `);
      }
    }


    //print cell on signature
    function printFax() {
      $('#phoneDiv').append(`
        <div id="faxOut"></div>
      `);
    }

    //append office's fax values to faxOut, after clicking on "Add Fax Number"
    function printAddedFax(office) {
      var fax = office.fax;
      if (fax.type == "UK") {
        $('#faxOut').append(`
          <div id="${comp}${office.location}Fax">F: +<span class="countryCode">${fax.countryCode}</span>
          (<span class="leading0">${fax.leading0}</span>)
          <span id="faxA">${fax.faxA}</span>
          <span id="faxB">${fax.faxB}</span>
          <span id="faxC">${fax.faxC}</span>
          </div>
          `);
      } else if (fax.type == "CA") {
        $('#faxOut').append(`
          <div id="${comp}${office.location}Fax">F <span id="faxA">${fax.faxA}</span>-<span id="faxB">${fax.faxB}</span>-<span id="faxC">${fax.faxC}</span></div>
          `);
    }
  }

    function printLogo2() {
      $('#copyInner').append(`
        <div id="logos">
        <table id="logo2Table"><tr>
          <td id="${comp}Logo2" class="logo2Cell noWrapCell">
            <a id="${comp}Logo2Link" href="${payload[lang][comp].logo2Link}" title="${payload[lang][comp].logo2Title}">
              <img id="${comp}Logo2Src" src="${payload[lang][comp].logo2Src}" width="${payload[lang][comp].logo2Width}"/>
            </a></td><td></td>
          </tr></table></div>
        `);
    }

    function printBadge(office) {
      var badge = office.badge;
      $('#copyInner').append(`
          <div class="badge">
            <table id="${comp}BadgeTable">
              <tr id="${comp}BadgeRow">
                <td id="${comp}${office.location}Badge" class="${comp}Badge">${badge.text}
                  <img id="${comp}${office.location}BadgeSrc" src="${badge.src}" width="${badge.badgeWidth}"/>
                </td></tr></table>
          </div>
        `);
    }

    function printGptw(office) {
      $('#copyInner').append(`
          <div id="${comp}${office.location}Gptw" class="gptw"></br></div>
        `);
      $.each(gptw, function(i, gptwItem) {
          $('.gptw').append(`
            <div id="${comp}${office.location}${gptwItem.type}" class="gptwItem">
              <p id="${comp}${office.location}${gptwItem.type}Par" class="${gptwItem.type} gptwPar" value="${gptwItem.type}">${gptwItem.gptwA}
                <a id="${comp}${office.location}${gptwItem.linkId}" class="" href="${gptwItem.link}" target="_blank" title="${gptwItem.linkTitle}">
                ${gptwItem.gptwB}</a>${gptwItem.gptwC}</p>
            <div>
            `);
      });
    }


    function printWebsite(){
      $('#copyInner').append(`
        <div id="${comp}WebsiteDiv" class="websiteDiv">
          <span id="${comp}Website" class="website">
            <a id="${comp}WebsiteLink" href="${payload[lang][comp].website.link}">${payload[lang][comp].website.text}</a>
          </span>
        </div>
        `);
        if (comp == "national") {
          $('.websiteDiv').prepend(`<br/>&nbsp;${payload[lang][comp].website.preLinkText}`);
          $('.websiteDiv').append(`<br/><br/>`);
        }
    }


    function printSocial() {
      $('#copyInner').append(`
        <div id="social">
        <table class="socialTable">
          <tr id="${comp}SocialRow" class="socialRow">
          </tr>
        </table></div>
        `);

      if (payload[lang][comp].follow.length > 0) {
        $('.socialRow').append(`
          <td id="${comp}FirstSocialCell" class="firstSocialCell noWrapCell" cellspacing="0" cellpadding="0">
            <span id="${comp}Follow" class="follow">${payload[lang][comp].follow}&nbsp;</span>
          </td>
          `);
      }

      $.each(social, function(i, socialItem) {
          var socialType = socialItem.type;
          var socialLink = socialItem.link;
          var socialSrc = socialItem.src;
          var socialTitle = socialItem.title;
          console.log(socialLink);
          $('.follow').append(`
            <span id="${comp}${socialType}" class="${comp}Social socialIcons noWrapCell">
              <a id="${comp}${socialType}Link" href="${socialLink}" title="${socialTitle}" target=_blank">
              <img id="${comp}${socialType}Src" class="${comp}SocialIcons" src="${socialSrc}" width="${socialItem.iconWidth}"/></a>&nbsp;
            </span>
            `);
      });
      $('.socialRow').append(`
        <td width="100%"></td>
        `);
    }


    function printPersonalSocial() {
      $('#copyInner').append(`
        <div id="personalSocial"></div>
      `);
    }

    function printDisclaimer() {
      $('#copyInner').append(`
          <div id="${comp}Disclaimer" class="disclaimer"></div>
        `);
      $.each(disclaimer, function(i, disclaimerItem) {
          $('.disclaimer').append(`
            <div id="${comp}DisclaimerItem" class="disclaimerItem">
              <p id="${comp}${disclaimerItem.type}" class="${disclaimerItem.type} disclaimerPar" value="${disclaimerItem.type}">${disclaimerItem.disclaimerA}
                <a id="${disclaimerItem.linkId}" href="${disclaimerItem.subscribeLink}" target="_blank" title="${disclaimerItem.linkTitle}">
                ${disclaimerItem.disclaimerB}</a>${disclaimerItem.disclaimerC}</p>
            <div>
            `);
      });
      $('.disclaimer').append(`<p class="disclaimerPar"><br/></p>`);
    }

    function wrapBox() {
      if(comp == "national") {
        $('.websiteDiv, .disclaimer').wrapAll('<div id="nationalWrapBox" class="wrapBox" style="background: #F0F0F0;"></div>');
      }
    }

    $('#location').change(function() {
      var selectedLocation = $(this).val();
      var selectedOffice = $.grep(offices, function(selectedOffice){return selectedOffice.location === selectedLocation;})[0];
      $('#inputSections').html('');
      $('#phoneDiv').html('');
      $('#address').html('');
      $('.badge').html('');
      $('.gptw').html('');
      inputPhone(selectedOffice);
      addCellInputDiv(selectedOffice);
      printAddress(selectedOffice);
      printPhone(selectedOffice);
      printCell(selectedOffice);
      if (comp == "resPublica" || "national" || "nationalEquicom") {
        addFaxInputDiv(selectedOffice);
        printFax(selectedOffice);
        inputTwitter(selectedOffice);
        inputLinkedin(selectedOffice);
      }


      if(selectedOffice.phone.hasOwnProperty("ext")) {
        $('.phoneInputSections').append(`
          <span id="phoneExt"><h4>Ext.</h4></span>
          <span><input type="tel" id="${comp}${selectedLocation}PhoneExtInput" class="phoneExtInput" size="4" maxlength="4"/>
          </span>
          `);
          $('.phoneExtInput').click(function(){
            $('.phoneOutSections').append(`
              <span id="phoneExt">&nbsp;&nbsp;${selectedOffice.phone.ext}</span>
              <span id="phoneExtNo"></span>
              `);
          });
      } else {
          $('#phoneExt').html("");
          $('.phoneExtInput').remove();
          $('#phoneExt').html("");
          $('#phoneExtNo').html("");
      }


      if(selectedOffice.hasOwnProperty("badge")) {
        console.log("it has badge!");
        $('.badge').append(`
          <table id="${comp}BadgeTable">
            <tr id="${comp}BadgeRow">
              <td id="${comp}${selectedOffice.location}Badge" class="${comp}Badge">${selectedOffice.badge.text}
                <img id="${comp}${selectedOffice.location}BadgeSrc" src="${selectedOffice.badge.src}" width="${selectedOffice.badge.badgeWidth}"/>
              </td></tr></table>
          `);
      }

      if(selectedOffice.hasOwnProperty("gptw")) {
        $.each(gptw, function(i, gptwItem) {
            $('.gptw').append(`
              <div id="${comp}${selectedOffice.location.gptw.type}" class="gptwItem">
                <p id="${comp}${selectedOffice.location}${gptwItem.type}Par" class="${gptwItem.type} gptwPar" value="${selectedOffice.location}${gptwItem.type}">${gptwItem.gptwA}
                  <a id="${comp}${selectedOffice.location}${gptwItem.linkId}" href="${gptwItem.link}" target="_blank" title="${comp}${selectedOffice.location}${gptwItem.linkTitle}">
                  ${gptwItem.gptwB}</a>${gptwItem.gptwC}</p>
              <div>
              `);
        });
        $('.gptw').append(`<p class="gptwPar"><br/></p>`);
      }
      return false;
    });


  $(document).on('click', '.copyBtn', function validateCopy() {

    console.log("validation starts....");
    document.execCommand('copy');

    $('#nameError').html('');
    $('#errorPop').removeClass('hasNameError');
    if (!validateName()) {
      $('#nameError').append(`
        <div class="hiderBtn">x</div>${payload[lang].errorPop.nameError}<br>
        `);
      $('#errorPop').addClass('hasNameError');
    }

    $('#positionError').html('');
    $('#errorPop').removeClass('hasPositionError');
    if (!validatePosition()) {
      $('#positionError').append(`
        <div class="hiderBtn">x</div>${payload[lang].errorPop.positionError}<br>
        `);
      $('#errorPop').addClass('hasPositionError');
    }

    $('#phoneError').html('');
    $('#errorPop').removeClass('hasPhoneError');
    if (!validatePhone()) {
      $('#phoneError').append(`
        <div class="hiderBtn">x</div>${payload[lang].errorPop.phoneError}<br>
        `);
      $('#errorPop').addClass('hasPhoneError');
    }

    $('#cellError').html('');
    $('#errorPop').removeClass('hasCellError');
    if (!validateCell()) {
      $('#cellError').append(`
        <div class="hiderBtn">x</div>${payload[lang].errorPop.cellError}<br>
        `);
      $('#errorPop').addClass('hasCellError');
    }

    $('#faxError').html('');
    $('#errorPop').removeClass('hasFaxError');
    if (!validateFax()) {
      $('#faxError').append(`
        <div class="hiderBtn">x</div>${payload[lang].errorPop.faxError}<br>
        `);
      $('#errorPop').addClass('hasFaxError');
    }

    $('#twitterError').html('');
    $('#errorPop').removeClass('hasTwitterError');
    if (!validateTwitter()) {
      $('#twitterError').append(`
        <div class="hiderBtn">x</div>${payload[lang].errorPop.twitterError}<br>
        `);
      $('#errorPop').addClass('hasTwitterError');
    }

    $('#linkedinError').html('');
    $('#errorPop').removeClass('hasLinkedinError');
    if (!validateLinkedin()) {
      $('#linkedinError').append(`
        <div class="hiderBtn">x</div>${payload[lang].errorPop.linkedinError}<br>
        `);
      $('#errorPop').addClass('hasLinkedinError');
    }

    $("#afterCopy").fadeIn();
    $('#errorPop').show();

    $(document).on('click', '.closeBtn', function() {
      $('.popup').fadeOut();
      $('#progressNav').fadeOut();
      $('#progressTwo, #progressThree, #progressFour, #progressFive, #progressSix').removeClass('complete');
      $('.afterCopyPop:not(#errorPop)').addClass('offScreen');
      setTimeout(function(){
          $("#stepsPop").delay(1000).removeClass("offScreen")
      }, 1000);
    });

    if (validateName() && validatePosition() && validatePhone() && validateCell() && validateFax() && validateTwitter() && validateLinkedin()) {
      console.log("All valid!");
      var mac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
      if (mac) {
        $("body").addClass("macDetect");
        $("#copyDetectkey").html("&#8984 + C");
      }

      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          $('#mobileDetected').show();;
      }

      $("#closeMobileDetect").click(function () {
           $('#mobileDetected').fadeOut();
        });
     $('#progressOne').text(payload[lang].sideNav.step1);
     $('#progressTwo').text(payload[lang].sideNav.step2);
     $('#progressThree').text(payload[lang].sideNav.step3);
     $('#progressFour').text(payload[lang].sideNav.step4);
     $('#progressFive').text(payload[lang].sideNav.step5);
     $('#progressSix').text(payload[lang].sideNav.step6);
     $('#stepsHeader').text(payload[lang].stepsPop.header);
     $('#stepOne span').text(payload[lang].stepsPop.step1);
     $('#stepTwo span').text(payload[lang].stepsPop.step2);
     $('#stepThree span').text(payload[lang].stepsPop.step3);
     $('#stepFour span').text(payload[lang].stepsPop.step4);
     $('#stepFive span').text(payload[lang].stepsPop.step5);
     $('#stepsHeader2').text(payload[lang].stepsPop.header2);
     $('#stepsBtn').text(payload[lang].stepsPop.button);
     $('#replyHeader').text(payload[lang].replyPop.header);
     $('#replyNote').text(payload[lang].replyPop.note);
     $('#replySelectPhone').text(payload[lang].replyPop.selectPhone);
     $('#replyBtn').text(payload[lang].replyPop.button);
     $('#replyStepOne span').text(payload[lang].replyStepsPop.step1);
     $('#replyStepTwo span').text(payload[lang].replyStepsPop.step2);
     $('#replyStepThree span').text(payload[lang].replyStepsPop.step3);
     $('#replyStepFour span').text(payload[lang].replyStepsPop.step4);
     $('#replyStepFive span').text(payload[lang].replyStepsPop.step5);
     $('#replyStepsHeader2').text(payload[lang].replyStepsPop.header2);
     $('#replyStepsBtn').text(payload[lang].replyStepsPop.button);
     $('#preMobileHeader').text(payload[lang].preMobilePop.header);
     $('#preMobileNote').text(payload[lang].preMobilePop.note);
     $('#preMobileBtn').text(payload[lang].preMobilePop.button);
     $('#mobileHeader').text(payload[lang].mobilePop.header);
     $('#samsungHeader').text(payload[lang].samsungPop.header);
     $('#samsungNote').text(payload[lang].samsungPop.note);
     $('#samsungRadio1Label').text(payload[lang].samsungPop.radio1);
     $('#samsungRadio2Label').text(payload[lang].samsungPop.radio2);
     $('#samsungBtn').text(payload[lang].samsungPop.button);
     $('#emailHeader').text(payload[lang].emailPop.header);
     $('#emailNote').text(payload[lang].emailPop.note);
     $('#emailBtn').text(payload[lang].emailPop.button);
     $('#mobileInstructionHeader').text(payload[lang].mobileInstructionPop.header);
     $('#mobileInstructionNote').text(payload[lang].mobileInstructionPop.note);
     $('#mobileInstructionBtn').text(payload[lang].mobileInstructionPop.button);

     if(mac) {
       $('#stepOne span').text(payload[lang].stepsPopMac.step1);
       $('#stepTwo span').text(payload[lang].stepsPopMac.step2);
       $('#stepThree span').text(payload[lang].stepsPopMac.step3);
       $('#replyStepOne span').text(payload[lang].replyStepsPop.step1);
       $('#replyStepTwo span').text(payload[lang].replyStepsPop.step2);
       $('#replyStepThree span').text(payload[lang].replyStepsPop.step3);
     }

     $('.afterCopyPops').addClass(lang+'Pops');

     $("#stepOne .viewImg, #replyStepOne .viewImg").click(function () {
        $('#stepOneCont').show();
     });

     $("#stepTwo .viewImg, #replyStepTwo .viewImg").click(function () {
        $('#stepTwoCont').show();
     });
     $("#stepThree .viewImg").click(function () {
        $('#stepThreeCont').show();
     });
     $("#stepFive .viewImg").click(function () {
        $('#stepFourCont').show();
     });

     $("#replyStepThree .viewImg").click(function () {
        $('#stepThreeContReply').show();
     });
     $("#replyStepFive .viewImg").click(function () {
        $('#stepFourContReply').show();
     });

     $( ".backBtn" ).click(function() {
         $(".instructions" ).fadeOut();
     });


      $('#errorPop').hide();
      $('#stepsPop').show();
      $('#progressNav').fadeIn();
      clipboard.on('error', function(e) {
      //alert("Please click CTRL + C");
      $("#copyError").show();
      setTimeout(function() {
        $(e.trigger).text("Copy");
      }, 2500);
      });

    } else {
      $('#errorPopHeader').text(payload[lang].errorPop.header);
      $('#stepsPop').hide();
      console.log("Not valid!");
    }


    $(document).on('click', '#stepsBtn', function(){
      $('#replyName').html('');
      $('#replyPosition').html('');
      $('#replyPhoneSections').html('');
      $('.replyPhoneToggleCont').html('');

      $('#progressTwo').addClass('complete');
      $('#stepsPop').addClass('offScreen');
      $('#replyPop').removeClass('offScreen');

      var replyName = $('.nameOut:first').clone();
        $('#replyName, #mobileName').append(replyName);

      var replyPosition = $('.positionOut:first').clone();
      $('#replyPosition, #mobilePosition').append(replyPosition);

      var replyPhone = $('.phoneOutSections:first').clone();
      $('#replyPhoneSections, #mobilePhoneSections').append(replyPhone);

      var replyCell = $('.cellOutSections:first').clone();

      var replyBoth = replyPhone + replyCell;

      var replyPhoneVal = replyPhone.html();
      var replyCellVal = replyCell.html();

      if (replyCell.length > 0) {
        $('#replyCell').append(replyCell);
        console.log("cellOut exists!");
        $('.replyPhoneToggleCont').append(`
          <span id="replyPhoneLabel">Select which phone number:</span>
           <select class="replyPhoneToggle">
              <option value="replyPhoneValue" id="replyPhoneOption">${replyPhoneVal}</option>
              <option value="replyCellValue" id="replyCellOption">${replyCellVal}</option>
              <option value="replyBothValue" id="replyBothOption">Use Both</option>
          </select>
          `);
      }

      $('.replyPhoneToggleCont').change(function() {
        var selectedReplyPhoneId = $(this).find('option:selected').attr('id');
        console.log(selectedReplyPhoneId);
        if(selectedReplyPhoneId == 'replyPhoneOption') {
          console.log("1st option");
          $('#replyPhoneSections, #mobilePhoneSections').html('');
          $('#replyPhoneSections, #mobilePhoneSections').append(replyPhone);

        } else if (selectedReplyPhoneId == 'replyCellOption') {
          console.log("2nd option");
          $('#replyPhoneSections, #mobilePhoneSections').html('');
          $('#replyPhoneSections, #mobilePhoneSections').append(replyCell);

        } else if(selectedReplyPhoneId == 'replyBothOption') {
          console.log("3rd option");
          $('#replyPhoneSections, #mobilePhoneSections').html('');
          $('#replyPhoneSections, #mobilePhoneSections').append(replyPhone);
          $('#replyPhoneSections, #mobilePhoneSections').append(replyCell);
        }
        return false;
      });

      var mobileCompanyName = $('.companyName:first').clone();
      $('#mobileCompanyName').append(mobileCompanyName);

      var mobileWebsite = $('.website:first').clone();
      $('#mobileWebsite').append(mobileWebsite);
    });

    $(document).on('click', '#replyBtn', function() {
      $('#progressThree').addClass('complete');
      $('#replyPop').addClass('offScreen');
      $('#replyStepsPop').removeClass('offScreen');
    });

    $(document).on('click', '#replyStepsBtn', function() {
      $('#progressFour').addClass('complete');
      $('#replyStepsPop').addClass('offScreen');
      $('#preMobilePop').removeClass('offScreen');
    });

    $(document).on('click', '#preMobileBtn', function() {
      $('#preMobilePop').addClass('offScreen');
      $('#mobilePop').removeClass('offScreen');
    });

    $(document).on('click', '.imageBtn', function() {
      var selectedMobileBtn = $(this).attr('id');
      $('#progressFive').addClass('complete');
      $('#mobilePop').addClass('offScreen');
      var mobileDevice = selectedMobileBtn.substr(0, selectedMobileBtn.length-3).toLowerCase();
      $('#mobileInstructionBtn').click(function() {
        window.open(payload[lang].mobileInstructionPop.instructionLink[mobileDevice]);
      });
      if (mobileDevice == "samsung") {
        $('#samsungPop').removeClass('offScreen');
        if($('#samsungRadio1').is(':checked')) {
          $('#mobileDisclaimer').append(`
            <p id="${comp}MobileDisclaimer" class="disclaimer">${payload[lang].mobileDisclaimer.mobileDisclaimerA} <span>${payload[lang][comp].disclaimer[0].subscribeLink}</span></p>
            `);
        } else {
          $('#mobileDisclaimer').append(`
            <p id="${comp}MobileDisclaimer" class="disclaimer">${payload[lang].mobileDisclaimer.mobileDisclaimerA}
              <a id="${comp}MobileDisclaimerLink" href="${payload[lang][comp].disclaimer[0].subscribeLink}" target="_blank" title="${payload[lang][comp].disclaimer[0].linkTitle}">${payload[lang][comp].disclaimer[0].subscribeLink}</a>
            </p>
          `);
        }
      } else {
        $('#emailPop').removeClass('offScreen');
        $('#mobileDisclaimer').append(`
          <p id="${comp}MobileDisclaimer" class="disclaimer">${payload[lang].mobileDisclaimer.mobileDisclaimerA}
            <a id="${comp}MobileDisclaimerLink" href="${payload[lang][comp].disclaimer[0].subscribeLink}" target="_blank" title="${payload[lang][comp].disclaimer[0].linkTitle}">${payload[lang][comp].disclaimer[0].subscribeLink}</a>
          </p>
        `);
      }

      if (mobileDevice == "iphone") {
        $('#mobileInstructioniPhoneNote').text(payload[lang].mobileInstructionPop.iphoneNote);
      }

      $('#hiddenInput').html($('#mobileSign').html());
    });

    $(document).on('click', '#samsungBtn', function() {
        $('#samsungPop').addClass('offScreen');
        $('#emailPop').removeClass('offScreen');
    });

    var emailDomain = (payload[lang][comp].website.text).split('.').slice(-2).join('.');
    $('#emailInput').attr('placeholder', 'example@' + emailDomain);

    $(document).on('focus', '#emailInput', function(){
      $('#emailInput').focusout(function(){
        if (!validateEmail()) {
          $('#emailCross').remove();
          $('#emailCheck').remove();
          $('#emailIn').append(`
            <span id="emailCross" class="crossMark">&#10007;</span>
            `);
        } else {
          $('#emailCross').remove();
          $('#emailCheck').remove();
          $('#emailIn').append(`
            <span id="emailCheck" class="checkMark">&#10003;</span>
            `);
        }
        $('#emailInput').focusin(function() {
          $('#emailCross').remove();
          $('#emailCheck').remove();
          $('#emailError').text('');
        });
      });
    });


    //Validate email input
    function validateEmail() {
        var emailVal = $.trim($('#emailInput').val());
        var validEmail = true;
        console.log("validateEmail started...");
        if (emailVal.length == 0) {
          validEmail = false;
        } else if (!(emailVal.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) {
          validEmail = false;
        }
        return validEmail;
    }

    $(document).on('click', '#emailBtn', function() {
      if (validateEmail()) {
        $('#emailBtn').text("Sending Email... Please wait");
        $('#emailBtn').text("Email sent!");
        $('#progressSix').addClass('complete');
        $('#emailPop').addClass('offScreen');
        $('#mobileInstructionPop').removeClass('offScreen');
        /*
        //Nodemailer
            var data = $("#emailContent").html();
            $.post('http://respublicasignatures.ca:8090/contact', {emailContent: emailContent}, function(data) {
              if(data == "sent") {
                  $("#message").html("Email has been send successfully.");
                  console.log("Email sent!");
                  $('#emailBtn').text("Email sent!");
                  $('#progressSix').addClass('complete');
                  $('#emailPop').addClass('offScreen');
                  $('#mobileInstructionPop').removeClass('offScreen');
              } else {
                  console.log ('There\'s an issue with sending the email!');
              }
          });*/

        setTimeout(function() {
            $( "#submitClickMobile" ).click();
        }, 5000);

      } else {
        $('#emailError').text(payload[lang].emailPop.error);
      }
    });

    $(document).on('click', '#mobileInstructionPop .closeBtn', function() {
      $('#perInfo input').val('');
    });

  });
  return false;
}

});

}
