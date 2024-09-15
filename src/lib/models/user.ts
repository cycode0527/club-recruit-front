/**
 * 用户基本信息
 */
export interface User {
    id: number;
    /** 用户昵称 */
    nickname: string;
    /** 用户邮箱 */
    email: string;
    /** 用户邮箱是否已验证 */
    isVerified: boolean;
    /** 是否为管理员 */
    isAdmin: boolean;
} 