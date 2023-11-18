# Hospital Management System

This hospital management system is created to help facilitate the patients who are warded to each hospital
Created By: Yen Pin (212903G)

## Table of Contents
- 1. Installation
- 2. Examples
- 3. Possible Error Messages

## 1. Installation

It is relevatively easy to use this node module, as it uses a **menu driven approach**.

This system requires an api key to authenticate before using, **any authorized access or direct access to the system's function will be blocked by the middleware.**

### Instructions

1. Clone the repository
2. Create a app.js file in the root folder
3. Copy & Paste to the app.js file: ``` const hms = require("./Yen Pin_Hospital Management.js"); ```
4. Copy & Paste to the app.js file: ``` hms.authenticate('d94ffc98-31ea-478d-92f4-38bfe4a748ca'); ```
5. Run the command ```node app.js``` in the console

## 2. Examples

### Example 1 - List Hospitals

1. Upon running the ```node app.js``` command
2. The following menu will wil shown

```
============================================
Welcome to Hospital Management System!
============================================
Main Menu
1. Hospitals
2. Patients
3. Exit application
============================================
Select your option: 
```

3. Enter 1 in the console
4. The list of supported hospitals will be shown
```
============================================
Hospitals Menu
============================================
Select a hospital to view wards and patients
1. Khoo Teck Puat Hospital
2. Mount Alvernia Hospital
3. Gleneagles Hospital
4. Singapore General Hospital
5. Mount Elizabeth Hospital
6. Farrer Park Hospital
7. Back to main menu
============================================
Choose a hospital: 
```
5. Choose any hospital you want
6. Upon selecting of hospital, the wards menu will be shown
```
============================================
Selected Hospital: Khoo Teck Puat Hospital
Address: 90 Yishun Central, Singapore 768828
============================================
Wards Menu
1. List Wards
2. Add Ward
3. Delete Ward
4. Update Ward
5. Back to hospitals menu
============================================
Select your option: 
```
7. Select ```1. List Wards``` by typing 1 in the console
8. The list of wards will be shown
```
============================================
Hospital's Wards - Khoo Teck Puat Hospital
============================================
List Wards Menu
1. Child's Ward - 2 Beds
2. Adult's Ward - 1 Bed
3. Senior's Ward - 3 Beds
4. Back to wards menu
============================================
Select your option: 
```