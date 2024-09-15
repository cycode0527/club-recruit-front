/** 专业列表, 供给前端选择 */
export const majorList = [
    /** 计算机科学与技术学院 */
    '计算机科学与技术',
    '物联网工程',
    '软件工程',
    '数据科学与大数据技术',
    '数字媒体技术',
    '软件工程',

    /** 通信工程学院 */
    '通信工程',
    '信息工程',
    '空间信息与数字技术',

    /** 电子工程学院 */
    '电子信息工程',
    '电磁场与无线技术',
    '遥感科学与技术',
    '信息对抗技术',

    /** 机电工程学院 */
    '电气工程及其自动化',
    '自动化',
    '机器人工程',
    '电子封装技术',
    '机械设计制造及自动化',
    '工业设计',
    '测控技术与仪器',

    /** 光电工程学院 */
    '光电信息科学与技术',
    '电子科学与技术',

    /** 物理学院 */
    '应用物理学',
    '电子信息科学与技术',
    '电波传播与天线',


    /** 经济与管理学院 */
    '金融学',
    '信息管理与信息系统',
    '工程管理',
    '大数据管理与应用',
    '工业工程',
    '工商管理',
    '市场营销',
    '人力资源管理',
    '财务管理',
    '电子商务',
    '行政管理',

    /** 数学与统计学院 */
    '数学与应用数学',
    '信息与计算科学',
    '统计学',

    /** 人文学院 */
    '录音艺术',
    '哲学',
    '汉语言文学',
    '汉语国际教育',

    /** 外国语学院 */
    '英语',
    '日语',
    '翻译',

    /** 微电子学院 */
    '微电子科学与工程',
    '集成电路设计与集成系统',

    /** 生命科学技术学院 */
    '生物技术',
    '生物医学工程',
    '医学影像技术',
    '护理学',
    '智能医学工程',

    /** 空间科学与技术学院 */
    '空间科学与技术',
    '探测制导与控制技术',
    '飞行器设计与工程',
    '飞行器控制与信息工程',

    /** 先进材料与纳米科技学院 */
    '应用化学',
    '材料科学与工程',
    '纳米材料与技术',

    /** 网络与信息安全学院 */
    '信息安全',
    '网络工程',
    '网络空间安全',
    '密码科学与技术',

    /** 人工智能学院 */
    '智能科学与技术',
    '人工智能',

    /** 体育部 */
    '运动训练',

    '其他',
];

/**
 * 用户性别
 * 00 未知, 01 男性, 10 女性, 11 其他或不透露
 */
export enum Gender {
    unknown = 0,
    male,
    female,
    other,
}

/**
 * 研究方向
 */
export const Direction = [ 
    'Web',
    'Reverse',
    'Misc',
    'Crypto',
    'Pwn',
    'Dev',
    '美工',
    '活动组',
]

/**
 * 用户的具体报名信息,可被修改
 */
export interface UserInfo {
    /** 对应的用户 id  */
    id: number;
    nickname: string;
    /** 真实姓名 */
    realName: string;
    /** 性别 */
    gender: Gender;
    /** 学号 */
    studentId: string;
    /** 是否为研究生 */
    isPostgraduate: boolean;
    /** 学生专业 */
    studentMajor: string;
    /** 入学年级 */
    Grade: number;
    /** QQ 号码 */
    qqId: string;
    /** 手机号码 */
    phoneId: string;
    /**
     * 面试状态
     * reject|pass1|question1|question2|accepted|null
     */
    status: string;
    /**
     * 向往研究方向
     */
    wantDirection: number;
    /**
     * 用户组
     * @example
     * BIT(0): is_superuser
     * BIT(1): account_verified
     * BIT(2): resume_applied
     *
     */
    userGroup: number;
}

/**
 * 通过 wantDirectionNum 获取 wantDirection 的列表
 * @param directNum 
 * @returns 意向方向列表
 * @example
 * BIT(0) Web
 * BIT(1) Reverse
 * BIT(2) Misc
 * BIT(3) Crypto
 * BIT(4) Pwn
 * BIT(5) Dev
 * BIT(6) 美工
 * BIT(7) 活动组
 */
export function getWantDirectList(directNum: number): string[] {
    let directList: string[] = [];
    let num = directNum;
    for (let i = 0; i < 8; i++) {
        if (num & 1) {
            directList.push(Direction[i]);
        }
        num = num >> 1;
    }
    return directList;
}