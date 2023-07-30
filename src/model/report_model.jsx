class ProfileReportModel {
    constructor(data) {
        const {
            reportId,
            complainingUser,
            complainedUser,
            content,
            readStatus,
            date,
            complainingEmail = '',
            complainedEmail = ''
        } = data;

        this.reportId = reportId;
        this.complainingUser = complainingUser;
        this.complainedUser = complainedUser;
        this.content = content;
        this.readStatus = readStatus;
        this.date = date;
        this.complainingEmail = complainingEmail;
        this.complainedEmail = complainedEmail;
    }
}
class ContactReportModel {
    constructor(data) {
        const {
            reportId,
            reportEmail,
            subject,
            content,
            readStatus,
            date,
        } = data;

        this.reportId = reportId;
        this.reportEmail = reportEmail;
        this.subject = subject;
        this.content = content;
        this.readStatus = readStatus;
        this.date = date;
    }
}
export {
    ProfileReportModel, ContactReportModel
};
