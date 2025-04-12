# @rattan/zmtools

## 1、导入

1、在【package.json】文件中添加导入配置
```json
  "dependencies": {
    "@rattan/zmtools": "^1.0.5"
  }
```

2、打开项目中的终端，输入：
```shell
npm install
```

3、下载成功后在【node_modules】中显示

## 2、使用

1、组件引用
```javascript
import zmtools from "@rattan/zmtools"
```

2、方法调用
```javascript
export default {
	onShow() {
		// 开启定位监听
		zmtools.location.monitor.zmBegin()
		// 定位监听 - 成功回调
		uni.$on('iLocationSuc', (e) => {
			console.log("iLocationSuc_e:", JSON.stringify(e));
		})
		// 定位监听 - 失败回调
		uni.$on('iLocationErr', (e) => {
			console.log("iLocationErr_e:", JSON.stringify(e));
		})
	},
	onHide() {
		// 结束定位监听
		zmtools.location.monitor.zmEnd()
		uni.$off('iLocationSuc');
		uni.$off('iLocationErr');
	},
		
	onLoad(options) {
		// 高德sdk 逆编码
		let _da = (await zmtools.amap.zmRegeo())[0];
		// 高德sdk 天气简况
		let _da = await zmtools.amap.zmWeather();
		// uniapp 获取经纬度
		var _temp = await zmtools.location.func.zmLocation();
		// 计算两个经纬度的距离
		var __dis = (zmtools.speedy.zmCalcuDistance(24.445676, 118.082555, 24.445676, 118.082545) * 1000).toFixed(1)
		let showDis = __dis + "米";
	},

	methods: {},
}

```

