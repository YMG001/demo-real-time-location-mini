/**
 * 获取本地经纬度
 */
function zmLocation() {
	return new Promise((resolve, reject) => {
		uni.getSetting({
			success: (res) => {
				// 查看位置权限的状态 如果是首次授权(undefined)或者之前拒绝授权(false)            
				//!res.authSetting['scope.userLocation']
				if (res.authSetting['scope.userLocation'] == false) {
					uni.authorize({
						success(res) {
							/// 获取当前的地理位置、速度。
							uni.getLocation({
								type: 'gcj02',
								success: function(res) {
									resolve(res)
								},
								fail:function(err){
									reject(err);
								}
							});
						},
						fail(err) {
							reject(err);
						}
					})
				} else {
					//如果是首次授权则弹出授权窗口进行授权，如果之前进行了授权，则获取地理位置信息
					/// 获取当前的地理位置、速度。
					uni.getLocation({
						type: 'gcj02',
						success: function(res) {
							resolve(res)
						},
						fail:function(err){
							reject(err);
						}
					});
				}
			}
		})
	})
}


export default {
	zmLocation,
}