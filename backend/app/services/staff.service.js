const { ObjectId } = require("mongodb");
class StaffService {
    constructor(client) {
        this.Staff = client.db().collection("staffs");
    }
}

module.exports = StaffService;