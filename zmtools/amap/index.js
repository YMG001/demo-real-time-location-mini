import wxAmap from './amap-wx.130.js'

let kGaodeKey = '12ce8874681f445d7575fca083ac4bb6'
// 插件手柄
let __plugin = new wxAmap.AMapWX({
	key: kGaodeKey,
})

/**
 * 逆地理编码 获取定位位置的详细地址信息 
 * @param {location}  经纬度坐标，不传或默认为当前位置 格式："118.184591,24.490041"
 */
function zmRegeo(location = null) {
	// #ifdef MP-WEIXIN
	return new Promise((resolve, reject) => {
		wx.getSetting({
			success: (res) => {
				if (!__plugin) {
					__plugin = new wxAmap.AMapWX({
						key: kGaodeKey,
					})
				}

				// 查看位置权限的状态 如果是首次授权(undefined)或者之前拒绝授权(false)            
				//!res.authSetting['scope.userLocation']
				if (res.authSetting['scope.userLocation'] == false) {
					//之前拒绝授权(false)
					wx.showModal({
						content: '检测到您没打开定位权限，是否去设置打开？',
						confirmText: "确认",
						cancelText: "取消",
						success: function(res) {
							console.log(res);
							//点击“确认”时打开设置页面
							if (res.confirm) {
								console.log('用户点击确认')
								wx.openSetting({
									success: (res) => {

										__plugin.getRegeo({
											location: location, // 带经纬度逆编码
											success: (data) => {
												data[0].regeocodeData.roads = null
												data[0].regeocodeData.roadinters = null
												data[0].regeocodeData.aois = null
												data[0].regeocodeData.pois = null
												data[0].regeocodeData.addressComponent.businessAreas = null
												data[0].regeocodeData.addressComponent.building = null
												data[0].regeocodeData.addressComponent.neighborhood = null
												resolve(data)
											},
											fail: (err) => {
												reject(err);
											},
										});

									},
									fail: (err) => {
										reject(err);
									}
								})
							} else {
								reject(res);
							}
						}
					});
				} else {
					//如果是首次授权则弹出授权窗口进行授权，如果之前进行了授权，则获取地理位置信息
					__plugin.getRegeo({
						location: location, // 带经纬度逆编码
						success: (data) => {
							data[0].regeocodeData.roads = null
							data[0].regeocodeData.roadinters = null
							data[0].regeocodeData.aois = null
							data[0].regeocodeData.pois = null
							data[0].regeocodeData.addressComponent.businessAreas = null
							data[0].regeocodeData.addressComponent.building = null
							data[0].regeocodeData.addressComponent.neighborhood = null
							resolve(data)
						},
						fail: (err) => {
							reject(err);
						},
					});
				}
			}
		})
	})
	// #endif
}

/**
 * 查询指定城市的实时天气和预报天气
 * @param {city}  城市名称 不传默认为定位城市名称 如："厦门市"
 */
function zmWeather(city = null) {
	// #ifdef MP-WEIXIN
	return new Promise((resolve, reject) => {

		wx.getSetting({
			success: (res) => {
				if (!__plugin) {
					__plugin = new wxAmap.AMapWX({
						key: kGaodeKey,
					})
				}

				// 查看位置权限的状态 如果是首次授权(undefined)或者之前拒绝授权(false)            
				//!res.authSetting['scope.userLocation']
				if (res.authSetting['scope.userLocation'] == false) {
					//之前拒绝授权(false)
					wx.showModal({
						content: '检测到您没打开定位权限，是否去设置打开？',
						confirmText: "确认",
						cancelText: "取消",
						success: function(res) {
							console.log(res);
							//点击“确认”时打开设置页面
							if (res.confirm) {
								console.log('用户点击确认')
								wx.openSetting({
									success: (res) => {

										__plugin.getWeather({
											city: city,
											success: (data) => {
												resolve(data)
											},
											fail: (err) => {
												reject(err);
											},
										})

									},
									fail: (err) => {
										reject(err);
									}
								})
							} else {
								reject(res);
							}
						}
					});
				} else {
					//如果是首次授权则弹出授权窗口进行授权，如果之前进行了授权，则获取地理位置信息
					__plugin.getWeather({
						city: city,
						success: (data) => {
							resolve(data)
						},
						fail: (err) => {
							reject(err);
						},
					})
				}
			}
		})
	})

	// #endif
}

/**
 * zmRegeo、zmWeather不能同时触发
 * [位置接口增加频率限制](https://developers.weixin.qq.com/community/develop/doc/000aee91a98d206bc6dbe722b51801)
 */
export default {
	zmRegeo,
	zmWeather,
}
