import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3333;

const config = {
    server: {
        port: PORT
    }
};


export default config