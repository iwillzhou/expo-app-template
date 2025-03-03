const fs = require("fs");
const path = require("path");
require('ts-node').register();

// 1️⃣ 读取 `app.config.ts` 并解析 `locales`
const appConfigPath = path.resolve(__dirname, "../../app.config.ts");
const appConfig = require(appConfigPath);

if (!appConfig.expo || !appConfig.expo.locales) {
    console.error("❌ Error: `locales` key not found in app.config.ts");
    process.exit(1);
}

const locales = appConfig.expo.locales;

// 2️⃣ 处理每种语言
const androidResPath = path.resolve(__dirname, "../../android/app/src/main/res");
const defaultValuesPath = path.join(androidResPath, "values");

// 复制 `values/` 目录到 `values-[language]`
Object.entries(locales).forEach(([language, jsonFile]) => {
    const localeFilePath = path.resolve(__dirname, "../../" + jsonFile);

    // 读取 JSON 语言文件
    if (!fs.existsSync(localeFilePath)) {
        console.error(`❌ Error: Locale JSON file not found: ${jsonFile}`);
        return;
    }

    const localeData = JSON.parse(fs.readFileSync(localeFilePath, "utf8"));
    const appName = localeData.CFBundleDisplayName;

    if (!appName) {
        console.error(`❌ Error: CFBundleDisplayName not found in ${jsonFile}`);
        return;
    }

    // 创建 `values-[language]/` 目录
    const valuesLangPath = path.join(androidResPath, `values-${language}`);
    if (!fs.existsSync(valuesLangPath)) {
        fs.mkdirSync(valuesLangPath);
    }

    // 复制 `strings.xml` 并修改 `app_name`
    const stringsFilePath = path.join(valuesLangPath, "strings.xml");
    const stringsContent = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">${appName}</string>
</resources>`;

    fs.writeFileSync(stringsFilePath, stringsContent, "utf8");
    console.log(`✅ Updated strings.xml for language: ${language} -> ${appName}`);
});

console.log("🎉 All localized strings.xml files generated!");
