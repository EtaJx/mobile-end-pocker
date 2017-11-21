/**
 * 物理像素：普通屏幕看到的颗粒，一个颗粒就是一个像素
 * 逻辑像素：是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素（比如css像素）。这个点里面可能存在多个物理像素点
 *           在css中，长度单位可以分为绝对单位以及相对单位(px)
 *           图像基本采样单元是不同， 显示器上的物理像素等于显示器的点距，而打印机的物理像素等于打印机的抹点，而衡量点距大小和打印机墨点大小的单位分别称为：ppi和dpi
 *           ppi:每英寸多少像素数，在显示器上即每英寸多少物理像素即显示器设备的点距
 *           pdi:每英寸多少点
 *           在描述显示器器设备时，ppi和pdi是用一个概念
 *           在默认情况下，一个css像素应该是等于一个物理像素的宽度，但是放大等操作会导致一个物理像素等于多个设备像素宽度。
 * 设备像素：显示屏是由物理像素点组成的，通过控制每个像素点的颜色，来呈现不同的图像，固定不变，单位为pt，设备像素比-DPR(Device Pixel Ratio) = 物理像素 / 逻辑像素， 在css中，pt为绝对单位，1pt=1/72(inch)，即英寸，1英寸等于2.54厘米
 *           
 */
(function flexible (window, document){
    var docEl = document.documentElement;

    /**
     * window.devicePixelRatio 返回当前设备的物理像素分辨率与css像素分辨率的比值。也可以理解为：一个css像素的大小相当于一个物理像素的大小的比值。可写。
     */
    var dpr = window.devicePixelRatio || 1;

    function setBodyFontSize() {
        if(document.body) {
            document.body.style.fontSize = (12*dpr) + 'px';
        }else{
            document.addEventListener('DOMContentLoaded', setBodyFontSize);
        }
    }
    setBodyFontSize();

    function setRemUnit() {
        var rem = docEl.clientWidth / 10;
        docEl.style.fontSize = rem + 'px';
    }
    setRemUnit();

    window.addEventListener('resize', setRemUnit);
    window.addEventListener('pageshow', function (e) {
        if(e.persisted) {
            setRemUnit();
        }
    });

    if(dpr >= 2) {
        var fakeBody = document.createElement('body');
        var testElement = document.createElement('div');
        testElement.style.border = '.5px solid transparent';
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if(testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines');
        }
        docEl.removeChild(fakeBody);
    }
}(window, document))
