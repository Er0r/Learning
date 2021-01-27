const express = require('express');
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox',
    'client_id': '####yourclientid######',
    'client_secret': '####yourclientsecret#####'
});

const app = express();

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/index.html");
    // res.send('This is homepage');
})

app.get('/success', (req,res)=> {
    res.send('success');
})


app.get('/cancel', (req,res)=> {
    res.send('cancel');
})



app.post('/pay', (req, res) => {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Red Sox Hat",
                  "sku": "001",
                  "price": "25.00",
                  "currency": "USD",
                  "quantity": 1
              }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
          "description": "Hat for the best team ever"
      }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
});
  
});


app.listen(3000, () => console.log(`Server Started on 3000`));