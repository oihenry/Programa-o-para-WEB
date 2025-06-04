 async function getWeather() {
            const city = document.getElementById('city-input').value.trim();
            const weatherResult = document.getElementById('weather-result');
            
            if (!city) {
                weatherResult.innerHTML = '<p class="error">Por favor, digite o nome de uma cidade.</p>';
                return;
            }

            weatherResult.innerHTML = '<p>Carregando...</p>';
            
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=306c4f68e4ce11bc2aa936eb73446ada`
                );
                
                if (!response.ok) {
                    throw new Error('Cidade não encontrada');
                }
                
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                weatherResult.innerHTML = `<p class="error">Erro: ${error.message}</p>`;
            }
        }

        function displayWeather(data) {
            const weatherResult = document.getElementById('weather-result');
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            
            weatherResult.innerHTML = `
                <h2>Previsão para ${data.name}, ${data.sys.country}</h2>
                <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
                <p><strong>Temperatura:</strong> ${data.main.temp}°C</p>
                <p><strong>Sensação térmica:</strong> ${data.main.feels_like}°C</p>
                <p><strong>Condição:</strong> ${data.weather[0].description}</p>
            `;
        }