# zm-amap

# 前言
**Tips：**

1、[uniapp关于获取位置文档](https://uniapp.dcloud.io/api/location/location?id=getlocation)
文档中表述：在小程序平台，api默认不返回详细地址中文描述（即逆地理编码）。推荐使用高德地图小程序sdk，在app和微信上都可以获得中文地址。

2、[位置接口增加频率限制](https://developers.weixin.qq.com/community/develop/doc/000aee91a98d206bc6dbe722b51801)
>当前小程序频繁调用wx.getLocation接口会导致用户手机电量消耗较快，请开发者改为使用持续定位接口wx.onLocationChange，该接口会固定频率回调，使用效果与跟频繁调用getLocation一致。
>从基础库2.17.0版本起（预计发布时间2021.4.9），将对getLocation接口增加频率限制，包括：
>> * 1、在开发版或体验版中，30秒内调用getLocation，仅第一次有效，剩余返回fail。
>> * 2、正式版中，为保证小程序正常运行同时不过度消耗用户电量，一定时间内（根据设备情况判断）调用getLocation，仅第一次会返回实时定位信息，剩余返回与第一次定位相同的信息。
>> **个人补充：** 1、sdk方法的调用时间间隔10s内会报错，超过则不报错。

**Tips：**

1、地图POI：某个地理位置周边的信息


---
# 二、插件使用步骤

## 1、导入方式
* 1、[使用HBuilderX导入插件](https://ext.dcloud.net.cn/plugin?id=6937)
* 2、[下载插件ZIP](https://ext.dcloud.net.cn/plugin?id=6937)
* 3、node 导入
* 3.1、在【package.json】文件中添加导入配置
```json
  "dependencies": {
    "cm-amap": "^1.0.3"
  }
```
* 3.2、打开项目中的终端，输入：
```shell
npm install
```
* 3.3、下载成功后在【node_modules】中显示

## 2、插件引用
**Tips:** 推荐npm引用

2.1、uni_modules引用
```
import {
		zmRegeo,
		zmWeather,
	} from '@/uni_modules/cm-amap/index.js'
	
import {
		zmCalculateDistance,
	} from '@/uni_modules/cm-amap/libs/common.js'
```

2.2、npm引用
```
import {
		zmRegeo,
		zmWeather,
	} from 'cm-amap/index.js'
	
import {
		zmCalculateDistance,
	} from 'cm-amap/libs/common.js'
```

* 插件ZIP下载导入项目，使用的时候，除了注册引用的路径不一致，其他全部一致

## 3、方法使用
```
		methods: {
			zmRegeo,
			zmWeather,
			zmCalculateDistance,
			async regeoClick() {
				this.geoData = (await this.zmRegeo())[0];
				console.log("this.geoData: " + JSON.stringify(this.geoData));
			},

			async weatherClick() {
				let _da = await this.zmWeather();
				for (const key in _da) {
					console.log(key);
					if (key !== 'liveData') {
						this.weather.data.push({
							name: 'div',
							children: [{
								type: 'text',
								text: _da[key].text + '：' + _da[key].data
							}]
						});
					}
				}
				this.weather.hasData = true
				console.log("_da: " + JSON.stringify(_da));
			},
			
			// 距离计算
			calDis () {
				var __dis = this.zmCalculateDistance(24.445676, 118.082745, 24.445676, 118.082545)
				console.log("__dis:", __dis+"米");
			}
			
		},

```

---
---

# 三、高德地图小程序sdk使用步骤
1、在[高德开放平台](https://lbs.amap.com/api/wx/summary)，注册账号并申请 key 等相关信息；

2、下载[微信小程序SDK](https://lbs.amap.com/api/wx/download)

3、导入SDK并使用
```javascript
// 引入SDK
import amap from '../../common/amap-wx.js';  

export default {  
    data() {  
        return {  
            amapPlugin: null,  //sdk对象 
            key: '高德key',  
            addressName: '',  
            weather: {  
                hasData: false,  
                data: []  
            }  
        }  
    },  
    onLoad() {
		// 初始化实例对象
        this.amapPlugin = new amap.AMapWX({  
            key: this.key  
        });  
    },  
    methods: {  
		// 获取地理位置信息
        getRegeo() {  
            uni.showLoading({  
                title: '获取信息中'  
            });  
            this.amapPlugin.getRegeo({  
                success: (data) => {  
                    console.log(data)  
                    this.addressName = data[0].name;  
                    uni.hideLoading();  
                }  
            });  
        },
		getWeather() {
				uni.showLoading({
					title: '获取信息中'
				});
				this.amapPlugin.getWeather({
					success: (data) => {
						console.log(data);
						for (const key in data) {
							console.log(key);
							if (key !== 'liveData') {
								this.weather.data.push({
									name: 'div',
									children: [{
										type: 'text',
										text: data[key].text + '：' + data[key].data
									}]
								});
							}
						}
						uni.hideLoading();
						this.weather.hasData = true;
					}
				});
			}
    }  
}

```

参考：[uni-app中使用微信小程序第三方 SDK 及资源汇总](https://ask.dcloud.net.cn/article/35070)
