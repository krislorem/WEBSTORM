//定时器实现关键词切换
{
    //1.获取搜索框的输入表单对象
    let input = document.querySelector(".search input");

    //2.设置关键词数组
    const keyWords = ['Vue3.0', 'React', '爬虫技术', 'Java', '多线程'];

    //3.使用setInterval 每隔2秒切换一个关键词,即修改 input 的 placeholder 值
    let i = 0;//索引
    input.placeholder = keyWords[i];
    setInterval(() => {
        i++;
        if (i === 5) {
            i = 0;
        }
        input.placeholder = keyWords[i];
    }, 2000);
}

//轮播
{
    //定义轮播图数组
    const swiperImgList = [
        {
            path: './images/swiper/swiper-1.jpg',
            url: 'https://coding.imooc.com/',
            bg: './images/swiper/bj-4.jpg'
        },
        {
            path: './images/swiper/swiper-2.jpg',
            url: 'https://coding.imooc.com/',
            bg: './images/swiper/bj-4.jpg'
        },
        {
            path: './images/swiper/swiper-3.jpg',
            url: 'https://coding.imooc.com/',
            bg: './images/swiper/bj-3.jpg'
        },
        {
            path: './images/swiper/swiper-4.jpg',
            url: 'https://coding.imooc.com/',
            bg: './images/swiper/bj-3.jpg'
        },
        {
            path: './images/swiper/swiper-5.jpg',
            url: 'https://coding.imooc.com/',
            bg: './images/swiper/bj-4.jpg'
        },
        {
            path: './images/swiper/swiper-6.jpg',
            url: 'https://coding.imooc.com/',
            bg: './images/swiper/bj-1.jpg'
        }
    ];

    //找到swiper 下的 a 标签
    const swiperA = document.querySelector('.swiper a');
    //找到最外层的div
    const banner = document.querySelector('#banner');
    //定时器
    let timer = null;
    //数组索引
    let i = 0;

    //做圆点切换的时候再加
    //找到左右切换的按钮
    const prevArrow = document.querySelector('.prev');
    const nextArrow = document.querySelector('.next');

    //做圆点切换的时候再加
    //获取父节点 ul
    const ul = document.querySelector('.circle-list');
    //获取ul下所有的子节点 li 切换圆点 
    const list = ul.children;
    console.log(list.length);
    //封装一个切换图片的函数
    function changeImg(index) {
        const obj = swiperImgList[index];
        swiperA.style.backgroundImage = `url(${obj.path})`;
        swiperA.href = obj.url;
        banner.style.backgroundImage = `url(${obj.bg})`;
        //这条语句到圆点切换的时候在加,是让圆点切换和主图切换同步
        currentCircle(index);
    }

    //初始化轮播,显示第一张图
    changeImg(i);

    //启动定时器
    timer = setInterval(() => {
        i = ++i === 6 ? 0 : i;
        changeImg(i);
    }, 3000);

    //设置是否允许点击事件执行的标志位:true 则允许执行点击事件,false则不允许执行
    let flag = true;
    prevArrow.onclick = function () {
        //如果当前不能点击,直接返回
        if (flag == false) {
            return;
        }
        flag = false;
        i = --i === -1 ? 5 : i;
        changeImg(i);
        //一秒后,重新允许点击
        setTimeout(() => {
            flag = true;
        }, 1000);
    }

    nextArrow.onclick = function () {
        if (flag == false) {
            return;
        }
        flag = false;
        i = ++i === 6 ? 0 : i;
        changeImg(i);
        setTimeout(() => {
            flag = true;
        }, 1000);
    }

    //选中的圆点,对其进行函数封装
    function currentCircle(index) {
        for (let i = 0; i < list.length; i++) {
            list[i].className = '';
            list[index].className = 'current';
        }
    }


    //循环注册所有圆点的点击事件,也注意1秒内不能重复点击
    for (let i = 0; i < list.length; i++) {
        list[i].onclick = function () {
            if (flag == false) {
                return;
            }
            flag = false;
            changeImg(i);
            setTimeout(() => {
                flag = true;
            }, 1000)
        }
    }

    //鼠标悬停到轮播大图,清除定时器
    swiperA.onmouseenter = function () {
        clearInterval(timer);
    }

    //鼠标离开,重新启动定时器
    swiperA.onmouseleave = function () {
        timer = setInterval(() => {
            i = ++i === 6 ? 0 : i;
            changeImg(i);
        }, 3000);
    }

    prevArrow.onmouseenter = function () {
        clearInterval(timer);
    }

    nextArrow.onmouseenter = function () {
        clearInterval(timer);
    }

    ul.onmouseenter = function () {
        clearInterval(timer);
    }
}


//倒计时
{
    //获取结束时间的时间戳
    let endDate = new Date('2023-09-19 23:01:00');
    endDate = parseInt(endDate.getTime() / 1000);
    console.log(endDate);

    let timer = null;

    //获取页面的时,分,秒标签
    const hourDom = document.getElementById('hour');
    const minDom = document.getElementById('min');
    const secDom = document.getElementById('sec');

    function countDown() {
        //获取此刻当前时间的时间戳
        let nowDate = new Date();
        nowDate = parseInt(nowDate.getTime() / 1000);

        //计算剩余的总秒数
        let seconds = endDate - nowDate;
        //根据总秒数换算
        if (seconds >= 0) {
            let hours = parseInt(seconds / 3600);
            hours = hours > 9 ? hours : '0' + hours;
            let mins = parseInt(seconds % 3600 / 60);
            mins = mins > 9 ? mins : '0' + mins;
            let secs = seconds % 3600 % 60;
            secs = secs > 9 ? secs : '0' + secs;
            // console.log(hours, mins, secs);
            //把结果显示到页面
            hourDom.innerText = hours;
            minDom.innerText = mins;
            secDom.innerText = secs;
        } else {
            //清空计时器
            clearInterval(timer);
            document.querySelector('.countdown p').innnerText = '拼团已结束';
            hourDom.innerText = '00';
            minDom.innerText = '00';
            secDom.innerText = '00';
        }
    }

    countDown();

    //启动定时器
    timer = setInterval(() => {
        countDown();
    }, 1000);
}


//滚动课程
{
    const ul = document.querySelector('.sk-list ul');

    let timer = null;

    let leftPx = 0;

    timer = setInterval(() => {
        leftPx = --leftPx == -1920 ? 0 : leftPx;
        ul.style.left = leftPx + 'px';
    }, 10);

    ul.onmouseenter = function () {
        clearInterval(timer);
    }

    ul.onmouseleave = function () {
        timer = setInterval(() => {
            leftPx = --leftPx == -1920 ? 0 : leftPx;
            ul.style.left = leftPx + 'px';
        }, 10)
    }
}

//课程切换
{
    //获取所有的 a 标签 （ tab 栏）
    const tabs = document.querySelectorAll('.new-course-box a');
    //获取到所有的课程列表
    const uls = document.querySelectorAll('.new-course-list ul');

    for (let i = 0; i < tabs.length; i++) {
        //循环为所有的 a 绑定点击事件
        tabs[i].onclick = function () {
            for (let j = 0; j < tabs.length; j++) {
                //清除所有的 a 的样式
                uls[j].className = '';
            }
            for (let j = 0; j < tabs.length; j++) {
                //清除所有的 ul 的样式
                tabs[j].className = '';
            }
            //给当前选中的 a 和 ul 添加样式
            tabs[i].className = 'active';
            uls[i].className = 'current';
        }
    }
}






