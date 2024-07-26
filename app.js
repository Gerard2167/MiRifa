document.addEventListener('DOMContentLoaded', () => {
    const raffleForm = document.getElementById('raffle-form');
    const numberGrid = document.getElementById('number-grid');
    const selectedNumbersDiv = document.getElementById('selected-numbers');
    const userForm = document.getElementById('user-form');
    let selectedNumbers = [];

    // Crear grid de números
    for (let i = 0; i <= 100; i++) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.innerText = i < 10 ? '0' + i : i;
        numberDiv.addEventListener('click', () => {
            if (selectedNumbers.includes(i)) {
                selectedNumbers = selectedNumbers.filter(num => num !== i);
                numberDiv.classList.remove('selected');
            } else {
                selectedNumbers.push(i);
                numberDiv.classList.add('selected');
            }
            selectedNumbersDiv.innerText = `Selected Numbers: ${selectedNumbers.join(', ')}`;
        });
        numberGrid.appendChild(numberDiv);
    }

    // Manejar envío del formulario de rifa
    raffleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const raffleName = document.getElementById('raffle-name').value;
        const rafflePrizes = document.getElementById('raffle-prizes').files;
        const formData = new FormData();
        formData.append('name', raffleName);
        Array.from(rafflePrizes).forEach((file, index) => {
            formData.append(`prize${index}`, file);
        });

        fetch('http://localhost:3000/api/raffle', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(data => {
              console.log('Raffle created:', data);
          })
          .catch(error => console.error('Error:', error));
    });

    // Manejar envío del formulario de usuario
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userName = document.getElementById('user-name').value;
        const userEmail = document.getElementById('user-email').value;
        const userPhone = document.getElementById('user-phone').value;

        const userSelection = {
            name: userName,
            email: userEmail,
            phone: userPhone,
            selectedNumbers
        };

        console.log('User selection:', userSelection);
        // Aquí puedes enviar los datos al servidor o manejarlo como desees
    });
});
