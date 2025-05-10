const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Generate QR code for the app
async function generateQR() {
    const url = 'https://glowwise-app.tunnel.dev'; // Expo tunnel URL
    
    try {
        const qrCode = await QRCode.toDataURL(url, {
            width: 400,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });

        // Create QR code image
        const qrImagePath = path.join(__dirname, 'qr-code.png');
        await QRCode.toFile(qrImagePath, url, {
            width: 400,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });

        console.log('QR code generated successfully!');
        console.log('QR code URL:', qrCode);
        console.log('QR code image saved to:', qrImagePath);
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
}

// Run the QR code generation
generateQR();
