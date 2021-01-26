class UserDetails {
    // displayName = ''
    firstName = '';
    lastName = '';
    sex = '';
    address = '';
    description = '';

    constructor(firstName, lastName, sex, address, description) {
        // this.displayName = displayName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.sex = sex;
        this.address = address;
        this.description = description;
    }

}

module.exports = UserDetails;