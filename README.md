# @react-native-harmony-community/auto-fill

auto-fill 基于 HarmonyOS [autoFillManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/js-apis-app-ability-autofillmanager-V5) 模块，提供输入框自动填充的功能，仅支持 harmony 平台。

## 1. 目录结构

主要目录结构如下：

```yaml
auto-fill
├── LICENSE
├── README.md
├── package.json
├── auto-fill             # 源码包
│   ├── harmony           # native 源码
│   ├── index.ts
│   ├── package.json
│   └── src
└── tester                # 使用了 auto-fill 的 react-native 示例工程
```

## 2. 安装与使用

### 2.1. 下载及安装 tgz

请到三方库的 Releases 发布地址查看配套的版本信息：[@react-native-harmony-community/auto-fill Releases](https://github.com/react-native-oh-library/auto-fill/releases)，并下载适用版本的 tgz 包。

进入到 react-native 工程目录安装 tgz 包：

- **npm**
  ```bash
  npm install @react-native-harmony-community/auto-fill@file:path/to/tgz
  ```
- **yarn**
  ```bash
  yarn add @react-native-harmony-community/auto-fill@file::path/to/tgz
  ```

### 2.2. 使用场景

<!-- todo 应用申请 -->
<!-- todo 前提条件 -->
<!-- todo 示例代码 -->

## 3. Link

目前 HarmonyOS 暂不支持 AutoLink，所以 Link 步骤需要手动配置。

首先需要使用 DevEco Studio 打开项目里的 HarmonyOS 工程 `harmony`

### 3.1. 在 harmony 工程根目录的 `oh-package.json5` 添加 overrides 字段

```json
{
  ...
  "overrides": {
    "@rnoh/react-native-openharmony" : "./react_native_openharmony"
  }
}
```

### 3.2. 引入原生端代码

目前有两种方法：

1. 通过 har 包引入（在 IDE 完善相关功能后该方法会被遗弃，目前首选此方法）；
2. 直接链接源码。

方法 1：通过 har 包引入（推荐）

> [!TIP] har 包位于三方库安装路径的 `harmony` 文件夹下。

打开 `entry/oh-package.json5`，添加以下依赖

```json
"dependencies": {
    "@rnoh/react-native-openharmony": "file:../react_native_openharmony",
    "@react-native-harmony-community/auto-fill": "file:../../node_modules/@react-native-harmony-community/auto-fill/harmony/auto-fill.har"
  }
```

点击右上角的 `sync` 按钮

或者在终端执行：

```bash
cd entry
ohpm install
```

方法 2：直接链接源码

如需使用直接链接源码，请参考[直接链接源码](https://gitee.com/react-native-oh-library/usage-docs/blob/master/zh-cn/link-source-code.md)说明

### 3.3. 配置 CMakeLists 和引入 xxxPackge

打开 `entry/src/main/cpp/CMakeLists.txt`，添加：

```diff
project(rnapp)
cmake_minimum_required(VERSION 3.4.1)
set(CMAKE_SKIP_BUILD_RPATH TRUE)
...
+ set(OH_MODULES "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules")
set(RNOH_CPP_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../../../../react-native-harmony/harmony/cpp")
set(LOG_VERBOSITY_LEVEL 1)

# RNOH_BEGIN: manual_package_linking_1
+ add_subdirectory("${OH_MODULES}/@react-native-harmony-community/auto-fill/src/main/cpp" ./auto-fill)
# RNOH_END: manual_package_linking_1

add_library(rnoh_app SHARED
    ${GENERATED_CPP_FILES}
    "./PackageProvider.cpp"
    "${RNOH_CPP_DIR}/RNOHAppNapiBridge.cpp"
)

# RNOH_BEGIN: manual_package_linking_2
+ target_link_libraries(rnoh_app PUBLIC auto_fill)
# RNOH_END: manual_package_linking_2
```

打开 `entry/src/main/cpp/PackageProvider.cpp`，添加：

```diff
#include "RNOH/PackageProvider.h"
+ #include "AutoFillPackage.h"

using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
    return {
        std::make_shared<RNOHGeneratedPackage>(ctx),
+       std::make_shared<AutoFillPackage>(ctx),
    };
}
```

### 3.4. 在 ArkTs 侧引入 AutoFillPackage

打开 `entry/src/main/ets/RNPackagesFactory.ts`，添加：

```diff
  ...
+ import { AutoFillPackage } from '@react-native-harmony-community/auto-fill/ts'

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
+   new AutoFillPackage(ctx),
  ];
}
```

## 4. 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/react-native-oh-library/auto-fill/blob/sig/LICENSE) ，请自由地享受和参与开源。
