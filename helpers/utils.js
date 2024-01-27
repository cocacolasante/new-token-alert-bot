

// LOWER THE TRUST SCORE, THE BETTER THE CONTRACT
const validateContract = (contract) =>{
    let trustScore = 0
    let isValid = false
    for (const key in contract) {
        if (contract.hasOwnProperty(key)) {
            const token = contract[key];
            console.log(`Processing token at key: ${key}`);
            
            // Access properties like token.lp_total_supply, token.lp_holders, etc.
            console.log(`Total LP Supply: ${token.lp_total_supply}`);
            console.log(`LP Holders: ${token.lp_holders.length}`);
            if(token.lp_holders.length < 2){
                trustScore++
            }
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



module.exports = {
    validateContract
}