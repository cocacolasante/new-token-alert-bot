require("dotenv").config()
const nodemailer = require('nodemailer');

// LOWER THE TRUST SCORE, THE BETTER THE CONTRACT
const validateContract = async (contract) =>{
    let trustScore = 0
    let isValid = false
    for (const key in contract) {
        if (contract.hasOwnProperty(key)) {
            const token = contract[key];
            console.log(`Processing token at key: ${key}`);
            console.log(`Token name ${token.token_name}`)
            
            // Access properties like token.lp_total_supply, token.lp_holders, etc.
            // console.log(`Total LP Supply: ${token.lp_total_supply}`);
            
            // if(token.lp_holders.length < 2){
            //     trustScore++
            // }
            console.log(`Self-Destruct: ${token.selfdestruct}`);
            if(token.selfdestruct > 0){
                trustScore+= 10
                return {
                    isValid: false,
                    trustScore: trustScore
                }
            }
            

            console.log(`is_honeypot: ${token.is_honeypot}`);
            if(token.is_honeypot > 0){
                trustScore+= 10
                return {
                    isValid: false,
                    trustScore: trustScore
                }
            } 
            console.log(`transfer_pausable: ${token.transfer_pausable}`);
            if(token.transfer_pausable > 0 ){
                trustScore+= 2
            }
            console.log(`owner_percent: ${token.owner_percent}`);
            console.log(`holder_count: ${token.holder_count}`);
            if(token.holder_count < 5) {
                trustScore++
            }
            console.log(`is_proxy: ${token.is_proxy}`);
            if(token.is_proxy > 0) {
                trustScore+=2
            }
            if(token.honeypot_with_same_creator > 0 ) {
                trustScore += 10
                return {
                    isValid: false,
                    trustScore: trustScore
                }
            }
            
            console.log(`can_take_back_ownership: ${token.can_take_back_ownership}`);
            if(token.can_take_back_ownership > 0 ) {
                trustScore += 10
                return {
                    isValid: false,
                    trustScore: trustScore
                }
            }
            if(token.is_open_source != 1 ) {
                trustScore++
            }
            console.log(`buy_tax: ${token.buy_tax}`);
            if(token.buy_tax > 0 ) {
                trustScore++
            }
            console.log(`buy_tax: ${token.sell_tax}`);
            if(token.sell_tax > 0 ) {
                trustScore++
            }
            console.log(`is_anti_whale: ${token.is_anti_whale}`);
            if(token.is_anti_whale > 0 ) {
                trustScore++
               
            }
            console.log(`anti_whale_modifiable: ${token.anti_whale_modifiable}`);
            if(token.anti_whale_modifiable > 0 ) {
                trustScore++
                
            }
            console.log(`cannot_buy: ${token.cannot_buy}`);
            if(token.cannot_buy > 0 ) {
                trustScore += 10
                return {
                    isValid: false,
                    trustScore: trustScore
                }
            }
            console.log(`is_mintable: ${token.is_mintable}`);
            if(token.is_mintable > 0 ) {
                trustScore++
            }
            console.log(`token_symbol: ${token.token_symbol}`);
            console.log(`trust_list: ${token.trust_list}`);
            if(token.trust_list > 0 ){
                isValid = true
                trustScore++
                return {
                    isValid: true,
                    trustScore: trustScore
                }
            }
            
          // If you want to iterate over lp_holders or other arrays
      
          // Continue for other properties as needed
        }
      }

      if(trustScore > 5 ){
        return{
            isValid: false,
            trustScore: trustScore
        }
      }
      isValid = true

      return {
        isValid: isValid,
        trustScore: trustScore
      }
}


const sendNotification = async (pairAddress, token0, token1, exchange) =>{
    try {
        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Use Gmail as the email service
            auth: {
                user: process.env.EMAIL_USERNAME, // Your email address
                pass: process.env.EMAIL_PASSWORD, // Your email password
            },
        });
        const body = `New Token Pair added to exchange: ${exchange}\n
            Token 0 address ${token0}\n
            Token 1 address ${token1}\n
            Pair address ${pairAddress}\n
        `
        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Token Alert" <cocacolasante215@gmail.com>', // Sender address
            to: "colasante16@gmail.com", // List of receivers
            subject: "New Token Pair Added", // Subject line
            text: body, // Plain text body
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Failed to send email", error);
    }
}


module.exports = {
    validateContract,
    sendNotification
}