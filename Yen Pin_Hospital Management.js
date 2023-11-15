var crypto = require('crypto');
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
            'people_id': 1,
            'people_name': 'Sarah Tan',
            'nric': 'S1234567H',
            'address': '123 Orchard Road, #05-678, Singapore 123456'
        },
        {
            'people_id': 2,
            'people_name': 'Adrian Lim',
            'nric': 'T7654321H',
            'address': '456 Bukit Timah Street, #02-345, Singapore 789012'
        },
        {
            'people_id': 3,
            'people_name': 'Michelle Lee',
            'nric': 'S9876543H',
            'address': '789 Serangoon Avenue, #23-123, Singapore 234567'
        },
        {
            'people_id': 4,
            'people_name': 'Brian Ng',
            'nric': 'T3456789H',
            'address': '321 Jurong West Street, #10-567, Singapore 456789'
        },
        {
            'people_id': 5,
            'people_name': 'Vanessa Goh',
            'nric': 'S2345678H',
            'address': '567 Woodlands Drive, #05-678, Singapore 567840'
        }
    ],
    hospitals: [
        {
            'hospital_id': 1,
            'hospital_name': 'Khoo Teck Puat Hospital',
            'address': '90 Yishun Central, Singapore 768828'
        },
        {
            'hospital_id': 2,
            'hospital_name': 'Mount Alvernia Hospital',
            'address': '820 Thomson Rd, Singapore 574623'
        },
        {
            'hospital_id': 3,
            'hospital_name': 'Gleneagles Hospital',
            'address': '6A Napier Rd, Singapore 258500'
        },
        {
            'hospital_id': 4,
            'hospital_name': 'Singapore General Hospital',
            'address': 'Outram Rd, Singapore 169608'
        },
        {
            'hospital_id': 5,
            'hospital_name': 'Mount Elizabeth Hospital',
            'address': '3 Mount Elizabeth, Singapore 228510'
        },
        {
            'hospital_id': 6,
            'hospital_name': 'Farrer Park Hospital',
            'address': 'Farrer Park Station Rd, Connexion, 217562'
        },
    ],
    wards: [
        {
            'ward_id': 1,
            'hospital_id': 1,
            'ward_name': 'Child\'s Ward',
            'beds': 2
        },
        {
            'ward_id': 2,
            'hospital_id': 1,
            'ward_name': 'Adult\'s Ward',
            'beds': 1
        },
        {
            'ward_id': 3,
            'hospital_id': 1,
            'ward_name': 'Senior\'s Ward',
            'beds': 3
        },
        {
            'ward_id': 4,
            'hospital_id': 2,
            'ward_name': 'A1 Ward',
            'beds': 4
        },
        {
            'ward_id': 5,
            'hospital_id': 2,
            'ward_name': 'B2 Ward',
            'beds': 6
        },
        {
            'ward_id': 6,
            'hospital_id': 2,
            'ward_name': 'C3 Ward',
            'beds': 1
        },
    ],
    warded: [
        {
            'people_id': 1,
            'ward_id': 5
        }
    ],
    input(question) {
        return new Promise((callback, error) => {
            rl.question(question, (userInput) => {
                callback(userInput);
            }, () => {
                error();
            });
        })
    },
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
            // Display the menu for the supported hospitals
            console.log('============================================')
            console.log('Welcome to Hospital Management System!')
            console.log('============================================')
            console.log('Select a hospital to view wards and patients')
            this.hospitals.forEach((hospital) => {
                console.log(`${hospital.hospital_id}. ${hospital.hospital_name}`)
            });
            console.log('============================================')
            let hospitalId = await this.input('Choose a hospital: ')
            this.hospitalMenu(hospitalId)
        }
    },
    // This function will verify that all request made are by trusted & authenticated user
    middleware() {
        if (!this.authenticated) {
            console.log('Please authenticated with the valid API key, before accessing the system');
            return false;
        } else {
            return true;
        }
    },
    async hospitalMenu(id) {
        if (!this.middleware()) {
            return;
        }
        let selectedHospital = this.hospitals.find((hospital) => hospital.hospital_id == id)
        console.log('============================================')
        console.log(`Selected Hospital: ${selectedHospital.hospital_name}`)
        console.log(`Address: ${selectedHospital.address}`)
        console.log('============================================')
        console.log('Main Menu')
        console.log('1. List Wards')
        console.log('2. Add Wards')
        console.log('3. Delete Wards')
        console.log('4. Exit application')
        console.log('============================================')
        let option = await this.input('Select your option: ')
        switch (+option) {
            case 1:
                this.listWards(id)
                break;
            default:
                rl.close();
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
        console.log(hospitalWards);

        // // Check if the ward is occupied or available
        // hospitalWards.forEach((ward) => {
        //     let occupiedBeds = this.warded.filter((warded) => warded.ward_id == ward.id)
        //     hospitalWards['occupied'] = occupiedBeds.length
        // })

        // console.log('============================================')
        // console.log('Current Ward')
        // console.log('============================================')
        // console.log('Select a hospital to view wards and patients')
        // this.hospitalWards.forEach((ward) => {
        //     console.log(`${ward}`)
        // });
        // console.log('============================================')
    }
}