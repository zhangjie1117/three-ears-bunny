module.exports = {
    development: {
        NODE_ENV: 'development',
        BASE_URL: 'https://api-sandbox.meeky.app',
        contract: '0x2FebB1AD1BB6e2Dd4432458Dbe17016b82e14441',
        authorization: '0x2FebB1AD1BB6e2Dd4432458Dbe17016b82e14441',
        OPEN_URL: 'https://testnets.opensea.io/collection/threeearsbunny-6'
    },
    production: {
        NODE_ENV: 'production',
        BASE_URL: 'https://i.may.social',
        contract: '0xAB0B366C98Ba840930084Fe0210377d88b113fD3',
        authorization: '',
        OPEN_URL: 'https://opensea.io/collection/3eb'
    }
}