(function () {
  "use strict";

  // S3 上の画像を使うかどうかのフラグ
  var isS3 = true;

  // キャラ画像パス初期値
  var imgPath_01 = isS3 ? "https://s3-ap-northeast-1.amazonaws.com/iq29.org/char_img/00.png" : "./talk_img/a.png";
  var imgPath_02 = isS3 ? "https://s3-ap-northeast-1.amazonaws.com/iq29.org/char_img/01.png" : "./talk_img/b.png";
  var imgPath_03 = isS3 ? "https://s3-ap-northeast-1.amazonaws.com/iq29.org/char_img/02.png" : "./talk_img/c.png";
  var imgPath_04 = isS3 ? "https://s3-ap-northeast-1.amazonaws.com/iq29.org/char_img/03.png" : "./talk_img/d.png";

  const alert = "※キャラを設定してね！画像パスのないキャラは選べないよ！";

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
      },
      copy_left: function () {
        this.exeCopy(document.getElementById('left_item'));
      },
      copy_right: function () {
        this.exeCopy(document.getElementById('right_item'));
      },
      copy_end: function () {
        this.exeCopy(document.getElementById('end_item'));
      },
      exeCopy: function (item) {
        var copy_target = "";
        copy_target += item.innerText;

        var temp = document.createElement('div');
        temp.appendChild(document.createElement('pre')).textContent = copy_target;

        var s = temp.style;
        s.position = 'fixed';
        s.left = '-100%';

        document.body.appendChild(temp);
        document.getSelection().selectAllChildren(temp);

        // true ならコピー実行できている false なら失敗またはブラウザ非対応
        var result = document.execCommand('copy');
        document.body.removeChild(temp);

        if (!result) {
          alert('このブラウザではコピー対応していません');
        }
      }
    },
  });
})();
