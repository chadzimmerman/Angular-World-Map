# World Bank Data Map - Angular

This Angular project connects to the **World Bank API** to pull real-time country data and displays it interactively on a map. Users can hover over a country on the map to get detailed data, such as population, capital city, income level, and more. This project served as my first dip into working with APIs and integrating external data into an Angular application.

The project is built with Angular and utilizes various components to fetch and display API data dynamically. The current design is functional, but future improvements will focus on redesigning the UI for a better user experience.

## Features
- **World Map Integration**: A world map where users can hover over countries to view real-time data.
- **API Data**: Fetch country-specific data from the **World Bank API**, including:
  - Population
  - Capital City
  - Income Level
  - and more.
- **Dynamic Data Display**: When hovering over a country, relevant data is fetched and displayed in a user-friendly format.

## Technologies Used
- **Angular**: The core framework for building the application.
- **TypeScript**: Provides type safety and better management of application logic.
- **World Bank API**: Used to fetch real-time country data.
- **Bootstrap**: For basic styling and responsive layout.

## Installation

Follow these steps to get the project running locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/world-bank-data-map.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd world-bank-data-map
    ```
3. **Install the dependencies**:
    ```bash
    npm install
    ```

## Running the Application

To start the application locally, run:

```bash
ng serve
```

Then open your browser and go to `http://localhost:4200` to see the application in action.

## Screenshots
<img width="1139" alt="Screenshot 2025-04-02 at 9 07 51 PM" src="https://github.com/user-attachments/assets/1660bfa1-fff5-4275-aacd-fc29add3baf7" />


## Future Enhancements
- **UI Redesign**: Improve the UI for better user experience and aesthetics.
- **Interactive Features**: Add features such as country search, filter by income level, and display additional data (e.g., GDP, literacy rates).
- **Mobile Responsiveness**: Make the map fully responsive for mobile devices.
- **Data Visualization**: Use charts and graphs to visualize the data in a more engaging way.

## Learnings
- **APIs in Angular**: This project introduced me to working with external APIs in Angular, including how to structure HTTP requests, handle responses, and dynamically display data in the UI.
- **Angular Components**: I gained a better understanding of how Angular components can be used to create modular and reusable pieces of logic and UI.
