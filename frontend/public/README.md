# chronicling-america
Chronicling-america - is a simple web application using Vue.js (v3) that interfaces a backend using data from the list of companies from Fortune 500. The application should allow users to search for companies using various parameters and display the results in a user-friendly interface. Additionally, the application should provide a detail view for each company, showing various data about its financial performance and key company information.

## Project FE setup
Clone repository:
```
https://github.com/glebovanton/chronicling-america
```

### Compiles and hot-reloads FE for development
```
cd frontend
npm install
npm start
```

## Project BE setup

### Create Table before BE start
Step 1:
Run the following SQL script to create a table that matches your CSV structure:
``
CREATE TABLE fortune500_2024 (
id SERIAL PRIMARY KEY,
rank INT,
company VARCHAR(255),
ticker VARCHAR(255),
sector VARCHAR(255),
industry VARCHAR(255),
profitable BOOLEAN,
founder_is_ceo BOOLEAN,
femaleceo BOOLEAN,
growth_in_jobs BOOLEAN,
change_in_rank FLOAT,
gained_in_rank BOOLEAN,
dropped_in_rank BOOLEAN,
newcomer_to_the_fortune500 BOOLEAN,
global500 BOOLEAN,
worlds_most_admired_companies BOOLEAN,
best_companies_to_work_for BOOLEAN,
number_of_employees INT,
marketcap_march28_m FLOAT,
revenues_m FLOAT,
revenuepercentchange FLOAT,
profits_m FLOAT,
profitspercentchange FLOAT,
assets_m FLOAT,
ceo VARCHAR(255),
country VARCHAR(255),
headquarterscity VARCHAR(255),
headquartersstate VARCHAR(255),
website TEXT,
companytype VARCHAR(255),
footnote TEXT,
marketcap_updated_m FLOAT,
updated DATE
);
``
Step 2: Import CSV Data into the Table
Navigate to the table you just created (fortune500_2024).
Right-click on the table, and select "Import/Export".
In the Import/Export data window:
Filename: Browse to your CSV file and select it.
Format: Choose CSV.
Header: Check the option if your CSV file contains headers.
Click "OK" to start importing.
After this, the data from your CSV should be imported into your fortune500_2024 table.

### Compiles and hot-reloads BE for development
```
cd backend
npm install
npm run start
```

### Compiles and minifies FE for production
```
npm run build
```

### Lints and fixes FE files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Requirements
node v20.11.0 (npm v10.2.4)

### Create Table
Step 1:
Run the following SQL script to create a table that matches your CSV structure:
``
CREATE TABLE fortune500_2024 (
id SERIAL PRIMARY KEY,
rank INT,
company VARCHAR(255),
ticker VARCHAR(255),
sector VARCHAR(255),
industry VARCHAR(255),
profitable BOOLEAN,
founder_is_ceo BOOLEAN,
femaleceo BOOLEAN,
growth_in_jobs BOOLEAN,
change_in_rank FLOAT,
gained_in_rank BOOLEAN,
dropped_in_rank BOOLEAN,
newcomer_to_the_fortune500 BOOLEAN,
global500 BOOLEAN,
worlds_most_admired_companies BOOLEAN,
best_companies_to_work_for BOOLEAN,
number_of_employees INT,
marketcap_march28_m FLOAT,
revenues_m FLOAT,
revenuepercentchange FLOAT,
profits_m FLOAT,
profitspercentchange FLOAT,
assets_m FLOAT,
ceo VARCHAR(255),
country VARCHAR(255),
headquarterscity VARCHAR(255),
headquartersstate VARCHAR(255),
website TEXT,
companytype VARCHAR(255),
footnote TEXT,
marketcap_updated_m FLOAT,
updated DATE
);
``
Step 2: Import CSV Data into the Table
Navigate to the table you just created (fortune500_2024).
Right-click on the table, and select "Import/Export".
In the Import/Export data window:
Filename: Browse to your CSV file and select it.
Format: Choose CSV.
Header: Check the option if your CSV file contains headers.
Click "OK" to start importing.
After this, the data from your CSV should be imported into your fortune500_2024 table.
