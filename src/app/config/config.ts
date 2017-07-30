export class Config {

    static baseUrl = 'http://ec2-35-158-189-77.eu-central-1.compute.amazonaws.com:8080/wfb/';
    static tokenUrl = 'http://ec2-35-158-189-77.eu-central-1.compute.amazonaws.com:8080/wfb/oauth/token';
    //static baseUrl = 'http://localhost:8080/wfb/';
    //static tokenUrl = 'http://localhost:8080/wfb/oauth/token';
    static contentType = 'application/x-www-form-urlencoded; charset=utf-8';
    static authType = 'Basic ';
    static clientCreds = btoa("wfb:pittypang");
}