import conf from '../config/Conf';
import { Client, Account, ID } from 'appwrite';

class AppWriteService {
    client: Client;
    account: Account;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.apiEndpoint)
            .setProject(conf.projectId);
        this.account = new Account(this.client);
    }

    async createAccount(email: string, password: string) {
        try {
            const user = await this.account.create(ID.unique(), email, password);
            if (user) {
                return user;
            } else {
                throw new Error('User creation failed');
            }
        } catch (error) {
            throw error;
        }
    }

    async login(email: string, password: string) {
        try {
            const isLoggedIn = await this.isUserLoggedIn();
            if (isLoggedIn) {
                throw new Error('User is already logged in');
            }

            const session = await this.account.createEmailPasswordSession(email, password);
            if (session) {
                return session;
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            throw error;
        }
    }

    async isUserLoggedIn(): Promise<boolean> {
        try {
            await this.account.get();
            return true;
        } catch (error) {
            return false;
        }
    }
}

const appwriteService = new AppWriteService();

export default appwriteService;
