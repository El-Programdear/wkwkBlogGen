(function () {
	"use strict";

	// キャラ画像パス初期値
	var imgPath_01 = "./talk_img/a.png";
	var imgPath_02 = "./talk_img/b.png";
	var imgPath_03 = "./talk_img/c.png";
	var imgPath_04 = "./talk_img/d.png";

	const alert = "※キャラを設定してね！画像パスのないキャラは選べないよ！";

	var code1 = document.querySelector("code1");
	code1.innerHTML = code1.innerHTML.replace(/</g, "&lt;").replace(/>/, "&gt;");

	var code2 = document.querySelector("code2");
	code2.innerHTML = code2.innerHTML.replace(/</g, "&lt;").replace(/>/, "&gt;");

	var code3 = document.querySelector("code3");
	code3.innerHTML = code3.innerHTML.replace(/</g, "&lt;").replace(/>/, "&gt;");

	var date = new Date();
	var year = date.getFullYear() + "";

	var disabledChk = imgPath => {
		if (imgPath) {
			return false;
		} else {
			return true;
		}
	};

	var vm = new Vue({
		el: "#app",
		data: {
			blog: "",
			year: year,
			radio_data: imgPath_01,
			img_path: "background-image: url('" + imgPath_01 + "')",
			leftIcon: '<div class="left-icon" style="background-image: url(\'' + imgPath_01 + '\');"></div>',
			rightIcon: '<div class="right-icon" style="background-image: url(\'' + imgPath_01 + '\');"></div>',
			imgPath_01: imgPath_01,
			imgPath_02: imgPath_02,
			imgPath_03: imgPath_03,
			imgPath_04: imgPath_04,
			disabled_01: false,
			disabled_02: false,
			disabled_03: false,
			disabled_04: false,
			disabled_change: false,
			alert: "",
		},
		watch: {
			imgPath_01: {
				handler: function () {
					this.watchImgPath(this.imgPath_01, this.disabled_01);
				}
			},
			imgPath_02: {
				handler: function () {
					this.watchImgPath(this.imgPath_02, this.disabled_02);
				}
			},
			imgPath_03: {
				handler: function () {
					this.watchImgPath(this.imgPath_03, this.disabled_03);
				}
			},
			imgPath_04: {
				handler: function () {
					this.watchImgPath(this.imgPath_04, this.disabled_04);
				}
			}
		},
		methods: {
			getPath: function () {
				this.img_path = "background-image: url('" + this.radio_data + "')";
				this.leftIcon =
					'<div class="left-icon" style="background-image: url(\'' +
					this.radio_data +
					"');\"></div>";
				this.rightIcon =
					'<div class="right-icon" style="background-image: url(\'' +
					this.radio_data +
					"');\"></div>";
			},
			fixPath: function (imgPath) {
				if (imgPath == null || imgPath == 'undefined') {
					imgPath = "";
				}
				this.img_path = "background-image: url('" + this.radio_data + "')";
				this.leftIcon =
					'<div class="left-icon" style="background-image: url(\'' +
					imgPath +
					"');\"></div>";
				this.rightIcon =
					'<div class="right-icon" style="background-image: url(\'' +
					imgPath +
					"');\"></div>";
			},
			resetPath: function () {
				this.imgPath_01 = this.imgPath_02 = this.imgPath_03 = this.imgPath_04 = "";
				this.disabled_01 = disabledChk(this.imgPath_01);
				this.disabled_02 = disabledChk(this.imgPath_02);
				this.disabled_03 = disabledChk(this.imgPath_03);
				this.disabled_04 = disabledChk(this.imgPath_04);
				this.disabled_changeChk();
			},
			disabled_changeChk: function () {
				if (this.disabled_01 && this.disabled_02 && this.disabled_03 && this.disabled_04) {
					this.disabled_change = true;
					this.alert = alert;
				} else {
					this.disabled_change = false;
					this.alert = "";
				}
			},
			watchImgPath: function (imgPath, disabled) {
				disabled = disabledChk(imgPath);
				this.disabled_changeChk();
				this.radio_data = imgPath;
				this.fixPath(imgPath);
			}
		}
	});
})();
