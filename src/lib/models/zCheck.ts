/**
 * 用于 z 的检查表单字段
 */
import { z } from "zod";

/** 昵称 */
export let ckUsername = z
    .string()
    .trim()
    .min(2, {message: "昵称长度至少为2"})
    .max(32, {message: "昵称过长"});
    
export let ckEmail = z
    .string()
    .trim()
    .email({message: "输入的邮箱格式不正确"});
    
export let ckPassword = z
    .string()
    .trim()
    .min(8, {message: "密码最少为 8 位"})
    .max(40, {message: "输入的密码过长"})
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)[^]+$/, { message: '密码必须含有数字和字母' });