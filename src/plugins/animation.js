export const animation = (e, obj) => {
  let offset = obj["offset"] != undefined ? obj["offset"] : "offsetLeft";
  let direct = obj["direct"] != undefined ? obj["direct"] : "left";
  let speed = obj["speed"] != undefined ? obj["speed"] : 100;
  let step = obj["step"] != undefined ? obj["step"] : 100;
  let end = obj["end"] != undefined ? obj["end"] : null;
  let callback = obj["callback"] != undefined ? obj["callback"] : null;
  clearTimeout(e.time);
  //如果发现没有动画，而是直接到达目标距离的话，那就是速度的正负问题。
  e[offset] > end ? (speed = -speed) : speed;
  e.time = setInterval(() => {
    let distance = e[offset]; //获取当前元素的初始值。
    // speed = distance < end ?  speed : -speed;
    let newValue = distance + speed; //当前移动的距离
    //至于为什么要用当前移动的距离做判断，主要是它是动态的,这里的判断要考虑负值。
    if ((speed > 0 && newValue >= end) || (speed < 0 && newValue <= end)) {
      newValue = end;
    }
    e.style[direct] = newValue + "px"; //最终定位移动到的距离。;
    if (newValue === end) {
      clearTimeout(e.time);
      callback && callback();
    }
    console.log(e[offset], "当前定位值");
    console.log(speed, "当前速度");
    console.log(end, "目标距离");
    console.log("--------");
  }, step);
};

export const toTop = ele => {
  // ele.scrollTop = 0;
  let dy = ele.scrollTop / 4; // 每次更新scrollTop改变的大小
  if (ele.scrollTop > 0) {
    ele.scrollTop -= Math.max(dy, 10);
    setTimeout(() => {
      toTop(ele, dy);
    }, 30);
  }
}