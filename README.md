# Hospital Management System

This hospital management system is created to help facilitate the patients who are warded to each hospital - Developed By: Yen Pin (212903G)

## Table of Contents
- [1. Introduction](#1-introduction)
- [2. Installation](#2-installation)
- [3. Examples](#3-examples)
- [4. Possible Error Messages](#4-possible-error-messages)

## 1. Introduction

It is relevatively easy to use this node module, as it uses a **menu driven approach**.

The following the hierarchy
- Main Menu
    - Hospitals
        - List of Hospitals
            - List Wards
                - View if the ward is full/occupied
            - Add Ward
            - Delete Ward
            - Update Ward
    - Patients
        - List Patients
            - Allow patient to be warded
            - Unward patient
        - Add Patient
        - Delete patient
        - Update Patient
    - Exit applications

## 2. Installation

This system requires an api key to authenticate before using, **any authorized access or direct access to the system's function will be blocked by the middleware.**

### Instructions

1. Clone the repository
2. Create a app.js file in the root folder
3. Copy & Paste to the app.js file: ``` const hms = require("./Yen Pin_Hospital Management.js"); ```
4. Copy & Paste to the app.js file: ``` hms.authenticate('d94ffc98-31ea-478d-92f4-38bfe4a748ca'); ```
5. Run the command ```node app.js``` in the console

## 3. Examples

### Example 1 - List Hospital's Wards

1. Upon running the ```node app.js``` command
2. The following menu will be shown

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
9. By selecting on the ward, the details of the ward will be displayed
```
============================================
Selected Hospital - Khoo Teck Puat Hospital
Ward Name - Adult's Ward
Bed 1 - Occupied By Sarah Tan
============================================
```
10. After 3 seconds, the list wards menu will be shown again!

### Example 2 - Add Patient

1. Upon running the ```node app.js``` command
2. The following menu will be shown

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

3. Enter 2 in the console
4. The patients menu will then be shown
```
============================================
Patients Menu
============================================
Patients Menu
1. List Patients
2. Add Patient
3. Delete Patient
4. Update Patient
5. Back to main menu
============================================
Select your option: 
```
5. Select add patient by entering 2
6. The add patient form will be shown, to abort just enter the keyword **cancel** in any of the fields
```
============================================
Add Patient
============================================
Enter 'cancel' to exit
Enter the patient's name: 
```
7. The NRIC field require the format to be in T1234567P / S1234567D, following the actual format
8. When the form is completed, a success dialog will be shown as follows
```
============================================
Patient Name - Yen Pin
Patient Nric - T1234567P
Patient Address - 567 Woodlands Drive, #05-678, Singapore 567840
============================================
```
9. After 3 seconds, the patients menu will be shown again!

## 4. Possible Error Messages

1. When keying an invalid option in the field, the following error will be shown. Simply enter a valid option again in the prompt!
```
Select your option: asdf
asdf
Select a valid option
Select your option: 
```

2. When warding a patient to a full ward, simply re-select another ward that is empty
```
============================================
Adrian Lim (Not warded)
============================================
1. Child's Ward (Khoo Teck Puat Hospital) 
2. Adult's Ward (Khoo Teck Puat Hospital) - Ward Full
3. Senior's Ward (Khoo Teck Puat Hospital) 
4. A1 Ward (Mount Alvernia Hospital) 
5. B2 Ward (Mount Alvernia Hospital) 
6. C3 Ward (Mount Alvernia Hospital) 
7. Back to list patients menu
============================================
Select your option: 2
2
The selected ward is full, please try another ward!
Select your option: 
```