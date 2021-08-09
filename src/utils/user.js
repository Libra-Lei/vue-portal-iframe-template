/*
 * @Description: 用户相关 -- 当前风场选择、当前租户选择
 * @Author: 幺五六
 * @Date: 2020-09-08 17:04:44
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-11-03 15:42:53
 */

import Cookies from 'js-cookie'

const LOCAL_STORAGE_TENANT_LIST = 'wmTenantListInfo';
const COOKIE_TENANT_ID = 'wmTenantId';
const COOKIE_TENANT_DOMAIN = 'wmTenantDomain';
const COOKIE_FARM_ID = 'wmFarmId';
const COOKIE_FARM_LIST = 'wmFarmList';
const LOCAL_STORAGE_FARM_LIST_INFO = 'wmFarmListInfo';


/**
 * 获取当前选中租户的 风场列表 (json, 详情)
 */
export function getCurrTenantListInfo() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_TENANT_LIST));
}

/**
 * 存储当前选中租户的 风场列表 (json, 详情)
 */
export function setCurrTenantListInfo(list) {
  return localStorage.setItem(LOCAL_STORAGE_TENANT_LIST, JSON.stringify(list));
}

/**
 * 获取当前选中 租户 { id, domain }
 */
export function getCurrTenant() {
  return { id: Cookies.get(COOKIE_TENANT_ID), domain: Cookies.get(COOKIE_TENANT_DOMAIN) };
}

/**
 * 存储当前选中 租户 { id, domain }
 */
export function setCurrTenant(tenant) {
  Cookies.set(COOKIE_TENANT_DOMAIN, tenant.domain);
  Cookies.set(COOKIE_TENANT_ID, tenant.id);
}

/**
 * 获取当前选中租户的 风场列表 (ids字符串)
 */
export function getCurrFarmList() {
  return Cookies.get(COOKIE_FARM_LIST);
}

/**
 * 存储当前选中租户的 风场列表 (ids字符串)
 */
export function setCurrFarmList(farmId) {
  return Cookies.set(COOKIE_FARM_LIST, farmId);
}

/**
 * 获取当前选中租户的 风场列表 (json, 详情)
 */
export function getCurrFarmListInfo() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_FARM_LIST_INFO));
}

/**
 * 存储当前选中租户的 风场列表 (json, 详情)
 */
export function setCurrFarmListInfo(list) {
  return localStorage.setItem(LOCAL_STORAGE_FARM_LIST_INFO, JSON.stringify(list));
}

/**
 * 获取当前选中的 风场ID
 */
export function getCurrFarmId() {
  return Cookies.get(COOKIE_FARM_ID);
}

/**
 * 存储当前选中的 风场ID
 */
export function setCurrFarmId(farmId) {
  return Cookies.set(COOKIE_FARM_ID, farmId);
}

/**
 * 删除当前选中的 风场ID
 */
export function removeCurrFarmId() {
  return Cookies.remove(COOKIE_FARM_ID);
}