// Both imported packages are Node.js Built-in Modules
// No additional installation required

// Crypto - Used for SHA256 hashing and to generate UUID
// UUID - Universally Unique Identifier
const crypto = require('crypto');
// Readline - Faciliate questions and answers from the user
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Upon successful authenticate, the variable will be set to true
// This variable is crucial as it is used in the middleware
// It is outside module exports to prevent this variable from being edited by user
let authenticated = false;

// As hospital's systems are generally deemed as mission critial, to enhance security an API key is required
// API key to verify against
// This API key is hashed with SHA256
// It is outside module exports to prevent this variable from being viewed by user
let api_key = '4cb1add534211a4b76eae6f29164444a93a1a33ec6505f5ec53e0d0bee13b84a';

module.exports = {
    // Default database for patients - They can be warded or healthy (Not Warded)
    // These data contains the patient's id, name, NRIC, and address
    patients: [
        {
            'patient_id': '1ce38d77-c08f-4181-b9af-4798d9f423d6',
            'patient_name': 'Sarah Tan',
            'nric': 'S1234567H',
            'address': '123 Orchard Road, #05-678, Singapore 123456'
        },
        {
            'patient_id': '7c7f9f31-5901-4a6c-9f0b-8c66baac11af',
            'patient_name': 'Adrian Lim',
            'nric': 'T7654321H',
            'address': '456 Bukit Timah Street, #02-345, Singapore 789012'
        },
        {
            'patient_id': 'e2e8d577-43ec-4031-8d93-4669ee8ee20b',
            'patient_name': 'Michelle Lee',
            'nric': 'S9876543H',
            'address': '789 Serangoon Avenue, #23-123, Singapore 234567'
        },
        {
            'patient_id': 'e42ed334-effe-41f6-a4d2-803516607e51',
            'patient_name': 'Brian Ng',
            'nric': 'T3456789H',
            'address': '321 Jurong West Street, #10-567, Singapore 456789'
        },
        {
            'patient_id': 'b10635aa-be2f-41b7-9fbe-64d5294f38d8',
            'patient_name': 'Vanessa Goh',
            'nric': 'S2345678H',
            'address': '567 Woodlands Drive, #05-678, Singapore 567840'
        }
    ],
    // Default database for hospital
    // These data contains the hospital's id, name and address
    hospitals: [
        {
            'hospital_id': '7cd0bb62-ec84-4519-b562-ac4a709c46be',
            'hospital_name': 'Khoo Teck Puat Hospital',
            'address': '90 Yishun Central, Singapore 768828'
        },
        {
            'hospital_id': '24abd125-4e4b-45a2-ae72-c06e0347ce7f',
            'hospital_name': 'Mount Alvernia Hospital',
            'address': '820 Thomson Rd, Singapore 574623'
        },
        {
            'hospital_id': '3e57a1fb-4ca4-4402-8651-31c79a40c2dc',
            'hospital_name': 'Gleneagles Hospital',
            'address': '6A Napier Rd, Singapore 258500'
        },
        {
            'hospital_id': 'c6ee6988-73c2-4454-bb4e-d3a3268d9b26',
            'hospital_name': 'Singapore General Hospital',
            'address': 'Outram Rd, Singapore 169608'
        },
        {
            'hospital_id': 'c4c8bbb6-07bd-4b78-b93f-0c488071a279',
            'hospital_name': 'Mount Elizabeth Hospital',
            'address': '3 Mount Elizabeth, Singapore 228510'
        },
        {
            'hospital_id': '2fb3528f-cd50-41ab-b217-16aa261414bb',
            'hospital_name': 'Farrer Park Hospital',
            'address': 'Farrer Park Station Rd, Connexion, 217562'
        },
    ],
    // Default database for hospital's wards
    // These data contains the ward's id, hospital's id, ward name and number of beds
    wards: [
        {
            'ward_id': '2fe6d5da-ab99-4474-934a-fa32bf094cbe',
            'hospital_id': '7cd0bb62-ec84-4519-b562-ac4a709c46be',
            'ward_name': 'Child\'s Ward',
            'beds': 2
        },
        {
            'ward_id': '6e571ff8-873c-404e-9672-2ba3efb45b3d',
            'hospital_id': '7cd0bb62-ec84-4519-b562-ac4a709c46be',
            'ward_name': 'Adult\'s Ward',
            'beds': 1
        },
        {
            'ward_id': '66b8efa1-1f56-4fdd-812a-ed665ec1eeb1',
            'hospital_id': '7cd0bb62-ec84-4519-b562-ac4a709c46be',
            'ward_name': 'Senior\'s Ward',
            'beds': 3
        },
        {
            'ward_id': 'd433f1b0-cac5-4097-9eac-d4b7fb60db6e',
            'hospital_id': '24abd125-4e4b-45a2-ae72-c06e0347ce7f',
            'ward_name': 'A1 Ward',
            'beds': 4
        },
        {
            'ward_id': '51b3fd16-fdf7-4b26-b051-072f9f8b8999',
            'hospital_id': '24abd125-4e4b-45a2-ae72-c06e0347ce7f',
            'ward_name': 'B2 Ward',
            'beds': 6
        },
        {
            'ward_id': 'eb17b476-8e9e-44ef-a4fb-43f64ebe4828',
            'hospital_id': '24abd125-4e4b-45a2-ae72-c06e0347ce7f',
            'ward_name': 'C3 Ward',
            'beds': 1
        },
    ],
    // Default database for warded patient
    // These data contains the patient's id, ward's id
    warded: [
        {
            'patient_id': '1ce38d77-c08f-4181-b9af-4798d9f423d6',
            'ward_id': '6e571ff8-873c-404e-9672-2ba3efb45b3d'
        },
    ],
    // Centralised function to help faciliated with collecting response from user
    input(question) {
        return new Promise((callback, error) => {
            rl.question(question, (userInput) => {
                callback(userInput);
            }, () => {
                error();
            });
        })
    },
    // Authenticate the user to allow access to the system
    async authenticate(key) {
        // Hash the given API Key - Using the hashing algorithm sha256
        key = crypto.createHash('sha256').update(key).digest('hex')
        // Match the give API Key and authenticate with the system
        if (key != api_key) {
            // Error handling: Inform the user that the API Key is not valid
            console.log('Failed to authenticate, please enter a valid API key!')
        } else {
            // Set the authenticated to true to allow other functions to be used
            authenticated = true
            this.mainMenu();
        }
    },
    // This function will verify that all request made are by trusted & authenticated user
    middleware() {
        if (!authenticated) {
            console.log('Please authenticated with the valid API key, before accessing the system');
            rl.close();
            return false;
        } else {
            return true;
        }
    },
    async mainMenu() {
        if (!this.middleware()) {
            return;
        }

        console.log('\n============================================')
        console.log('Welcome to Hospital Management System!')
        console.log('============================================')
        console.log('Main Menu')
        console.log('1. Hospitals')
        console.log('2. Patients')
        console.log(`3. Exit application`)
        console.log('============================================')

        let checkIfValidOption = false;
        let option = 1;

        while (!checkIfValidOption) {
            option = await this.input('Select your option: ')

            if (new RegExp('^[1-9]+$').test(option)) {
                // Check if the entered number is equal to the exit application index
                if (option == 3) {
                    rl.close();
                    return;
                } else if (option > 3) {
                    console.log('Select a valid option')
                } else {
                    checkIfValidOption = true;
                    switch (+option) {
                        case 1:
                            this.hospitalsMenu()
                            break;
                        case 2:
                            this.patientsMenu()
                            break;
                    }
                }
            } else {
                console.log('Select a valid option');
            }
        }

    },
    async hospitalsMenu() {
        if (!this.middleware()) {
            return;
        }

        // Display the menu for the supported hospitals
        console.log('\n============================================')
        console.log('Hospitals Menu')
        console.log('============================================')
        console.log('Select a hospital to view wards and patients')
        // Looping through the list of hospital
        // Prefix with the array index + 1, so that the index starts with 1
        this.hospitals.forEach((hospital, index) => {
            console.log(`${index + 1}. ${hospital.hospital_name}`)
        });
        console.log(`${this.hospitals.length + 1}. Back to main menu`)
        console.log('============================================')

        let checkIfValidOption = false;
        let hospitalId = 1;

        while (!checkIfValidOption) {
            hospitalId = await this.input('Choose a hospital: ')

            if (new RegExp('^[1-9]+$').test(hospitalId)) {
                // Check if the entered number is equal to go back to main menu
                if (hospitalId == this.hospitals.length + 1) {
                    this.mainMenu();
                } else if (hospitalId > this.hospitals.length + 1) {
                    console.log('Select a valid option')
                } else {
                    // Using the array index, removing the additional 1 added earlier
                    // Find the uuid and then send it to the ward menu
                    checkIfValidOption = true;
                    this.wardsMenu(this.hospitals[hospitalId - 1].hospital_id)
                }
            } else {
                console.log('Select a valid option');
            }
        }
    },
    // Showing the the ward's option for the selected hospital
    async wardsMenu(hospitalId) {
        if (!this.middleware()) {
            return;
        }

        let selectedHospital = this.hospitals.find((hospital) => hospital.hospital_id == hospitalId)
        console.log('\n============================================')
        console.log(`Selected Hospital: ${selectedHospital.hospital_name}`)
        console.log(`Address: ${selectedHospital.address}`)
        console.log('============================================')
        console.log('Wards Menu')
        console.log('1. List Wards')
        console.log('2. Add Ward')
        console.log('3. Delete Ward')
        console.log('4. Update Ward')
        console.log('5. Back to hospitals menu')
        console.log('============================================')

        let checkIfValidOption = false;
        let option = 1;

        while (!checkIfValidOption) {
            option = await this.input('Select your option: ')

            if (new RegExp('^[1-9]+$').test(option)) {
                // Check if the entered number is equal to the exit application index
                if (option == 5) {
                    this.hospitalsMenu()
                } else if (option > 5) {
                    console.log('Select a valid option')
                } else {
                    // Using the array index, removing the additional 1 added earlier
                    // Find the uuid and then send it to the ward menu
                    checkIfValidOption = true;
                    switch (+option) {
                        case 1:
                            this.listWards(hospitalId)
                            break;
                        case 2:
                            this.addWard(hospitalId)
                            break;
                        case 3:
                            this.deleteWard(hospitalId)
                            break;
                        case 4:
                            this.updateWard(hospitalId)
                            break;
                    }
                }
            } else {
                console.log('Select a valid option');
            }
        }


    },
    async listWards(hospitalId) {
        if (!this.middleware()) {
            return;
        }

        // Get the selected hospital
        let selectedHospital = this.hospitals.find((hospital) => hospital.hospital_id == hospitalId)

        // Get all selected hospital's wards
        let hospitalWards = this.wards.filter((wards) => wards.hospital_id == hospitalId)

        console.log('\n============================================')
        console.log(`Hospital's Wards - ${selectedHospital.hospital_name}`)
        console.log('============================================')
        console.log('List Wards Menu')
        // List all wards of the selected hospital
        hospitalWards.length != 0 ?
            hospitalWards.forEach((ward, index) => {
                console.log(`${index + 1}. ${ward.ward_name} - ${ward.beds} Bed${ward.beds != 1 ? 's' : ''}`)
            }) : console.log('- There are no ward added');
        console.log(`${hospitalWards.length + 1}. Back to wards menu`)
        console.log('============================================')

        let checkIfValidOption = false;
        let option = 1;

        while (!checkIfValidOption) {
            option = await this.input('Select your option: ')

            if (new RegExp('^[1-9]+$').test(option)) {
                // Check if the entered number is equal to the exit application index
                if (option == hospitalWards.length + 1) {
                    this.wardsMenu(selectedHospital.hospital_id)
                } else if (option > hospitalWards.length + 1) {
                    console.log('Select a valid option')
                } else {
                    checkIfValidOption = true;

                    let bedsCount = this.wards[option - 1].beds;
                    let wardedBeds = this.warded.filter((ward) => ward.ward_id == this.wards[option - 1].ward_id);

                    console.log('\n============================================')
                    console.log(`Selected Hospital - ${selectedHospital.hospital_name}`)
                    console.log(`Ward Name - ${this.wards[option - 1].ward_name}`)
                    for (let index = 0; index < bedsCount; index++) {
                        if (wardedBeds.length > index) {
                            let patientName = this.patients.find((patient) => patient.patient_id == wardedBeds[index].patient_id).patient_name;
                            console.log(`Bed ${index + 1} - Occupied By ${patientName}`)
                        } else {
                            console.log(`Bed ${index + 1} - Available`)
                        }
                    }
                    console.log('============================================')

                    setTimeout(() => {
                        this.listWards(selectedHospital.hospital_id)
                    }, 3000);
                }
            } else {
                console.log('Select a valid option');
            }

        }
    },
    async addWard(hospitalId) {
        if (!this.middleware()) {
            return;
        }

        // Get the selected hospital
        let selectedHospital = this.hospitals.find((hospital) => hospital.hospital_id == hospitalId)

        console.log('\n============================================')
        console.log(`Add Ward - ${selectedHospital.hospital_name}`)
        console.log('============================================')
        console.log('Enter \'cancel\' to exit')

        let checkIfWardNameIsNotEmpty = false;
        let wardName = '';

        while (!checkIfWardNameIsNotEmpty) {
            wardName = await this.input('Enter the ward\'s name: ')
            if (wardName == 'cancel') {
                this.wardsMenu(selectedHospital.hospital_id)
            } else if (wardName == '') {
                console.log('Ward name cannot be empty')
            } else {
                checkIfWardNameIsNotEmpty = true;
            }
        }


        let checkNumberOfBedsIsANumber = false
        let numberOfBeds = 0;

        while (!checkNumberOfBedsIsANumber) {
            numberOfBeds = await this.input('Enter no. of beds in the ward: ')
            if (numberOfBeds == 'cancel') {
                this.wardsMenu(selectedHospital.hospital_id)
            } else {
                if (+numberOfBeds == 0) {
                    console.log('No. of beds cannot be 0')
                } else if (new RegExp('^[0-9]+$').test(+numberOfBeds)) {
                    checkNumberOfBedsIsANumber = true;
                } else {
                    console.log('No. of beds need to be a number!')
                }
            }
        }

        this.wards.push({
            'ward_id': crypto.randomUUID(),
            'hospital_id': selectedHospital.hospital_id,
            'ward_name': wardName,
            'beds': numberOfBeds
        },)

        console.log('\n============================================')
        console.log(`Selected Hospital - ${selectedHospital.hospital_name}`)
        console.log(`Ward Added - ${wardName}`)
        console.log(`No. of Beds - ${numberOfBeds}`)
        console.log('============================================')

        setTimeout(() => {
            this.wardsMenu(selectedHospital.hospital_id)
        }, 3000);
    },
    async deleteWard(hospitalId) {
        if (!this.middleware()) {
            return;
        }

        // Get the selected hospital
        let selectedHospital = this.hospitals.find((hospital) => hospital.hospital_id == hospitalId)

        // Get all selected hospital's wards
        let hospitalWards = this.wards.filter((wards) => wards.hospital_id == hospitalId)

        console.log('\n============================================')
        console.log(`Hospital's Wards - ${selectedHospital.hospital_name}`)
        console.log('============================================')
        console.log('Delete Ward Menu')
        // List all wards of the selected hospital
        hospitalWards.length != 0 ?
            hospitalWards.forEach((ward, index) => {
                console.log(`${index + 1}. ${ward.ward_name} - ${ward.beds} Bed${ward.beds != 1 ? 's' : ''}`)
            }) : console.log('- There are no ward added');
        console.log(`${hospitalWards.length + 1}. Back to wards menu`)
        console.log('============================================')

        let checkIfValidOption = false;
        let option = 1;

        while (!checkIfValidOption) {
            option = await this.input('Select your option: ')

            if (new RegExp('^[1-9]+$').test(option)) {
                // Check if the entered number is equal to the exit application index
                if (option == hospitalWards.length + 1) {
                    this.wardsMenu(selectedHospital.hospital_id)
                } else if (option > hospitalWards.length + 1) {
                    console.log('Select a valid option')
                } else {
                    checkIfValidOption = true;

                    let deleteWard = hospitalWards[option - 1];
                    this.wards = this.wards.filter((wards) => wards.ward_id != deleteWard.ward_id);

                    console.log('\n============================================')
                    console.log(`Selected Hospital - ${selectedHospital.hospital_name}`)
                    console.log(`Ward Deleted - ${deleteWard.ward_name}`)
                    console.log('============================================')

                    setTimeout(() => {
                        this.wardsMenu(selectedHospital.hospital_id)
                    }, 3000);
                }
            } else {
                console.log('Select a valid option');
            }

        }

    },
    async updateWard(hospitalId) {
        if (!this.middleware()) {
            return;
        }

        // Get the selected hospital
        let selectedHospital = this.hospitals.find((hospital) => hospital.hospital_id == hospitalId)

        // Get all selected hospital's wards
        let hospitalWards = this.wards.filter((wards) => wards.hospital_id == hospitalId)

        console.log('\n============================================')
        console.log(`Hospital's Wards - ${selectedHospital.hospital_name}`)
        console.log('============================================')
        console.log('Update Ward Menu')
        // List all wards of the selected hospital
        hospitalWards.length != 0 ?
            hospitalWards.forEach((ward, index) => {
                console.log(`${index + 1}. ${ward.ward_name} - ${ward.beds} Bed${ward.beds != 1 ? 's' : ''}`)
            }) : console.log('- There are no ward added');
        console.log(`${hospitalWards.length + 1}. Back to wards menu`)
        console.log('============================================')

        let checkIfValidOption = false;
        let option = 1;

        while (!checkIfValidOption) {
            option = await this.input('Select your option: ')

            if (new RegExp('^[1-9]+$').test(option)) {
                // Check if the entered number is equal to the exit application index
                if (option == hospitalWards.length + 1) {
                    this.wardsMenu(selectedHospital.hospital_id)
                } else if (option > hospitalWards.length + 1) {
                    console.log('Select a valid option')
                } else {
                    let selectedWard = this.wards[option - 1];
                    console.log('\n============================================')
                    console.log(`${selectedWard.ward_name}`)
                    console.log('============================================')
                    console.log('Leave the fill blank if no update on the field is intended')
                    console.log('Enter \'cancel\' to exit')


                    let wardName = await this.input('Enter the ward\'s new name: ')
                    if (wardName == 'cancel') {
                        this.wardsMenu(selectedHospital.hospital_id)
                    }

                    let checkNumberOfBedsIsANumber = false
                    let numberOfBeds = 0;

                    while (!checkNumberOfBedsIsANumber) {
                        numberOfBeds = await this.input('Enter no. of beds in the ward: ')
                        if (numberOfBeds == 'cancel') {
                            this.wardsMenu(selectedHospital.hospital_id)
                        } else {
                            if (new RegExp('^[0-9]+$').test(+numberOfBeds)) {
                                checkNumberOfBedsIsANumber = true;
                            } else {
                                console.log('No. of beds need to be a number!')
                            }
                        }
                    }
                    checkIfValidOption = true;

                    wardName != '' ?
                        this.wards.find((ward) => ward.ward_id == selectedWard.ward_id).ward_name = wardName : ''

                    numberOfBeds != 0 ?
                        this.wards.find((ward) => ward.ward_id == selectedWard.ward_id).beds = numberOfBeds : ''

                    console.log('============================================')
                    console.log(`Selected Hospital - ${selectedHospital.hospital_name}`)
                    console.log(`New Ward Name - ${this.wards[option - 1].ward_name}`)
                    console.log(`New No. of Beds - ${this.wards[option - 1].beds}`)
                    console.log('============================================')


                    setTimeout(() => {
                        this.wardsMenu(selectedHospital.hospital_id)
                    }, 3000);
                }
            } else {
                console.log('Select a valid option');
            }
        }
    },
    async patientsMenu() {
        if (!this.middleware()) {
            return;
        }

        console.log('\n============================================')
        console.log('Patients Menu')
        console.log('============================================')
        console.log('Patients Menu')
        console.log('1. List Patients')
        console.log('2. Add Patient')
        console.log('3. Delete Patient')
        console.log('4. Update Patient')
        console.log('5. Back to main menu')
        console.log('============================================')

        let checkIfValidOption = false;
        let option = 1;

        while (!checkIfValidOption) {
            option = await this.input('Select your option: ')

            if (new RegExp('^[1-9]+$').test(option)) {
                // Check if the entered number is equal to the exit application index
                if (option == 5) {
                    this.mainMenu()
                } else if (option > 5) {
                    console.log('Select a valid option')
                } else {
                    checkIfValidOption = true;
                    switch (+option) {
                        case 1:
                            this.listPatients()
                            break;
                        case 2:
                            this.addPatient()
                            break;
                        case 3:
                            this.deletePatient()
                            break;
                        case 4:
                            this.updatePatient()
                            break;
                    }
                }
            } else {
                console.log('Select a valid option');
            }
        }
    },
    async listPatients() {
        if (!this.middleware()) {
            return;
        }

        console.log('\n============================================')
        console.log('List Patients Menu')
        console.log('============================================')
        console.log('List Patients Menu')
        // List all patients
        this.patients.length != 0 ?
            this.patients.forEach((patient, index) => {
                let checkWarded = this.warded.find((ward) => ward.patient_id == patient.patient_id);
                if (checkWarded) {
                    let wardedWard = this.wards.find((ward) => ward.ward_id == checkWarded.ward_id);
                    let wardedHospital = this.hospitals.find((hospital) => hospital.hospital_id == wardedWard.hospital_id)
                    console.log(`${index + 1}. ${patient.patient_name} - Warded To ${wardedWard.ward_name} (${wardedHospital.hospital_name})`)
                } else {
                    console.log(`${index + 1}. ${patient.patient_name}`)
                }
            }) : console.log('- There are no patient added');
        console.log(`${this.patients.length + 1}. Back to patients menu`)
        console.log('============================================')

        let checkIfValidOption = false;
        let option = 1;

        while (!checkIfValidOption) {
            option = await this.input('Choose a patient: ')

            if (new RegExp('^[1-9]+$').test(option)) {
                // Check if the entered number is equal to the patients menu
                if (option == this.patients.length + 1) {
                    this.patientsMenu();
                } else if (option > this.patients.length + 1) {
                    console.log('Select a valid option')
                } else {
                    checkIfValidOption = true;
                    this.patient(this.patients[option - 1].patient_id)
                }
            } else {
                console.log('Select a valid option');
            }
        }
    },
    async patient(patientId) {
        if (!this.middleware()) {
            return;
        }

        let selectedPatient = this.patients.find((patient) => patient.patient_id == patientId)
        let checkWarded = this.warded.find((ward) => ward.patient_id == selectedPatient.patient_id)

        if (checkWarded) {
            let wardedWard = this.wards.find((ward) => ward.ward_id == checkWarded.ward_id);
            let wardedHospital = this.hospitals.find((hospital) => hospital.hospital_id == wardedWard.hospital_id)
            console.log('\n============================================')
            console.log(`${selectedPatient.patient_name} - Warded To ${wardedWard.ward_name} (${wardedHospital.hospital_name})`)
            console.log('1. Unward patient')
            console.log('2. Back to list patients menu')
            console.log('============================================')

            let checkIfValidOption = false;
            let option = 1;

            while (!checkIfValidOption) {
                option = await this.input('Select your option: ')

                if (new RegExp('^[1-9]+$').test(option)) {
                    // Check if the entered number is equal to the patients menu
                    if (option == 2) {
                        this.listPatients();
                    } else if (option > 2) {
                        console.log('Select a valid option')
                    } else {
                        checkIfValidOption = true;
                        // Removing patient from warded list
                        this.warded = this.warded.filter((ward) => ward.patient_id != selectedPatient.patient_id)

                        console.log('\n============================================')
                        console.log(`Removed From Ward - ${selectedPatient.patient_name}`)
                        console.log(`Hospital Name - ${wardedHospital.hospital_name}`)
                        console.log(`Ward Name - ${wardedWard.ward_name}`)
                        console.log('============================================')

                        setTimeout(() => {
                            this.listPatients();
                        }, 3000);
                    }
                } else {
                    console.log('Select a valid option');
                }
            }
        } else {
            console.log('\n============================================')
            console.log(`${selectedPatient.patient_name} (Not warded)`)
            console.log('============================================')
            this.wards.forEach((ward, index) => {
                let hospital = this.hospitals.find((hospital) => hospital.hospital_id == ward.hospital_id)
                let checkIfFull = this.warded.filter((w) => w.ward_id == ward.ward_id).length;
                console.log(`${index + 1}. ${ward.ward_name} (${hospital.hospital_name}) ${checkIfFull == ward.beds ? '- Ward Full' : ''}`)
            })
            console.log(`${this.wards.length + 1}. Back to list patients menu`)
            console.log('============================================')

            let checkIfValidOption = false;
            let option = 1;

            while (!checkIfValidOption) {
                option = await this.input('Select your option: ')

                if (new RegExp('^[1-9]+$').test(option)) {
                    // Check if the entered number is equal to the exit application index
                    if (option == this.wards.length + 1) {
                        this.listPatients();
                    } else if (option > this.wards.length + 1) {
                        console.log('Select a valid option')
                    } else {
                        let selectedWard = this.wards[option - 1];
                        let checkIfFull = this.warded.filter((w) => w.ward_id == selectedWard.ward_id).length;
                        if (selectedWard.beds == checkIfFull) {
                            console.log('The selected ward is full, please try another ward!')
                        } else {
                            checkIfValidOption = true;

                            let selectedHospital = this.hospitals.find((hospital) => hospital.hospital_id == selectedWard.hospital_id);

                            console.log('\n============================================')
                            console.log('Successfully added to ward')
                            console.log(`Patient Name - ${selectedPatient.patient_name}`)
                            console.log(`Hospital Name - ${selectedHospital.hospital_name}`)
                            console.log(`Ward Name - ${selectedWard.ward_name}`)
                            console.log('============================================')

                            this.warded.push({
                                'patient_id': selectedPatient.patient_id,
                                'ward_id': selectedWard.ward_id
                            },)

                            setTimeout(() => {
                                this.listPatients();
                            }, 3000);
                        }
                    }
                } else {
                    console.log('Select a valid option');
                }

            }
        }
    },
    async addPatient() {
        if (!this.middleware()) {
            return;
        }

        console.log('\n============================================')
        console.log(`Add Patient`)
        console.log('============================================')
        console.log('Enter \'cancel\' to exit')

        let checkIfPatientNameIsNotEmpty = false;
        let patientName = '';

        while (!checkIfPatientNameIsNotEmpty) {
            patientName = await this.input('Enter the patient\'s name: ')
            if (patientName == 'cancel') {
                this.patientsMenu();
            } else if (patientName == '') {
                console.log('Patient name cannot be empty')
            } else {
                checkIfPatientNameIsNotEmpty = true;
            }
        }

        let checkIfNricIsNotEmpty = false;
        let patientNric = '';

        while (!checkIfNricIsNotEmpty) {
            patientNric = await this.input('Enter the patient\'s NRIC: ')
            if (patientNric == 'cancel') {
                this.patientsMenu();
            } else if (patientNric == '') {
                console.log('Patient NRIC cannot be empty')
            } else {
                patientNric = patientNric.toUpperCase();
                if (new RegExp('^[ST]\\d{7}[A-Z]$').test(patientNric)) {
                    checkIfNricIsNotEmpty = true;
                } else {
                    console.log('Please enter a valid NRIC - S1234567A / T1234567A')
                }
            }
        }

        let checkIfPatientAddressIsNotEmpty = false;
        let patientAddress = '';

        while (!checkIfPatientAddressIsNotEmpty) {
            patientAddress = await this.input('Enter the patient\'s address: ')
            if (patientAddress == 'cancel') {
                this.patientsMenu();
            } else if (patientAddress == '') {
                console.log('Patient address cannot be empty')
            } else {
                checkIfPatientAddressIsNotEmpty = true;
            }
        }

        this.patients.push({
            'patient_id': crypto.randomUUID(),
            'patient_name': patientName,
            'nric': patientNric,
            'address': patientAddress
        },)

        console.log('\n============================================')
        console.log(`Patient Name - ${patientName}`)
        console.log(`Patient Nric - ${patientNric}`)
        console.log(`Patient Address - ${patientAddress}`)
        console.log('============================================')

        setTimeout(() => {
            this.patientsMenu();
        }, 3000);
    },
    async deletePatient() {
        if (!this.middleware()) {
            return;
        }

        console.log('\n============================================')
        console.log('Delete Patient Menu')
        console.log('============================================')
        console.log('Delete Patient Menu')
        // List all patients
        this.patients.length != 0 ?
            this.patients.forEach((patient, index) => {
                console.log(`${index + 1}. ${patient.patient_name}`)
            }) : console.log('- There are no patient added');
        console.log(`${this.patients.length + 1}. Back to patients menu`)
        console.log('============================================')

        let checkIfValidOption = false;
        let option = 1;

        while (!checkIfValidOption) {
            option = await this.input('Select your option: ')

            if (new RegExp('^[1-9]+$').test(option)) {
                // Check if the entered number is equal to the patients menu
                if (option == this.patients.length + 1) {
                    this.patientsMenu();
                } else if (option > this.patients.length + 1) {
                    console.log('Select a valid option')
                } else {
                    checkIfValidOption = true;

                    let deletePatient = this.patients[option - 1];
                    this.patients = this.patients.filter((patient) => patient.patient_id != deletePatient.patient_id)

                    // Removing patient from warded list (In case they are warded)
                    this.warded = this.warded.filter((ward) => ward.patient_id != deletePatient.patient_id)

                    console.log('\n============================================')
                    console.log(`Patient Deleted - ${deletePatient.patient_name}`)
                    console.log('============================================')

                    setTimeout(() => {
                        this.patientsMenu();
                    }, 3000);
                }
            } else {
                console.log('Select a valid option');
            }
        }
    },
    async updatePatient() {
        if (!this.middleware()) {
            return;
        }

        console.log('\n============================================')
        console.log('Update Patient Menu')
        console.log('============================================')
        console.log('Update Patient Menu')
        // List all patients
        this.patients.length != 0 ?
            this.patients.forEach((patient, index) => {
                console.log(`${index + 1}. ${patient.patient_name}`)
            }) : console.log('- There are no patient added');
        console.log(`${this.patients.length + 1}. Back to patients menu`)
        console.log('============================================')

        let checkIfValidOption = false;
        let option = 1;

        while (!checkIfValidOption) {
            option = await this.input('Select your option: ')

            if (new RegExp('^[1-9]+$').test(option)) {
                // Check if the entered number is equal to the patients menu
                if (option == this.patients.length + 1) {
                    this.patientsMenu();
                } else if (option > this.patients.length + 1) {
                    console.log('Select a valid option')
                } else {
                    let selectedPatient = this.patients[option - 1];
                    console.log('\n============================================')
                    console.log(`${selectedPatient.patient_name}`)
                    console.log('============================================')
                    console.log('Leave the fill blank if no update on the field is intended')
                    console.log('Enter \'cancel\' to exit')

                    let checkIfPatientNameIsNotEmpty = false;
                    let patientName = '';

                    while (!checkIfPatientNameIsNotEmpty) {
                        patientName = await this.input('Enter the patient\'s new name: ')
                        if (patientName == 'cancel') {
                            this.patientsMenu();
                        } else {
                            checkIfPatientNameIsNotEmpty = true;
                        }
                    }

                    let checkIfNricIsNotEmpty = false;
                    let patientNric = '';

                    while (!checkIfNricIsNotEmpty) {
                        patientNric = await this.input('Enter the patient\'s new NRIC: ')
                        if (patientNric == 'cancel') {
                            this.patientsMenu();
                        } else {
                            patientNric = patientNric.toUpperCase();
                            if (new RegExp('^[ST]\\d{7}[A-Z]$').test(patientNric)) {
                                checkIfNricIsNotEmpty = true;
                            } else {
                                if (patientNric == '') {
                                    checkIfNricIsNotEmpty = true;
                                } else {
                                    console.log('Please enter a valid NRIC - S1234567A / T1234567A')
                                }
                            }
                        }
                    }

                    let checkIfPatientAddressIsNotEmpty = false;
                    let patientAddress = '';

                    while (!checkIfPatientAddressIsNotEmpty) {
                        patientAddress = await this.input('Enter the patient\'s new address: ')
                        if (patientAddress == 'cancel') {
                            this.patientsMenu();
                        } else {
                            checkIfPatientAddressIsNotEmpty = true;
                        }
                    }

                    checkIfValidOption = true;

                    patientName != '' ?
                        this.patients.find((patient) => patient.patient_id == selectedPatient.patient_id).patient_name = patientName : '';

                    patientNric != '' ?
                        this.patients.find((patient) => patient.patient_id == selectedPatient.patient_id).nric = patientNric : '';

                    patientAddress != '' ?
                        this.patients.find((patient) => patient.patient_id == selectedPatient.patient_id).address = patientAddress : '';

                    console.log('\n============================================')
                    console.log(`New Patient Name - ${this.patients[option - 1].patient_name}`)
                    console.log(`New Patient Nric - ${this.patients[option - 1].nric}`)
                    console.log(`New Patient Address - ${this.patients[option - 1].address}`)
                    console.log('============================================')

                    setTimeout(() => {
                        this.patientsMenu();
                    }, 3000);
                }
            } else {
                console.log('Select a valid option');
            }
        }
    }
}