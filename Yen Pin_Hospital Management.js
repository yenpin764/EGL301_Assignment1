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

module.exports = {
    // API key to verify against
    // This API key is hashed with SHA256
    api_key: '4cb1add534211a4b76eae6f29164444a93a1a33ec6505f5ec53e0d0bee13b84a',
    // Upon successful authenticate, the variable will be set to true
    // This variable is crucial as it is used in the middleware
    authenticated: false,
    // Default database for peoples - They can be warded or healthy (Not Warded)
    // These data contains the person's id, name, NRIC, and address
    peoples: [
        {
            'people_id': '1ce38d77-c08f-4181-b9af-4798d9f423d6',
            'people_name': 'Sarah Tan',
            'nric': 'S1234567H',
            'address': '123 Orchard Road, #05-678, Singapore 123456'
        },
        {
            'people_id': '7c7f9f31-5901-4a6c-9f0b-8c66baac11af',
            'people_name': 'Adrian Lim',
            'nric': 'T7654321H',
            'address': '456 Bukit Timah Street, #02-345, Singapore 789012'
        },
        {
            'people_id': 'e2e8d577-43ec-4031-8d93-4669ee8ee20b',
            'people_name': 'Michelle Lee',
            'nric': 'S9876543H',
            'address': '789 Serangoon Avenue, #23-123, Singapore 234567'
        },
        {
            'people_id': 'e42ed334-effe-41f6-a4d2-803516607e51',
            'people_name': 'Brian Ng',
            'nric': 'T3456789H',
            'address': '321 Jurong West Street, #10-567, Singapore 456789'
        },
        {
            'people_id': 'b10635aa-be2f-41b7-9fbe-64d5294f38d8',
            'people_name': 'Vanessa Goh',
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
    // These data contains the people's id, ward's id
    warded: [
        {
            'people_id': '1ce38d77-c08f-4181-b9af-4798d9f423d6',
            'ward_id': '6e571ff8-873c-404e-9672-2ba3efb45b3d'
        }
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
        if (key != this.api_key) {
            // Error handling: Inform the user that the API Key is not valid
            console.log('Failed to authenticate, please enter a valid API key!')
        } else {
            // Set the authenticated to true to allow other functions to be used
            this.authenticated = true
            this.hospitalsMenu();
        }
    },
    // This function will verify that all request made are by trusted & authenticated user
    middleware() {
        if (!this.authenticated) {
            console.log('Please authenticated with the valid API key, before accessing the system');
            rl.close();
            return false;
        } else {
            return true;
        }
    },
    async hospitalsMenu() {
        // Display the menu for the supported hospitals
        console.log('============================================')
        console.log('Welcome to Hospital Management System!')
        console.log('============================================')
        console.log('Select a hospital to view wards and patients')
        // Looping through the list of hospital
        // Prefix with the array index + 1, so that the index starts with 1
        this.hospitals.forEach((hospital, index) => {
            console.log(`${index + 1}. ${hospital.hospital_name}`)
        });
        console.log(`${this.hospitals.length + 1}. Exit application`)
        console.log('============================================')
        let hospitalId = await this.input('Choose a hospital: ')
        // Check if the entered number is more or equal to the exit application index
        if (hospitalId >= this.hospitals.length + 1) {
            rl.close();
            return;
        }
        // Using the array index, removing the additional 1 added earlier
        // Find the uuid and then send it to the ward menu
        this.wardMenus(this.hospitals[hospitalId - 1].hospital_id)
    },
    // Showing the the ward's option for the selected hospital
    async wardMenus(hospitalId) {
        if (!this.middleware()) {
            return;
        }
        let selectedHospital = this.hospitals.find((hospital) => hospital.hospital_id == hospitalId)
        console.log('============================================')
        console.log(`Selected Hospital: ${selectedHospital.hospital_name}`)
        console.log(`Address: ${selectedHospital.address}`)
        console.log('============================================')
        console.log('Wards Menu')
        console.log('1. List Wards')
        console.log('2. Add Ward')
        console.log('3. Delete Ward')
        console.log('4. Update Ward')
        console.log('5. Back to main menu')
        console.log('============================================')
        let option = await this.input('Select your option: ')
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
            default:
                this.hospitalsMenu()
                return;
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

        // // Check if the ward is occupied or available
        // hospitalWards.forEach((ward) => {
        //     let occupiedBeds = this.warded.filter((warded) => warded.ward_id == ward.id)
        //     hospitalWards['occupied'] = occupiedBeds.length
        // })

        console.log('============================================')
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
        let option = await this.input('Select your option: ')

        switch (+option) {
            // case 1:
            //     break;
            default:
                this.wardMenus(selectedHospital.hospital_id)
                return;
        }
    },
    async addWard(hospitalId) {
        if (!this.middleware()) {
            return;
        }

        // Get the selected hospital
        let selectedHospital = this.hospitals.find((hospital) => hospital.hospital_id == hospitalId)

        console.log('============================================')
        console.log(`Add Ward - ${selectedHospital.hospital_name}`)
        console.log('============================================')
        console.log('Enter \'cancel\' to exit')


        let wardName = await this.input('Enter the ward\'s name: ')
        if (wardName == 'cancel') {
            this.wardMenus(selectedHospital.hospital_id)
        }

        let checkNumberOfBedsIsANumber = false
        let numberOfBeds = 0;
        while (!checkNumberOfBedsIsANumber) {
            numberOfBeds = await this.input('Enter no. of beds in the ward: ')
            if (numberOfBeds == 'cancel') {
                this.wardMenus(selectedHospital.hospital_id)
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

        console.log('============================================')
        console.log(`Selected Hospital - ${selectedHospital.hospital_name}`)
        console.log(`Ward Added - ${wardName}`)
        console.log('============================================')

        setTimeout(() => {
            this.wardMenus(selectedHospital.hospital_id)
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

        console.log('============================================')
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
        let option = await this.input('Select your option: ')

        if (option >= hospitalWards.length + 1) {
            this.wardMenus(selectedHospital.hospital_id)
        } else {
            let deleteWard = hospitalWards[option - 1];
            this.wards = this.wards.filter((wards) => wards.ward_id != deleteWard.ward_id);

            console.log('============================================')
            console.log(`Selected Hospital - ${selectedHospital.hospital_name}`)
            console.log(`Ward Deleted - ${deleteWard.ward_name}`)
            console.log('============================================')

            setTimeout(() => {
                this.wardMenus(selectedHospital.hospital_id)
            }, 3000);
        }
    }
}