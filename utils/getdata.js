function getData(path, data = {}, method = "GET") {
    const app = getApp();
    const url = `${app.getUrl()}${path}`
    const header = { Authorization: app.getHeader() }

    console.log(url);
    return new Promise((resolve) => {
        wx.request({
            url,
            header,
            data, 
            method,
            success(reqRes) {
                resolve(reqRes)
            }
        })
    })
}

module.exports = {
    getData,
}