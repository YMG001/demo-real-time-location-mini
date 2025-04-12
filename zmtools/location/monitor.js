// 定位类型：国测局
const kLocationType = "gcj02"

// =====================================
// ============== 定位监控 ==============

/// 停止定位监控
function zmEnd() {
	// #ifdef MP-WEIXIN
	console.log("========zmEnd")
	wx.offLocationChange(function(res) {
		zmLocationSuc(res)
	});
	wx.offLocationChangeError(function(err) {
		zmLocationErr(err)
	});
	// #endif
}

// 判断是否获得了用户地理位置授权
function zmBegin() {
	// #ifdef MP-WEIXIN
	return new Promise((resolve,reject) => {
		wx.getSetting({
			success: (res) => {
				// 查看位置权限的状态 如果是首次授权(undefined)或者之前拒绝授权(false)            
				//!res.authSetting['scope.userLocation']
				if (res.authSetting['scope.userLocation'] == false) {
					//之前拒绝授权(false)
					zmAuthorityOpen(false)
					zmOpenConfirm()
				} else {
					//如果是首次授权则弹出授权窗口进行授权，如果之前进行了授权，则获取地理位置信息
					zmBeginLocation()
				}
				resolve(res)
			},
			fail:(err) =>{
				console.log("getSetting_err:",JSON.stringify(err))
				zmAuthorityOpen(false)
				reject(err)
			}
		})
	})
	// #endif
}

function zmOpenConfirm() {
	// #ifdef MP-WEIXIN
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
						zmBeginLocation()
					}
				})
			} else {
				console.log('用户点击取消')
				zmAuthorityOpen(false)
			}
		}
	});
	// #endif
}

// 开启定位监听
function zmBeginLocation() {
	// #ifdef MP-WEIXIN
	wx.startLocationUpdate({
		type: kLocationType,
		success(res) {
			zmAuthorityOpen(true)
			console.log("startLocation_suc: " + JSON.stringify(res));
		},
		fail(err) {
			zmAuthorityOpen(false)
			console.error("startLocation_err: " + JSON.stringify(err));
		},
	})
	wx.onLocationChange(function(res) {
		zmLocationSuc(res)
	});
	wx.onLocationChangeError(function(res) {
		zmLocationErr(res)
	});
	// #endif
}

/// 监控定位信息成功
function zmLocationSuc(res) {
	/* {
	"latitude":24.44579,
	"longitude":118.08243,
	"speed":-1,
	"accuracy":65,
	"verticalAccuracy":65,
	"horizontalAccuracy":65,
	"errMsg":"getLocation:ok"
	} */
	uni.$emit("iLocationSuc",res)
}

/// 监控定位信息失败
function zmLocationErr(err) {
	uni.$emit("iLocationErr",err)
}

/// 监控定位权限开关
function zmAuthorityOpen(e) {
	uni.$emit("iAuthorityOpen",e)
}

export default {
	zmBegin,
	zmEnd,
}