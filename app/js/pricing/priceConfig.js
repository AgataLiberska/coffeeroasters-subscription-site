const priceConfig = {
    "250g": {
        "every week": 7.20, 
        "every 2 weeks": 9.60, 
        "every month": 12.00,
    },
    "500g": {
        "every week": 13.00, 
        "every 2 weeks": 17.50, 
        "every month": 22.00,
    },
    "1000g": {
        "every week": 22.00, 
        "every 2 weeks": 32.00, 
        "every month": 42.00,
    },
}

const totalMultiplier = {
    "every week" : 4,
    "every 2 weeks" : 2,
    "every month" : 1,
}

export { priceConfig, totalMultiplier };