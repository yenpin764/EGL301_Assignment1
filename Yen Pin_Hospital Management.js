module.exports = {
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
            'hotel_name': 'Khoo Teck Puat Hospital',
            'address': '90 Yishun Central, Singapore 768828'
        },
        {
            'hospital_id': 2,
            'hotel_name': 'Mount Alvernia Hospital',
            'address': '820 Thomson Rd, Singapore 574623'
        },
        {
            'hospital_id': 3,
            'hotel_name': 'Gleneagles Hospital',
            'address': '6A Napier Rd, Singapore 258500'
        },
        {
            'hospital_id': 4,
            'hotel_name': 'Singapore General Hospital',
            'address': 'Outram Rd, Singapore 169608'
        },
        {
            'hospital_id': 5,
            'hotel_name': 'Mount Elizabeth Hospital',
            'address': '3 Mount Elizabeth, Singapore 228510'
        },
        {
            'hospital_id': 6,
            'hotel_name': 'Farrer Park Hospital',
            'address': 'Farrer Park Station Rd, Connexion, 217562'
        },
    ],
    wards: [
        {
            'ward_id': 1,
            'hospital_id': 1,
            'ward_name': 'Child\'s Ward'
        },
        {
            'ward_id': 2,
            'hospital_id': 1,
            'ward_name': 'Adult\'s Ward'
        },
        {
            'ward_id': 3,
            'hospital_id': 1,
            'ward_name': 'Senior\'s Ward'
        },
        {
            'ward_id': 4,
            'hospital_id': 2,
            'ward_name': 'A1 Ward'
        },
        {
            'ward_id': 5,
            'hospital_id': 2,
            'ward_name': 'B2 Ward'
        },
        {
            'ward_id': 6,
            'hospital_id': 2,
            'ward_name': 'C3 Ward'
        },
    ],
    warded: [
        {
            'people_id': 1,
            'ward_id': 5
        }
    ],
    // Explain what function A does
    functionA() {
        return 1 + 2;
    },
    // Explain what function B does
    functionB() {
        console.log("Hello function B");
    }
}