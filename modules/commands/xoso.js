/**
 * @author MeewMeew
 * @warn Do not edit code or edit credits
 * @apikey Reg key tại: https://meewmeew.info/site
 */

class MeewMeewModule {
    get config() {
        return {
            name: "xoso",
            version: "1.0.1",
            hasPermssion: 0,
            credits: "MeewMeew",
            description: "Xem kết quả xổ số 40 tỉnh thành",
            commandCategory: "General",
            usages: "[args]",
            cooldowns: 5,
            dependencies: {
                meewmeewapi: ""
            },
            envConfig: {
                APIKEY: ""
            }
        }
    }

    get allProvince() {
        return [
            'ha_noi', 'quang_ninh', 'bac_ninh',
            'hai_phong', 'nam_dinh', 'thai_binh',
            'binh_duong', 'tra_vinh', 'vinh_long',
            'ca_mau', 'dong_thap', 'bac_lieu',
            'ben_tre', 'vung_tau', 'can_tho',
            'dong_nai', 'soc_trang', 'an_giang',
            'binh_thuan', 'tay_ninh', 'binh_phuoc',
            'hau_giang', 'long_an', 'da_lat',
            'kien_giang', 'tien_giang', 'tp_ho_chi_minh',
            'gia_lai', 'ninh_thuan', 'phu_yen',
            'thua_thien_hue', 'dac_lac', 'quang_nam',
            'binh_dinh', 'quang_binh', 'dac_nong',
            'quang_ngai', 'kon_tum', 'da_nang',
            'khanh_hoa'
        ]
    }

    async getResult(province) {
        const { APIKEY } = global.configModule.xoso;
        const MeewMeew = global.nodemodule["meewmeewapi"].default;
        const lottery = new MeewMeew.Lottery(APIKEY);
        var { data: { data, title } } = await lottery.result(province);
        var result = Object.entries(data);
        result.map(([key, value]) => {
            title += `\n${key}: ${value.join(" - ")}`;
        });
        return title;
    }

    async run({ api, event, args }) {
        if (!args[0]) return api.sendMessage("Vui lòng nhập tên tỉnh thành", event.threadID, event.messageID);
        if (args[0] == "all") return api.sendMessage("Các tỉnh có trong dữ liệu hiện tại: " + this.allProvince.join(", "), event.threadID, event.messageID);
        if (!this.allProvince.includes(args[0])) return api.sendMessage("Không tìm thấy tỉnh thành này", event.threadID, event.messageID);
        var result = await this.getResult(args[0]).catch(err => {
            return api.sendMessage(err.message, event.threadID, event.messageID);
        });
        if (result) return api.sendMessage(result, event.threadID, event.messageID);
    }
}

module.exports = new MeewMeewModule;