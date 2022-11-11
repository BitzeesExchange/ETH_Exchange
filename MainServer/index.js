const gateway = require('fast-gateway')

const server = gateway({
    routes:[
        {
            prefix:'/UserWallet',
            target:'http://localhost:1000'                 // 1)Generate Wallet
        },
        {
            prefix:'/eth',   
            target:'http://localhost:3000'                 // 2)Ethereum TOKEN
        },
        {
            prefix:'/usdt',   
            target:'http://localhost:2222'                 // 3)USDT TOKEN
        },
        {
            prefix:'/Shib',   
            target:'http://localhost:3333'                 // 4)SHIB TOKEN
        },
        {
            prefix:'/WBTC',   
            target:'http://localhost:4444'                 // 5)WBTC TOKEN
        },
        {
            prefix:'/AVAX',   
            target:'http://localhost:5555'                 // 6)AVAX TOKEN
        },
        {
            prefix:'/DAI',   
            target:'http://localhost:6666'                 // 7)DAI TOKEN
        },
        {
            prefix:'/LINK',   
            target:'http://localhost:7777'                 // 8)LINK TOKEN
        },
        {
            prefix:'/MKR',   
            target:'http://localhost:8888'                 // 9)MKR TOKEN
        } ,
        {
            prefix:'/ZRX',   
            target:'http://localhost:9999'                 // 10)ZRX TOKEN
        },
        {
            prefix:'/APE',   
            target:'http://localhost:1010'                 // 11)APE TOKEN
        },
        {
            prefix:'/CRO',   
            target:'http://localhost:2020'                 // 12)CRO TOKEN
        },
        {
            prefix:'/MATIC',   
            target:'http://localhost:3030'                 // 12)MATIC TOKEN
        },
        {
            prefix:'/UNISWAP',   
            target:'http://localhost:4040'                 // 12)UNISWAP TOKEN
        }          
    ]
})

server.get('/testing',(req,res)=>{res.send("Server is from APi-Gateway")})

server.start(4000).then(console.log('MAIN SERVER Running on port 4000 for Api-Gateway'))

