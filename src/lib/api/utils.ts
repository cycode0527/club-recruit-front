

/**
 * 向数组中添加元素
 * @param array
 * @param element
 */
export function arrayAdd<T>(array: T[] | null, element: T): T[] {
    let newArray;
    if (array) {
        array.push(element);
        newArray = array;
    } else {
        newArray = [element];
    }
    return newArray;
}

/**
 * 移除数组中的指定元素
 * @param array 元素数组
 * @param element 要移除的元素
 */
export function arrayRemove<T>(array: T[] | null, element: T): T[] | null {
    let newArray;
    if (array) {
        newArray = array.filter(item => item !== element);
    } else {
        return null;
    }
    
    if (newArray.length === 0) {
        return null;
    } else {
        return newArray;
    }
}

/**
 * 将svg转换为data_url
 * @param svg svg 文件的内容
 * @returns 一个 data_url
 */
export function svgToData(svg: string): string {
    let base64 = btoa(decodeURI(svg));
    return `data:image/svg+xml;base64,${base64}`
}


/**
 * 睡眠 n 毫秒 
 * @param delay 睡眠毫秒数 
 * @returns
 */
export function sleep(delay: number): Promise<NodeJS.Timeout> {
    return new Promise(resolve => setTimeout(resolve, delay))
}

/**
 * 将时间戳转换为日期字符串
 * @param timestamp 时间戳(秒)
 * @returns YYYY-MM-DD HH:mm:ss
 * @example
 * console.log(changeTime(1726235529)); // 2024-09-13 21:52:09
 * 
 */
export function changeTime(timestamp: number): string {
    let time = new Date(timestamp * 1000);
    
    let month: string | number = time.getMonth() + 1; 
    let strDate: string | number = time.getDate();
    
    let hour: string | number = time.getHours();
    let minute: string | number = time.getMinutes();
    let second: string | number = time.getSeconds();
    
    if (month <= 9) {
        month = `0${month}`;
    }
    
    if (strDate <= 9) {
        strDate = `0${strDate}`;
    }
    
    if (hour <= 9) {
        hour = `0${hour}`;
    }
    
    if (minute <= 9) {
        minute = `0${minute}`;
    }
    
    if (second <= 9) {
        second = `0${second}`;
    }

    return `${time.getFullYear()}-${month}-${strDate} ${hour}:${minute}:${second}`
}

/**
 * 获取总页数
 * @param total 总记录数
 * @param limit 每页记录数
 * @returns 总页数
 */
export function getMaxPageCount(total: number, limit: number): number {
    return Math.ceil(total / limit);
}