module.exports = (a = "", b = false, length = 100) => {
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  var c = Date.now() / 1000;
  var d = c
    .toString(16)
    .split(".")
    .join("");
  while (d.length < 14) {
    d += "0";
  }
  var e = "";
  if (b) {
    e = ".";
    var f = Math.round(Math.random() * 100000000);
    e += f;
  }
  return a + d + e + makeid(length);
};
