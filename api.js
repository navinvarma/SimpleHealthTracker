var nodemailer = require("nodemailer"),
    config = require('./config');

// SMTP via Basic Auth - USE AT YOUR OWN RISK   
const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.emailUser,
        pass: config.emailPWD
    }
});


// SMTP via OAuth2 setup from config - Preferred solution
/*
var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        XOAuth2: {
            user: config.user,
            clientId: config.client_id,
            clientSecret: config.client_secret,
            refreshToken: config.refresh_token,
            accessToken: config.access_token,
            timeout: config.access_timeout - Date.now()
        }
    }
};
*/

exports.sendEmail = function (req, res) {
    //console.log("Form Contents: " + req.body.bpSys);
    var formattedHTML = formatEmail(req.body);
    //console.log("Email Contents: " + formattedHTML);
    var message = {
        from: config.emailUser,
        to: req.body.emailAddress,
        subject: "Simple Health Tracker Log - " + new Date(req.body.dateTimeLocal).toLocaleString(),
        html: formattedHTML
    };
    mailTransporter.sendMail(message, function (err) {
        if (err) {
            console.log("Error sending email", err);
        }
    });
    res.redirect('/sent');
}

function formatEmail(jsonBody) {

    var html = "<html>";
    html += "<body>";
    html += "<h4>Date & Time</h4> " + new Date(jsonBody.dateTimeLocal).toLocaleString();
    if (jsonBody.bpSys1.length > 0) {
        html += "<hr>";
        html += "<h4>Blood Pressure</h4>";
        html += "<h5>Reading 1</h5>";
        html += "Systolic: " + jsonBody.bpSys1;
        html += "<br/>";
        html += "Diastolic: " + jsonBody.bpDia1;
        html += "<br/>";
        html += "Pulse: " + jsonBody.bpPulse1;
    }
    if (jsonBody.bpSys2.length > 0) {
        html += "<h5>Reading 2</h5>";
        html += "Systolic: " + jsonBody.bpSys2;
        html += "<br/>";
        html += "Diastolic: " + jsonBody.bpDia2;
        html += "<br/>";
        html += "Pulse: " + jsonBody.bpPulse2;
    }
    if (jsonBody.bpSys3.length > 0) {
        html += "<h5>Reading 3</h5>";
        html += "Systolic: " + jsonBody.bpSys3;
        html += "<br/>";
        html += "Diastolic: " + jsonBody.bpDia3;
        html += "<br/>";
        html += "Pulse: " + jsonBody.bpPulse3;
    }

    if (jsonBody.glucoseReading.length > 0) {
        html += "<hr>";
        html += "<h4>Glucose</h4>";
        html += "Reading Type: " + jsonBody.glucoseReadingType;
        html += "<br/>";
        html += "Reading: " + jsonBody.glucoseReading;
    }

    if (jsonBody.weightReading.length > 0) {
        html += "<hr/>";
        html += "<h4>Weight</h4>";
        html += "Weight: " + jsonBody.weightReading;
    }

    if (jsonBody.mealLog.length > 0) {
        html += "<hr>";
        html += "<h4>Meal</h4>";
        html += "Log: " + jsonBody.mealLog;
    }

    html += "</body>";
    html += "</html>";

    return html;

}