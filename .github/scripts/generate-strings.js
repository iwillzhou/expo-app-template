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

// 复制 `values/` 目录到 `values-[locale]`
Object.entries(locales).forEach(([locale, jsonFile]) => {
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

    // 创建 `values-[locale]/` 目录
    const valuesLangPath = path.join(androidResPath, `values-${locale}`);
    if (!fs.existsSync(valuesLangPath)) {
        fs.mkdirSync(valuesLangPath);
    }

    // 复制 `strings.xml` 并修改 `app_name`
    const stringsFilePath = path.join(valuesLangPath, "strings.xml");
    const stringsContent = `
        <resources>
            <string name="app_name">${appName}</string>
        </resources>
    `;

    fs.writeFileSync(stringsFilePath, stringsContent, "utf8");
    console.log(`✅ Updated strings.xml for locale: ${locale} -> ${appName}`);
});

console.log("🎉 All localized strings.xml files generated!");
