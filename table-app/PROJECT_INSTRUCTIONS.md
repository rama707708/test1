# Angular Table App with URL Parameters

This Angular application demonstrates how to pass parameters through URLs and open new browser windows to display tables.

## Features

1. **URL Parameter Passing**: The app supports both route parameters and query parameters
2. **New Browser Window**: Opens tables in new browser windows/tabs
3. **Dynamic Table Display**: Shows different table data based on URL parameters
4. **Modern UI**: Clean, responsive design with professional styling

## How It Works

### Home Page (`/`)
- Displays buttons to open different table views
- Each button opens a new browser window with specific URL parameters
- Shows examples of both route parameters and query parameters

### Route Parameters
- Format: `/table/:id/:name/:category`
- Example: `/table/1/Electronics/Gadgets`
- Parameters are passed in the URL path

### Query Parameters  
- Format: `/table?id=1&name=Products&category=Electronics`
- Parameters are passed as URL query string

### Table Page (`/table`)
- Receives URL parameters (route or query)
- Displays parameter values at the top
- Shows a dynamic table based on the category parameter
- Includes sample data for Electronics, Books, and Clothing categories

## Usage

1. Start the development server:
   ```bash
   ng serve
   ```

2. Open your browser to `http://localhost:4200`

3. Click any of the buttons on the home page

4. Each button will open a new browser window showing:
   - The URL parameters that were passed
   - A table with sample data based on the category
   - Different styling based on item status

## Code Structure

### Components
- `HomeComponent`: Main landing page with buttons
- `TableComponent`: Displays tables with URL parameter data

### Routing
- `/` - Home component
- `/table` - Table component (with query params)
- `/table/:id/:name/:category` - Table component (with route params)

### Key Features Implemented

1. **URL Parameter Handling**:
   - Uses `ActivatedRoute` to get route and query parameters
   - Reactive parameter subscription for real-time updates

2. **New Window Opening**:
   - Uses `window.open()` with specific window dimensions
   - Handles popup blocking with user-friendly alerts

3. **Dynamic Data Generation**:
   - Different table data based on category parameter
   - Sample data for Electronics, Books, and Clothing

4. **Professional Styling**:
   - Modern CSS with gradients and shadows
   - Responsive design for mobile devices
   - Status badges with color coding
   - Hover effects and transitions

## Browser Compatibility

- Works in all modern browsers
- Popup blocker may prevent new windows - users need to allow popups
- Responsive design works on mobile and desktop

## Example URLs

- Route Parameters: `http://localhost:4200/table/1/Electronics/Gadgets`
- Query Parameters: `http://localhost:4200/table?id=1&name=Products&category=Electronics`

The application will automatically detect which type of parameters are being used and display the table accordingly.