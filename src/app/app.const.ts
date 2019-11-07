export const API = {
    projectName: 'Agricultural',
    projectDescription: 'Projeto para agricultura',
    api: 'http://agdatabox.md.utfpr.edu.br/apidata/v2/',
};

export function getDefaultURL(resource: string) {
    return API.api + resource;
}
