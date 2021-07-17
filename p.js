console.log("hi")
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ratedrsundram@gmail.com',
    pass: 'Ragini@123',
  }
});


var request = require("request")

var d= 141 /* enter district code */
var date = 17 /* enter today's date */
var month =05 /*enter the current month */
age= 45       
vax='COVAXIN' /* vaccine type COVAXIN or COVISHEILD*/
var url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id='+String(d)+'&date='+String(date)+'-'+String(month)+'-2021'

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        var data=body;
        var arr=[];
        for (let index = 0; index < data.centers.length; index++) {
            data.centers[index].sessions.forEach(vari=> {
                if (vari.available_capacity>1 && vari.min_age_limit==age && vari.vaccine==vax) {
                    var msg=data.centers[index].name +" on "+ vari.date + " available vaccines "+vari.available_capacity;
                    arr.push(String(msg));
                    
                }
                
            });
            
            
        }
        console.log(arr)
        if (arr.length>1) {
            var msg=String(arr.length)+" results found for your search "+"\n"+"\n";
            arr.forEach(element => {
                msg+=(element+"\n");
            });
            var mailOptions = {
                from: 'ratedrsundram@gmail.com',
                to: 'akramkhangkp09@gmail.com',
                subject: 'Your available vaccine slots',
                text: msg
              };
              transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
              

            
        }
    }
})