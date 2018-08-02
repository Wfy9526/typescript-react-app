
const getDataByAjax = (url: string) => {
    return new Promise((resolve, reject) => {
        let result: object = {};
        const xml = new XMLHttpRequest();
        xml.open("Get", url);
        xml.send();
        xml.onreadystatechange = () => {
            if (xml.readyState === 4 && xml.status === 200) {
                result = JSON.parse(xml.responseText);
                resolve(result);
            }
        };
    });

};

export default getDataByAjax;