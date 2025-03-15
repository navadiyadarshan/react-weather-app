# Weather Web App
🔗 [Weather Web App](https://weather-x-info.netlify.app)

<ul>
    <li>This weather web application allows users to search for weather details by simply entering a city name. Once a city is searched, the app provides comprehensive information such as the city and country, current temperature, feels-like temperature, and a brief weather description with an icon, along with the current date and time. Users can also access important weather metrics such as sunrise and sunset times, humidity, wind speed, cloud cover, and atmospheric pressure. Additionally, there’s an option to view temperatures in either Celsius or Fahrenheit, allowing for a personalized weather experience.</li><br>
    <li>The standout feature of this app is the 5-day weather forecast. It provides the maximum and minimum temperatures for each day, along with weather descriptions and corresponding images. The forecast is updated every 3 hours, giving users a detailed look at how the weather will change throughout the next five days.</li>
</ul>
<br>
<ul type="disk">
    <li><h2>About This Project</h2></li>
    <ol type="1">
        <li>React Components Structure:</li>
        <ul type="circle">
            <li><b>Component-Based Architecture:</b> The project is built using React with just two main components: Card and ForecastCard.</li>
            <li><b>Card Component:</b> Displays the current weather information, including city name, temperature, description, humidity, wind speed, etc.</li>
            <li><b>ForecastCard Component:</b> Shows the 5-day weather forecast, displaying the maximum and minimum temperatures and weather descriptions for each day.</li>
        </ul>
        <br>
        <li>Weather Data Fetching:</li>
        <ul type="circle">
            <li><b>API Integration:</b> The app fetches weather data from the OpenWeather API, which includes current weather details and a 5-day forecast based on the city entered.</li>
            <li><b>Dynamic Updates:</b> The weather details are updated dynamically each time a user searches for a new city, ensuring the data is always current.</li>
        </ul>
        <br>
        <li>User Interface and Styling:</li>
        <ul type="circle">
            <li><b>Plain CSS Styling:</b> The app uses plain CSS for styling, with an external .css file to ensure a clean, modern design. This includes custom styling for the Card and ForecastCard components.</li>
            <li><b>Responsive Design:</b> The app layout is responsive, ensuring the app looks great on mobile and desktop devices, adapting smoothly to different screen sizes.</li>
        </ul>
        <br>
        <li>Weather Metrics Display:</li>
        <ul type="circle">
            <li><b>Current Weather Info:</b> The Card component displays the current weather, including temperature, feels-like temperature, and key metrics like wind speed, humidity, and pressure.</li>
            <li><b>5-Day Forecast:</b> The ForecastCard component provides a detailed forecast for the next five days, showing maximum and minimum temperatures along with weather descriptions and icons.</li>
        </ul>
        <br>
        <li>Temperature Unit Toggle:</li>
        <ul type="circle">
            <li><b>Celsius/Fahrenheit Switch:</b> The app allows users to toggle between Celsius and Fahrenheit temperature units, providing a customized experience based on user preferences.</li>
        </ul>
    </ol>
</ul>

<br>

<ul type="disk">
    <li><h2>Skills Learned from this Project</h2></li>
    <ol type="1">
        <li>React State Management:</li>
        <ul type="circle">
            <li><b>Dynamic Data Handling:</b> Used useState and useEffect hooks for managing the weather data dynamically. Each time a user searches for a city, the components (both Card and ForecastCard) update automatically based on new data from the OpenWeather API.</li>
            <li><b>Component Reusability:</b> By structuring the project with reusable components, I was able to keep the code clean and efficient. Both Card and ForecastCard components share similar logic for displaying weather data, making them easily reusable for different sections of the app, such as displaying the current weather or forecast.</li>
        </ul>
        <br>
        <li>Component Reusability:</li>
        <ul type="circle">
            <li><b>Modular Design:</b> Both components follow a modular approach, allowing for the reuse of similar structures and logic. For example, the ForecastCard component can be reused across different sections if the design were to change, and Card can be updated or reused for other weather-related functionalities.</li>
            <li><b>Efficient Updates:</b> Since both components share similar code patterns, any changes made to one component (e.g., styling or data parsing) can be applied easily to the other, ensuring a more maintainable codebase.</li>
        </ul>
        <br>
        <li>API Integration:</li>
        <ul type="circle">
            <li><b>Fetching Weather Data:</b> Integrated OpenWeather API to fetch current weather and forecast data. This helped in learning how to handle asynchronous operations with async/await to ensure smooth fetching and display of data.</li>
            <li><b>Handling Dynamic Responses:</b> Used JavaScript functions to format and parse the response from the API, handling different weather conditions and ensuring consistent display of data in both components.</li>
        </ul>
        <br>
        <li>UI/UX Design:</li>
        <ul type="circle">
            <li><b>Plain CSS Styling:</b> Styled the app using plain CSS linked through an external stylesheet, ensuring consistency and a smooth user experience across components.</li>
            <li><b>Responsive Layout:</b> Designed the layout to be fully responsive, with adaptive features for both mobile and desktop views, ensuring that weather data is displayed clearly on all devices.</li>
        </ul>
        <br>
        <li>Event Handling and Dynamic Updates:</li>
        <ul type="circle">
            <li><b>Search Functionality:</b> Implemented the search feature to allow users to search by city and view updated weather data in real-time.</li>
            <li><b>Real-Time Data Updates:</b> Ensured that when the user changes the city, the Card and ForecastCard components automatically update with the new weather data, providing a smooth user experience.</li>
        </ul>
        <br>
        <li>Weather Data Parsing:</li>
        <ul type="circle">
            <li><b>Data Formatting:</b> Parsed API responses to extract relevant weather details (e.g., temperature, wind speed, etc.), and formatted them for display in both the Card and ForecastCard components.</li>
            <li><b>Date and Time Management:</b> Handled date and time formatting to display the correct time and date in the weather and forecast sections, ensuring users get accurate, localized information.</li>
        </ul>
    </ol>
</ul>
