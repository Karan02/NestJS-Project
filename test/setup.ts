import { rm } from "fs";
import { join } from "path";
// delete entire db before every single test, also configure this file in jest-e2e.json (ps - we are using sqlite, a file based db)
global.beforeEach(async () => {
    try{
        await rm(join(__dirname,'..','test.sqlite'),()=>{});
    }catch(err){

    }
    
});