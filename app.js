// Giriş yapma ve QR kodu oluşturma
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    
    if (username) {
        // Kullanıcı adını URL'de kullanabilmek için encode et
        const encodedUsername = encodeURIComponent(username);

        // Kullanıcı adını tarayıcıda saklamak
        localStorage.setItem('username', username);
        
        // Giriş formunu gizle ve sohbeti göster
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';

        // Sohbete katılan kullanıcı adı ekle
        document.getElementById('username-display').textContent = username;
        
        // QR kodu için URL oluştur (GitHub Pages linki)
        const url = `https://musa413.github.io/sohbet-chat/index.html?username=${encodedUsername}`;

        // QR kodunu oluştur
        QRCode.toDataURL(url, function(error, dataURL) {
            if (error) {
                console.error('QR kodu oluşturulamadı:', error);
            } else {
                // QR kodunu img etiketi olarak ekle
                const imgElement = document.createElement('img');
                imgElement.src = dataURL;
                document.getElementById('qrcode').appendChild(imgElement);
                console.log('QR kodu başarıyla oluşturuldu!');
            }
        });
        
        // Sohbet mesajları
        const message = document.getElementById('message').value;
        const newMessage = document.createElement('p');
        newMessage.innerHTML = `<strong>${username}:</strong> Merhaba!`;
        document.getElementById('messages').appendChild(newMessage);
    }
});

// Mesaj gönderme
document.getElementById('send').addEventListener('click', function() {
    const message = document.getElementById('message').value;
    const username = localStorage.getItem('username');
    
    if (message && username) {
        const newMessage = document.createElement('p');
        newMessage.innerHTML = `<strong>${username}:</strong> ${message}`;
        document.getElementById('messages').appendChild(newMessage);
        document.getElementById('message').value = '';  // Mesaj kutusunu temizle
    }
});
        
// URL'deki parametreyi al ve sayfada göster
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
if (username) {
    document.getElementById('username-display').textContent = username;
}