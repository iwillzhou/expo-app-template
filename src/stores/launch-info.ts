import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { Storage } from 'src/utils/storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface LaunchInfo {
    /** 上一次启动的 app version（persist） */
    lastVersion: string | null;

    /** 上一次启动的 build number（persist） */
    lastBuild: string | null;

    /** 上一次启动的 OTA updateId（persist） */
    lastUpdateId: string | null;

    /** 当前 app version */
    currentVersion: string;

    /** 当前 build number */
    currentBuild: string;

    /** 当前 OTA updateId */
    currentUpdateId: string | null;

    /** 是否首次安装后启动 */
    isFirstLaunch: boolean;

    /** 是否原生版本 / build 更新后首次启动 */
    isUpdatedLaunch: boolean;

    /** 是否 OTA 更新后首次启动 */
    isOTALaunch: boolean;

    /** 是否普通启动 */
    isNormalLaunch: boolean;

    /** 启动信息是否仍在计算中 */
    isLoading: boolean;

    /** 初始化启动信息（仅由 store 内部调用） */
    init: () => void;
}

export const useLaunchInfoStore = create<LaunchInfo>()(
    persist(
        (set, get) => ({
            // ===== 持久化字段 =====
            lastVersion: null,
            lastBuild: null,
            lastUpdateId: null,

            // ===== 当前环境信息 =====
            currentVersion: Constants.expoConfig?.version ?? '0.0.0',
            currentBuild: Constants.nativeBuildVersion ?? '0',
            currentUpdateId: Updates.updateId ?? null,

            // ===== 计算结果 =====
            isFirstLaunch: false,
            isUpdatedLaunch: false,
            isOTALaunch: false,
            isNormalLaunch: false,

            isLoading: true,

            /** 计算本次启动状态 */
            init: () => {
                const { lastVersion, lastBuild, lastUpdateId, currentVersion, currentBuild, currentUpdateId } = get();

                let isFirstLaunch = false;
                let isUpdatedLaunch = false;
                let isOTALaunch = false;
                let isNormalLaunch = false;

                if (!lastVersion && !lastBuild) {
                    // 首次安装
                    isFirstLaunch = true;
                } else if (lastVersion !== currentVersion || lastBuild !== currentBuild) {
                    // 原生版本更新
                    isUpdatedLaunch = true;
                } else if (lastUpdateId !== currentUpdateId) {
                    // OTA 更新
                    isOTALaunch = true;
                } else {
                    // 普通启动
                    isNormalLaunch = true;
                }

                set({
                    isFirstLaunch,
                    isUpdatedLaunch,
                    isOTALaunch,
                    isNormalLaunch,
                    isLoading: false,

                    // 更新为本次启动信息（会被 persist）
                    lastVersion: currentVersion,
                    lastBuild: currentBuild,
                    lastUpdateId: currentUpdateId
                });
            }
        }),
        {
            name: '@app_launch_info',
            storage: createJSONStorage(() => Storage),

            /** 只持久化历史字段 */
            partialize: state => ({
                lastVersion: state.lastVersion,
                lastBuild: state.lastBuild,
                lastUpdateId: state.lastUpdateId
            }),

            /**
             * hydrate 完成后自动触发 init
             */
            onRehydrateStorage: () => state => {
                state?.init();
            }
        }
    )
);
