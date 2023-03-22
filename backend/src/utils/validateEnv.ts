import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

//cleanenv provided by envalid to verify is environment is missing or not.

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    SESSION_SECRET: str(),
});