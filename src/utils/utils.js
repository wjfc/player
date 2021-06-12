export function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search
    .substr(1)
    .replace(new RegExp(/(amp;)/g), "")
    .match(reg);
  if (r != null) {
    return r[2];
  }
  return null;
}