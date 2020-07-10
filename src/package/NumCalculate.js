/**数值计算 state 需要计算合格率的列**/
import {deepCopy} from "../Helper/Copy";

export  function numCalculate(state) {
    let temp = 0;//临时中间值
    let str = '';//临时比值
    const {Data, ratio, passRate, average, startValue, endValue, timeChose, order, width} = state
    let inputCount = Array(width).fill(0);//输入的数组
    let passCount = Array(width).fill(0);//通过的数组
    const hour = timeChose * 8//根据班次不同，处理的数据不同
    const page = timeChose * width//根据班次不同，处理的列数不同
    for (let i = 0; i < width; i++) {
        const position = order.indexOf(i)//判断此列是否需要计算合格率
        for (let j = hour; j < hour + 8; j++) {//j是行i是列
            if (!isNaN(parseFloat(Data[j]['t_data'][i])) && (parseFloat(Data[j]['t_data'][i]) != null)) {
                inputCount[i]++;
                if (position >= 0) {
                    if (parseFloat(Data[j]['t_data'][i]) >= startValue[position] && parseFloat(Data[j]['t_data'][i]) <= endValue[position]) {
                        passCount[i]++;
                    }
                }
            }
            if (inputCount[i] === 0) {
                str = null;
                temp = null;
            } else {
                str = passCount[i] + '\/' + inputCount[i];
                if (isNaN(temp = passCount[i] / inputCount[i])) {
                    temp = null;
                } else {
                    temp = Number(temp * 100).toFixed(1) + '%';
                }
            }
            ratio[i + page] = str;
            passRate[i + page] = temp;
        }
        //计算均值的部分
        temp = 0;
        if (inputCount[i] === 0) {
            temp = null;
        } else {
            for (let j = hour; j < hour + 8; j++) {
                if (!isNaN(parseFloat(Data[j]['t_data'][i]))) {
                    temp += parseFloat(Data[j]['t_data'][i]);
                }
            }
            if (isNaN(temp = temp / inputCount[i])) {
                temp = 0;
            }
            temp = temp.toFixed(3);
        }
        average[i + page] = temp
    }
    return [ratio, passRate, average]
}

//数组为[[数值1，参数1],[数值2，参数2],...]
export  function autoCalculate(arr) {
    let num = 0;
    for (let i = 0; i < arr.length; i++) {
        //遍历所有数值均不为空且不为NaN
        if (!isNaN(arr[i][0]) && arr[i][0] != null &&arr[i][0]!== '')
            num += arr[i][0] * arr[i][1]
        else
            return num = ''
    }
    return num.toFixed(2)
}

//数组为数值1 数值2
export  function divisionCalculate(num1, num2) {
    let num = 0
    if (num2)
        num = num1 / num2
    if (num)
        return num.toFixed(2)
    else
        return ''
}


/**数值计算 state **/
export  function numCalculate_Initial(state) {
    console.log('state')
    console.log(state)
    console.log('state')
    const {Data, ratio, passRate, average, startValue, endValue, order, width} = state
    let str0 = '', str8 = '', str16 = '';//临时比值
    let temp0 = 0, temp8 = 0, temp16 = 0;//计算均值和合格率的临时数据
    let inputCount0 = Array(width).fill(0), inputCount8 = Array(width).fill(0), inputCount16 = Array(width).fill(0);//各班次输入的总数
    let passCount0 = Array(width).fill(0), passCount8 = Array(width).fill(0), passCount16 = Array(width).fill(0);//各班次的合格数
    /**计算合格率和比值的部分**/
    const data = deepCopy(Data);
    for (let i = 0; i < width; i++) {//i是列
        const position = order.indexOf(i)//判断此列是否需要计算合格率

        //0点班
        for (let j = 0; j < 8; j++) {//j是行i是列
            if (!isNaN(parseFloat(data[j]['data'][i])) && (parseFloat(data[j]['data'][i]) != null)) {
                inputCount0[i]++;//0点班第i列的已填写数据个数
                if (position >= 0) {
                    if (parseFloat(data[j]['data'][i]) >= startValue[position] && parseFloat(data[j]['data'][i]) <= endValue[position]) {
                        passCount0[i]++;//0点班第i列的合格数据个数
                    }
                }
            }
        }
        if (inputCount0[i] === 0) {//0点班第i列的已填写数据个数为0
            str0 = null;
            temp0 = null;
        } else {
            //计算合格率和比值
            str0 = passCount0[i] + '\/' + inputCount0[i];
            if (isNaN(temp0 = passCount0[i] / inputCount0[i])) {
                temp0 = null;
            } else {
                temp0 = Number(temp0 * 100).toFixed(1) + '%';
            }
        }
        ratio[i] = str0;
        passRate[i] = temp0;

        //8点班
        for (let j = 8; j < 16; j++) {//j是行i是列
            if (!isNaN(parseFloat(data[j]['data'][i])) && (parseFloat(data[j]['data'][i]) != null)) {
                inputCount8[i]++;
                if (position >= 0) {
                    if (parseFloat(data[j]['data'][i]) >= startValue[position] && parseFloat(data[j]['data'][i]) <= endValue[position]) {
                        passCount8[i]++;
                    }
                }
            }
        }
        if (inputCount8[i] === 0) {
            str8 = null;
            temp8 = null;
        } else {
            str8 = passCount8[i] + '\/' + inputCount8[i];
            if (isNaN(temp8 = passCount8[i] / inputCount8[i])) {
                temp8 = null;
            } else {
                temp8 = Number(temp8 * 100).toFixed(1) + '%';
            }
        }
        ratio[i + width] = str8;
        passRate[i + width] = temp8;

        //16点班
        for (let j = 16; j < 24; j++) {//j是行i是列
            if (!isNaN(parseFloat(data[j]['data'][i])) && (parseFloat(data[j]['data'][i]) != null)) {
                inputCount16[i]++;
                if (position >= 0) {
                    if (parseFloat(data[j]['data'][i]) >= startValue[position] && parseFloat(data[j]['data'][i]) <= endValue[position]) {
                        passCount16[i]++;
                    }
                }
            }
        }
        if (inputCount16[i] === 0) {
            str16 = null;
            temp16 = null;
        } else {
            str16 = passCount16[i] + '\/' + inputCount16[i];
            if (isNaN(temp16 = passCount16[i] / inputCount16[i])) {
                temp16 = null;
            } else {
                temp16 = Number(temp16 * 100).toFixed(1) + '%';
            }
        }
        ratio[i + width * 2] = str16;
        passRate[i + width * 2] = temp16;
    }


    const num = Array(width * 3).fill(0)
    /**计算均值的部分**/
    for (let i = 0; i < width; i++) {
        //计算0点班的均值
        if (inputCount0[i] === 0) {//0点班第i列的已填写数据个数为0则i列平均值为空
            average[i] = null;
        } else {
            //累加第i列中数据
            for (let j = 0; j < 8; j++) {
                if (!isNaN(parseFloat(data[j]['data'][i]))) {
                    num[i] += parseFloat(data[j]['data'][i]);
                }
            }
            //计算平均值
            //0点班第i列的数据和除以已填写数据个数
            average[i] = num[i] / inputCount0[i]
            //若计算得到的平均值为空
            if (isNaN(average[i])) {
                average[i] = 0;
            }
            //平均值四舍五入为3位
            average[i] = average[i].toFixed(3);
        }
        //计算8点班的均值
        if (inputCount8[i] === 0) {//0点班第i列的已填写数据个数为0则i列平均值为空
            average[i + width] = null;
        } else {
            //累加第i列中数据
            for (let j = 8; j < 16; j++) {
                if (!isNaN(parseFloat(data[j]['data'][i]))) {
                    num[i + width] += parseFloat(data[j]['data'][i]);
                }
            }
            //计算平均值
            //0点班第i列的数据和除以已填写数据个数
            average[i + width] = num[i + width] / inputCount8[i]
            //若计算得到的平均值为空
            if (isNaN(average[i + width])) {
                average[i + width] = 0;
            }
            //平均值四舍五入为3位
            average[i + width] = average[i + width].toFixed(3);
        }
        //计算16点班的均值
        if (inputCount16[i] === 0) {//0点班第i列的已填写数据个数为0则i列平均值为空
            average[i + width * 2] = null;
        } else {
            //累加第i列中数据
            for (let j = 16; j < 24; j++) {
                if (!isNaN(parseFloat(data[j]['data'][i]))) {
                    num[i + width * 2] += parseFloat(data[j]['data'][i]);
                }
            }
            //计算平均值
            //0点班第i列的数据和除以已填写数据个数
            average[i + width * 2] = num[i + width * 2] / inputCount16[i]
            //若计算得到的平均值为空
            if (isNaN(average[i + width * 2])) {
                average[i + width * 2] = 0;
            }
            //平均值四舍五入为3位
            average[i + width * 2] = average[i + width * 2].toFixed(3);
        }
    }
    //返回比值，合格率，均值
    return [ratio, passRate, average]
}

