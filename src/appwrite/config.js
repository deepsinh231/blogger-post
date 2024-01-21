import Conf from '../conf/Conf';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Servie {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(Conf.appwriteurl)
            .setProject(Conf.appwriteprojectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }
    async createpost({ title, slug, content, Img_data, Status, userid }) {
        try {
            return await this.databases.createDocument(
                Conf.appwritedatabaseid,
                Conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    Img_data,   
                    Status,
                    userid
                }
            )
        } catch (error) {
            console.log("Appwite Servie ::createpost ::error", error);


        }
    }
    async updatepost(slug, { title, content, Img_data, Status, }) {
        try {
            return await this.databases.updateDocument(
                Conf.appwritedatabaseid,
                Conf.appwritecollectionid,
                slug, {
                title,
                content,
                Img_data,
                Status,

            }
            )
        } catch (error) {
            console.log("Appwite Servie ::updatepost ::error", error);

        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                Conf.appwritedatabaseid,
                Conf.appwritecollectionid,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwite Servie ::deletePost ::error", error);
            return false
        }
    }
    async getDocument(slug) {
        try {
            return await this.databases.getDocument(
                Conf.appwritedatabaseid,
                Conf.appwritecollectionid,
                slug
            )

        } catch (error) {
            console.log("Appwite Servie ::getDocument ::error", error);
            return false
        }
    }
    async listDoumnet(querys = [Query.equal("Status", "active")]) {
        try {
            return await this.databases.listDocuments(
                Conf.appwritedatabaseid,
                Conf.appwritecollectionid,
                querys
            )
        } catch (error) {
            console.log("Appwite Servie ::listDoumnet ::error", error);
            return false
        }
    }

    // file Upload
    async uploadfile(file) {
        try {
            return await this.bucket.createFile(
                Conf.appwritebucketid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwite Servie ::uploadfile ::error", error);
            return false
        }
    }
    async deletefile(fileID) {
        try {
            return await this.bucket.deleteFile(
                Conf.appwritebucketid,
                ID.unique(),
                fileID
            )
        } catch (error) {
            console.log("Appwite Servie ::uploadfile ::error", error);
            return false
        }
    }
    getfileProview(fileID) {
        try {
            const STA = this.bucket.getFilePreview(
                Conf.appwritebucketid,
                fileID
            )
            return STA;
        } catch (error) {
            console.log("Appwite Servie ::getfileProview ::error", error);

        }
    }
}

const servie = new Servie()
export default servie;