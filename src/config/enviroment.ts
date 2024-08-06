require('dotenv').config();

export default  {
    
    PORT:  process.env.PORT ?? 3000,

    //Credenciales DB
    DB_USERNAME:  process.env.DB_USERNAME,
    DB_NAME:  process.env.DB_NAME,
    DB_HOST:  process.env.DB_HOST,
    DB_PASSWORD:  process.env.DB_PASSWORD,

    //OPEN AI
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  };