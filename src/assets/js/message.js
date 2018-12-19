//引用element的message组件
import {
  Message
} from 'element-ui'

//res.status!==200网络错误
function NetworkAnomaly() {
  Message.error({
    message: '网络异常！',
    duration:1500
  })
  return false
}

//res.data.code!==0
function abnormal() {
  Message.error({
    message: '操作异常！',
    duration:1500
  })
  return false
}

//成功，提示内容为传入内容
function succ(val) {
  Message.success({
    message: val,
    duration:1500
  })
}

//错误提示，提示内容传入提示参数
function error(val) {
  Message.error({
    message: val,
    duration:1500
  })
  return false
}


//退出
function getOut() {
  if (confirm("确定要退出吗？")) {
    var browserName = navigator.appName;
    if (browserName == "Netscape") {
      window.open("", "_self", "");
      window.close();
      window.open("about:blank", "_self").close();
    }
    if (browserName == "Microsoft Internet Explorer") {
      window.parent.opener = "whocares";
      window.parent.close();
    }
  }

}



//图片目录
const imgUrl='http://218.16.212.90:16452'; 

export {
  NetworkAnomaly,
  abnormal,
  succ,
  error,
  getOut,
  imgUrl
}
