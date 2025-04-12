
/** 根据经纬度获取两点距离（单位KM）
 * @desc 由经纬度计算两点之间的距离，la为latitude缩写，lo为longitude
 * @param la1 第一个坐标点的纬度 如：24.445676
 * @param lo1 第一个坐标点的经度 如：118.082745
 * @param la2 第二个坐标点的纬度
 * @param lo2 第二个坐标点的经度
 * @return (int)s   返回距离(单位千米或公里)
 * @tips 注意经度和纬度参数别传反了，一般经度为0~180、纬度为0~90
 */
function zmCalcuDistance(la1, lo1, la2, lo2) {
	var La1 = la1 * Math.PI / 180.0;
	var La2 = la2 * Math.PI / 180.0;
	var La3 = La1 - La2;
	var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(
		Lb3 / 2), 2)));
	s = s * 6378.137;
	s = Math.round(s * 10000) / 10000;
	// s = s.toFixed(4);// 保留小数点位数
	return s;
}



export default {
	zmCalcuDistance,
}