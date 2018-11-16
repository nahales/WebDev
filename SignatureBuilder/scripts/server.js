//const nodemailer = require('nodemailer');
const sendmail = require('sendmail')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const styliner = require('styliner');

var styliner = new Styliner(signatureNode);
/*styliner.processHTML(signature.html, signatureNode)
    .then(function(signature.html) { ... });
//Pass filePath to processHTML 
styliner.parseFile(filePath)
      .then(function(source) { ... });*/

app.use(bodyParser.urlencoded({extended: true}));
	
	var source = require('fs').readFileSync('signature.html', 'utf8');


// SMTP Server details for POST route from contact form
app.post('/contact', function (req, res) {
  //res.sendFile('/signature.html');
  let mailOpts;
  mailOpts = {
    from: 'RES PUBLICA Signature <donotreply@respublica.com>',
    to: req.body.emailInput,
    subject: 'Signature Setup - Select full contents of the email and copy',
    text: req.body.emailContent,
    html: req.body.emailContent
  };
		styliner.processHTML(source)
        .then(function(processedSource) {
              sendmail(mailOpts, function (error, response) {
				if (error) {
				  return console.log(error);
				  res.render('contact-failure');
				}
				else {
				  res.redirect('http://respublicasignatures.ca/signatureNode/signature.html');
				  res.render('contact-success');
				}
			  });
        });

});

/*--------------------Routing Over----------------------------*/

app.listen(8090,function(){
    console.log("Express Started on Port 3000");
});
