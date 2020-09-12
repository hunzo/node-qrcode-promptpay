const express = require('express')
const qrcode = require('qrcode')
const path = require('path')
const morgan = require('morgan')
const ppPayload = require('promptpay-qr')

const app = express()

app.use(morgan('combined'))
app.use('/images', express.static(path.join(__dirname, 'public')))

app.get('/genqrcode', (req, res) => {
    n = String(req.query.phone)

    phoneNumber = `${n[0]}${n[1]}${n[2]}-${n[3]}${n[4]}${n[5]}-${n[6]}${n[7]}${n[8]}${n[9]}` // promptpay phone number format
    amount =  Number(req.query.amount)

    payload = ppPayload(phoneNumber, { amount })

    qrcode.toFile('public/test.png', payload, {
        // errorCorrectionLevel: 'H',
        type: 'image/png',
        // quality: 0.3,
        // version: 2,
        // margin: 5
    })

    res.send({
        info: "hello qrcode generator",
        url: 'http://localhost:3000/images/test.png',
        data: payload
    })
})

app.get('*', (req, res) => {
    res.send({
        info: 'promptpay qrcode generator',
        url: '/genqrcode?phone=?????&amount=????'
    })
})

app.listen(process.env.PORT || 3000)