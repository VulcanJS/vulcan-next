// Export all your SHARED models here
// Please do not remove the User model, which is necessary for auth
import { SampleModel } from "~/vulcan-demo/models/sampleModel";
import { User } from "~/account/models/user";
const models = [User, SampleModel];
export default models;
