function getData(path) {
    const app = getApp();
    const url = `${app.getUrl()}${path}`
    const header = { Authorization: app.getHeader() }

    console.log(url);
    return new Promise((resolve) => {
        wx.request({
            url,
            header,
            success(reqRes) {
                resolve(reqRes)
            }
        })
    })
}

module.exports = {
    getData,
}