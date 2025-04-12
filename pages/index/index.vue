<template>
	<view class="page-content">
		<zm-page-navview title="实时定位" :isBack="true" :borderBottom="false" slot="top" />
		<view class="back-content">
			<view class="flex-content u-flex-1 czm-h-0">
				<scroll-view class="scrollV" scroll-y="true">
					<view>
						<view class="titleV">目标定位：</view>
						<view class="textV">{{JSON.stringify(desPos)}}</view>
						<view class="titleV">wx实时定位：</view>
						<view class="textV">{{curWxPos?JSON.stringify(curWxPos):"---"}}</view>
						<view class="titleV">当前实时定位距离：</view>
						<view class="textV">{{curWxDis}}</view>

						<view class="titleV">uni获取定位：</view>
						<view class="textV11">{{curLocation}}</view>

					</view>
				</scroll-view>
			</view>

			<button class="btn_2" type="primary" @tap="click">10后点击，uni获取经纬度</button>
		</view>
	</view>
</template>

<script>
	import zmtools from "@/zmtools"

	export default {
		name: "realTimePositionPage",
		components: {},
		computed: {
			curWxDis() { // 微信实时定位距离
				let __dis = (zmtools.speedy.zmCalcuDistance(this.curWxPos?.lat, this.curWxPos?.lon, this.desPos.lat,
					this.desPos
					.lon) * 1000).toFixed(1)
				console.log("__dis:", __dis)
				return __dis == "NaN" ? "---" : (__dis + "米");
			},
			curLocation() {
				return this.uniLocation?JSON.stringify(this.uniLocation):"---"
			}
		},
		data() {
			return {
				desPos: {
					lat: 24.490041,
					lon: 118.184591,
				},
				curWxPos: null, // 微信当前实时定位
				uniLocation: null,
			}
		},

		onLoad(options) {
			this.getLocation()
		},

		onUnload() {},

		onShow() {
			zmtools.location.monitor.zmBegin()
			uni.$on('iLocationSuc', (e) => {
				console.log("iLocationSuc_e:", JSON.stringify(e));
				this.curWxPos = {
					lat: e?.latitude,
					lon: e?.longitude,
				}
			})
			uni.$on('iLocationErr', (e) => {
				console.log("iLocationErr_e:", JSON.stringify(e));
			})
		},
		onHide() {
			zmtools.location.monitor.zmEnd()
			uni.$off('iLocationSuc');
			uni.$off('iLocationErr');
		},

		methods: {
			click() {
				this.getLocation();
			},

			async getLocation() {
				var _temp = await zmtools.location.func.zmLocation();
				this.uniLocation = {
					latitude:_temp.latitude,
					longitude:_temp.longitude,
				};
				console.log("_temp: " + JSON.stringify(_temp));
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page-content {
		width: 100vw;
		height: 100vh;
		background: #F5F9FC;

		.back-content {
			margin: 30rpx;
			padding: 20rpx;
			//  底部安全高度，顺序不要乱
			height: calc(100vh - (88rpx + var(--status-bar-height)) - 30rpx - constant(safe-area-inset-bottom) - 30rpx - (88rpx + 30rpx));
			height: calc(100vh - (88rpx + var(--status-bar-height)) - 30rpx - env(safe-area-inset-bottom) - 30rpx - (88rpx + 30rpx));
			border-radius: 20rpx;
			box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
			background: #FFFFFF;

			.flex-content {
				width: 100%;
				height: 100%;

				.scrollV {
					width: 100%;
					height: 100%;
					.titleV {
						font-size: 32rpx;
						font-weight: bold;
						color: #333333;
						margin-bottom: 30rpx;
						text-align: left;
					}

					.textV {
						margin-bottom: 20rpx;
						font-size: 28rpx;
						color: #666666;
						text-align: left;
					}
				}

			}

			.btn_2 {
				position: absolute;
				width: 80%;
				height: 88rpx;
				line-height: 88rpx;

				bottom: calc(constant(safe-area-inset-bottom) * 0.5 + 30rpx);
				bottom: calc(env(safe-area-inset-bottom) * 0.5 + 30rpx);
				border-radius: 44rpx;
				background-image: linear-gradient(129deg, #FFE061 0%, #FFC723 100%);
				font-size: 36rpx;
				color: #1C1C1C;
			}

			button::after {
				border: none;
			}
		}
	}
</style>
