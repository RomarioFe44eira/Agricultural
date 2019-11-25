export const API = {
    projectName: 'Agricultural',
    projectDescription: 'Projeto para agricultura',
    api: 'http://agdatabox.md.utfpr.edu.br/apidata/v2/',
    /* api2: '192.168.116.200:3000/', */
};

export function getDefaultURL(resource: string) {
    return API.api + resource;
}
