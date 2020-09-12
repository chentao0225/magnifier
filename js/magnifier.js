let $small = $(".small"),
  $mark = $small.find(".mark"),
  $big = $(".big"),
  $bigImg = $big.find("img");

let smallW = $small.outerWidth(),
  smallH = $small.outerHeight(),
  smallOffset = $small.offset(),
  markW = $mark.outerWidth(),
  markH = $mark.outerHeight(),
  bigW = $big.outerWidth(),
  bigH = $big.outerHeight(),
  bigImgW = (bigW / markW) * smallW,
  bigImgH = (bigH / markH) * smallH;

$bigImg.css({
  width: bigImgW,
  height: bigImgH,
});

function computed(ev) {
  let markL = ev.pageX - smallOffset.left - markW / 2;
  let markT = ev.pageY - smallOffset.top - markH / 2;
  //边界判断
  let minL = 0,
    minT = 0,
    maxL = smallW - markW,
    maxT = smallH - markH;
  markL = markL < minL ? minL : markL > maxL ? maxL : markL;
  markT = markT < minT ? minT : markT > maxT ? maxT : markT;
  $mark.css({
    left: markL,
    top: markT,
  });
  $bigImg.css({
    left: (-markL / smallW) * bigImgW,
    top: (-markT / smallH) * bigImgH,
  });
}
$small
  .mouseenter(function (ev) {
    $mark.css("display", "block");
    $big.css("display", "block");
    computed(ev);
  })
  .mouseleave(function (ev) {
    $mark.css("display", "none");
    $big.css("display", "none");
  })
  .mousemove(function (ev) {
    computed(ev);
  });
