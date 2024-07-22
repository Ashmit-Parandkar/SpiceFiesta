const express = require("express")
const ContactModel = require("../models/contact.js")

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const adminNum = process.env.ADMIN_NUM;

const sendMessageToAdmin = async(body) => {

    try {
        const message = await client.messages.create({
            from: process.env.TWILLIO_NUM,
            to: `+91${adminNum}`,
            body
        })

        console.log("To Admin : ", message);
    }
    catch(err){
        console.log(err);
    }

}

const sendMessageToCustomer = async(custNum, body) => {

    try {
        const message = await client.messages.create({
            from: process.env.TWILLIO_NUM,
            to: `+91${custNum}`,
            body
        })

        console.log("To Customer : ", message);
    }
    catch(err){
        console.log(err);
    }

}

const saveMessage = async(req, res) => {

    console.log(req.body);

    const custNum = req.body.mobile;

    const formattedDate = new Date(req.body.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let formattedPackage = req.body.selectedPackage;

    let pack = formattedPackage.split('-');
    
    pack[0] = pack[0][0].toUpperCase() + pack[0].substring(1);
    pack[1] = pack[1][0].toUpperCase() + pack[1].substring(1);

    formattedPackage = pack[0] + " " + pack[1];

    console.log(formattedDate);
    console.log(formattedPackage);

    try {

        let messageToAdmin = 
        `New Booking Alert !
        Customer Name: ${req.body.custName}
        Mobile Number: ${req.body.mobile}
        Address: ${req.body.address}
        Event Date: ${req.body.date}
        Selected Package: ${formattedPackage}
        Number of Guests: ${req.body.numberGuests}
        `
        messageToAdmin += req.body.message ? `Additional Message: ${req.body.message}` : ``

        // await sendMessageToAdmin(messageToAdmin);

        const messageToCustomer = `\nDear ${req.body.custName},\nThank you for booking with SpiceFiesta Caterers! We're thrilled to cater your event on ${formattedDate}. You've chosen the ${formattedPackage} package for ${req.body.numberGuests} guests, and we'll be prepared to serve your guests with our delicious offerings.\nLooking forward to making your event unforgettable!\n\nWarm regards,\nThe SpiceFiesta Team`

        // await sendMessageToCustomer(custNum, messageToCustomer);
        
        const contactData = new ContactModel(req.body);
        const savedBooking = await contactData.save();

        console.log("Sending maillllllllllll..");

        const url = process.env.EMAIL_URL
    try{
        const fetch = await import('node-fetch');
        const status = await fetch.default(
          url,
          {
            method: 'POST',
            body: messageToAdmin
          }
        )
        console.log(status);
    } catch(err) {
        console.log(err);
    }

        res.status(201).json(savedBooking);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = {saveMessage}