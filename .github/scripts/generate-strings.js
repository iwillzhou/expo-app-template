const fs = require("fs");
const path = require("path");
const { execSync } = require('child_process');

const stdout = execSync('pnpm exec expo config --json').toString();
const appConfig = JSON.parse(stdout);

if (!appConfig || !appConfig.locales) {
    console.error("❌ Error: `locales` key not found in app.config.ts");
    process.exit(1);
}

// 1️⃣ 读取 app.config.ts 中的 locales 配置
const locales = appConfig.locales;

// 2️⃣ 处理每种语言
const androidResPath = path.resolve(__dirname, "../../android/app/src/main/res");

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
