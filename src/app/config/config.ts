export class Config {
   
    static baseUrl = 'http://localhost:8081/wfb/';
    static tokenUrl = 'http://localhost:8081/wfb/oauth/token';
    static contentType = 'application/x-www-form-urlencoded; charset=utf-8';
    static authType = 'Basic ';
    static clientCreds = btoa("wfb:pittypang");
}