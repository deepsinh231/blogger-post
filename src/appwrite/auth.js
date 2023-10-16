import Conf from '../conf/Conf';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(Conf.appwriteurl)
            .setProject(Conf.appwriteprojectid);
        this.account = new Account(this.client)
    }
    async createAccount({ email, password, name }) {
        try {
            const useAccount = await this.account.create(ID.unique(), email, password, name)
            if (useAccount) {
                return this.Login({ email, password })
            } else {
                return useAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async Login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error;
        }
    }
    async getCurrntuser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwite Servie ::getCurrntuser ::error", error);
        }
        return null;
    }
    async logout() {
        try {
            return await this.account.deleteSessions() 
        } catch (error) {
            console.log("Appwite Servie ::logout ::error", error);
        }
    }
}
const authService = new AuthService();

export default authService;