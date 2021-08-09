/*
 * @Description: pubsub 常量定义
 * @Author: 幺五六
 * @Date: 2021-01-19 13:52:11
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-01-27 17:46:52
 */

/**
 * 接收到工作消息更新通知，刷新工作消息
 */
export const REFRESH_WORK_MESSAGE = Symbol('refresh_work_message');

/**
 * 刷新工作消息未读数量
 */
export const REFRESH_WORK_MESSAGE_UNREAD = Symbol('refresh_work_message_unread');

/**
 * 重新连接 工作消息的 websocket
 */
export const RECONNECTION_WORK_WEBSOCKET = Symbol('reconnection_work_websocket');