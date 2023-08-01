class AdminModel {
    id: number;
    unique_id: string;
    admin_level: number;
    admin_name: string;
    admin_email: string;
    admin_password: string;
    admin_key: string;
    admin_phone_number: string;
    admin_status: boolean;
    constructor(data: { id: number; unique_id: string; admin_level: number; admin_name: string; admin_email: string; admin_password: string; admin_key: string; admin_phone_number: string; admin_status: boolean; }) {
        const {
            id,
            unique_id,
            admin_level,
            admin_name,
            admin_email,
            admin_password,
            admin_key,
            admin_phone_number,
            admin_status
        } = data;

        this.id = id;
        this.unique_id = unique_id;
        this.admin_level = admin_level;
        this.admin_name = admin_name;
        this.admin_email = admin_email;
        this.admin_password = admin_password;
        this.admin_key = admin_key;
        this.admin_phone_number = admin_phone_number;
        this.admin_status = admin_status;
    }
}

export {
    AdminModel
};